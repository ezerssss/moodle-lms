export interface ActivityInterface {
  cmid: number;
  modname: string;
  state: number;
}

export type ActivitySliceType = Record<string, ActivityInterface[]>;
