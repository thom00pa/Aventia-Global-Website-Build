import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  // Placeholder — full implementation added in Prompt 24
  const body = await request.json()
  console.log('Enrollment submission:', body)
  return NextResponse.json({ success: true, message: 'Placeholder response' })
}
