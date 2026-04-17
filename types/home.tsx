export interface Project {
  title: string;
  category: string;
  description: string;
  image: string;
  link?: string;
}

export interface HomeProps {
  names: string[];
  altNames: string[];
  projects: Project[];
}