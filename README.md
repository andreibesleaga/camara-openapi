# camara-openapi
[Unofficial] The Linux Foundation Projects - CAMARA [Telco Global API Alliance] - Unified OpenAPI

This repository aggregates all CAMARA OpenAPI specs into a single file, trying by script and github actions to get remote individual OpenAPI specs for all the stable APIs: https://camaraproject.org/api-overview/

The merged OpenAPI spec is available in `dist/camara-openapi.yaml` and is automatically regenerated when any of the individual specs change.


CAMARA API Aggregator
This project automatically discovers, fetches, merges, and validates all mature and stable OpenAPI specifications from the CAMARA Project into a single, unified OpenAPI file.

How It Works 
This repository uses a Node.js script that connects to the GitHub API to dynamically discover the latest API definition files that will be asemblied into one final.

