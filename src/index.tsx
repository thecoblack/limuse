import React, { useRef } from "react";
import Badge from "./components/badge";
import InputSearch from "./components/input";
import { BadgeState, LimuseContext } from "./store/limuse";
import useLimuseStore, { UpdateCallback, InputStoreData } from "./store/hook";

interface LimuseProps {
  title?: string;
  height?: number;
  data: InputStoreData;
  children: React.ReactNode;
  minPatternLength?: number;
  removeOnRowClick?: boolean;
  onCloseBadge?: (
    e: React.MouseEvent<HTMLButtonElement>,
    badge: BadgeState,
  ) => void;
  onClickBadge?: (
    e: React.MouseEvent<HTMLButtonElement>,
    badge: BadgeState,
  ) => void;
  onUpdate?: UpdateCallback;
}

function Limuse({
  height = 500,
  onUpdate = () => {},
  onClickBadge = () => {},
  onCloseBadge = () => {},
  removeOnRowClick = false,
  ...props
}: LimuseProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [state, dispatch] = useLimuseStore(
    props.data,
    removeOnRowClick,
    onUpdate,
  );

  const updateRootHeight = (emptyBadgesContainer: boolean) => {
    if (!badgesRef.current || !inputRef.current || !rootRef.current) {
      return;
    }

    let badgesContainerHeight =
      badgesRef.current.getBoundingClientRect()["height"];
    let inputSearchHeight = inputRef.current.getBoundingClientRect()["height"];
    let computeStyle = window.getComputedStyle(rootRef.current);
    let flexGap = parseInt(computeStyle.getPropertyValue("gap"));
    let paddingTop = parseInt(computeStyle.getPropertyValue("padding-top"));
    let paddingBottom = parseInt(
      computeStyle.getPropertyValue("padding-bottom"),
    );

    let parent = rootRef.current.parentElement;
    if (!parent) {
      return;
    } else if (emptyBadgesContainer) {
      parent.style.height = `${
        flexGap +
        paddingTop +
        paddingBottom +
        badgesContainerHeight +
        inputSearchHeight
      }px`;
    } else if (!emptyBadgesContainer) {
      parent.style.height = `${paddingTop + paddingBottom + inputSearchHeight}px`;
    }
  };

  updateRootHeight(state.badges.length != 0);

  return (
    <LimuseContext.Provider value={[state, dispatch]}>
      <div className="w-full relative min-h-12 ring-8">
        <div
          className="w-full flex gap-4 flex-col rounded-md px-4 py-3 ring-1
            ring-limuse-main-border-light dark:ring-limuse-main-border-dark
            bg-limuse-bg-main-color-light dark:bg-limuse-bg-main-color-dark
            overflow-hidden"
          title={props.title}
          ref={rootRef}
          style={{
            maxHeight: `${height}px`,
            position: state.showTable ? "absolute" : "static",
            zIndex: state.showTable ? 50 : 0,
          }}
        >
          <div
            className="h-fit w-fit flex flex-wrap gap-2 empty:hidden"
            ref={badgesRef}
          >
            {state.badges.length > 0 &&
              state.badges.map((badge) => (
                <Badge
                  key={badge.id}
                  badgeId={badge.id}
                  title={badge.title}
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    onClickBadge(e, badge);
                  }}
                  onClose={(e: React.MouseEvent<HTMLButtonElement>) => {
                    updateRootHeight(state.badges.length - 1 != 0);
                    onCloseBadge(e, badge);
                  }}
                />
              ))}
          </div>

          <InputSearch
            height={height}
            ref={inputRef}
            updateRootHeight={updateRootHeight}
            minPatternLength={props.minPatternLength}
          >
            {props.children}
          </InputSearch>
        </div>
        {state.showTable && (
          <div
            className="fixed w-screen h-screen top-0 left-0 z-40"
            onClick={() => {
              dispatch({ type: "showTable", show: false });
            }}
          ></div>
        )}
      </div>
    </LimuseContext.Provider>
  );
}

export default Limuse;
