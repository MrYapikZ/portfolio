import { Icon } from "@phosphor-icons/react";

export interface SocialItem {
  name: string;
  url: string;
  icon: Icon;
  color?: string;
}

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
  socials: SocialItem[];
  projects: Project[];
}