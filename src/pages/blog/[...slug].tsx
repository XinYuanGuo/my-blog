import {
  getAllPosts,
  getPostBySlug,
  getRandomArrayElements,
} from "@/utils/mdx";
import { GetStaticProps } from "next";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import dynamic from "next/dynamic";
import Link from "next/link";
import remarkGfm from "remark-gfm";

const PostPage = dynamic(() => import("@/components/PostPage"), { ssr: false });

export default function Page({
  title,
  description,
  date,
  tags,
  originalUrl,
  mdxSource,
  randomPost,
  cover,
  handle,
}) {
  return (
    <div className="prose">
      <hgroup>
        <div className={"text-center text-slate-500 text-xs"}>
          Published {date}
        </div>
        <h1 className={"text-center mt-4 mb-2"}>{title}</h1>
        {originalUrl && (
          <div className={"text-center text-slate-500 text-sm"}>
            本文翻译自：
            <Link href={originalUrl}>{originalUrl}</Link>
          </div>
        )}
      </hgroup>
      <PostPage>
        <MDXRemote {...mdxSource} />
      </PostPage>
    </div>
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
  Record<string, string>,
  {
    slug: string[];
  }
> = async (context) => {
  const slug = context.params?.slug?.join?.("/") || "";

  const { content, ...data } = await getPostBySlug(slug);
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [],
    },
    scope: data,
  });

  const posts = await getAllPosts();
  const randomPost = getRandomArrayElements(
    posts,
    posts.length < 6 ? posts.length - 1 : 6
  );

  return {
    props: {
      ...data,
      mdxSource,
      randomPost,
    },
  };
};
