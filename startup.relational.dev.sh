#!/usr/bin/env bash
set -e

./wait-for-it.sh database:5432
npm run migration:run 
npm run start:dev
