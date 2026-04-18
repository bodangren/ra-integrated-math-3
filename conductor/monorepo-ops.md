# Monorepo Operations Quick Reference

> Convex operational commands and environment variables for each app in the monorepo.

## App Paths

| App | Path |
|-----|------|
| Integrated Math 3 | `apps/integrated-math-3/` |
| Business Math 2 | `apps/bus-math-v2/` |

## Convex Commands by App

### Integrated Math 3 (IM3)

```bash
# Navigate to app directory
cd apps/integrated-math-3

# Local development (starts Convex dev server + frontend)
npm run dev
# Or use the dev stack script
npm run dev:stack

# Generate Convex types (runs automatically during dev)
npx convex dev

# Deploy to Convex production
npx convex deploy

# Run seed functions
npx convex run seed.ts
```

### Business Math 2 (BM2)

```bash
# Navigate to app directory
cd apps/bus-math-v2

# Local development (includes workbook manifest pre-generation)
npm run dev

# Generate Convex types
npx convex dev

# Deploy to Convex production
npx convex deploy

# Run seed functions
npx convex run seed.ts
```

## Required Environment Variables

### Integrated Math 3

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_CONVEX_URL` | Yes | Convex deployment URL (set in wrangler.jsonc) |
| `CONVEX_DEPLOY_KEY` | For deploy | Deploy key for `convex deploy` |
| `AUTH_JWT_SECRET` | For auth | JWT signing secret |
| `CLOUDFLARE_API_TOKEN` | For CI/CD | Cloudflare Workers AI edit permissions |
| `CLOUDFLARE_ACCOUNT_ID` | For CI/CD | Cloudflare account identifier |

### Business Math 2

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_CONVEX_URL` | Yes | Convex deployment URL (set in wrangler.jsonc) |
| `CONVEX_DEPLOY_KEY` | For deploy | Deploy key for `convex deploy` |
| `AUTH_JWT_SECRET` | For auth | JWT signing secret |

## Preflight Directory Check

Before running Convex commands, verify you are in the correct app directory:

```bash
# Check current directory
pwd

# Verify app structure exists
ls apps/integrated-math-3/convex    # Should show convex/ directory
ls apps/bus-math-v2/convex           # Should show convex/ directory
```

### Quick Check Script

Run this before Convex operations to verify correct directory:

```bash
# For IM3
if [ ! -d "apps/integrated-math-3/convex" ]; then
  echo "ERROR: Not in monorepo root or IM3 app not found"
  echo "Run: cd /path/to/monorepo && cd apps/integrated-math-3"
  exit 1
fi

# For BM2
if [ ! -d "apps/bus-math-v2/convex" ]; then
  echo "ERROR: Not in monorepo root or BM2 app not found"
  echo "Run: cd /path/to/monorepo && cd apps/bus-math-v2"
  exit 1
fi
```

## Convex Type Generation

Both apps auto-generate types during `npx convex dev`. The generated files are:

- `convex/_generated/api.d.ts` - Public API types
- `convex/_generated/server.d.ts` - Server-side types
- `convex/_generated/dataModel.d.ts` - Data model types

**Important**: Do not edit files in `convex/_generated/`. They are regenerated on each `convex dev` or `convex deploy`.

## Cloudflare Deployment

### IM3 Deploy

```bash
cd apps/integrated-math-3
npm ci
npm run build
wrangler deploy --config wrangler.jsonc
```

### BM2 Deploy

```bash
cd apps/bus-math-v2
npm ci
npm run build
wrangler deploy --config wrangler.jsonc
```

## Troubleshooting

### Port Already in Use

Convex dev server uses port 3210 by default. If port is in use:

```bash
# Find and kill process using port 3210
lsof -ti:3210 | xargs kill -9
```

### Type Generation Issues

If types are stale after schema changes:

```bash
cd apps/integrated-math-3  # or apps/bus-math-v2
rm -rf convex/_generated
npx convex dev
```

### Auth Errors

If encountering auth errors during deploy:

1. Verify `CONVEX_DEPLOY_KEY` is set in environment
2. Verify `AUTH_JWT_SECRET` matches production secret
3. Check Convex dashboard for deployment status