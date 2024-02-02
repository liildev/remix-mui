import type { LoaderFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useLoaderData,
  useLocation,
} from "@remix-run/react";
import React from "react";
import { withEmotionCache } from "@emotion/react";
import {
  unstable_useEnhancedEffect as useEnhancedEffect,
  ThemeProvider,
  CssBaseline,
} from "@mui/material";
import { ClientStyleContext } from "~/context";
import theme from "~/assets/theme";
import "swiper/swiper.min.css";

interface DocumentProps {
  children: React.ReactNode;
  title?: string;
}

export const loader: LoaderFunction = async () => {
  return json({
    googleId: process.env.GOOGLE_ID,
    facebookAppId: process.env.FB_ID,
  });
};

const Document = withEmotionCache(({ children, title }: DocumentProps, emotionCache) => {
  const { pathname } = useLocation();
  const { googleId, facebookAppId } = useLoaderData<typeof loader>();

  const clientStyleData = React.useContext(ClientStyleContext);

  useEnhancedEffect(() => {
    emotionCache.sheet.container = document.head;

    const tags = emotionCache.sheet.tags;
    emotionCache.sheet.flush();
    tags.forEach((tag) => {
      (emotionCache.sheet as any)._insertTag(tag);
    });

    clientStyleData.reset();
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
        <meta name="theme-color" content="#F5EBE0" />
        <meta name="keywords" content="dreams, web development, dream-analyser, use-your-dreams" />
        <meta name="google-site-verification" content={googleId} />
        <meta property="fb:app_id" content={facebookAppId} />
        <meta property="og:type" content="website" />
        <meta property="og:image:height" content="1200" />
        <meta property="og:image:width" content="630" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:url" content={`https://useyourdream.com${pathname}`} />
        <meta name="twitter:url" content={`https://useyourdream.com${pathname}`} />
        <meta name="emotion-insertion-point" content="emotion-insertion-point" />

        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="canonical" href={`https://useyourdream.com${pathname}`} />
        <link rel="shortcut icon" />
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900|Roboto+Slab:400,700"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@6/swiper-bundle.min.css" />
        <script src="https://kit.fontawesome.com/42d5adcbca.js" crossOrigin="anonymous"></script>
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
});

export default function App() {
  return (
    <Document>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Outlet />
      </ThemeProvider>
    </Document>
  );
}
