import CommandPalette from "@/components/CommandPalette";
import LayoutWrapper from "@/components/LayoutWrapper";
import { siteConfig } from "@/config/siteConfig";
import "@/styles/globals.css";
import "@/styles/nprogress-custom.scss";
import "@/styles/prism-darcula.css";
import "@/styles/prism-plus.css";
import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import nProgress from "nprogress";
import "nprogress/nprogress.css";
import { Fragment, useEffect } from "react";

nProgress.configure({ showSpinner: false });

export default function App({ Component, pageProps, router }: AppProps) {
  useEffect(() => {
    router.events.on("routeChangeStart", () => nProgress.start());
    router.events.on("routeChangeComplete", () => nProgress.done());
    router.events.on("routeChangeError", () => nProgress.done());
  }, []);

  return (
    <Fragment>
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
        <CommandPalette>
          <LayoutWrapper>
            <Component {...pageProps} />
          </LayoutWrapper>
        </CommandPalette>
      </ThemeProvider>
    </Fragment>
  );
}
