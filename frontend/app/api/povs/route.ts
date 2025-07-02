import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/povs${url.search}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Backend responded with ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('POVs API route error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch POVs' },
      { status: 500 },
    );
  }
}
