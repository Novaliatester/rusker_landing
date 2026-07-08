# Guide d'optimisation des images

## Images à compresser en priorité

### Images critiques (>1MB)
1. `french-tech-networking.jpg` - **27MB** → Objectif: <500KB
2. `Communaute FR.png` - **5.7MB** → Objectif: <200KB (convertir en WebP)
3. `Cadre de VIE BCN.png` - **4.8MB** → Objectif: <200KB (convertir en WebP)
4. `ai-summit-keynote.jpg` - **4.7MB** → Objectif: <500KB
5. `barcelona-placa-espanya.jpg` - **4.0MB** → Objectif: <500KB
6. `shoptalk-presentation.jpg` - **3.1MB** → Objectif: <500KB
7. `barcelona-skyline-sagrada.jpg` - **1.5MB** → Objectif: <500KB
8. `rusker-travel-events-network-0201.jpg` - **1.3MB** → Objectif: <500KB
9. `accueil-une-energie-creative-unique-0201.jpg` - **1.0MB** → Objectif: <500KB
10. `accueil-rusker-travel-background-0201.jpg` - **1.0MB** → Objectif: <500KB

## Outils recommandés

### Option 1 : Squoosh (en ligne, gratuit)
1. Aller sur https://squoosh.app/
2. Glisser-déposer l'image
3. Pour JPG : Qualité 75-85, MozJPEG
4. Pour PNG : Convertir en WebP, Qualité 80-90
5. Télécharger et remplacer le fichier original

### Option 2 : ImageOptim (Mac, gratuit)
1. Télécharger depuis https://imageoptim.com/mac
2. Glisser-déposer les images
3. L'application compresse automatiquement
4. Sauvegarder les fichiers optimisés

### Option 3 : Sharp (CLI, pour développeurs)
```bash
npm install -g sharp-cli
sharp -i input.jpg -o output.jpg --quality 80
```

### Option 4 : Cloudinary (automatique)
Si vous utilisez Cloudinary pour les images :
- Les images sont automatiquement optimisées
- Format WebP automatique
- Responsive images automatiques

## Paramètres recommandés

### Pour les photos (JPG)
- Qualité : 75-85
- Format : JPEG (ou WebP si supporté)
- Compression : MozJPEG ou libjpeg-turbo

### Pour les graphiques (PNG)
- Convertir en WebP
- Qualité : 80-90
- Format : WebP avec transparence si nécessaire

### Pour les logos
- Format : SVG si possible
- Sinon : WebP avec qualité 90-95
- Taille maximale : 200KB

## Vérification après compression

```bash
# Vérifier la taille des fichiers
find public/images -type f -name "*.jpg" -o -name "*.png" | xargs ls -lh | sort -k5 -hr | head -20
```

## Remplacement dans le code

Après compression, remplacer les fichiers dans `public/images/` et vérifier que tout fonctionne correctement.


