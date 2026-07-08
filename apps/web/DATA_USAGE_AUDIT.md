# Audit de consommation de données - Site Rusker

**Date**: Décembre 2024  
**Objectif**: Réduire la consommation de données lors du chargement du site

---

## 📊 Résumé exécutif

### Problèmes majeurs identifiés

1. **Vidéo Hero non optimisée** : La vidéo principale (`Hero Barcelona Video 1 4K (1).mp4`) est chargée immédiatement sans lazy loading
2. **Images très volumineuses** : Plusieurs images dépassent 1MB, certaines jusqu'à 27MB
3. **Utilisation de balises `<img>` au lieu de Next.js Image** : Perte des optimisations automatiques
4. **Pas de compression vidéo** : Vidéos non optimisées pour le web
5. **Chargement immédiat de toutes les ressources** : Pas de stratégie de chargement progressif

---

## 🔍 Analyse détaillée

### 1. Vidéos

#### Problème principal : Hero.tsx
- **Fichier**: `components/landing/Hero.tsx`
- **Problème**: La vidéo est chargée immédiatement sans lazy loading ni intersection observer
- **Impact**: ~50-200MB chargés immédiatement selon la qualité
- **Solution**: Implémenter lazy loading avec IntersectionObserver (comme dans TravelHero, EventsHero, NetworkHero)

#### Vidéos déjà optimisées ✅
- `TravelHero.tsx` : Utilise Cloudinary avec lazy loading
- `EventsHero.tsx` : Utilise Cloudinary avec lazy loading  
- `NetworkHero.tsx` : Utilise Cloudinary avec lazy loading

#### Recommandations vidéo
- [ ] Migrer Hero.tsx vers Cloudinary avec lazy loading
- [ ] Ajouter `preload="metadata"` au lieu de `preload="auto"`
- [ ] Utiliser des posters d'image pour réduire le chargement initial
- [ ] Implémenter la détection de connexion lente (Data Saver API)

### 2. Images volumineuses

#### Images critiques (>1MB)
| Fichier | Taille | Usage | Priorité |
|---------|--------|-------|----------|
| `french-tech-networking.jpg` | **27MB** | ⚠️ Critique | 🔴 Urgent |
| `Communaute FR.png` | **5.7MB** | ⚠️ Critique | 🔴 Urgent |
| `Cadre de VIE BCN.png` | **4.8MB** | ⚠️ Critique | 🔴 Urgent |
| `ai-summit-keynote.jpg` | **4.7MB** | ⚠️ Critique | 🔴 Urgent |
| `barcelona-placa-espanya.jpg` | **4.0MB** | ⚠️ Critique | 🔴 Urgent |
| `shoptalk-presentation.jpg` | **3.1MB** | ⚠️ Critique | 🔴 Urgent |
| `barcelona-skyline-sagrada.jpg` | **1.5MB** | ⚠️ Critique | 🟡 Important |
| `rusker-travel-events-network-0201.jpg` | **1.3MB** | ⚠️ Critique | 🟡 Important |
| `accueil-une-energie-creative-unique-0201.jpg` | **1.0MB** | ⚠️ Critique | 🟡 Important |
| `accueil-rusker-travel-background-0201.jpg` | **1.0MB** | ⚠️ Critique | 🟡 Important |

#### Recommandations images
- [ ] **Compresser toutes les images** > 500KB
- [ ] **Convertir PNG en WebP** pour les images non-photographiques
- [ ] **Utiliser Next.js Image** partout au lieu de `<img>`
- [ ] **Implémenter responsive images** avec `sizes` appropriés
- [ ] **Lazy loading** pour toutes les images below-the-fold
- [ ] **Utiliser Cloudinary** pour les images critiques (comme pour les vidéos)

### 3. Composants utilisant `<img>` au lieu de Next.js Image

