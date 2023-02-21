import {
  KBarAnimator,
  KBarPortal,
  KBarPositioner,
  KBarResults,
  KBarSearch,
  useMatches,
} from "kbar";
import ResultItem from "./ResultItem";

const CommandBar = () => {
  const { results, rootActionId } = useMatches();

  return (
    <KBarPortal>
      <KBarPositioner className="z-20 flex items-center bg-gray-400/70 p-2 backdrop-blur-sm dark:bg-gray-900/80">
        <KBarAnimator className="box-content w-full max-w-[600px] overflow-hidden rounded-xl border border-gray-400 bg-white/80 p-2 dark:border-gray-600 dark:bg-gray-700/80">
          <KBarSearch className="flex h-16 w-full bg-transparent px-4 outline-none" />
          <KBarResults
            items={results}
            onRender={({ item, active }) =>
              typeof item === "string" ? (
                <div className="px-4 pt-4 pb-2 font-medium text-gray-500 dark:text-gray-400">
                  {item}
                </div>
              ) : (
                <ResultItem
                  action={item}
                  active={active}
                  currentRootActionId={rootActionId || ""}
                />
              )
            }
          />
        </KBarAnimator>
      </KBarPositioner>
    </KBarPortal>
  );
};

export default CommandBar;
