export interface SignatureData {
  fullName: string;
  jobTitle: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  linkedIn?: string;
  twitter?: string;
  primaryColor: string;
  template: 'modern' | 'classic' | 'minimal';
}

export interface QRCodeOptions {
  format: 'png' | 'svg';
  size: number;
}
