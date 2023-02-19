import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import fs from "fs";
import { globby } from "globby";
import matter from "gray-matter";
import { PostData } from "./interface";

dayjs.extend(relativeTime);

// 获取所有文章
export const getAllPosts = async () => {
  const posts = await globby("src/posts");
  return posts.reduce((prev: PostData[], next: string) => {
    const fileContent = fs.readFileSync(next, "utf-8");
    const { data, content } = matter(fileContent);
    const postData: PostData = {
      group: dayjs(data.date).format("MMM/YYYY"),
      date: dayjs(data.date).format("MMM DD, YYYY"),
      fromNow: dayjs(data.date).fromNow(),
      modified: dayjs(data.modified).format("MMM DD, YYYY"),
      content,
      slug: next.replace(/^src\/posts\//, "").replace(/\.mdx$/, ""),
      ...data,
    };
    !data.draft && prev.push(postData);
    return prev;
  }, []);
};

export const getPostBySlug = async (slug: string) => {
  try {
    const posts = await getAllPosts();
    const post = posts.find((p) => p.slug.includes(slug));
    return post;
  } catch (error) {
    return undefined;
  }
};

export const getRandomArrayElements = (arr: PostData[], count: number) => {
  const shuffled = arr.slice(0);
  let i = arr.length;
  const min = i - count;
  let temp;
  let index;

  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }

  return shuffled.slice(min);
};
