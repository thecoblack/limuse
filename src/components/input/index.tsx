import { LimuseContext } from "./../../store/limuse";
import React, { forwardRef, InputHTMLAttributes, useContext } from "react";

interface InputSearchProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "className" | "type" | "onFocus" | "ref"
  > {
  height: number;
  minPatternLength?: number;
  children: React.ReactNode;
  updateRootHeight: (emptyBadgesContainer: boolean) => void;
}

const InputSearch = forwardRef(function InputSearch(
  {
    children,
    height,
    updateRootHeight,
    minPatternLength = 3,
    placeholder = "Search ...",
    ...props
  }: InputSearchProps,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const [state, dispatch] = useContext(LimuseContext);

  const setSortedData = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;

    if (input.value.length < minPatternLength) {
      dispatch({
        type: "sortData",
        pattern: "",
      });

      return;
    }

    dispatch({
      type: "sortData",
      pattern: input.value,
    });
  };

  const handleRowClick = (e: React.MouseEvent<HTMLElement>): void => {
    const target = e.target as HTMLElement;
    const rowRoot = target.closest("[data-row-id]") as HTMLElement;

    if (!rowRoot) {
      return;
    }

    let badgeId: string = rowRoot.dataset.rowId as string;
    for (let badge of state.badges) {
      if (badgeId !== badge.id) {
        continue;
      }

      dispatch({
        type: "removeBadge",
        id: badgeId,
      });

      return;
    }

    dispatch({
      type: "addBadge",
      badge: {
        id: rowRoot.dataset.rowId as string,
        title: rowRoot.dataset.title as string,
      },
    });
  };

  return (
    <div className="flex flex-col items-center gap-1 relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="mt-0 h-4 w-4 dark:fill-zinc-300 absolute left-0 top-[3px]"
        viewBox="0 0 512 512"
      >
        <path
          d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5
        12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7
        40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0
        1 0 0-288 144 144 0 1 0 0 288z"
        />
      </svg>
      <input
        className="bg-transparent ml-14 w-full outline-none dark:text-white peer"
        type="text"
        ref={ref}
        onFocus={() => dispatch({ type: "showTable", show: true })}
        onKeyUp={setSortedData}
        placeholder={placeholder}
        {...props}
      />

      <div
        className="w-full no-scrollbar overflow-y-auto block
          peer-placeholder-shown:hidden scroll-smooth"
        style={{
          display: state.showTable ? "block" : "none",
          maxHeight: `${height - 100}px`,
        }}
        onClick={handleRowClick}
      >
        {children}
      </div>
    </div>
  );
});

export default InputSearch;
