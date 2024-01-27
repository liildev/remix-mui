import { PropsWithChildren, useContext } from "react";
import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "@remix-run/react";
import { withEmotionCache } from '@emotion/react';
import { unstable_useEnhancedEffect as useEnhancedEffect } from '@mui/material';
import ClientStyleContext from './context';

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

const Document = withEmotionCache(({ children }: PropsWithChildren, emotionCache) => {
  const clientStyleData = useContext(ClientStyleContext);
  const { pathname } = useLocation()

  useEnhancedEffect(() => {
    emotionCache.sheet.container = document.head;
    const tags = emotionCache.sheet.tags;
    emotionCache.sheet.flush();
    tags.forEach((tag) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (emotionCache.sheet as any)._insertTag(tag);
    });
    clientStyleData.reset();
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:type" content="website" />
        <meta name="theme-color" content="#1A73E8" />
        <meta name="google-site-verification" content="vebD2Syk5DuLNB2ovP9tJ-HPb34bwpAtzMiCCqSMKbU" />
        <meta name="keywords" content="dreams, web development, dream-analyser, use-your-dreams" />
        <meta property="og:image:height" content='1200' />
        <meta property="og:image:width" content='630' />
        <meta property="og:image:type" content='image/jpeg' />
        <meta property="og:url" content={`https://useyourdream.com${pathname}`} />
        <meta name="twitter:url" content={`https://useyourdream.com${pathname}`} />
        <link rel="canonical" href={`https://useyourdream.com${pathname}`} />
        <link rel="shortcut icon" />
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900|Roboto+Slab:400,700" />
        <link
          href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp"
          rel="stylesheet" />

        <script src="https://kit.fontawesome.com/42d5adcbca.js" crossOrigin="anonymous"></script>

        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
})

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

// export async function loader() {
//   return JSON.stringify({
//     ENV: {
//       SUPABASE_URL: process.env.SUPABASE_URL,
//       SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
//     },
//   });
// }
