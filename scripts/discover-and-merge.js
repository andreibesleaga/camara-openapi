// This script provides the definitive, production-grade solution.
// It clones a curated list of repositories, recursively discovers the latest valid
// OpenAPI file, and generates a comprehensive output including original files,
// individually bundled APIs, and a final grand-merged specification.
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const yaml = require('js-yaml');
const SwaggerParser = require('@apidevtools/swagger-parser');
const semver = require('semver');
const repositoryNames = require('./api-repositories.js');

const TEMP_CLONE_DIR = path.join(__dirname, 'temp_clones');
// This is the definitive, prioritized list of all possible locations.
const SEARCH_PATHS = ['', 'code/api-definitions', 'dev/api-definitions'];

/**
 * Recursively finds all files with .yaml or .yml extensions in a directory.
 */
function findYamlFilesRecursive(dir) {
    let results = [];
    try {
        const list = fs.readdirSync(dir);
        list.forEach(file => {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);
            if (stat && stat.isDirectory()) {
                if (file !== '.git') {
                    results = results.concat(findYamlFilesRecursive(filePath));
                }
            } else if (file.endsWith('.yaml') || file.endsWith('.yml')) {
                results.push(filePath);
            }
        });
    } catch (error) {
        console.error(`   - Could not read directory: ${dir}`);
    }
    return results;
}

/**
 * Finds the latest version of an OpenAPI spec file from a list of candidates.
 */
function findLatestVersion(files) {
    if (files.length === 0) return null;
    if (files.length === 1) return files[0];

    const versionedFiles = files
        .map(file => {
            const match = file.match(/v?(\d+\.\d+\.\d+)/);
            return match ? { file, version: semver.valid(semver.coerce(match[1])) } : { file, version: '0.0.0' };
        })
        .filter(Boolean);

    versionedFiles.sort((a, b) => semver.rcompare(a.version, b.version));
    return versionedFiles[0].file;
}

async function discoverApis() {
    if (fs.existsSync(TEMP_CLONE_DIR)) {
        fs.rmSync(TEMP_CLONE_DIR, { recursive: true, force: true });
    }
    fs.mkdirSync(TEMP_CLONE_DIR);

    const discoveredApis = [];
    console.log(`Discovering latest API files from ${repositoryNames.length} curated repositories...`);

    for (const repoName of repositoryNames) {
        const repoUrl = `https://github.com/camaraproject/${repoName}.git`;
        const clonePath = path.join(TEMP_CLONE_DIR, repoName);
        console.log(`\n-> Processing repository: ${repoName}`);
        try {
            execSync(`git clone --depth 1 ${repoUrl} "${clonePath}"`, { stdio: 'pipe' });

            console.log(`   -> Performing recursive search for OpenAPI files...`);
            const allYamlFiles = findYamlFilesRecursive(clonePath);
            const validApiFiles = [];

            for (const fullPath of allYamlFiles) {
                try {
                    const content = fs.readFileSync(fullPath, 'utf8');
                    if (content.includes('openapi:') || content.includes('swagger:')) {
                        console.log(`      - Found valid OpenAPI spec: ${path.relative(clonePath, fullPath)}`);
                        validApiFiles.push(fullPath);
                    }
                } catch (e) { /* ignore read errors */ }
            }

            if (validApiFiles.length > 0) {
                const latestApiFile = findLatestVersion(validApiFiles);
                console.log(`   - SUCCESS: Selected latest version: ${path.basename(latestApiFile)}`);
                discoveredApis.push({ id: repoName, path: latestApiFile });
            } else {
                console.warn(`   - WARNING: No valid OpenAPI file found anywhere in repository '${repoName}'.`);
            }
        } catch (error) {
            console.error(`   - FAILED to clone or process repository ${repoName}: ${error.message}`);
        }
    }
    return discoveredApis;
}

