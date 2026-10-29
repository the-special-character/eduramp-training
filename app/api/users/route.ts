import { NextRequest, NextResponse } from 'next/server';

// Handle GET requests
export async function GET(request: NextRequest) {
  const data = { message: "Hello from the App Router!" };
  return NextResponse.json(data);
}

// Handle POST requests
export async function POST(request: NextRequest) {
  try {
    const body = await request.json(); // Parse incoming JSON body
    return NextResponse.json({ received: body }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}
