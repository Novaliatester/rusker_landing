#!/bin/bash
set -e

echo "Building..."
npm run build

echo "Switching to gh-pages..."
git checkout gh-pages

echo "Cleaning gh-pages (preserving .git)..."
find . -mindepth 1 -maxdepth 1 ! -name '.git' ! -name 'out' -exec rm -rf {} + 2>/dev/null || true

echo "Copying built files..."
if [ -d "out" ]; then
  cp -r out/* .
  rm -rf out
elif git show main:out/index.html > /dev/null 2>&1; then
  git checkout main -- out
  cp -r out/* .
  rm -rf out
else
  echo "Error: out directory not found!"
  exit 1
fi

echo "Verifying deployment..."
if [ ! -f "index.html" ] || [ ! -d "images" ]; then
  echo "Error: index.html or images folder missing!"
  exit 1
fi

echo "Committing and pushing..."
git add .
git commit -m "Deploy latest build with images" || echo "No changes to commit"
git push origin gh-pages

echo "Switching back to main..."
git checkout main

echo "✓ Deployment complete!"