#### Composants à corriger
1. **`components/landing/Hero.tsx`** (lignes 202, 205, 208)
   - Logos ESSEC, Next-U, Papernest
   - Impact: Faible mais perte d'optimisation

2. **`components/landing/WhyBarcelona.tsx`** (ligne 162)
   - Images de features
   - Impact: Moyen - images chargées immédiatement

3. **`components/travel/TravelTestimonial.tsx`** (lignes 35, 49)
   - Image de témoignage et logo ESSEC
   - Impact: Faible

4. **`components/travel/TravelAudienceSelector.tsx`** (ligne 91)
   - Images de background
   - Impact: Moyen - chargées au scroll

5. **`components/landing/SocialProof.tsx`** (ligne 123)
   - Logos partenaires
   - Impact: Faible - déjà lazy loading

#### Recommandations
- [ ] Remplacer tous les `<img>` par `next/image` Image
- [ ] Ajouter `sizes` appropriés pour chaque contexte
- [ ] Utiliser `priority` uniquement pour above-the-fold
- [ ] Implémenter `loading="lazy"` pour below-the-fold

### 4. Configuration Next.js

#### Points positifs ✅
- Compression activée (`compress: true`)
- Formats WebP configurés
- Cache TTL de 30 jours
- Device sizes configurés

#### Améliorations possibles
- [ ] Ajouter `experimental.optimizeCss: true` pour optimiser CSS
- [ ] Configurer `swcMinify: true` pour minification SWC
- [ ] Ajouter `productionBrowserSourceMaps: false` pour réduire la taille

### 5. Chargement progressif

#### Problèmes identifiés
- Hero vidéo chargée immédiatement
- Toutes les images de la page principale chargées en même temps
- Pas de détection de connexion lente

#### Recommandations
- [ ] Implémenter lazy loading pour Hero vidéo
- [ ] Utiliser `loading="lazy"` pour toutes les images below-the-fold
- [ ] Implémenter la détection de connexion lente (`navigator.connection`)
- [ ] Charger les images en basse qualité d'abord, puis améliorer

---

## 🎯 Plan d'action priorisé

### Phase 1 : Urgent (Impact immédiat)
1. **Compresser les images > 1MB**
   - `french-tech-networking.jpg` (27MB → <500KB)
   - `Communaute FR.png` (5.7MB → <200KB)
   - `Cadre de VIE BCN.png` (4.8MB → <200KB)
   - `ai-summit-keynote.jpg` (4.7MB → <500KB)
   - `barcelona-placa-espanya.jpg` (4.0MB → <500KB)

2. **Implémenter lazy loading pour Hero vidéo**
   - Migrer vers Cloudinary
   - Ajouter IntersectionObserver
   - Ajouter poster image

### Phase 2 : Important (Impact significatif)
3. **Remplacer `<img>` par Next.js Image**
   - `WhyBarcelona.tsx`
   - `TravelAudienceSelector.tsx`
   - Autres composants identifiés

4. **Optimiser les images restantes**
   - Compresser toutes les images > 500KB
   - Convertir PNG en WebP où approprié

### Phase 3 : Améliorations (Impact modéré)
5. **Détection de connexion lente**
   - Charger des versions réduites sur connexions lentes
   - Désactiver les vidéos sur connexions lentes

6. **Optimisations Next.js**
   - Activer les optimisations expérimentales
   - Configurer la minification SWC

---

## 📈 Estimation des gains

### Avant optimisation
- **Vidéo Hero**: ~50-200MB (selon qualité)
- **Images critiques**: ~50MB
- **Total page d'accueil**: ~100-250MB

### Après optimisation (estimé)
- **Vidéo Hero**: ~5-10MB (Cloudinary + lazy loading)
- **Images critiques**: ~5MB (compression + WebP)
- **Total page d'accueil**: ~10-15MB

### Réduction estimée: **85-90%** 🎉

---

## 🛠️ Outils recommandés

