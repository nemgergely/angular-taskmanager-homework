export interface Task {
  id: string;
  title: string;
  description: string;
  done: boolean;
  author?: string;
}