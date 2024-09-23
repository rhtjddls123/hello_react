import { useState } from "react";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSideBar from "./components/ProjectsSideBar";
import NewProject from "./components/NewProject";

function App() {
  const [projectState, setProjectState] = useState<{ selectedProjectId?: null; projects: [] }>({
    selectedProjectId: undefined,
    projects: []
  });

  const handleStartAddProject = () => {
    setProjectState((prev) => {
      return { ...prev, selectedProjectId: null };
    });
  };

  let content;
  if (projectState.selectedProjectId === null) {
    content = <NewProject />;
  } else if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }
  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSideBar onStartAddProject={handleStartAddProject} />
      {content}
    </main>
  );
}

export default App;
