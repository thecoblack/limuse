import { createContext } from "react";
import { UpdateCallback } from "./hook";

interface BadgeState {
  id: string;
  title: string;
}

interface LimuseDataKeys {
  id: string;
  render: boolean;
  match: boolean;
}

type LimuseListData = (LimuseDataKeys & { [key: string]: string })[];

type LimuseCategorisedData = {
  [key: string]: (LimuseDataKeys & { [key: string]: string })[];
};

type LimuseData = LimuseListData | LimuseCategorisedData;

interface LimuseState {
  data: LimuseData;
  showTable: boolean;
  badges: BadgeState[];
  updateFunc: UpdateCallback;
  removeOnClickRow: boolean;
}

const defaultState: LimuseState = {
  data: {},
  badges: [],
  showTable: false,
  updateFunc: () => {},
  removeOnClickRow: false,
};

type ActionTypes = Parameters<ReducerActions[keyof ReducerActions]>[1];

interface LimuseReducerAction {
  type: keyof ReducerActions;
}

interface ReducerActions {
  addBadge: (
    state: LimuseState,
    action: LimuseReducerAction & { badge?: BadgeState },
  ) => LimuseState;
  removeBadge: (
    state: LimuseState,
    action: LimuseReducerAction & { id?: string },
  ) => LimuseState;
  initState: (
    state: LimuseState,
    action: LimuseReducerAction & { newState?: LimuseState },
  ) => LimuseState;
  showTable: (
    state: LimuseState,
    action: LimuseReducerAction & { show?: boolean },
  ) => LimuseState;
  sortData: (
    state: LimuseState,
    action: LimuseReducerAction & { pattern?: string },
  ) => LimuseState;
  removeOnClickRow: (
    state: LimuseState,
    action: LimuseReducerAction & { remove?: boolean },
  ) => LimuseState;
}

const ReducerFunctions: ReducerActions = {
  initState(state, action) {
    return {
      ...state,
      ...action.newState,
    };
  },
  showTable(state, action) {
    return {
      ...state,
      showTable: action.show === true,
    };
  },
  removeOnClickRow(state, action) {
    return {
      ...state,
      removeOnClickRow: action.remove === true,
    };
  },
  addBadge(state, action) {
    if (action.badge === undefined) {
      throw "The badge value cannot be undefined";
    }

    let rows = setRenderedRowState(state.data, action.badge.id, false);
    state.updateFunc(rows);

    return {
      ...state,
      badges: [...state.badges, action.badge],
    };
  },
  removeBadge(state, action) {
    if (action.id === undefined) {
      throw "The id cannot be undefined";
    }

    let rows = setRenderedRowState(state.data, action.id, true);
    let badges = state.badges.filter((badge) => badge.id != action.id);

    state.updateFunc(rows);
    return { ...state, badges: badges };
  },
  sortData(state, action) {
    if (action.pattern === undefined) {
      throw "Pattern attribute cannot be undefined";
    }

    let rows = [];
    if (!Array.isArray(state.data)) {
      for (let values of Object.values(state.data)) {
        rows.push(...values);
      }
    } else {
      rows = state.data;
    }

    for (let row of rows) {
      row.match = row.id.toLowerCase().includes(action.pattern);
    }

    return {
      ...state,
    };
  },
};

const LimuseContext = createContext<[LimuseState, React.Dispatch<ActionTypes>]>(
  [defaultState, () => {}],
);

function setRenderedRowState(
  data: LimuseData,
  id: string,
  render: boolean,
): { [keyof: string]: string }[] {
  let rows = [];
  if (!Array.isArray(data)) {
    for (let values of Object.values(data)) {
      rows.push(...values);
    }
  } else {
    rows = data;
  }

  let selectedRows = [];
  for (let row of rows) {
    if (row.id === id) {
      row.render = render;
    }

    if (!row.render) {
      const { render, ...rowWithoutProps } = row;
      selectedRows.push(rowWithoutProps);
    }
  }

  return selectedRows;
}

function reducer(state: LimuseState, action: ActionTypes): LimuseState {
  return ReducerFunctions[action.type](state, action);
}

export type {
  LimuseState,
  LimuseReducerAction,
  ActionTypes,
  BadgeState,
  LimuseData,
  LimuseListData,
  LimuseCategorisedData,
};

export { defaultState, reducer, LimuseContext };
