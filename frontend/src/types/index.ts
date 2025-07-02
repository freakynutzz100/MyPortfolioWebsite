export interface NavbarProps {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

export interface ProjectType {
    id: string;
    title: string;
    description: string;
    image?: string;
    technologies: string[];
    githubUrl?: string;
    liveUrl?: string;
    createdOn?: string;
    roles?: ('Programmer' | '3D Artist')[];
}

export interface SkillType {
    name: string;
    icon?: string;
}

export interface TestimonialType {
    id: string;
    name: string;
    position: string;
    company: string;
    photo?: string;
    content: string;
} 