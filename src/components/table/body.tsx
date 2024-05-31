import React, { useContext } from "react";
import { CategoryRow } from "./row";

import {
  LimuseCategorisedData,
  LimuseContext,
  LimuseListData,
} from "./../../store/limuse";

interface TableBodyProps {
  children: React.ReactNode;
}

function getCategorisedTable(
  data: LimuseCategorisedData,
  bodyTemp: JSX.Element,
  removeOnClickRow: boolean,
): React.ReactNode[] {
  let nodes = [];

  for (let [category, rows] of Object.entries(data)) {
    nodes.push(
      <CategoryRow
        title={category}
        colspan={2}
      />,
    );

    nodes.push(...getListTable(rows, bodyTemp, removeOnClickRow));
  }

  return nodes;
}

function getListTable(
  data: LimuseListData,
  bodyTemp: JSX.Element,
  removeOnClickRow: boolean,
): React.ReactNode[] {
  let nodes = [];

  if (!React.isValidElement(bodyTemp)) {
    throw new Error("The body template is not a valid React Element.");
  }

  for (let row of data) {
    if (!row.match || (!row.render && removeOnClickRow)) {
      continue;
    }

    nodes.push(React.cloneElement(bodyTemp, { data: row, rowId: row.id }));
  }

  return nodes;
}

function TableBody(props: TableBodyProps) {
  const state = useContext(LimuseContext)[0];

  let children = [];
  let bodyTemp = props.children as JSX.Element;
  if (Array.isArray(state.data)) {
    children = getListTable(state.data, bodyTemp, state.removeOnClickRow);
  } else {
    children = getCategorisedTable(
      state.data,
      bodyTemp,
      state.removeOnClickRow,
    );
  }

  return <tbody className="relative">{...children}</tbody>;
}

export default TableBody;
