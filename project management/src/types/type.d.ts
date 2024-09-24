interface projectType {
  id: number;
  title: string;
  description: string;
  dueDate: string;
}

interface taskType {
  id: number;
  projectId: number;
  text: string;
}
