# Local Fonts Setup Guide

This directory contains the local font configuration for the VELORÉ project.

## Font Files Required

Your font files should be organized in subdirectories:

```
src/fonts/
├── fonts.ts
├── fonts-setup.md (this file)
├── inter/
│   ├── Inter-Regular.woff2
│   ├── Inter-Medium.woff2
│   ├── Inter-SemiBold.woff2
│   └── Inter-Bold.woff2
└── cormorant-garamond/
    ├── CormorantGaramond-Light.woff2
    ├── CormorantGaramond-LightItalic.woff2
    ├── CormorantGaramond-Regular.woff2
    ├── CormorantGaramond-Italic.woff2
    ├── CormorantGaramond-Medium.woff2
    ├── CormorantGaramond-MediumItalic.woff2
    ├── CormorantGaramond-SemiBold.woff2
    ├── CormorantGaramond-SemiBoldItalic.woff2
    ├── CormorantGaramond-Bold.woff2
    └── CormorantGaramond-BoldItalic.woff2
```

## How to Download Fonts

### Option 1: Using Google Fonts (Recommended for Initial Setup)

1. **Download Inter**:
   - Visit: https://fonts.google.com/download?family=Inter
   - Extract the ZIP file
   - Find the `.woff2` files in the `static` folder
   - Copy them to `apps/web/src/fonts/inter/`

2. **Download Cormorant Garamond**:
   - Visit: https://fonts.google.com/download?family=Cormorant%20Garamond
   - Extract the ZIP file
   - Find the `.woff2` files in the `static` folder
   - Copy them to `apps/web/src/fonts/cormorant-garamond/`

### Option 2: Using Google Fonts API Download

You can use this one-liner bash script to download and extract fonts:

```bash
#!/bin/bash
set -e

FONTS_DIR="apps/web/src/fonts"

# Create directories
mkdir -p "$FONTS_DIR/inter"
mkdir -p "$FONTS_DIR/cormorant-garamond"

# Download and extract Inter
echo "Downloading Inter font..."
cd "$FONTS_DIR/inter"
curl -s "https://fonts.google.com/download?family=Inter" -o inter.zip
unzip -o inter.zip "static/*woff2" -d .
find . -name "*.woff2" -exec basename {} \; | while read f; do
  [ -f "static/$f" ] && mv "static/$f" "$f"
done
rm -rf static inter.zip
cd - > /dev/null

# Download and extract Cormorant Garamond
echo "Downloading Cormorant Garamond font..."
cd "$FONTS_DIR/cormorant-garamond"
curl -s "https://fonts.google.com/download?family=Cormorant%20Garamond" -o cormorant.zip
unzip -o cormorant.zip "static/*woff2" -d .
find . -name "*.woff2" -exec basename {} \; | while read f; do
  [ -f "static/$f" ] && mv "static/$f" "$f"
done
rm -rf static cormorant.zip
cd - > /dev/null

echo "✓ Fonts downloaded successfully!"
```

Save this as `scripts/download-fonts.sh` and run:
```bash
bash scripts/download-fonts.sh
```

## What These Fonts Are Used For

### Inter (Sans-serif)
- **CSS Variable**: `--font-inter`
- **Tailwind**: `font-sans`
- **Usage**: Body text, UI elements, form inputs
- **Weights**: 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)

### Cormorant Garamond (Serif)
- **CSS Variable**: `--font-cormorant`
- **Tailwind**: `font-serif`, `font-display`
- **Usage**: Headings, elegant display text
- **Weights**: 300 (Light), 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)
- **Styles**: Normal + Italic variants for all weights

## Configuration Reference

### fonts.ts
- Defines both font configurations using `next/font/local`
- Exports: `inter`, `cormorantGaramond`
- Configured with `display: 'swap'` for optimal performance
- Uses CSS variables for Tailwind integration

### layout.tsx
- Imports both fonts from `@/src/fonts/fonts`
- Applies CSS variables to the `<html>` element
- Variables available globally throughout the app

### tailwind.config.ts
- `font-serif`: Uses Cormorant Garamond (serif fallbacks)
- `font-sans`: Uses Inter (system UI fallback)
- `font-display`: Uses Cormorant Garamond for display text

## Production Considerations

✅ **Docker Compatible**: Font files are bundled in the Next.js standalone output
✅ **No Network Calls**: All fonts are local, no Google Fonts API calls during build
✅ **Static Optimization**: Fonts are preloaded with `preload: true`
✅ **Fast Swaps**: `display: 'swap'` ensures text is visible while fonts load
✅ **Monorepo Ready**: Works seamlessly with Turborepo builds
✅ **Standalone Output**: Fonts are included in the standalone build directory

## Troubleshooting

### "Can't find font file" Error
- Ensure all `.woff2` files are in the correct subdirectories
- Check file names match exactly (case-sensitive on Linux)
- Verify paths in `fonts.ts` match your directory structure

### Docker Build Issues
- Font files are automatically copied to the Docker image via Next.js build
- No additional COPY commands needed in Dockerfile
- The standalone output includes all necessary fonts

### Missing Italic Variants
- Ensure italic variants are downloaded and placed in the correct directories
- Check `fonts.ts` has matching paths for each style variant

## CSS Variables in Your App

After setup, you can use these CSS variables in your components:

```css
body {
  font-family: var(--font-inter);
}

h1, h2, h3 {
  font-family: var(--font-cormorant);
}
```

Or use Tailwind classes:
```jsx
<p className="font-sans">Body text</p>
<h1 className="font-serif">Heading</h1>
```
