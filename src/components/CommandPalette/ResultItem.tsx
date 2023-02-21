import { ActionId, ActionImpl } from "kbar";
import React, { forwardRef, useMemo } from "react";

interface ResultItemProps {
  action: ActionImpl;
  active: boolean;
  currentRootActionId: ActionId;
}
type Ref = HTMLDivElement;

// eslint-disable-next-line react/display-name
const ResultItem = forwardRef<Ref, ResultItemProps>(
  (
    {
      action,
      active,
      currentRootActionId,
    }: {
      action: ActionImpl;
      active: boolean;
      currentRootActionId: ActionId;
    },
    ref: React.Ref<HTMLDivElement>
  ) => {
    const ancestors = useMemo(() => {
      if (!currentRootActionId) return action.ancestors;
      const index = action.ancestors.findIndex(
        (ancestor) => ancestor.id === currentRootActionId
      );
      // +1 removes the currentRootAction; e.g.
      // if we are on the "Set theme" parent action,
      // the UI should not display "Set theme… > Dark"
      // but rather just "Dark"
      return action.ancestors.slice(index + 1);
    }, [action.ancestors, currentRootActionId]);

    return (
      <div
        ref={ref}
        className={`${
          active
            ? "rounded-lg bg-teal-400 text-gray-100"
            : "text-gray-600 dark:text-gray-300"
        } flex cursor-pointer items-center justify-between rounded-lg px-4 py-2`}
      >
        <div className="flex items-center gap-2 text-base">
          {action.icon && action.icon}
          <div className="flex flex-col">
            <div className="line-clamp-1">
              {ancestors.length > 0 &&
                ancestors.map((ancestor) => (
                  <React.Fragment key={ancestor.id}>
                    <span className="mr-3 opacity-70">{ancestor.name}</span>
                    <span className="mr-3">›</span>
                  </React.Fragment>
                ))}
              <span>{action.name}</span>
            </div>
            {action.subtitle && (
              <span className="text-sm">{action.subtitle}</span>
            )}
          </div>
        </div>
        {action.shortcut?.length ? (
          <div aria-hidden className="grid grid-flow-col gap-2">
            {action.shortcut.map((sc) => (
              <kbd
                key={sc}
                className={`${
                  active
                    ? "bg-white text-teal-500 dark:bg-gray-500 dark:text-gray-200"
                    : "bg-gray-200 text-gray-500 dark:bg-gray-600 dark:text-gray-400"
                } flex cursor-pointer items-center justify-between rounded-md px-3 py-2`}
              >
                {sc}
              </kbd>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
);

export default ResultItem;