### Compression d'images
- **Squoosh** (https://squoosh.app/) - Compression en ligne
- **ImageOptim** (Mac) - Compression locale
- **Sharp** (CLI) - Compression par lot

### Compression vidéo
- **HandBrake** - Compression vidéo locale
- **Cloudinary** - Compression automatique (déjà utilisé)

### Analyse
- **Lighthouse** - Audit de performance
- **WebPageTest** - Analyse détaillée
- **Chrome DevTools** - Network tab pour analyser le chargement

---

## 📝 Notes techniques

### Cloudinary pour images
Si vous souhaitez utiliser Cloudinary pour les images (comme pour les vidéos), voici un exemple :

```typescript
function getCloudinaryImageUrl(publicId: string, options?: {
  width?: number
  quality?: 'auto' | number
  format?: 'auto' | 'webp' | 'jpg'
}): string {
  const baseUrl = `https://res.cloudinary.com/dubdg6qf6/image/upload`
  const transformations: string[] = []
  
  if (options?.width) transformations.push(`w_${options.width}`)
  if (options?.quality === 'auto') transformations.push('q_auto')
  else if (options?.quality) transformations.push(`q_${options.quality}`)
  if (options?.format === 'auto') transformations.push('f_auto')
  
  const transformString = transformations.length > 0 
    ? `${transformations.join(',')}/` 
    : ''
  
  return `${baseUrl}/${transformString}${publicId}`
}
```

### Lazy loading vidéo
Exemple d'implémentation (déjà présent dans TravelHero, EventsHero, NetworkHero) :

```typescript
const [shouldLoadVideo, setShouldLoadVideo] = useState(false)

useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !shouldLoadVideo) {
          setShouldLoadVideo(true)
          observer.disconnect()
        }
      })
    },
    { threshold: 0.1, rootMargin: '100px' }
  )
  
  if (heroRef.current) {
    observer.observe(heroRef.current)
  }
  
  return () => observer.disconnect()
}, [shouldLoadVideo])
```

---

## ✅ Checklist de mise en œuvre

### Images
- [ ] Compresser `french-tech-networking.jpg` (27MB → <500KB)
- [ ] Compresser `Communaute FR.png` (5.7MB → <200KB)
- [ ] Compresser `Cadre de VIE BCN.png` (4.8MB → <200KB)
- [ ] Compresser `ai-summit-keynote.jpg` (4.7MB → <500KB)
- [ ] Compresser `barcelona-placa-espanya.jpg` (4.0MB → <500KB)
- [ ] Compresser toutes les images > 1MB
- [ ] Convertir PNG en WebP où approprié
- [ ] Remplacer `<img>` par Next.js Image dans `WhyBarcelona.tsx`
- [ ] Remplacer `<img>` par Next.js Image dans `TravelAudienceSelector.tsx`
- [ ] Ajouter `sizes` appropriés à toutes les images

### Vidéos
- [ ] Migrer Hero.tsx vers Cloudinary
- [ ] Implémenter lazy loading pour Hero vidéo
- [ ] Ajouter poster image pour Hero vidéo
- [ ] Changer `preload="auto"` en `preload="metadata"`

### Configuration
- [ ] Activer `swcMinify: true` dans next.config.js
- [ ] Désactiver `productionBrowserSourceMaps` en production
- [ ] Implémenter détection de connexion lente

### Tests
- [ ] Tester avec Lighthouse (objectif: >90 Performance)
- [ ] Tester avec connexion lente (3G)
- [ ] Vérifier le chargement progressif
- [ ] Tester sur mobile

---

## 📚 Ressources

- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Web.dev Image Optimization](https://web.dev/fast/#optimize-your-images)
- [Cloudinary Video Transformations](https://cloudinary.com/documentation/video_transformation_reference)
- [Lazy Loading Images](https://web.dev/lazy-loading-images/)

---

**Dernière mise à jour**: Décembre 2024


