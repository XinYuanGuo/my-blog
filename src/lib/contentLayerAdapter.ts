import { allPosts, Post } from "contentlayer/generated";
import {
  defineDocumentType,
  defineNestedType,
  makeSource,
} from "contentlayer/source-files";
import { compareAsc } from "date-fns";

export { allPosts, defineDocumentType, defineNestedType, makeSource };
export type { Post };

export const allPostsNewToOld =
  allPosts?.sort((a, b) => {
    return compareAsc(new Date(a.date), new Date(b.date));
  }) || [];
