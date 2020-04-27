export interface Project {
  end: string | Date;
  id: string | number;
  locationIds: (string | number)[];
  open?: boolean;
  parentId: string | number;
  reservationEnd: string | Date;
  reservationStart: string | Date;
  selected: boolean;
  start: string | Date;
  title: string;
}

export class Project {
  constructor(project: Project) {
    Object.assign(this, project);
    this.start = new Date(this.start);
    this.end = new Date(this.end);
    if (typeof this.locationIds === "string") {
      this.locationIds = JSON.parse(this.locationIds);
    }
  }
}

export interface ProjectGroups {
  [k: string]: Project[];
}

export const projectGroupReducer = (
  groups: ProjectGroups | undefined,
  project: Project
): ProjectGroups | undefined => {
  if (!project.parentId) {
    return groups;
  }
  if (groups) {
    if (!groups[project.parentId]) {
      groups[project.parentId] = [project];
      return groups;
    }
    groups[project.parentId].push(project);
    return groups;
  }
};

export default Project;
