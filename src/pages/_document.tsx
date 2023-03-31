import { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <Script src="https://cdn.jsdelivr.net/gh/pocketbase/js-sdk@master/dist/pocketbase.umd.js"></Script>
        <NextScript />
      </body>
    </Html>
  );
}
