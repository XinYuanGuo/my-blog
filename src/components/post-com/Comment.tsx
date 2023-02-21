import { giscusConfig } from "@/config/giscusConfig";
import Giscus from "@giscus/react";
import { useTheme } from "next-themes";
import { Theme } from "../ThemeSwitch";

const Comment = () => {
  const { theme } = useTheme();

  return (
    <div id="comment" className="mx-auto max-w-prose py-6">
      <Giscus
        repo={giscusConfig.repo}
        repoId={giscusConfig.repoId}
        category={giscusConfig.category}
        categoryId={giscusConfig.categoryId}
        mapping="pathname"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={theme === Theme.DARK ? "transparent_dark" : "light"}
        loading="lazy"
      />
    </div>
  );
};

export default Comment;
