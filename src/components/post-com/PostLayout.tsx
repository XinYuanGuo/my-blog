import { Post } from "contentlayer/generated";
import { ReactNode } from "react";
import CustomLink from "../custom-mdx/CustomLink";
import Comment from "./Comment";
import PageTitle from "./PageTitle";
import PostBody from "./PostBody";
import TableOfContents from "./TableOfContents";

export type RelatedPost = Pick<Post, "title" | "url"> | null;

interface PostLayoutProps {
  post: Pick<Post, "date" | "title" | "body">;
  nextPost: RelatedPost;
  prevPost: RelatedPost;
  children: ReactNode;
}

const PostLayout = (props: PostLayoutProps) => {
  const { post, nextPost, prevPost, children } = props;

  const { body, date, title } = post;

  return (
    <article>
      <div className="divide-y divide-gray-200 transition-colors dark:divide-gray-700">
        <header className="py-6">
          <div className="space-y-1 text-center">
            <div className="mb-4">
              <PageTitle>{title}</PageTitle>
            </div>

            <dl className="space-y-10">
              <div>
                <dt className="sr-only">published-time</dt>
                <dd className="text-base font-medium leading-6 text-gray-500 transition-colors dark:text-gray-400">
                  <time dateTime={date}>{date}</time>
                </dd>
              </div>
            </dl>
          </div>
        </header>

        <div
          className="pb-8 transition-colors lg:grid lg:grid-cols-4 lg:gap-x-6"
          style={{ gridTemplateRows: "auto 1fr" }}
        >
          <div className="divide-y divide-gray-200 pt-10 pb-8 transition-colors dark:divide-gray-700 lg:col-span-3">
            <PostBody>{children}</PostBody>
          </div>

          {/* DESKTOP TABLE OF CONTENTS */}
          <aside>
            <div className="hidden lg:sticky lg:top-24 lg:col-span-1 lg:block">
              <TableOfContents source={body.raw} />
            </div>
          </aside>
        </div>

        <div className="divide-y divide-gray-200 pb-8 transition-colors dark:divide-gray-700">
          <Comment />

          <footer>
            <div className="flex flex-col gap-4 pt-4 text-base font-medium sm:flex-row sm:justify-between xl:gap-8 xl:pt-8">
              {prevPost ? (
                <div className="basis-6/12">
                  <h2 className="mb-1 text-xs uppercase tracking-wide text-gray-500 transition-colors dark:text-gray-400">
                    上一篇
                  </h2>
                  <CustomLink
                    href={prevPost.url}
                    className="text-primary-500 transition-colors hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    &larr; {prevPost.title}
                  </CustomLink>
                </div>
              ) : (
                <div />
              )}
              {nextPost && (
                <div className="basis-6/12">
                  <h2 className="mb-1 text-left text-xs uppercase tracking-wide text-gray-500 transition-colors dark:text-gray-400 sm:text-right">
                    下一篇
                  </h2>
                  <CustomLink
                    href={nextPost.url}
                    className="block text-primary-500 transition-colors hover:text-primary-600 dark:hover:text-primary-400 sm:text-right"
                  >
                    {nextPost.title} &rarr;
                  </CustomLink>
                </div>
              )}
            </div>
          </footer>
        </div>
      </div>
    </article>
  );
};

export default PostLayout;
