import { MouseEvent, useContext } from "react";
import { LimuseContext } from "./../../store/limuse";

type ClickEvent = MouseEvent<HTMLButtonElement>;

interface BadgeProps {
  badgeId: string;
  title: string;
  onClick?: (e: ClickEvent) => void;
  onClose?: (e: ClickEvent) => void;
}

export default function Badge(props: BadgeProps) {
  const dispatch = useContext(LimuseContext)[1];
  const clickEventHandler = (e: ClickEvent) => {
    let target: HTMLElement = e.target as HTMLElement;

    if (["svg", "path"].includes(target.localName)) {
      dispatch({
        type: "removeBadge",
        id: props.badgeId,
      });

      if (props.onClose !== undefined) {
        props.onClose(e);
      }
    }

    if (props.onClick !== undefined) {
      props.onClick(e);
    }
  };

  return (
    <span
      className="flex text-sm select-none flex-nowrap items-center pt-0.5 pb-1
        ring-1 rounded-md dark:text-white text-black
        dark:bg-limuse-badge-bg-dark dark:ring-limuse-badge-border-dark
        hover:dark:bg-limuse-badge-border-dark"
      onClick={(e: ClickEvent) => {
        clickEventHandler(e);
      }}
      style={{
        cursor: props.onClick !== undefined ? "cursor" : "default",
      }}
    >
      <span className="pl-3 pr-1 leading-4">{props.title}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="fill-white text-xs h-fit px-1.5 w-5 cursor-pointer
          hover:fill-violet-900"
        viewBox="0 0 384 512"
      >
        <path
          d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6
          105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5
          12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5
          45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
        />
      </svg>
    </span>
  );
}
