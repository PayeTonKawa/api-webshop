import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const token = process.env.TOKEN
    if (!(request.headers.get("X-AUTH-TOKEN")==token)) {
        return NextResponse.json({ message: 'Auth required' }, { status: 401 })
    }

    return NextResponse.next()
}