# Rusker Travel Landing Page + Form

A premium, modern landing page with an interactive 5-step form for Rusker Travel, featuring smooth animations, Barcelona-inspired design, and webhook form submission.

## Features

- **Modern Design**: Clean, premium interface with Rusker Blue (#277396) as the primary color
- **Interactive Form**: 5-step form with smooth transitions and validation
- **Animations**: Framer Motion animations for scroll-triggered effects and interactions
- **Responsive**: Fully responsive design for mobile, tablet, and desktop
- **Webhook Integration**: Form submissions sent to configurable webhook URL

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the page.

### Build

```bash
npm run build
```

This creates a static export in the `out` directory.

## Configuration

### Webhook URL

Set the webhook URL for form submissions by creating a `.env.local` file:

```
NEXT_PUBLIC_WEBHOOK_URL=https://your-webhook-url.com/endpoint
```

## Project Structure

```
/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main landing page
│   └── globals.css         # Global styles and Tailwind
├── components/
│   ├── landing/            # Landing page sections
│   ├── form/               # Form components (5 steps)
│   └── ui/                 # Reusable UI components
├── lib/
│   ├── constants.ts        # Design system constants
│   ├── animations.ts       # Framer Motion animations
│   └── formUtils.ts        # Form utilities and validation
└── public/                 # Static assets
```

## Design System

- **Primary Color**: Rusker Blue (#277396)
- **Typography**: Inter (primary), Space Grotesk (fallback)
- **Spacing**: Generous padding (90-120px desktop, 60-80px mobile)
- **Border Radius**: 16-20px for cards, 12-16px for buttons
- **Shadows**: Soft shadows (0 4px 12px rgba(0,0,0,0.05))

## Form Steps

1. **Identity**: School/University or Company/Organization
2. **Experience Type**: Select one or more experience types
3. **Group Details**: Group size, dates, and duration
4. **Themes & Objectives**: Multi-select themes and objectives
5. **Budget & Contact**: Budget range and contact information

## Technologies

- Next.js 14+ (Static Export)
- TypeScript
- Tailwind CSS
- Framer Motion
- React Hook Form

