import Project from "../resources/Project";

export function findProjectById(projects: Project[], id: number): Project {
  const proj = projects.filter(function (project) {
    // eslint-disable-next-line
    return project.id == id;
  });
  console.log(proj[0]);
  return proj[0];
};