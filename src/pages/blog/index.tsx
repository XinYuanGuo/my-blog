import { PostData } from "@/utils/interface";
import { allPosts } from "contentlayer/generated";
import Link from "next/link";

interface BlogProps {
  posts: PostData[];
}

const IndexPage = (props: BlogProps) => {
  const { posts } = props;
  return (
    <div className="flex flex-wrap justify-center items-center">
      {posts.map((post, index) => (
        <Link key={index} href={`/blog/${post.slug}`} className="w-full">
          <div className="card w-full bg-base-100 shadow-xl mx-4 my-4">
            <div className="card-body">
              <h2 className="card-title">{post.title}</h2>
              <p>{post.description}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default IndexPage;

export async function getStaticProps() {
  return {
    props: {
      posts: allPosts,
    },
  };
}
