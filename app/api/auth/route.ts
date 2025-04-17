import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const { username, password } = await request.json()

  // Get credentials from environment variables
  const validUsername = process.env.ADMIN_USERNAME
  const validPassword = process.env.ADMIN_PASSWORD

  if (!validUsername || !validPassword) {
    return NextResponse.json({ success: false, message: "Server configuration error" }, { status: 500 })
  }

  if (username === validUsername && password === validPassword) {
    return NextResponse.json({ success: true })
  } else {
    return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 })
  }
}
