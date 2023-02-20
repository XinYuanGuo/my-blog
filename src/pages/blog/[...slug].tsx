import MDXComponents from "@/components/MDXComponents";
import { siteConfig } from "@/config/siteConfig";
import { getPostOGImage } from "@/lib/getOGImage";
import { PostData } from "@/utils/interface";
import {
  getAllPosts,
  getPostBySlug,
  getRandomArrayElements,
} from "@/utils/mdx";
import { GetStaticProps } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { ArticleJsonLd, NextSeo } from "next-seo";
import { Fragment } from "react";
import rehypeCodeTitles from "rehype-code-titles";
import rehypePrism from "rehype-prism-plus";
import remarkGfm from "remark-gfm";

interface PostProps {
  post: PostData;
  mdxSource: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, string>
  >;
  randomPosts: PostData[];
}

export default function Page(props: PostProps) {
  const { post, randomPosts, mdxSource } = props;
  const { title, date, description, socialImage } = post;
  const url = siteConfig.fqdn;
  const ogImage = getPostOGImage(socialImage);
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
          <MDXRemote {...mdxSource} components={MDXComponents} />
        </div>
      </div>
    </Fragment>
  );
}

export const getStaticPaths = async () => {
  const allPosts = await getAllPosts();
  const paths = allPosts.map((post) => ({
    params: {
      slug: post.slug.split("/"),
    },
  }));

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
  const slug = context.params?.slug?.join?.("/") || "";

  const post = await getPostBySlug(slug);
  if (post) {
    const mdxSource = await serialize(post.content, {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeCodeTitles, rehypePrism],
      },
      scope: { ...post },
    });

    const posts = await getAllPosts();
    const randomPost = getRandomArrayElements(
      posts,
      posts.length < 6 ? posts.length - 1 : 6
    );
    return {
      props: {
        post,
        mdxSource,
        randomPost,
      },
    };
  }
  return {
    notFound: true,
  };
};
