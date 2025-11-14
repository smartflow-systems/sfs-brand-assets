import { NextRequest, NextResponse } from 'next/server';
import QRCode from 'qrcode';

export async function POST(request: NextRequest) {
  try {
    const { text, format = 'png', size = 200 } = await request.json();

    if (!text) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    if (format === 'svg') {
      const svgString = await QRCode.toString(text, {
        type: 'svg',
        width: size,
        margin: 1,
      });
      return new NextResponse(svgString, {
        headers: {
          'Content-Type': 'image/svg+xml',
        },
      });
    } else {
      const dataUrl = await QRCode.toDataURL(text, {
        width: size,
        margin: 1,
      });
      return NextResponse.json({ dataUrl });
    }
  } catch (error) {
    console.error('QR Code generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate QR code' },
      { status: 500 }
    );
  }
}
