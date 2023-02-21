import customMdxComponents from "@/components/custom-mdx/customMdxComponents";
import PostLayout, { RelatedPost } from "@/components/post-com/PostLayout";
import { siteConfig } from "@/config/siteConfig";
import { allPostsNewToOld } from "@/lib/contentLayerAdapter";
import { getPostOGImage } from "@/lib/getOGImage";
import { allPosts, Post } from "contentlayer/generated";
import { GetStaticProps } from "next";
import { useMDXComponent } from "next-contentlayer/hooks";
import { ArticleJsonLd, NextSeo } from "next-seo";
import { Fragment } from "react";

type PostForPostPage = Pick<
  Post,
  "title" | "date" | "description" | "url" | "socialImage" | "body"
>;
interface PostProps {
  post: PostForPostPage;
  nextPost: RelatedPost;
  prevPost: RelatedPost;
}

export default function Page(props: PostProps) {
  const { post, nextPost, prevPost } = props;
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

      <PostLayout post={post} nextPost={nextPost} prevPost={prevPost}>
        <MDXContent components={customMdxComponents} />
      </PostLayout>
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
  PostProps,
  {
    slug: string[];
  }
> = async (context) => {
  const slug = context.params?.slug?.join?.("/");
  if (slug) {
    const postIndex = allPostsNewToOld.findIndex((p) => p.url.includes(slug));
    if (postIndex >= 0) {
      const post = allPostsNewToOld[postIndex];
      const prevPost = allPostsNewToOld[postIndex + 1] || null;
      const nextPost = allPostsNewToOld[postIndex - 1] || null;
      const pickPost: PostForPostPage = {
        body: post.body,
        date: post.date,
        description: post.description,
        title: post.title,
        url: post.url,
        socialImage: post.socialImage || "",
      };
      const pickPrevPost: RelatedPost = prevPost
        ? {
            title: prevPost.title,
            url: prevPost.url,
          }
        : null;
      const pickNextPost: RelatedPost = nextPost
        ? {
            title: nextPost.title,
            url: nextPost.url,
          }
        : null;
      return {
        props: {
          post: pickPost,
          prevPost: pickPrevPost,
          nextPost: pickNextPost,
        },
      };
    }
  }

  return {
    notFound: true,
  };
};
