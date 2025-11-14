import { SignatureData } from '@/types/signature';

export function generateVCard(data: SignatureData): string {
  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${data.fullName}`,
    `ORG:${data.company}`,
    `TITLE:${data.jobTitle}`,
    `EMAIL:${data.email}`,
  ];

  if (data.phone) {
    vcard.push(`TEL:${data.phone}`);
  }

  if (data.website) {
    vcard.push(`URL:${data.website}`);
  }

  if (data.address) {
    vcard.push(`ADR:;;${data.address};;;;`);
  }

  vcard.push('END:VCARD');

  return vcard.join('\n');
}
