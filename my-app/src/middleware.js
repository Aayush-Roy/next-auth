import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/login" || path === "/signup" || path=="/verify";
   const token = request.cookies.get('token')?.value;
  if (isPublicPath && token) {
    // Logged-in user trying to access login/signup — redirect them to home
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (!isPublicPath && !token) {
    // Not logged-in user trying to access protected route — send to login
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/', '/profile/:path*', '/login', '/signup','/verify'],
};