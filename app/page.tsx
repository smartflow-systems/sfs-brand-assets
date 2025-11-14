'use client';

import { useState, useEffect, useRef } from 'react';
import SignatureForm from '@/components/SignatureForm';
import SignaturePreview from '@/components/SignaturePreview';
import { SignatureData } from '@/types/signature';
import { generateVCard } from '@/utils/vcard';
import html2canvas from 'html2canvas';

export default function Home() {
  const [signatureData, setSignatureData] = useState<SignatureData>({
    fullName: '',
    jobTitle: '',
    company: '',
    email: '',
    phone: '',
    website: '',
    address: '',
    linkedIn: '',
    twitter: '',
    primaryColor: '#3b82f6',
    template: 'modern',
  });

  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState<string>('');
  const [downloadFormat, setDownloadFormat] = useState<'png' | 'svg'>('png');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const isFormValid = (): boolean => {
    if (!signatureData.fullName) return false;
    if (!signatureData.jobTitle) return false;
    if (!signatureData.company) return false;
    if (!signatureData.email) return false;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signatureData.email)) return false;
    
    return true;
  };

  const validateForm = (): boolean => {
    const errors: string[] = [];
    
    if (!signatureData.fullName) errors.push('Full Name is required');
    if (!signatureData.jobTitle) errors.push('Job Title is required');
    if (!signatureData.company) errors.push('Company is required');
    if (!signatureData.email) {
      errors.push('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signatureData.email)) {
      errors.push('Please enter a valid email address');
    }
    
    setValidationErrors(errors);
    return errors.length === 0;
  };

  useEffect(() => {
    if (isFormValid()) {
      generateQRCode();
      if (validationErrors.length > 0) {
        setValidationErrors([]);
      }
    }
  }, [signatureData]);

  const generateQRCode = async () => {
    try {
      const vcard = generateVCard(signatureData);
      const response = await fetch('/api/qrcode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: vcard,
          format: 'png',
          size: 200,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setQrCodeUrl(data.dataUrl);
      }
    } catch (error) {
      console.error('Failed to generate QR code:', error);
    }
  };

  const copySignatureToClipboard = async () => {
    if (!validateForm()) {
      setCopyStatus('Please fill in all required fields');
      setTimeout(() => setCopyStatus(''), 3000);
      return;
    }

    const previewElement = document.getElementById('signature-preview');
    if (!previewElement) return;

    try {
      const htmlContent = previewElement.innerHTML;
      
      await navigator.clipboard.write([
        new ClipboardItem({
          'text/html': new Blob([htmlContent], { type: 'text/html' }),
          'text/plain': new Blob([previewElement.innerText], { type: 'text/plain' }),
        }),
      ]);

      setCopyStatus('Signature copied to clipboard!');
      setTimeout(() => setCopyStatus(''), 3000);
    } catch (error) {
      console.error('Failed to copy:', error);
      setCopyStatus('Failed to copy signature');
      setTimeout(() => setCopyStatus(''), 3000);
    }
  };

  const downloadQRCode = async () => {
    if (!validateForm()) return;
    if (!qrCodeUrl) return;

    if (downloadFormat === 'svg') {
      try {
        const vcard = generateVCard(signatureData);
        const response = await fetch('/api/qrcode', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: vcard,
            format: 'svg',
            size: 400,
          }),
        });

        if (response.ok) {
          const svgBlob = await response.blob();
          const url = URL.createObjectURL(svgBlob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'qrcode.svg';
          link.click();
          URL.revokeObjectURL(url);
        }
      } catch (error) {
        console.error('Failed to download SVG:', error);
      }
    } else {
      const link = document.createElement('a');
      link.href = qrCodeUrl;
      link.download = 'qrcode.png';
      link.click();
    }
  };

  const downloadSignatureAsImage = async () => {
    if (!validateForm()) return;
    
    const previewElement = document.getElementById('signature-preview');
    if (!previewElement) return;

    try {
      const canvas = await html2canvas(previewElement, {
        backgroundColor: '#ffffff',
        scale: 2,
      });

      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'email-signature.png';
          link.click();
          URL.revokeObjectURL(url);
        }
      });
    } catch (error) {
      console.error('Failed to download signature:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Email Signature & QR Code Generator
          </h1>
          <p className="text-lg text-gray-600">
            Create professional email signatures with embedded QR codes for easy contact sharing
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SignatureForm data={signatureData} onChange={setSignatureData} />
          
          <div className="space-y-6">
            <SignaturePreview data={signatureData} qrCodeUrl={qrCodeUrl} />
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Actions</h2>
              
              {validationErrors.length > 0 && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm font-medium text-red-800 mb-1">Please fix the following errors:</p>
                  <ul className="text-sm text-red-700 list-disc list-inside space-y-1">
                    {validationErrors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="space-y-4">
                <button
                  onClick={copySignatureToClipboard}
                  disabled={!isFormValid()}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-md"
                >
                  Copy Signature to Clipboard
                </button>

                {copyStatus && (
                  <div className={`text-center text-sm font-medium ${
                    copyStatus.includes('required') ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {copyStatus}
                  </div>
                )}

                <button
                  onClick={downloadSignatureAsImage}
                  disabled={!isFormValid()}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-md"
                >
                  Download Signature as Image
                </button>

                <div className="pt-4 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Download QR Code</h3>
                  
                  <div className="flex gap-2 mb-3">
                    <button
                      onClick={() => setDownloadFormat('png')}
                      className={`flex-1 py-2 px-4 rounded-lg font-medium transition duration-200 ${
                        downloadFormat === 'png'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      PNG
                    </button>
                    <button
                      onClick={() => setDownloadFormat('svg')}
                      className={`flex-1 py-2 px-4 rounded-lg font-medium transition duration-200 ${
                        downloadFormat === 'svg'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      SVG
                    </button>
                  </div>

                  <button
                    onClick={downloadQRCode}
                    disabled={!qrCodeUrl || !isFormValid()}
                    className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-md"
                  >
                    Download QR Code ({downloadFormat.toUpperCase()})
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-blue-900 mb-2">How to use:</h3>
              <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                <li>Fill in your contact information</li>
                <li>Choose a template and customize the color</li>
                <li>Copy the signature to your clipboard</li>
                <li>Paste it into your email client's signature settings</li>
                <li>Download the QR code to share your contact details easily</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
