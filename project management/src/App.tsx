import { useState } from "react";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSideBar from "./components/ProjectsSideBar";
import NewProject from "./components/NewProject";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectState, setProjectState] = useState<{ selectedProjectId?: number | null; projects: projectType[]; tasks: taskType[] }>({
    selectedProjectId: undefined,
    projects: [],
    tasks: []
  });

  const handleAddTask = (text: string) => {
    const newTask = {
      text: text,
      projectId: projectState.selectedProjectId!,
      id: Math.random()
    };

    setProjectState((prev) => {
      return { ...prev, tasks: [...prev.tasks, newTask] };
    });
  };

  const handleDeleteTask = (taskId: number) => {
    setProjectState((prev) => {
      return { ...prev, tasks: prev.tasks.filter((task) => task.id !== taskId) };
    });
  };

  const handleSelectProject = (projectId: number) => {
    setProjectState((prev) => {
      return { ...prev, selectedProjectId: projectId };
    });
  };

  const handleDeleteProject = () => {
    setProjectState((prev) => {
      return {
        ...prev,
        selectedProjectId: undefined,
        projects: prev.projects.filter((project) => project.id !== prev.selectedProjectId),
        tasks: prev.tasks.filter((task) => task.projectId !== prev.selectedProjectId)
      };
    });
  };

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

  const selectedProject = projectState.projects.find((v) => v.id === projectState.selectedProjectId);

  let content;

  if (projectState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />;
  } else if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  } else if (selectedProject) {
    content = (
      <SelectedProject
        project={selectedProject}
        tasks={projectState.tasks.filter((task) => task.projectId === projectState.selectedProjectId)}
        onDelete={handleDeleteProject}
        onAddTask={handleAddTask}
        onDeleteTask={handleDeleteTask}
      />
    );
  }
  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSideBar
        onStartAddProject={handleStartAddProject}
        projects={projectState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
