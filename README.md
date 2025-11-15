# SFS Brand Assets

Centralized brand asset management system for logos, images, and design resources across the SmartFlow Systems ecosystem.

## Overview

SFS Brand Assets provides a centralized repository for managing brand assets including logos, images, design files, and marketing materials with version control and CDN integration.

## Features

- Cloud-based asset storage (AWS S3)
- CDN integration for fast delivery
- Image optimization and transformation
- Version control for assets
- Tag-based organization
- Search and filtering
- Access control and permissions
- Automatic thumbnail generation
- Multi-format support (PNG, JPEG, SVG, WebP)

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **Storage**: AWS S3
- **CDN**: CloudFront
- **UI**: shadcn/ui, Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- AWS account with S3 bucket

### Installation

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Configure AWS credentials and database

# Start development server
npm run dev
```

## Usage

### Uploading Assets

```typescript
import { uploadAsset } from './lib/api';

const file = document.querySelector('input[type="file"]').files[0];
const asset = await uploadAsset(file, {
  tags: ['logo', 'primary'],
  category: 'branding'
});
```

### Retrieving Assets

All assets are available via CDN with automatic optimization:

```
https://cdn.smartflowsystems.com/assets/{asset-id}.{format}
```

## SmartFlow Design System

Built with the SFS design system featuring:
- Clean, professional interface
- SFS Blue branding
- Drag-and-drop upload
- Grid and list views
- Advanced filtering

## Development

```bash
npm run dev        # Start dev server
npm run build      # Build for production
npm run preview    # Preview production build
npm test           # Run tests
```

## License

Proprietary - SmartFlow Systems
