export interface Assignment {
  cmid: number;
  duedate: string;
  name: string;
}

export interface AssignmentSliceInterface {
  shortname: string;
  assignments: Assignment[];
}
