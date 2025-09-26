# camara-openapi
[Unofficial] The Linux Foundation Projects - CAMARA [Telco Global API Alliance] - Unified OpenAPI

This repository aggregates all CAMARA OpenAPI specs into a single file, trying by script and github actions to get remote individual OpenAPI specs for all the stable APIs: https://camaraproject.org/api-overview/

The merged OpenAPI spec is available in `dist/camara-openapi.yaml` and is automatically regenerated when any of the individual specs change.


CAMARA API Aggregator
This project automatically discovers, fetches, merges, and validates all mature and stable OpenAPI specifications from the CAMARA Project into a single, unified OpenAPI file.

How It Works (Fully Dynamic)
This repository uses a Node.js script that connects to the GitHub API to dynamically discover the latest API definition files. It no longer relies on a static list of URLs.

The process, automated via GitHub Actions, is as follows:

Discover: The script queries the CAMARA GitHub organization for all repositories.

Find: For each repository, it searches standard locations (code/api-definitions, dev/api-definitions) for OpenAPI YAML files.

Select: If multiple versioned files are found (e.g., qod-v0.7.0.yaml, qod-v0.8.0.yaml), it intelligently selects the latest version.

Merge & Prefix: The script downloads all discovered files, prefixes their paths and components to prevent conflicts, and merges them into a single master spec.

Validate: The final spec is validated using Redocly CLI to ensure compliance.

Commit: The resulting dist/camara-openapi.yaml file is automatically committed back to this repository.

This dynamic approach ensures the final spec is always up-to-date with the latest changes from the CAMARA project without requiring manual URL updates.

Final Output
The final, unified specification is located at:

dist/camara-openapi.yaml

This file is updated automatically on every push to the main branch and on a weekly schedule.
