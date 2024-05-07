import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function rootMiddleware(req: NextRequest) {
    if (req.nextUrl.pathname === "/") {
        return NextResponse.redirect(new URL("/auth/signup", req.url));
    }

    return NextResponse.next();
}
