export interface ProjectAllotment {
  locationId: number;
  start: string;
  end: string;
  hours: number;
}

export interface Project {
  [k: string]: unknown;
  id: number;
  title: string;
  course: { title: string };
  start: string;
  end: string;
  reservationStart: string;
  allotments: ProjectAllotment[];
  managers: string[];
  open: boolean;
  groupSize: number;
  groupAllottedHours: number;
  selected?: boolean;
}

export class Project implements Project {
  static url = "/api/projects";
  static collectionKey = "projects";
  constructor(
    project = {
      id: 0,
      title: "",
      course: { title: "" },
      start: "",
      end: "",
      reservationStart: "",
      allotments: [] as ProjectAllotment[],
      managers: [] as string[],
      open: false,
      groupSize: 0,
      groupAllottedHours: 0,
    }
  ) {
    Object.assign(this, project);
  }
}

export default Project;
