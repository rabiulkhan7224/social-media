import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { authClient } from '@/lib/auth-client';


export async function proxy(request: NextRequest) {
    const session = await authClient.getSession({
        fetchOptions: {
            headers: await headers(),
            throw: false,
        },
    })

    console.log('check user session',session)
    
    if(!session) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
  matcher: [ '/feed/:path*',
    '/dashboard/:path*',], // Specify the routes the middleware applies to
};