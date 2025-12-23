# Configuration Cloudinary pour les vidéos

## ✅ Network Hero Video - Configuré

L'URL Cloudinary pour la vidéo Network Hero est déjà configurée :
- **Public ID**: `network-hero-video_dtowsx`
- **URL**: `https://res.cloudinary.com/dubdg6qf6/video/upload/q_auto,f_auto/network-hero-video_dtowsx.mp4`

## 📋 Pour obtenir les URLs des autres vidéos

### Méthode 1 : Via le Dashboard Cloudinary

1. Connectez-vous à [cloudinary.com](https://cloudinary.com)
2. Allez dans **Media Library**
3. Cliquez sur votre vidéo
4. Dans les détails, vous verrez le **Public ID**
5. L'URL directe suit ce format :
   ```
   https://res.cloudinary.com/dubdg6qf6/video/upload/{public_id}.mp4
   ```

### Méthode 2 : Via le lien Player Embed

Si vous avez un lien comme celui-ci :
```
https://player.cloudinary.com/embed/?cloud_name=dubdg6qf6&public_id=network-hero-video_dtowsx&profile=cld-default
```

L'URL directe pour la balise `<video>` est :
```
https://res.cloudinary.com/dubdg6qf6/video/upload/network-hero-video_dtowsx.mp4
```

### Méthode 3 : Avec optimisations automatiques

Pour une meilleure performance, utilisez cette URL avec optimisations :
```
https://res.cloudinary.com/dubdg6qf6/video/upload/q_auto,f_auto/{public_id}.mp4
```

Où :
- `q_auto` = qualité automatique optimisée
- `f_auto` = format automatique (WebM si supporté, sinon MP4)

## 🔧 Mise à jour de la configuration

Une fois que vous avez les Public IDs des autres vidéos, mettez à jour `lib/videoConfig.ts` :

```typescript
export const VIDEO_CONFIG = {
  landing: {
    url: getCloudinaryVideoUrl('VOTRE_PUBLIC_ID_ICI', { quality: 'auto', format: 'auto' }),
    // ...
  },
  travel: {
    url: getCloudinaryVideoUrl('VOTRE_PUBLIC_ID_ICI', { quality: 'auto', format: 'auto' }),
    // ...
  },
  events: {
    url: getCloudinaryVideoUrl('VOTRE_PUBLIC_ID_ICI', { quality: 'auto', format: 'auto' }),
    // ...
  },
  // network est déjà configuré ✅
}
```

## 📝 Vidéos à configurer

- [ ] **Landing Hero** (`Hero.tsx`)
  - Public ID: `_________________`
  - Fichier local: `Hero Barcelona Video 1 4K (1).mp4`

- [ ] **Travel Hero** (`TravelHero.tsx`)
  - Public ID: `_________________`
  - Fichier local: `hero-video.mp4`

- [ ] **Events Hero** (`EventsHero.tsx`)
  - Public ID: `_________________`
  - Fichier local: `events-hero-video.mp4`

- [x] **Network Hero** (`NetworkHero.tsx`) ✅
  - Public ID: `network-hero-video_dtowsx`
  - URL: Configurée

## 🚀 Avantages

Une fois toutes les vidéos configurées :
- ✅ Pas de consommation de bande passante Vercel
- ✅ Chargement plus rapide grâce au CDN global
- ✅ Optimisation automatique des vidéos
- ✅ Fallback automatique vers les vidéos locales si Cloudinary échoue
- ✅ Image poster affichée immédiatement pour une expérience fluide

