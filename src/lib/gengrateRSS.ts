import { siteConfig } from "@/config/siteConfig";
import { Feed } from "feed";
import { writeFileSync } from "fs";
import { allPostsNewToOld } from "./contentLayerAdapter";
import { getPostOGImage } from "./getOGImage";

export default function generateRSS() {
  const author = {
    name: siteConfig.author,
    email: siteConfig.email,
    link: siteConfig.siteUrl,
  };

  const feed = new Feed({
    title: siteConfig.title,
    description: siteConfig.description,
    id: siteConfig.siteUrl,
    link: siteConfig.siteUrl,
    image: siteConfig.logoUrl,
    favicon: siteConfig.logoPath,
    copyright: `Copyright © 2015 - ${new Date().getFullYear()} ${
      siteConfig.credit
    }`,
    feedLinks: {
      rss2: `${siteConfig.siteUrl}/feed.xml`,
      json: `${siteConfig.siteUrl}/feed.json`,
      atom: `${siteConfig.siteUrl}/atom.xml`,
    },
    author: author,
  });

  allPostsNewToOld.forEach((post) => {
    feed.addItem({
      id: siteConfig.siteUrl + post.url,
      title: post.title,
      link: siteConfig.siteUrl + post.url,
      description: post.description,
      image: getPostOGImage(post.socialImage),
      author: [author],
      contributor: [author],
      date: new Date(post.date),
      // content: post.body.html,
    });
  });

  writeFileSync("./public/feed.xml", feed.rss2());
  writeFileSync("./public/atom.xml", feed.atom1());
  writeFileSync("./public/feed.json", feed.json1());
}
