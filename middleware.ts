import { NextResponse, type NextRequest } from "next/server";
import { isOwnHost } from "@/lib/site";

/** Images are the part of this site most likely to be taken, and the usual
 *  theft is lazy: a copied page that still loads the pictures from here. When
 *  a request for one of my images carries a referer from somewhere else, the
 *  watermark is served instead, so the copy displays its own credit line.
 *
 *  Requests with no referer are left alone: that covers direct opens, the Next
 *  image optimizer, search engine crawlers and social previews. */
export function middleware(request: NextRequest) {
  const referer = request.headers.get("referer");
  if (!referer) return NextResponse.next();

  let host: string | null = null;
  try {
    host = new URL(referer).host;
  } catch {
    return NextResponse.next();
  }

  if (isOwnHost(host)) return NextResponse.next();

  return NextResponse.rewrite(new URL("/hotlinked.jpg", request.url));
}

export const config = {
  // The optimizer URL is included too: without it a copy could keep pointing at
  // /_next/image on this domain and slip past the watermark.
  matcher: ["/projects/:path*", "/profile/:path*", "/mentors/:path*", "/_next/image"],
};
