#!/bin/bash
set -e
pnpm install --frozen-lockfile
# Only push DB schema if DATABASE_URL is set (requires a provisioned Postgres database)
if [ -n "$DATABASE_URL" ]; then
  pnpm --filter db push
fi
