import { copyToClipboard } from "@/utils/copyToClipboard";
import { removeDuplicateNewLine } from "@/utils/removeDuplicateNewLine";
import clsx from "clsx";
import {
  FC,
  Fragment,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";

const CustomPre: FC<PropsWithChildren<any>> = (props) => {
  const { children, className, ...otherProps } = props;

  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setCopied(false), 2000);

    return () => clearTimeout(timer);
  }, [copied]);

  const clickCopy = async () => {
    if (preRef.current?.innerText) {
      await copyToClipboard(removeDuplicateNewLine(preRef.current.innerText));
      setCopied(true);
    }
  };

  return (
    <Fragment>
      <div className="pre-mac">
        <span />
        <span />
        <span />
      </div>
      <div className="group relative">
        <pre
          {...props}
          ref={preRef}
          className={clsx(className, "focus:outline-none")}
        >
          <div className="absolute top-0 right-0 m-2 flex items-center rounded-md bg-[#282a36] dark:bg-[#262626]">
            <span
              className={clsx("hidden px-2 text-xs text-green-400 ease-in", {
                "group-hover:flex": copied,
              })}
            >
              已复制！
            </span>

            <button
              type="button"
              aria-label="Copy to Clipboard"
              onClick={clickCopy}
              disabled={copied}
              className={clsx(
                "hidden rounded-md border bg-transparent p-2 transition ease-in focus:outline-none group-hover:flex",
                {
                  "border-green-400": copied,
                  "border-gray-600 hover:border-gray-400 focus:ring-4 focus:ring-gray-200/50 dark:border-gray-700 dark:hover:border-gray-400":
                    !copied,
                }
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={clsx("pointer-events-none h-4 w-4", {
                  "text-gray-400 dark:text-gray-400": !copied,
                  "text-green-400": copied,
                })}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                  className={clsx({ block: !copied, hidden: copied })}
                />

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                  className={clsx({ block: copied, hidden: !copied })}
                />
              </svg>
            </button>
          </div>

          {children}
        </pre>
      </div>
    </Fragment>
  );
};

export default CustomPre;
