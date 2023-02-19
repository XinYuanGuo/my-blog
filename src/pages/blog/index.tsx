import { getAllPosts } from "@/utils/mdx";
import Image from "next/image";
import Link from "next/link";

const IndexPage = ({ posts }: { posts: any }) => {
  return (
    <div
      className={
        "grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-5 gap-8 px-6 pt-12 h-screen overflow-y-scroll"
      }
    >
      {posts.map((post: any) => {
        return (
          <div key={post.title}>
            <div className={"relative mb-4 w-full h-48 overflow-hidden"}>
              <Image
                src="/next.svg"
                className={"block w-full rounded aspect-video object-contain"}
                width={100}
                height={100}
                alt={post.title}
              />
            </div>
            <div className={"mt-4"}>
              <div className="flex gap-2 tags">
                {post.tags.map((tag: any) => {
                  return (
                    <div className={"relative w-4 h-4"} key={tag}>
                      <Image
                        alt={tag}
                        src="/next.svg"
                        width={100}
                        height={100}
                      />
                    </div>
                  );
                })}
                <div className={"text-slate-400 text-sm"}>{post.date}</div>
              </div>
              <div className={"font-bold text-slate-700 leading-snug"}>
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default IndexPage;

export async function getStaticProps() {
  const posts = await getAllPosts();
  return {
    props: {
      posts,
    },
  };
}
