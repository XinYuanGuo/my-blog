import LayoutWrapper from "@/components/LayoutWrapper";
import { siteConfig } from "@/config/siteConfig";
import "@/styles/globals.css";
import "@/styles/prism-darcula.css";
import "@/styles/prism-plus.css";
import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { Fragment } from "react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      {/* <Head>
        <title>逍遥の博客</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/static/icons/logo.png" />
      </Head> */}
      <DefaultSeo
        titleTemplate={`%s | ${siteConfig.titleShort}`}
        defaultTitle={siteConfig.title}
        description={siteConfig.description}
        canonical={siteConfig.siteUrl}
        openGraph={{
          title: siteConfig.title,
          description: siteConfig.description,
          url: siteConfig.siteUrl,
          images: [
            {
              url: siteConfig.socialImage,
            },
          ],
          siteName: siteConfig.title,
          type: "website",
        }}
        additionalMetaTags={[
          {
            name: "viewport",
            content: "width=device-width, initial-scale=1",
          },
        ]}
        additionalLinkTags={[
          {
            rel: "icon",
            href: siteConfig.logoPath,
          },
          {
            rel: "alternate",
            type: "application/rss+xml",
            href: "/feed.xml",
          },
          {
            rel: "alternate",
            type: "application/atom+xml",
            href: "/atom.xml",
          },
        ]}
      />
      <ThemeProvider attribute="data-theme">
        <LayoutWrapper>
          <Component {...pageProps} />
        </LayoutWrapper>
      </ThemeProvider>
    </Fragment>
  );
}
