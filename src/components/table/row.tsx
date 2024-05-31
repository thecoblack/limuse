import React from "react";

interface CategoryRowProps {
  title: string;
  colspan: number;
}

function CategoryRow(props: CategoryRowProps) {
  return (
    <tr className="dark:bg-zinc-600">
      <td
        colSpan={props.colspan}
        className="pl-4 pb-1 pt-0.5 leading-none dark:text-zinc-300 font-medium
          text-sm"
      >
        {props.title}
      </td>
    </tr>
  );
}

interface RowProps {
  rowId: string;
  children: React.ReactNode;
  data?: { id: string } & { [keyof: string]: string };
  onClick?: (e: React.MouseEvent<HTMLTableRowElement>) => void;
}

function BodyRow(props: RowProps) {
  return (
    <tr
      key={props.rowId}
      onClick={props.onClick}
      data-row-id={props.rowId}
      data-title={props.data?.id}
      className="dark:border-b-zinc-300/40 border-b-[1px] h-12 last:border-none
        hover:bg-zinc-700 cursor-pointer"
    >
      {React.Children.toArray(props.children).map((child) =>
        React.cloneElement(child, { data: props.data }),
      )}
    </tr>
  );
}

interface RowCellProps {
  align?: "left" | "center" | "right";
  text?: string;
  data?: { [keyof: string]: string };
  dataAssign: string;
}

function RowCell(props: RowCellProps) {
  return (
    <td
      className="font-regular text-sm dark:text-zinc-300 first:pl-4"
      align={props.align}
    >
      {props.data[props.dataAssign]}
    </td>
  );
}

export { RowCell, BodyRow, CategoryRow };
