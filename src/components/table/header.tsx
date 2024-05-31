type HeaderOrder = string[];
type HeaderTitlesMap = { [key: string]: string };

interface TableHeaderProps {
  children: React.ReactNode;
}

function TableHeader(props: TableHeaderProps) {
  return (
    <thead
      className="dark:border-zinc-300 dark:bg-limuse-bg-main-color-dark
        border-b-[1px] h-12 sticky z-50 top-0"
    >
      <tr className="dark:text-zinc-400">{props.children}</tr>
    </thead>
  );
}

interface HeaderCellProps {
  title: string;
  align: "left" | "center" | "right";
}

function HeaderCell(props: HeaderCellProps) {
  return (
    <th
      className="font-medium text-[0.97em] first:pl-4"
      align={props.align}
    >
      {props.title}
    </th>
  );
}

export type { HeaderOrder, HeaderTitlesMap };

export { HeaderCell };

export default TableHeader;
