import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const response = await fetch('https://tunnetcomaiagentservice.azurewebsites.net/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/event-stream',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => null);
      return NextResponse.json(
        { error: error?.message || 'Failed to fetch from chat service' },
        { status: response.status }
      );
    }

    // Forward the stream
    const stream = response.body;
    return new NextResponse(stream);
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 