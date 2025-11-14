'use client';

import { SignatureData } from '@/types/signature';
import { useEffect, useState } from 'react';

interface SignaturePreviewProps {
  data: SignatureData;
  qrCodeUrl: string | null;
}

export default function SignaturePreview({ data, qrCodeUrl }: SignaturePreviewProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const renderModernTemplate = () => (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px' }}>
      <table cellPadding="0" cellSpacing="0" style={{ borderCollapse: 'collapse' }}>
        <tbody>
          <tr>
            <td style={{ paddingRight: '20px', verticalAlign: 'top' }}>
              {qrCodeUrl && (
                <img 
                  src={qrCodeUrl} 
                  alt="QR Code" 
                  style={{ width: '100px', height: '100px', display: 'block' }}
                />
              )}
            </td>
            <td style={{ verticalAlign: 'top' }}>
              <div style={{ 
                borderLeft: `4px solid ${data.primaryColor}`, 
                paddingLeft: '15px' 
              }}>
                <h1 style={{ 
                  margin: '0 0 5px 0', 
                  fontSize: '20px', 
                  fontWeight: 'bold',
                  color: data.primaryColor 
                }}>
                  {data.fullName || 'Your Name'}
                </h1>
                <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#666' }}>
                  {data.jobTitle || 'Job Title'} {data.company && `at ${data.company}`}
                </p>
                <div style={{ fontSize: '13px', lineHeight: '1.6', color: '#444' }}>
                  {data.email && (
                    <div>
                      <a href={`mailto:${data.email}`} style={{ color: data.primaryColor, textDecoration: 'none' }}>
                        {data.email}
                      </a>
                    </div>
                  )}
                  {data.phone && <div>{data.phone}</div>}
                  {data.website && (
                    <div>
                      <a href={data.website} style={{ color: data.primaryColor, textDecoration: 'none' }}>
                        {data.website}
                      </a>
                    </div>
                  )}
                  {data.address && <div style={{ marginTop: '5px' }}>{data.address}</div>}
                  {(data.linkedIn || data.twitter) && (
                    <div style={{ marginTop: '10px' }}>
                      {data.linkedIn && (
                        <a href={data.linkedIn} style={{ marginRight: '10px', color: data.primaryColor, textDecoration: 'none' }}>
                          LinkedIn
                        </a>
                      )}
                      {data.twitter && (
                        <a href={data.twitter} style={{ color: data.primaryColor, textDecoration: 'none' }}>
                          Twitter
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderClassicTemplate = () => (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px' }}>
      <table cellPadding="0" cellSpacing="0" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <tbody>
          <tr>
            <td style={{ 
              backgroundColor: data.primaryColor, 
              padding: '15px', 
              color: 'white',
              textAlign: 'center'
            }}>
              <h1 style={{ margin: '0', fontSize: '22px', fontWeight: 'bold' }}>
                {data.fullName || 'Your Name'}
              </h1>
              <p style={{ margin: '5px 0 0 0', fontSize: '14px' }}>
                {data.jobTitle || 'Job Title'}
              </p>
            </td>
          </tr>
          <tr>
            <td style={{ padding: '20px', borderLeft: '1px solid #ddd', borderRight: '1px solid #ddd', borderBottom: '1px solid #ddd' }}>
              <table cellPadding="0" cellSpacing="0" style={{ width: '100%' }}>
                <tbody>
                  <tr>
                    <td style={{ verticalAlign: 'top', paddingRight: '20px' }}>
                      <div style={{ fontSize: '13px', lineHeight: '1.8', color: '#444' }}>
                        {data.company && <div><strong>Company:</strong> {data.company}</div>}
                        {data.email && (
                          <div>
                            <strong>Email:</strong>{' '}
                            <a href={`mailto:${data.email}`} style={{ color: data.primaryColor, textDecoration: 'none' }}>
                              {data.email}
                            </a>
                          </div>
                        )}
                        {data.phone && <div><strong>Phone:</strong> {data.phone}</div>}
                        {data.website && (
                          <div>
                            <strong>Web:</strong>{' '}
                            <a href={data.website} style={{ color: data.primaryColor, textDecoration: 'none' }}>
                              {data.website}
                            </a>
                          </div>
                        )}
                        {data.address && <div><strong>Address:</strong> {data.address}</div>}
                        {(data.linkedIn || data.twitter) && (
                          <div style={{ marginTop: '10px' }}>
                            {data.linkedIn && (
                              <a href={data.linkedIn} style={{ marginRight: '10px', color: data.primaryColor, textDecoration: 'none' }}>
                                LinkedIn
                              </a>
                            )}
                            {data.twitter && (
                              <a href={data.twitter} style={{ color: data.primaryColor, textDecoration: 'none' }}>
                                Twitter
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                    {qrCodeUrl && (
                      <td style={{ verticalAlign: 'top', textAlign: 'right' }}>
                        <img 
                          src={qrCodeUrl} 
                          alt="QR Code" 
                          style={{ width: '100px', height: '100px', display: 'block' }}
                        />
                      </td>
                    )}
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderMinimalTemplate = () => (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px' }}>
      <table cellPadding="0" cellSpacing="0" style={{ borderCollapse: 'collapse' }}>
        <tbody>
          <tr>
            <td style={{ paddingRight: '20px', verticalAlign: 'middle' }}>
              {qrCodeUrl && (
                <img 
                  src={qrCodeUrl} 
                  alt="QR Code" 
                  style={{ width: '80px', height: '80px', display: 'block' }}
                />
              )}
            </td>
            <td style={{ verticalAlign: 'middle' }}>
              <h1 style={{ 
                margin: '0 0 3px 0', 
                fontSize: '18px', 
                fontWeight: 'bold',
                color: '#333'
              }}>
                {data.fullName || 'Your Name'}
              </h1>
              <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#666' }}>
                {data.jobTitle || 'Job Title'} | {data.company || 'Company'}
              </p>
              <div style={{ fontSize: '12px', color: '#555' }}>
                {data.email && (
                  <span style={{ marginRight: '10px' }}>
                    <a href={`mailto:${data.email}`} style={{ color: '#333', textDecoration: 'none' }}>
                      {data.email}
                    </a>
                  </span>
                )}
                {data.phone && <span style={{ marginRight: '10px' }}>{data.phone}</span>}
                {data.website && (
                  <span>
                    <a href={data.website} style={{ color: '#333', textDecoration: 'none' }}>
                      {data.website}
                    </a>
                  </span>
                )}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderTemplate = () => {
    switch (data.template) {
      case 'classic':
        return renderClassicTemplate();
      case 'minimal':
        return renderMinimalTemplate();
      default:
        return renderModernTemplate();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Preview</h2>
      <div 
        id="signature-preview" 
        className="border-2 border-dashed border-gray-300 p-6 rounded-lg bg-gray-50"
      >
        {renderTemplate()}
      </div>
    </div>
  );
}
