# camara-openapi

The Linux Foundation Project - CAMARA (Telco Global API Alliance) [Unofficial]

Auto SDK generated libraries and MCP SDK, based on this CAMARA OpenAPI specs from https://github.com/andreibesleaga/camara-sdk.

# CAMARA Unified OpenAPI

This repository aggregates all CAMARA OpenAPI specs API repos files, into a single file, trying by script and github actions to get remote individual OpenAPI specs for all the stable APIs, on a weekly basis: https://camaraproject.org/api-overview/

The original files, sections APIs, and final merged Full OpenAPI yaml spec are  available in [`dist/camara-openapi.yaml`](https://github.com/andreibesleaga/camara-openapi/blob/main/dist/camara-openapi.yaml) and is automatically regenerated when any of the individual specs change.

CAMARA API Aggregator
This project should automatically discover, fetch, merge, and validate all mature and stable OpenAPI specifications from the CAMARA Project into a single, unified OpenAPI file.

How It Works 
This repository uses a Node.js script that connects to the GitHub to dynamically discover the latest API definition files that will be asemblied into one final.
`scripts/api-repositories.js` contains the APIs, and `scripts/discover-and-merge.js` parses them into what will be available in the `dist` directory.
`.github/workflows/build-spec.yml` does the CI/CD actions needed for fetching and compiling and commiting them to final `dist`.
