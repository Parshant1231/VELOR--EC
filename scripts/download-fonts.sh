#!/bin/bash
set -e

FONTS_DIR="apps/web/src/fonts"

echo "📥 Downloading VELORÉ Local Fonts..."
echo "This script will download Inter and Cormorant Garamond from Google Fonts"
echo ""

# Create directories
mkdir -p "$FONTS_DIR/inter"
mkdir -p "$FONTS_DIR/cormorant-garamond"

# Download and extract Inter
echo "📥 Downloading Inter font..."
cd "$FONTS_DIR/inter"
curl -s -L "https://fonts.google.com/download?family=Inter" -o inter.zip
unzip -o inter.zip "static/*woff2" 2>/dev/null || unzip -o inter.zip "*.woff2" 2>/dev/null || true
if [ -d "static" ]; then
  find static -name "*.woff2" -exec mv {} . \;
  rm -rf static
fi
rm -f inter.zip
echo "✓ Inter fonts ready"
cd - > /dev/null

# Download and extract Cormorant Garamond
echo "📥 Downloading Cormorant Garamond font..."
cd "$FONTS_DIR/cormorant-garamond"
curl -s -L "https://fonts.google.com/download?family=Cormorant%20Garamond" -o cormorant.zip
unzip -o cormorant.zip "static/*woff2" 2>/dev/null || unzip -o cormorant.zip "*.woff2" 2>/dev/null || true
if [ -d "static" ]; then
  find static -name "*.woff2" -exec mv {} . \;
  rm -rf static
fi
rm -f cormorant.zip
echo "✓ Cormorant Garamond fonts ready"
cd - > /dev/null

echo ""
echo "✅ Font download complete!"
echo ""
echo "Verifying fonts..."
INTER_COUNT=$(find "$FONTS_DIR/inter" -name "*.woff2" | wc -l)
CORMORANT_COUNT=$(find "$FONTS_DIR/cormorant-garamond" -name "*.woff2" | wc -l)
echo "  • Inter: $INTER_COUNT .woff2 files"
echo "  • Cormorant Garamond: $CORMORANT_COUNT .woff2 files"
echo ""
echo "📝 Next steps:"
echo "  1. Run: npm run build (or pnpm build / yarn build)"
echo "  2. Your fonts are now production-ready!"
echo "  3. Docker builds will include fonts automatically"
echo ""
