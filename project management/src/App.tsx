import { useState } from "react";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSideBar from "./components/ProjectsSideBar";
import NewProject from "./components/NewProject";

function App() {
  const [projectState, setProjectState] = useState<{ selectedProjectId?: null; projects: projectType[] }>({
    selectedProjectId: undefined,
    projects: []
  });

  const handleStartAddProject = () => {
    setProjectState((prev) => {
      return { ...prev, selectedProjectId: null };
    });
  };

  const handleCancelAddProject = () => {
    setProjectState((prev) => {
      return { ...prev, selectedProjectId: undefined };
    });
  };

  const handleAddProject = (projectData: Omit<projectType, "id">) => {
    const newProject = {
      ...projectData,
      id: Math.random()
    };

    setProjectState((prev) => {
      return { ...prev, selectedProjectId: undefined, projects: [...prev.projects, newProject] };
    });
  };

  let content;
  if (projectState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />;
  } else if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }
  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSideBar onStartAddProject={handleStartAddProject} projects={projectState.projects} />
      {content}
    </main>
  );
}

export default App;
