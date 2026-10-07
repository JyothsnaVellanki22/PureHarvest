# PureHarvest Project Feature Documentation

This document outlines the key features, technical stack, and design principles implemented in the PureHarvest Agri-Tech Marketplace.

## 🚀 Technical Stack

- **Core Framework**: [Next.js](https://nextjs.org/) (App Router architecture)
- **Styling**: Vanilla CSS with [Tailwind CSS](https://tailwindcss.com/) for utility-first design.
- **Animations**: [Framer Motion](https://www.framer.com/motion/) for smooth, motion-centric UI transitions.
- **Icons**: [Lucide React](https://lucide.dev/) for consistent and lightweight iconography.
- **Images**: AI-generated premium assets and [Unsplash](https://unsplash.com/) for high-quality farm photography.

---

## 🎨 Design System & Aesthetics

PureHarvest utilizes a "Premium Organic" design language characterized by:

- **Color Palette**:
  - **Primary**: Forest Green (`#1A4D2E`) - Represents nature, growth, and sustainability.
  - **Secondary**: Cream/Beige (`#E8DFCA`) - Soft, warm background tones for readability.
  - **Accent**: Vibrant Orange (`#FF9F29`) - Used for CTAs and highlights to drive action.
- **Typography**: 
  - **Outfit**: Modern sans-serif for high-impact headings.
  - **Inter**: Clean, legible font for body text.
- **Visual Effects**:
  - **Glassmorphism**: Translucent, blurred backgrounds for navigation and overlays.
  - **Premium Shadows**: Subtle, multi-layered shadows for depth.
  - **Custom Gradients**: Soft color transitions to enhance visual hierarchy.

---

## 📄 Page Features

### 1. Home Page
- **High-Impact Hero**: A full-bleed cinematic section with a clear value proposition and dual CTAs.
- **Why PureHarvest**: An icon-driven grid explaining the unique benefits (Direct Sourcing, Traceable Quality, etc.).
- **Featured Farms**: A dynamic grid displaying curated local producers using `FarmCard` components.
- **Global CTA**: A large, gradient-styled section at the footer to drive user registration.

### 2. About Us Page
- **Mission-Focused Hero**: Utilizes high-resolution AI-generated farm imagery with balanced text overlays.
- **"Our Story" Narrative**: A detailed section explaining the origin and vision of the platform, paired with macro photography of fresh produce.
- **Interactive Values Grid**: Cards with hover states and icons explaining the core pillars (Sustainability, Transparency, Community).
- **Smooth Animations**: Section-by-section fade-ins and staggered entry for grid items using Framer Motion.

---

## 🛠️ Performance & UX Optimizations

- **Smooth Scrolling**: Implemented site-wide smooth scroll behavior for a more fluid navigation experience.
- **Hydration Resilience**: Configured `suppressHydrationWarning` on the root layout to prevent UI flicker and errors caused by browser extensions.
- **Image Optimization**: Fully configured `next/image` with remote patterns for Unsplash, ensuring fast loading times and responsive image delivery.
- **Responsive Layout**: Mobile-first design approach with a collapsible navigation menu and adaptive grids.

---

## 🔄 Future Roadmap Features (Pre-configured)
- **Browse Farms**: A search/filter interface for discovering new producers.
- **Farmer Portal**: A dedicated dashboard for producers to manage their harvests and subscriptions.
- **Harvest Plans**: A subscription-based model for recurring farm deliveries.
- **Direct Messaging**: A communication bridge between urban consumers and rural farmers.
