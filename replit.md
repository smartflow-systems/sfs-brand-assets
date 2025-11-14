# Email Signature & QR Code Generator

## Overview
A Next.js 14 web application for generating professional email signatures with embedded QR codes. Users can customize their contact information, choose from multiple templates, and generate vCard QR codes for easy contact sharing.

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Libraries**:
  - qrcode: QR code generation
  - html2canvas: Signature export as image
  - Prisma: Database ORM (prepared for future use)

## Features (MVP)
- Interactive email signature builder with live preview
- Customizable fields (name, title, company, contact info, social links)
- QR code generation for contact details (vCard format)
- Three professional signature templates (Modern, Classic, Minimal)
- Customizable color schemes
- Copy-to-clipboard functionality
- QR code download in PNG and SVG formats
- Signature download as image
- Responsive design

## Project Structure
```
/
├── app/
│   ├── api/qrcode/     # QR code generation API endpoint
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Main page component
├── components/
│   ├── SignatureForm.tsx    # Form for user input
│   └── SignaturePreview.tsx # Live signature preview
├── types/
│   └── signature.ts    # TypeScript interfaces
└── utils/
    └── vcard.ts        # vCard generation utility
```

## Development
- Run on port 5000
- Dev server: `npm run dev`
- Build: `npm run build`

## Recent Changes (November 14, 2025)
- Initial project setup with Next.js 14
- Implemented signature form with all contact fields
- Created three signature templates (Modern, Classic, Minimal)
- Added QR code generation API using qrcode library
- Implemented vCard generation for contact details
- Added copy-to-clipboard and download functionality
- Styled with Tailwind CSS for responsive design

## Future Enhancements
- User accounts to save and manage multiple signatures
- Signature version history and templates library
- Team/organization features for brand consistency
- Bulk signature generation for teams
- Analytics tracking for QR code scans
