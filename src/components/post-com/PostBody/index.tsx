import clsx from "clsx";
import { FC, PropsWithChildren } from "react";
import styles from "./index.module.scss";

const PostBody: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  return (
    <div
      className={clsx(
        styles["post-body"],
        "prose mx-auto transition-colors dark:prose-dark"
      )}
    >
      {children}
    </div>
  );
};

export default PostBody;
