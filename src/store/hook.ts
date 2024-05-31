import { useReducer } from "react";
import {
  ActionTypes,
  defaultState,
  LimuseData,
  LimuseState,
  reducer,
} from "./limuse";

export type UpdateCallback = (data: { [keyof: string]: string }[]) => void;

export type InputStoreData =
  | ({ id: string } & { [keyof: string]: string })
  | { [keyof: string]: { id: string } & { [keyof: string]: string } };

export default function useLimuseStore(
  data: InputStoreData,
  removeOnClickRow: boolean,
  updateCallback?: UpdateCallback,
): [LimuseState, React.Dispatch<ActionTypes>] {
  let rows = [];
  let clonedData = structuredClone(data);

  if (!Array.isArray(clonedData)) {
    for (let values of Object.values(clonedData)) {
      rows.push(...values);
    }
  } else {
    rows = clonedData;
  }

  rows.map((row) => {
    row["render"] = row["match"] = true;
  });
  return useReducer(
    reducer,
    Object.assign(defaultState, {
      data: clonedData,
      updateFunc: updateCallback,
      removeOnClickRow: removeOnClickRow,
    }),
  );
}
