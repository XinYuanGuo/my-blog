import Prism from "prismjs";
import { FC, PropsWithChildren, useEffect } from "react";

import "prismjs/components/prism-css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-typescript";
import "prismjs/themes/prism-okaidia.min.css";

const PostPage: FC<PropsWithChildren> = ({ children }) => {
  useEffect(() => {
    const highlight = async () => {
      await Prism.highlightAll();
    };
    highlight().then(() => {});
  }, [children]);

  return <div className="relative w-2/3 text-sm">{children}</div>;
};

export default PostPage;