async function mergeApiSpecs(discoveredApis) {
    if (discoveredApis.length === 0) {
        console.error('\nNo APIs were discovered. Halting build.');
        process.exit(1);
    }
    
    const outputPath = path.resolve(__dirname, '..', 'dist');
    const originalsPath = path.join(outputPath, 'original');
    const apisPath = path.join(outputPath, 'apis');

    // Create the new directories
    if (!fs.existsSync(outputPath)) fs.mkdirSync(outputPath);
    if (!fs.existsSync(originalsPath)) fs.mkdirSync(originalsPath);
    if (!fs.existsSync(apisPath)) fs.mkdirSync(apisPath);

    console.log(`\nStarting merge process for ${discoveredApis.length} APIs...`);
    const masterSpec = {
        openapi: '3.0.3',
        info: {
            title: 'CAMARA Complete Unified API (Recursive Discovery)',
            version: new Date().toISOString(),
            description: 'A single OpenAPI spec generated by recursively discovering and merging all CAMARA project APIs.',
            license: { name: 'Apache 2.0', url: 'https://www.apache.org/licenses/LICENSE-2.0.html' }
        },
        servers: [{ url: 'https://api.example.com/camara', description: 'Example Production Server' }],
        paths: {},
        components: { schemas: {}, securitySchemes: {}, responses: {}, parameters: {}, examples: {}, requestBodies: {}, headers: {}, links: {}, callbacks: {} },
        security: [],
        tags: [],
    };

    for (const api of discoveredApis) {
         console.log(`-> Merging API: ${api.id}`);
         
         // Use the original filename for the copy
         const originalFilename = path.basename(api.path);
         fs.copyFileSync(api.path, path.join(originalsPath, originalFilename));
         console.log(`   - Saved original file to dist/original/${originalFilename}`);

         // Bundle the spec from the original path for all other operations.
         const spec = await SwaggerParser.bundle(api.path);

         // Save the individually bundled API to the 'apis' directory.
         fs.writeFileSync(path.join(apisPath, `${api.id}.yaml`), yaml.dump(spec, { noRefs: true, lineWidth: -1 }), 'utf8');
         console.log(`   - Saved bundled API to dist/apis/${api.id}.yaml`);
         
         const prefix = api.id;
         masterSpec.tags.push({ name: prefix, description: spec.info.title });
         let specString = JSON.stringify(spec);
         if (spec.components) {
             for (const compType in spec.components) {
                 for (const compName in spec.components[compType]) {
                     const originalRef = `#/components/${compType}/${compName}`;
                     const newRef = `#/components/${compType}/${prefix}${compName}`;
                     specString = specString.replace(new RegExp(`"${originalRef}"`, 'g'), `"${newRef}"`);
                 }
             }
         }
         const updatedSpec = JSON.parse(specString);
         if (updatedSpec.paths) {
             for (const p in updatedSpec.paths) {
                 const newPath = `/${prefix.toLowerCase()}${p.replace(/\/$/, '')}`;
                 const pathItem = updatedSpec.paths[p];
                 for (const method in pathItem) {
                     const op = pathItem[method];
                     if (op && typeof op === 'object' && op.operationId) {
                        op.operationId = `${prefix}_${op.operationId}`;
                        op.tags = [prefix];
                        if (op.callbacks) {
                            for(const cbName in op.callbacks){
                                for(const cbPath in op.callbacks[cbName]){
                                    const cbOp = op.callbacks[cbName][cbPath];
                                    if(cbOp.post && cbOp.post.operationId){
                                        cbOp.post.operationId = `${prefix}_callback_${cbOp.post.operationId}`;
                                    }
                                }
                            }
                        }
                     }
                 }
                 masterSpec.paths[newPath] = pathItem;
             }
         }
         if (updatedSpec.components) {
             for (const compType in updatedSpec.components) {
                 if (!masterSpec.components[compType]) masterSpec.components[compType] = {};
                 for (const compName in updatedSpec.components[compType]) {
                     const newName = `${prefix}${compName}`;
                     masterSpec.components[compType][newName] = updatedSpec.components[compType][compName];
                 }
             }
         }
         if (updatedSpec.components && updatedSpec.components.securitySchemes) {
            Object.assign(masterSpec.components.securitySchemes, updatedSpec.components.securitySchemes);
        }
    }
    
    fs.writeFileSync(path.join(outputPath, 'camara-openapi.yaml'), yaml.dump(masterSpec, { noRefs: true, lineWidth: -1, quotingType: '"' }), 'utf8');
    console.log('\nMaster OpenAPI spec generated successfully!');
}

async function main() {
    try {
        const discoveredApis = await discoverApis();
        await mergeApiSpecs(discoveredApis);
    } catch (error) {
        console.error('\nA critical error occurred:', error);
        process.exit(1);
    } finally {
        if (fs.existsSync(TEMP_CLONE_DIR)) {
            fs.rmSync(TEMP_CLONE_DIR, { recursive: true, force: true });
        }
    }
}

main();

