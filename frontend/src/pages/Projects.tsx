import ProjectCard from '../components/ProjectCard';
// import { projects } from '../data/projects';
import { programmerProjects, artistProjects } from '../data/projects';

const Projects = ({ activeRole }: { activeRole: 'Programmer' | '3D Artist' }) => {
    const projectsToShow = activeRole === 'Programmer' ? programmerProjects : artistProjects;
    return (
        <div className="pb-20 md:pb-0 mt-10">
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-3xl font-bold">Projects</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projectsToShow.map((project) => (
                    <ProjectCard 
                        key={project.id} 
                        project={project} 
                        activeRole={activeRole}
                    />
                ))}
            </div>
        </div>
    );
};
export default Projects; 