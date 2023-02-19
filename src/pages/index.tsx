import { Inter } from "@next/font/google";
import { Fragment } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Fragment>
      <main className="prose my-12 space-y-2 transition-colors dark:prose-dark md:prose-lg md:space-y-5">
        <h1 className="text-center sm:text-left">Hey, I am 逍遥</h1>
        <p>A 21st front-end development</p>
        <p>
          Motto: Learning is like sailing against the current, if you don not
          advance, you will retreat!
        </p>
      </main>

      <div className="my-4 divide-y divide-gray-200 transition-colors dark:divide-gray-700">
        <div className="prose prose-lg my-8 dark:prose-dark">
          <h2>最新文章</h2>
        </div>

        {/* <PostList posts={posts} /> */}
      </div>
    </Fragment>
  );
}
