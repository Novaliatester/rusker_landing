#!/bin/bash
set -e

# Store the current branch
CURRENT_BRANCH=$(git branch --show-current)

echo "📦 Building on main branch..."
npm run build

echo "💾 Backing up build to temp..."
TEMP_DIR=$(mktemp -d)
cp -r out/* "$TEMP_DIR/"
echo "Build backed up to: $TEMP_DIR"

echo "🔄 Switching to gh-pages..."
git checkout gh-pages

echo "🧹 Cleaning gh-pages (preserving .git)..."
find . -mindepth 1 -maxdepth 1 ! -name '.git' -exec rm -rf {} + 2>/dev/null || true

echo "📋 Copying built files from backup..."
cp -r "$TEMP_DIR"/* .

echo "🗑️  Cleaning up temp..."
rm -rf "$TEMP_DIR"

echo "✅ Verifying deployment..."
if [ ! -f "index.html" ]; then
  echo "❌ Error: index.html missing!"
  exit 1
fi
if [ ! -d "images" ]; then
  echo "❌ Error: images folder missing!"
  exit 1
fi
if [ ! -f "images/hero-video.mp4" ]; then
  echo "❌ Error: hero-video.mp4 missing!"
  exit 1
fi

echo "📊 Deployment size:"
du -sh .

echo "💾 Committing and pushing..."
git add -A
git commit -m "Deploy latest build - $(date '+%Y-%m-%d %H:%M:%S')" || echo "No changes to commit"
git push origin gh-pages

echo "🔙 Switching back to $CURRENT_BRANCH..."
git checkout "$CURRENT_BRANCH"

echo "✓ Deployment complete!"
echo "🌐 Your site should be live at: https://novaliatester.github.io/rusker_landing/"

