import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match every path except:
  //  - Next internals (_next, _vercel)
  //  - Static files (anything with a dot — favicon.ico, /icon.png, /og.jpg, ...)
  //  - Route handlers we deliberately keep locale-free (sitemap, robots, llms.txt,
  //    OG/twitter images, icons). Those still pass through Next's normal routing
  //    because they live at app/ root and are matched by the regex below as files
  //    or non-app routes.
  matcher: [
    "/((?!api|_next|_vercel|sitemap.xml|robots.txt|llms.txt|opengraph-image|twitter-image|icon|apple-icon|.*\\..*).*)",
  ],
};
