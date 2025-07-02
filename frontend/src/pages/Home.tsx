import { Link } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import RevealProjectCard from '../components/RevealProjectCard';
import SkillCard from '../components/SkillCard';
import { useCursorFollow } from '../hooks/useCursorFollow';
import ScrollRevealProjects from '../components/ScrollRevealProjects';
// import { featuredProjects } from '../data/projects';
import { programmerProjects, artistProjects } from '../data/projects';
// import { skills } from '../data/skills';
import { programmerSkills, artistSkills } from '../data/skills';
import { MdArrowOutward } from "react-icons/md";

// A separate component for the profile image with cursor following effect
interface ProfileImageProps {
    activeRole: 'Programmer' | '3D Artist';
}

const mernTooltipStyles = `
  relative inline-block group cursor-pointer
  before:content-[attr(data-tooltip)]
  before:absolute before:-top-8 before:left-1/2 before:-translate-x-1/2
  before:bg-gray-800 before:px-2 before:py-1
  before:rounded before:text-sm before:whitespace-nowrap
  before:opacity-0 before:transition-opacity
  hover:before:opacity-100
  dark:before:bg-gray-700
  before:text-white
  hover:underline
  transition-all duration-300
`;


const ProfileImage = ({ activeRole }: ProfileImageProps) => {
    const profileRef = useRef<HTMLDivElement>(null);
    const { style, updateElementPosition } = useCursorFollow({
        maxRotation: 5, // Reduced rotation to prevent image from getting cut off
        followIntensity: 0.005 // Reduced intensity to minimize movement
    });

    useEffect(() => {
        updateElementPosition(profileRef);
        const handleResize = () => updateElementPosition(profileRef);
        window.addEventListener('resize', handleResize);
        const handleScroll = () => updateElementPosition(profileRef);
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [updateElementPosition]);

    const imageUrl =
        activeRole === '3D Artist'
            ? "https://res.cloudinary.com/dvb5mesnd/image/upload/v1751159041/cropped_circle_image1_jjep6n.png"
            : "https://res.cloudinary.com/dvb5mesnd/image/upload/v1749806923/YOG_PFP_CIRCLE_CROP_zkgsw6.png";

        return (
            <div
                ref={profileRef}
                className={`
                    group
                    w-[120px] h-[120px] md:w-[240px] md:h-[240px] lg:w-[280px] lg:h-[280px]
                    rounded-full border-2 md:border-4 border-transparent
                    ring-4 md:ring-6
                    ${activeRole === 'Programmer' ? 'ring-blue-600 dark:ring-blue-600' : 'ring-red-600 dark:ring-red-600'}
                    flex-shrink-0 order-1 md:order-2 self-start
                    transition-all duration-500 transform-gpu
                    hover:ring-[6px] md:hover:ring-[8px]
                    overflow-hidden
                    bg-transparent
                    flex items-center justify-center
                `}
                style={{
                    ...style,
                    transform: `${style.transform || ''} rotateY(${activeRole === '3D Artist' ? '180deg' : '0deg'})`,
                    perspective: '1000px'
                }}
            >
                <img
                    src={imageUrl}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full bg-transparent transition-transform duration-500 group-hover:scale-110"
                />
            </div>
        );
};

interface HomeProps {
    activeRole: 'Programmer' | '3D Artist';
}

const Home = ({ activeRole }: HomeProps) => {

    const skillsToShow = activeRole === 'Programmer' ? programmerSkills : artistSkills;
    
    const featuredProjects = activeRole === 'Programmer'
    ? programmerProjects.slice(0, 3)
    : artistProjects.slice(0, 3);
    
    return (
        <div className="md:pb-20 pb-0">
            {/* Hero Section */}
            <section className="md:mb-32 mb-20 md:mt-20 pt-20 md:pt-10 relative overflow-visible">
                {/* Banner background with fade effect - full width */}
                <div className="banner-container">
                    <div 
                        className={`banner-gradient h-[200px] md:h-[100vh] ${activeRole === 'Programmer' ? 'programmer-gradient' : 'artist-gradient'}`}
                    ></div>
                </div>
                <div className="flex flex-col md:flex-row md:justify-between md:items-center items-start gap-8 relative z-10 px-4 md:px-0 py-4">
                    {/* Content - Order 2 on mobile, 1 on desktop */}
                    <div className="md:max-w-2xl order-2 md:order-1 w-full mt-0 md:mt-48">
                        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-left">
                            <span className="dark:text-gray-400 text-gray-800">Hi <span className="text-yellow-400 waving-hand">👋</span>, I'm </span>
                            <span className="dark:text-white text-black underline">Yog Vasaikar!</span>
                        </h1>
                        {activeRole === 'Programmer' ? (
                            <>
                                <ul className="mb-6 space-y-2 list-disc pl-5 text-sm md:text-base dark:text-gray-300 text-gray-700">
                                    <li>I'm a <span className='font-bold'>Programmer, an I.T. graduate</span> who, enjoys creating cool looking, amazing, dynamic websites using <Link to="https://react.dev/" rel="noopener noreferrer" className="text-blue-400 hover:underline mx-1">React.js.</Link></li>
                                    <li>I'm a Fullstack Developer, familiar with typical{' '}
                                    <span className="font-semibold space-x-0.5">
                                        <Link 
                                            to="https://www.mongodb.com/"
                                            className={`${mernTooltipStyles} text-green-500`}
                                            data-tooltip="MongoDB"
                                        >M</Link>
                                        <Link 
                                            to="https://expressjs.com/"
                                            className={`${mernTooltipStyles} text-orange-400`}
                                            data-tooltip="Express.js"
                                        >E</Link>
                                        <Link 
                                            to="https://react.dev/"
                                            className={`${mernTooltipStyles} text-blue-400`}
                                            data-tooltip="React.js"
                                        >R</Link>
                                        <Link 
                                            to="https://nodejs.org/"
                                            className={`${mernTooltipStyles} text-green-600`}
                                            data-tooltip="Node.js"
                                        >N</Link>
                                    </span>{'  '}
                                    Framework and knows a bit about{' '}
                                    <span className="font-semibold space-x-0.5">
                                        <Link 
                                            to="https://www.mongodb.com/"
                                            className={`${mernTooltipStyles} text-green-500`}
                                            data-tooltip="MongoDB"
                                        >M</Link>
                                        <Link 
                                            to="https://expressjs.com/"
                                            className={`${mernTooltipStyles} text-orange-400`}
                                            data-tooltip="Express.js"
                                        >E</Link>
                                        <Link 
                                            to="https://angular.dev/"
                                            className={`${mernTooltipStyles} text-red-500`}
                                            data-tooltip="Angular.js"
                                        >A</Link>
                                        <Link 
                                            to="https://nodejs.org/"
                                            className={`${mernTooltipStyles} text-green-600`}
                                            data-tooltip="Node.js"
                                        >N</Link>
                                    </span>{' '}
                                    aswell.
                                </li>
                                    <li>
                                        <div className="flex flex-wrap items-center gap-x-1 gap-y-1">
                                            I excel in
                                            <Link to="https://www.java.com/" rel="noopener noreferrer" className="text-orange-500 hover:underline mx-1">Java</Link>
                                            and 
                                            <Link to="https://developer.mozilla.org/docs/Web/JavaScript" rel="noopener noreferrer" className="text-yellow-600 dark:text-yellow-400 hover:underline mx-1">JavaScript.</Link>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="flex flex-wrap items-center gap-x-1 gap-y-1">
                                            Apart from Java and JavaScript, I'd also studied
                                            <Link to="https://nextjs.org/" rel="noopener noreferrer" className="dark:white black hover:underline mx-1">Next.js,</Link>
                                            <Link to="https://dotnet.microsoft.com/en-us/" rel="noopener noreferrer" className="text-purple-500 hover:underline mx-1">.NET,</Link>
                                            <Link to="https://www.python.org/" rel="noopener noreferrer" className="text-green-500 hover:underline mx-1">Python,</Link>
                                            <Link to="https://www.php.net/" rel="noopener noreferrer" className="text-purple-500 hover:underline mx-1">PHP,</Link>
                                            <Link to="https://www.mysql.com/" rel="noopener noreferrer" className="hover:underline mx-1"><span className='text-blue-400'>My</span><span className='text-orange-500'>SQL,</span></Link>
                                            <Link to="https://learn.microsoft.com/en-us/dotnet/csharp/" rel="noopener noreferrer" className="text-purple-600 hover:underline mx-1">C#,</Link>
                                            <Link to="https://unity.com/" rel="noopener noreferrer" className="dark:white black hover:underline mx-1">Unity,</Link>
                                            and <Link to="/profile#skills" rel="noopener noreferrer" className="text-blue-400 hover:underline"> more,</Link>
                                            <span>either by myself or through</span><span> my college curriculum.</span>
                                        </div>  
                                    </li>
                                    <li>
                                        <div className="flex flex-wrap items-center gap-x-1 gap-y-1">
                                            <span className="whitespace-nowrap">Currently learning</span>
                                            <Link 
                                                to="https://threejs.org/" 
                                                rel="noopener noreferrer" 
                                                className="dark:white black hover:underline mx-1 font-bold"
                                            >Three.js</Link>
                                            <span>to integrate</span><span>my 3D skills</span>
                                            <span>with my web</span><span> development skill.</span>
                                        </div>
                                    </li>
                                    <li>
                                        Recently started freelancing on
                                        <span className="relative group mx-1 whitespace-nowrap">
                                            <Link
                                                to="https://www.upwork.com/freelancers/~015ce70c38026f389e?mp_source=share"
                                                rel="noopener noreferrer"
                                                className="dark:text-green-600 text-green-600 hover:underline"
                                            >
                                                Upwork.
                                            </Link>
                                            <Link
                                                to="https://www.upwork.com/freelancers/~015ce70c38026f389e?mp_source=share"
                                                rel="noopener noreferrer"
                                                className='cursor-pointer hover:text-green-400 text-white '>
                                                <span className="absolute left-1/2 -top-8 -translate-x-1/2 px-3 py-1 rounded bg-gray-800 text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                                    Check my Profile <span className="inline-block"><MdArrowOutward /></span>
                                                </span>
                                            </Link>
                                        </span>
                                    </li>
                                    {/* <li>Proficient in asynchronous communication for seamless collaboration in remote teams.</li> */}
                                    {/* <li>
                                        Open to new opportunities, eager to work and learn new things
                                    </li> */}
                                    {/* <li>
                                        Joined Upwork as a freelancer
                                        <a href="https://www.upwork.com/freelancers/~019553adae7272fc11" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline ml-1">
                                            @BrightStack F
                                        </a>
                                    </li> */}
                                </ul>
                            </>
                        ) : (
                            <>
                                <ul className="mb-6 space-y-2 list-disc pl-5 text-sm md:text-base dark:text-gray-300 text-gray-700">
                                    <li>I'm a self taught <span className='font-bold'>3D Artist</span>, who enjoys creating 3D models, product designs and animations into the 3D space.</li>
                                    <li>
                                        <div className="flex flex-wrap items-center gap-x-1 gap-y-1">
                                            I learnt 3D art solely from YouTube by watching videos from tutors such as 
                                            <Link to="https://www.youtube.com/@blenderguru" rel="noopener noreferrer" className="text-pink-600 dark:text-pink-400 hover:underline mx-1">BlenderGuru, </Link>
                                            <Link to="https://www.youtube.com/@TheDucky3D/videos" rel="noopener noreferrer" className="text-blue-400 hover:underline mx-1">Ducky3D, </Link>
                                            <Link to="https://www.youtube.com/@CGMatter/videos" rel="noopener noreferrer" className=" text-red-500 hover:underline mx-1">CGMatter, </Link>
                                            <Link to="https://www.youtube.com/@CGGeek/videos" rel="noopener noreferrer" className="text-orange-500 hover:underline mx-1">CGGeek, </Link>
                                            and <Link to="https://www.youtube.com/results?search_query=blender3d+tutorials" rel="noopener noreferrer" className="text-red-500 hover:underline"> more.</Link>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="flex flex-wrap items-center gap-x-1 gap-y-1">
                                            I use
                                            <Link to="https://www.blender.org/" rel="noopener noreferrer" className="text-orange-500 hover:underline mx-1">Blender3D</Link>
                                            as my 3D Software.
                                        </div>
                                    </li>
                                    <li>
                                        I excel in Object Modeling, Shading, Texturing, UV Mapping, Lighting, Geometry Nodes, Simulations, Camera Adjustment and Scene setup and also in basic Animation. 
                                    </li>
                                    {/* <li>
                                        I lack a bit in Rigging, Character Animation and Sculpting.
                                    </li> */}
                                    <li>
                                        <div className="flex flex-wrap items-center gap-x-1 gap-y-1">
                                            <span className="whitespace-nowrap">I can also make Websites with 3D content</span>
                                            <Link 
                                                to="https://threejs.org/" 
                                                rel="noopener noreferrer" 
                                                className="dark:white black hover:underline mx-1 font-bold"
                                            >using Three.js.</Link>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="flex flex-wrap items-center gap-x-1 gap-y-1 ">
                                            <span className="whitespace-nowrap">I can also make 3D games using a software </span>
                                            <Link 
                                                to="https://unity.com/" 
                                                rel="noopener noreferrer" 
                                                className="dark:white black hover:underline mx-1 font-bold"
                                            >Unity Engine.</Link>
                                        </div>
                                    </li>
                                    {/* <li>
                                        <div className="flex flex-wrap items-center gap-x-1 gap-y-1">
                                            <span className="whitespace-nowrap">Currently exploring Animation.</span>
                                        </div>
                                    </li> */}
                                    <li>
                                        Recently started freelancing on
                                        <span className="relative group mx-1 whitespace-nowrap">
                                            <Link
                                                to="https://www.upwork.com/freelancers/~015ce70c38026f389e?mp_source=share"
                                                rel="noopener noreferrer"
                                                className="dark:text-green-600 text-green-600 hover:underline"
                                            >
                                                Upwork.
                                            </Link>
                                            <Link
                                                to="https://www.upwork.com/freelancers/~015ce70c38026f389e?mp_source=share"
                                                rel="noopener noreferrer"
                                                className='cursor-pointer hover:text-green-400 text-white '>
                                                <span className="absolute left-1/2 -top-8 -translate-x-1/2 px-3 py-1 rounded bg-gray-800 text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                                    Check my Profile <span className="inline-block"><MdArrowOutward /></span>
                                                </span>
                                            </Link>
                                        </span>
                                    </li>
                                    {/* <li>Proficient in asynchronous communication for seamless collaboration in remote teams.</li> */}
                                    {/* <li>
                                        Open to new opportunities, eager to work and learn new things
                                    </li> */}
                                    {/* <li>
                                        Joined Upwork as a freelancer
                                        <a href="https://www.upwork.com/freelancers/~019553adae7272fc11" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline ml-1">
                                            @BrightStack F
                                        </a>
                                    </li> */}
                                </ul>
                            </>
                        )}

                        <div className="flex flex-wrap items-center gap-4 md:mt-6 mt-0">
                            <Link
                                to="/profile"
                                className={`px-5 py-2 font-medium transition-all duration-300 border rounded-md hover:scale-110 ${
                                    activeRole === 'Programmer'
                                        ? 'bg-blue-600 text-white hover:bg-blue-700 border-blue-700 dark:bg-white dark:text-blue-600 dark:hover:bg-gray-100 dark:border-blue-600'
                                        : 'bg-red-600 text-white hover:bg-red-700 border-red-700 dark:bg-white dark:text-red-600 dark:hover:bg-gray-100 dark:border-red-600'
                                }`}
                            >
                                View Profile
                            </Link>
                            <Link
                                to="/resume"
                                className={`px-5 py-2 font-medium transition-all duration-300 border rounded-md hover:scale-110 ${
                                    activeRole === 'Programmer'
                                        ? 'bg-white text-blue-600 hover:bg-gray-100 border-blue-600 dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700 dark:border-blue-700'
                                        : 'bg-white text-red-600 hover:bg-gray-100 border-red-600 dark:bg-red-600 dark:text-white dark:hover:bg-red-700 dark:border-red-700'
                                }`}
                            >
                                View Resume
                            </Link>
                        </div>
                    </div>

                    {/* Profile Image - Order 1 on mobile, 2 on desktop */}
                    <ProfileImage activeRole={activeRole} />
                </div>
            </section>

            {/* Projects Section with Scroll Animation */}
            <section id="projects-section" className="mb-16">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold ">Projects</h2>
                </div>

                <ScrollRevealProjects projects={featuredProjects} activeRole={activeRole} />
            </section>

            {/* Skills Section */}
            <section>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Skills</h2>
                    <Link
                        to="/profile#skills"
                        className={`text-sm hover:underline flex items-center ${
                            activeRole === 'Programmer'
                                ? 'text-blue-400 dark:text-blue-300'
                                : 'text-red-600 dark:text-red-300'}`}
                    >
                        View all skills →
                    </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {/* {skills.slice(0, 10).map((skill, index) => (
                        <SkillCard
                            key={index}
                            name={skill.name}
                            iconType={skill.iconType}
                            colorClass={skill.colorClass}
                            darkModeClass={skill.darkModeClass}
                            activeRole={activeRole} 
                        />
                    ))} */}
                    {skillsToShow.slice(0, 10).map((skill, index) => (
                        <SkillCard
                            key={index}
                            name={skill.name}
                            iconType={skill.iconType}
                            colorClass={skill.colorClass}
                            darkModeClass={skill.darkModeClass}
                            activeRole={activeRole}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
