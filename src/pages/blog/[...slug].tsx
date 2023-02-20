import customMdxComponents from "@/components/custom-mdx/customMdxComponents";
import { siteConfig } from "@/config/siteConfig";
import { getPostOGImage } from "@/lib/getOGImage";
import { allPosts, Post } from "contentlayer/generated";
import { GetStaticProps } from "next";
import { useMDXComponent } from "next-contentlayer/hooks";
import { ArticleJsonLd, NextSeo } from "next-seo";
import { Fragment } from "react";

interface PostProps {
  post: Post;
}

export default function Page(props: PostProps) {
  const { post } = props;
  const { title, date, description, socialImage } = post;
  const url = siteConfig.siteUrl;
  const ogImage = getPostOGImage(socialImage);

  const MDXContent = useMDXComponent(post.body.code);

  return (
    <Fragment>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          title: title,
          description: description,
          url: url,
          images: [
            {
              url: ogImage,
            },
          ],
          type: "article",
          article: {
            publishedTime: date,
            modifiedTime: date,
          },
        }}
      />

      <ArticleJsonLd
        url={url}
        title={title || siteConfig.title}
        images={[ogImage]}
        datePublished={date}
        dateModified={date}
        authorName={siteConfig.author}
        description={description || siteConfig.description}
      />
      <div className="card bg-base-100 shadow-xl w-full my-2 p-4 flex justify-center">
        <div className="prose max-w-full">
          <hgroup>
            <h1 className={"text-center mt-4 mb-2"}>{post.title}</h1>
            <div className="text-center text-slate-500 text-xs my-1">
              {post.date}
            </div>
            <div className="divider" />
          </hgroup>
          <MDXContent components={customMdxComponents} />
        </div>
      </div>
    </Fragment>
  );
}

export const getStaticPaths = async () => {
  const paths = allPosts.map((post) => post.url);
  console.log("paths", paths);

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  Record<string, unknown>,
  {
    slug: string[];
  }
> = async (context) => {
  const slug = context.params?.slug?.join?.("/");
  if (slug) {
    const post = allPosts.find((p) => p.url.includes(slug));
    if (post) {
      return {
        props: {
          post,
        },
      };
    }
  }

  return {
    notFound: true,
  };
};
