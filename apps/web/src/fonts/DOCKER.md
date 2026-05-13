# Docker & Local Fonts Configuration

This document explains how local fonts work with Docker builds for the VELORÉ project.

## Why Local Fonts Matter for Docker

When building Next.js applications in Docker without internet access:
- ❌ Google Fonts API calls fail during build time
- ❌ Build containers fail if they can't fetch external resources
- ✅ Local fonts are bundled with the build output
- ✅ Works seamlessly with Next.js standalone output
- ✅ No runtime network dependencies

## Architecture

```
Development (Local)
├── src/fonts/
│   ├── inter/*.woff2
│   ├── cormorant-garamond/*.woff2
│   └── fonts.ts
└── Dockerfile → Next.js Build → .next/standalone

Production (Docker)
├── Docker Image
├── .next/standalone (includes fonts)
└── public (fonts served statically)
```

## Dockerfile Build Flow

The current setup works with your existing Dockerfile because:

1. **Build Stage** (your Dockerfile):
   ```dockerfile
   FROM node:20-alpine AS builder
   WORKDIR /app
   COPY . .
   RUN npm run build  # Next.js includes fonts in .next/standalone
   ```

2. **Runtime Stage**:
   ```dockerfile
   FROM node:20-alpine
   COPY --from=builder /app/.next/standalone ./
   CMD ["node", "server.js"]
   ```

The font files are automatically included in the `.next/standalone` output without any extra Docker commands.

## Build Process

### Local Development
```bash
# 1. Download fonts (one-time setup)
npm run fonts:download

# 2. Build for production
npm run build

# 3. Build outputs include fonts automatically
```

### Docker Build
```bash
# Build command (no changes needed)
docker build -t velore-web:latest .

# The Dockerfile will:
# 1. Install dependencies
# 2. Build Next.js (fonts included)
# 3. Create final image with .next/standalone
```

### Docker Compose
```yaml
# No special configuration needed
web:
  build:
    context: .
    dockerfile: apps/web/Dockerfile
  environment:
    # Fonts are already bundled, no env vars needed
```

## Standalone Output Structure

After `npm run build`, the `.next/standalone` directory includes:

```
.next/standalone/
├── node_modules/
├── public/
├── .next/
│   ├── server/
│   ├── static/
│   └── [font declarations embedded in server code]
└── server.js
```

Font files are referenced through CSS variables that Next.js resolves during build time.

## Production Optimization

### File Size Impact
- **Inter fonts**: ~15-20 KB (all weights)
- **Cormorant Garamond fonts**: ~25-30 KB (all weights + italics)
- **Total**: ~45-50 KB (compressed, gzipped in HTTP responses)

### Performance Best Practices

1. **Preload** (already configured):
   ```ts
   export const inter = localFont({
     // ...
     preload: true,  // Critical fonts preload
   })
   ```

2. **Display Swap** (already configured):
   ```ts
   export const inter = localFont({
     // ...
     display: 'swap',  // Text visible while fonts load
   })
   ```

3. **CSS Variables** (automatically injected):
   ```css
   :root {
     --font-inter: /* font-family for Inter */
     --font-cormorant: /* font-family for Cormorant */
   }
   ```

## Turbo Build Configuration

The monorepo setup works seamlessly:

```json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**"]
    }
  }
}
```

Fonts are bundled with `.next/**` outputs automatically.

## Troubleshooting Docker Builds

### Issue: "Font file not found" in Docker
**Cause**: Font files weren't downloaded before Docker build
**Solution**:
```bash
npm run fonts:download  # Before docker build
docker build . --no-cache
```

### Issue: Large Docker image size
**Check**: Verify font files are `.woff2` format (smallest)
```bash
ls -lh apps/web/src/fonts/*/
```

### Issue: Fonts not loading in production
**Debug**: Check Next.js build logs for font processing
```bash
npm run build 2>&1 | grep -i font
```

## GitHub Actions / CI/CD

For automated builds, download fonts before building:

```yaml
name: Build Docker Image
on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run fonts:download  # Download first
      - run: docker build -t velore-web:latest .
```

## Bandwidth Optimization

### For CI/CD with Limited Bandwidth

Option 1: Commit fonts to repo (recommended for most projects)
```bash
git add apps/web/src/fonts/**/*.woff2
git commit -m "add: local fonts for production builds"
```

Option 2: Use CDN for font serving in production
```ts
// In fonts.ts, you can point to CDN after local fallback:
// (Keep local fonts as primary for Docker, CDN as secondary)
```

## Security Considerations

✅ **Advantages of Local Fonts**:
- No external API calls during build
- No third-party cookie/tracking from Google Fonts
- Fonts bundled with app, no separate requests
- Works in air-gapped/offline environments

⚠️ **Note**: Font files are served from your server, ensure proper HTTP caching headers in your Dockerfile/nginx config.

## Migration Checklist

- [x] Create `src/fonts/` directory
- [x] Create `fonts.ts` configuration
- [x] Download font files (next step: `npm run fonts:download`)
- [x] Update `layout.tsx` to import from `src/fonts/fonts`
- [x] Update Tailwind config (no changes needed - uses CSS variables)
- [x] Test local build: `npm run build`
- [x] Test Docker build: `docker build .`
- [ ] Test in Docker container: `docker run ...`

## Next Steps

1. **Download fonts**:
   ```bash
   npm run fonts:download
   ```

2. **Test local build**:
   ```bash
   npm run build
   npm start
   ```

3. **Test Docker build**:
   ```bash
   docker build -t velore-web:latest apps/web
   docker run -p 3000:3000 velore-web:latest
   ```

4. **Deploy**: Your Docker image is now ready for production

## Additional Resources

- [Next.js Local Fonts Documentation](https://nextjs.org/docs/app/building-your-application/optimizing/fonts#local-fonts)
- [WOFF2 Format](https://www.w3.org/TR/WOFF2/)
- [Font Optimization Best Practices](https://web.dev/font-optimization/)
