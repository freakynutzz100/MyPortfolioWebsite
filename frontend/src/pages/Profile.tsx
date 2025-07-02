import { FaGraduationCap, FaBriefcase } from 'react-icons/fa';
import SkillCard from '../components/SkillCard';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
// import { skills } from '../data/skills';
import { programmerSkills, artistSkills } from '../data/skills';


const Profile = ({ activeRole }: { activeRole: 'Programmer' | '3D Artist' }) => {
    const location = useLocation();
    const skillsToShow = activeRole === 'Programmer' ? programmerSkills : artistSkills;
    // Handle scrolling to sections based on URL hash
    useEffect(() => {
        if (location.hash) {
            const id = location.hash.substring(1); // remove the # symbol
            const element = document.getElementById(id);
            if (element) {
                // Wait a bit for the component to fully render before scrolling
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }, [location]);

    return (
        <div className="pb-20 md:pb-0">
            <h1 className="text-3xl font-bold mb-10 mt-10">Profile</h1>

            {/* Bio Section */}
            <section className="mb-16">
                {activeRole === 'Programmer' ? (
                    <>
                        <p className="text-gray-700 dark:text-gray-300 mb-6">
                            Hi, I am Yog Vasaikar, an I.T. graduate from K.C. college, Mumbai, India, looking forward on creating
                            amazing projects, working for clients or a company and learning different things in the process.
                            <br/>
                            Throughout the graduation, I developed various <span className='hover:underline font-bold dark:text-blue-400 text-blue-500'><a href='https://brightstack-portfolio.vercel.app/projects'>projects</a></span>, 
                            which indeed made me learn various web development and app development skills, you can <span className='hover:underline font-bold dark:text-blue-400 text-blue-500'><a href='https://brightstack-portfolio.vercel.app/profile#skills'>check below.</a></span>
                            <br />
                            Primarily, I keep my expertise in JavaScript for Web Devlopment and Java foor Android and web devlopment (using NetBeans).
                            <br />
                            As a web devloper and a 3D artist, I can also create websites with 3D content using <span className='hover:underline font-bold'><a href='https://threejs.org/'>Three.js</a></span>.
                            <br />
                            <br/>
                            I love taking on challenging projects that will push me to learn
                            and grow.
                            <br />
                            Comfortable with English, Hindi and Marathi for Communication.
                        </p>
                    </>
                ) : (
                    <>
                        <p className="text-gray-700 dark:text-gray-300 mb-6">
                            Hi, I am Yog Vasaikar, a self taught 3D Artist from Youtube, looking forward on creating
                            amazing renders and animations, working for clients or a company and learning different things in the process.
                            <br/>
                            I started back in 2022 and since then, I'd developed various <span className='hover:underline font-bold dark:text-red-600 text-red-700'><a href='https://brightstack-portfolio.vercel.app/projects'>projects</a></span>, 
                            which indeed made me learn various skills that you can <span className='hover:underline font-bold dark:text-red-600 text-red-700'><a href='https://brightstack-portfolio.vercel.app/profile#skills'>check below.</a></span>
                            <br />
                            I can do 3D product renders, your youtube channel/ events intro animations, logo reveal animations, 3D image and video advertisements and much more.
                            <br /><br/>
                            I also had <span className='hover:underline font-bold'><a href='https://unity.com/'>Unity</a></span> in my degree curriculum, so I can also create amazing 3D games using Unity Engine.
                            <br />
                            As a 3D artist and a web devloper, I can also create websites with 3D content using <span className='hover:underline font-bold'><a href='https://threejs.org/'>Three.js</a></span>.
                            <br />
                            I lack a bit in Rigging, Character Animation and Sculpting.
                            <br/><br/>
                            I love taking on challenging projects that will push me to learn and grow.
                            <br />
                            Comfortable with English, Hindi and Marathi for Communication.
                        </p>
                    </>
                )}
                {/* <p className="text-gray-700 dark:text-gray-300">
                    BrightStack, is a team project of 2025 I.T. passouts from India, to deliver good quality websites and applications, to the clients around the world at a proper affordable price.
                    Along with general web and app development, we also provide our maintainence, SEO and marketing services.
                    <br /> <br/>
                    Throughout the graduation, we developed various <span className='hover:underline font-bold dark:text-blue-400 text-orange-500'><a href='https://brightstack-portfolio.vercel.app/projects'>projects</a></span>, which indeed made us learn various web development and app development skills, you can <span className='hover:underline font-bold dark:text-blue-400 text-orange-500'><a href='https://brightstack-portfolio.vercel.app/profile#skills'>check below.</a></span>
                    <br /> <br/>
                    We aim at empowering businesses to become impactful brands through our knowledge and efforts.
                    Whether you're a startup or an established company, we help shape your digital identity through our excellent web and app development services, coupled with results-driven digital marketing strategies.
                </p> */}
                {/* <a href='https://brightstack-portfolio.vercel.app/resume'><button className="px-5 py-2 mt-6 font-medium dark:bg-blue-600 dark:hover:bg-blue-700 hover:scale-110 transition-all duration-300 dark:text-white rounded-md bg-white shadow-sm text-blue-600">
                    View Resume
                </button></a> */}
                <Link
                    to="/resume"
                    className={`px-5 mt-6 py-2 font-medium transition-all duration-300 border rounded-md hover:scale-110 ${
                        activeRole === 'Programmer'
                            ? 'bg-blue-600 text-white hover:bg-blue-700 border-blue-700'
                            : 'bg-red-600 text-white hover:bg-red-700 border-red-700'
                    }`}
                >
                    View Resume
                </Link>
            </section>

            {/* Experience Section */}
            <section className="mb-16">
                <h2 className="text-3xl font-bold mb-10">Work Experience</h2>

                <div className="relative">
                    {/* Timeline line */}
                    {/* <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-green-500"></div> */}

                    {/* Experience Item 1 */}
                    {/* <div className="relative mb-16">
                        <div className="flex">
                            <div className="absolute left-0 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center z-10">
                                <FaBriefcase className="text-2xl" />
                            </div>

                            <div className="ml-20">
                                <h3 className="text-2xl font-bold">Freelance Software Developer</h3>
                                <p className="dark:text-gray-400 text-gray-700">Remote</p>
                                <p className="dark:text-gray-400 text-gray-700 mb-6">Jul 2024 - Present</p>

                                <ul className="space-y-4 list-disc pl-5 text-gray-700 dark:text-gray-300">
                                    <li>Built a fully responsive website using Next.js and delivered it before the deadline.</li>
                                    <li>Integrated Google Analytics and HubSpot for traffic tracking and lead capture.</li>
                                </ul>
                            </div>
                        </div>
                    </div> */}

                    {/* Experience Item 2 */}
                    {/* <div className="relative mb-16">
                        <div className="flex">
                            <div className="absolute left-0 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center z-10">
                                <FaBriefcase className="text-2xl" />
                            </div>

                            <div className="ml-20">
                                <h3 className="text-2xl font-bold">Software Engineer</h3>
                                <p className="dark:text-gray-400 text-gray-700">Big Binary LLC. (Remote)</p>
                                <p className="dark:text-gray-400 text-gray-700 mb-6">Feb 2021 - Jul 2021</p>

                                <ul className="space-y-4 list-disc pl-5 text-gray-700 dark:text-gray-300">
                                    <li>Contributed as a full stack developer to the client project and in-house projects like Neeto KB, Neeto Auth.</li>
                                    <li>Contributed to implementing Single-Sign-On(SSO). Wrote functional, unit, and integration tests for application quality assurance.</li>
                                </ul>
                            </div>
                        </div>
                    </div> */}

                    {/* Experience Item 3 */}
                    {/* <div className="relative">
                        <div className="flex">
                            <div className="absolute left-0 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center z-10">
                                <FaBriefcase className="text-2xl" />
                            </div>

                            <div className="ml-20">
                                <h3 className="text-2xl font-bold">Full Stack Development (MERN)</h3>
                                <p className="dark:text-gray-400 text-gray-700">AltCampus</p>
                                <p className="dark:text-gray-400 text-gray-700 mb-6">Dec 2019 - Oct 2020</p>

                                <ul className="space-y-4 list-disc pl-5 text-gray-700 dark:text-gray-300">
                                    <li>Developed several full-stack(MERN) web applications.</li>
                                    <li>Took some classes and doubt-clearing sessions on JavaScript, React.js, and Node.js</li>
                                    <li>Contributed to internal CMS projects.</li>
                                </ul>
                            </div>
                        </div>
                    </div> */}

                    {activeRole === 'Programmer' ? (
                        <>
                            <div className="relative mb-16"> No Work experience as of now</div>
                        </>
                    ) : (
                            <>
                            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-green-500"></div>
                            {/* Experience Item 1 */}
                            <div className="relative mb-16">
                                <div className="flex">
                                    <div className="absolute left-0 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center z-10">
                                        <FaBriefcase className="text-2xl" />
                                    </div>

                                    <div className="ml-20">
                                        <h3 className="text-2xl font-bold">Worked for <span className='hover:underline font-bold dark:text-red-500 text-red-600'><a href='https://www.instagram.com/kc.systematicchaos/'>Systematic Chaos 2024 & 2025</a></span></h3>
                                        <p className="dark:text-gray-400 text-gray-700">Remote</p>
                                        <p className="dark:text-gray-400 text-gray-700 mb-6">Nov 2023 - Jan 2025</p>
                                        <ul className="space-y-2 list-disc pl-5 text-gray-700 dark:text-gray-300">
                                            <li>Created animated Intros and logo reveal videos for the event for both year 2024-2025 and fullfilled their other 3D needs.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/* Experience Item 2 */}
                            <div className="relative mb-16">
                                <div className="flex">
                                    <div className="absolute left-0 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center z-10">
                                        <FaBriefcase className="text-2xl" />
                                    </div>

                                    <div className="ml-20">
                                        <h3 className="text-2xl font-bold">Worked for <span className='hover:underline font-bold dark:text-red-500 text-red-600'><a href='https://www.instagram.com/k.c_mm/'>Marathi Mandal 2025</a></span></h3>
                                        <p className="dark:text-gray-400 text-gray-700">Remote</p>
                                        <p className="dark:text-gray-400 text-gray-700 mb-6">Jan 2024 - Feb 2025</p>
                                        <ul className="space-y-2 list-disc pl-5 text-gray-700 dark:text-gray-300">
                                            <li>Created animated Intros and logo reveal videos for the event for both year 2024-2025 and fullfilled their other 3D needs.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="relative mb-16">
                                <div className="flex">
                                    <div className="ml-20 italic">
                                        ( No corporate work experience as of now. )
                                    </div>
                                </div>

                            </div>
                        </>
                    )}
                </div>
            </section>

            {/* Education Section */}
            <section className="mb-16">
                <h2 className="text-3xl font-bold mb-10">Education</h2>

                <div className="relative">

                    {activeRole === 'Programmer' ? (
                        <>
                            {/* Timeline line */}
                            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-green-500"></div>

                            {/* Education Item 1 */}
                            <div className="relative mb-16">
                                <div className="flex">
                                    <div className="absolute left-0 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center z-10">
                                        <FaGraduationCap className="text-2xl" />
                                    </div>

                                    <div className="ml-20">
                                        <h3 className="text-xl md:text-2xl font-bold mb-2">Kishinchand Chellaram College, Churchgate, Mumbai</h3>
                                        <p className="text-lg md:text-xl font-bold">Bachelor of Science (B.Sc) in Information Technology (I.T.)</p>
                                        <p className="text-lg md:text-xl font-bold mb-2">2022 - 2025</p>
                                        <p className="dark:text-gray-400 text-gray-700">Grade : A+ </p>
                                        <p className="dark:text-gray-400 text-gray-700">CGPA scored : 9.30 </p>
                                        <p className="dark:text-gray-400 text-gray-700">Percentage Secured : 79%</p>
                                    </div>
                                </div>
                            </div>

                            <div className="relative mb-16">
                                <div className="flex">
                                    <div className="absolute left-0 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center z-10">
                                        <FaGraduationCap className="text-2xl" />
                                    </div>

                                    <div className="ml-20">
                                        <h3 className="text-xl md:text-2xl font-bold mb-2">Bhartiya Vidya Bhavans College, Andheri, Mumbai</h3>
                                        <p className="text-lg md:text-xl font-bold">Higher Secondary Schooling in Commerce</p>
                                        <p className="text-lg md:text-xl font-bold mb-2">2021 - 2022</p>
                                        <p className="dark:text-gray-400 text-gray-700">Percentage Secured : 75%</p>
                                    </div>
                                </div>
                            </div>

                            <div className="relative mb-16">
                                <div className="flex">
                                    <div className="absolute left-0 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center z-10">
                                        <FaGraduationCap className="text-2xl" />
                                    </div>

                                    <div className="ml-20">
                                        <h3 className="text-xl md:text-2xl font-bold mb-2">Narsinha Govindrao Vartak English Medium High School, Virar</h3>
                                        <p className="text-lg md:text-xl font-bold">Secondary Schooling</p>
                                        <p className="text-lg md:text-xl font-bold mb-2">2019 - 2020</p>
                                        <p className="dark:text-gray-400 text-gray-700">Percentage Secured : 83%</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Timeline line */}
                            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-green-500"></div>

                            {/* Education Item 1 */}
                            <div className="relative mb-16">
                                <div className="flex">
                                    <div className="absolute left-0 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center z-10">
                                        <FaGraduationCap className="text-2xl" />
                                    </div>

                                    <div className="ml-20">
                                        <h3 className="text-xl md:text-2xl font-bold mb-2">Kishinchand Chellaram College, Churchgate, Mumbai</h3>
                                        <p className="text-lg md:text-xl font-bold">Bachelor of Science (B.Sc) in Information Technology (I.T.)</p>
                                        <p className="md:text-lg font-bold mb-2">2022 - 2025</p>
                                        <p className="dark:text-gray-400 text-gray-700">Grade : A+ </p>
                                        <p className="dark:text-gray-400 text-gray-700">CGPA scored : 9.30 </p>
                                        <p className="dark:text-gray-400 text-gray-700">Percentage Secured : 79%</p>
                                    </div>
                                </div>
                            </div>

                            <div className="relative mb-16">
                                <div className="flex">
                                    <div className="absolute left-0 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center z-10">
                                        <FaGraduationCap className="text-2xl" />
                                    </div>

                                    <div className="ml-20">
                                        <h3 className="text-xl md:text-2xl font-bold mb-2">Bhartiya Vidya Bhavans College, Andheri, Mumbai</h3>
                                        <p className="text-lg md:text-xl font-bold">Higher Secondary Schooling in Commerce</p>
                                        <p className="md:text-lg font-bold mb-2">2021 - 2022</p>
                                        <p className="dark:text-gray-400 text-gray-700">Percentage Secured : 75%</p>
                                    </div>
                                </div>
                            </div>

                            <div className="relative mb-16">
                                <div className="flex">
                                    <div className="absolute left-0 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center z-10">
                                        <FaGraduationCap className="text-2xl" />
                                    </div>

                                    <div className="ml-20">
                                        <h3 className="text-xl md:text-2xl font-bold mb-2">Narsinha Govindrao Vartak English Medium High School, Virar</h3>
                                        <p className="text-lg md:text-xl font-bold">Secondary Schooling</p>
                                        <p className="md:text-lg font-bold mb-2">2019 - 2020</p>
                                        <p className="dark:text-gray-400 text-gray-700">Percentage Secured : 83%</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Education Item 2 */}
                    {/* <div className="relative mb-16">
                        <div className="flex">
                            <div className="absolute left-0 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center z-10">
                                <FaGraduationCap className="text-2xl" />
                            </div>

                            <div className="ml-20">
                                <h3 className="text-2xl font-bold">Higher Secondary Education (12th)</h3>
                                <p className="dark:text-gray-400 text-gray-700">Raniganj High School</p>
                                <p className="dark:text-gray-400 text-gray-700">2013 - 2015</p>
                            </div>
                        </div>
                    </div> */}

                    {/* Education Item 3 */}
                    {/* <div className="relative mb-16">
                        <div className="flex">
                            <div className="absolute left-0 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center z-10">
                                <FaGraduationCap className="text-2xl" />
                            </div>

                            <div className="ml-20">
                                <h3 className="text-2xl font-bold">Secondary Education (10th)</h3>
                                <p className="dark:text-gray-400 text-gray-700">Raniganj High School</p>
                                <p className="dark:text-gray-400 text-gray-700">2007 - 2013</p>
                            </div>
                        </div>
                    </div> */}

                    {/* Education Item 4 */}
                    {/* <div className="relative">
                        <div className="flex">
                            <div className="absolute left-0 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center z-10">
                                <FaGraduationCap className="text-2xl" />
                            </div>

                            <div className="ml-20">
                                <h3 className="text-2xl font-bold">Primary School</h3>
                                <p className="dark:text-gray-400 text-gray-700">Ray Saheb Mrityunjoy School</p>
                                <p className="dark:text-gray-400 text-gray-700">2003 - 2006</p>
                            </div>
                        </div>
                    </div> */}
                </div>
            </section>

            {/* Skills Section */}
            <section id="skills">
                <h2 className="text-3xl font-bold mb-10">Skills</h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {/* {skills.map((skill, index) => (
                        <SkillCard
                            key={index}
                            name={skill.name}
                            iconType={skill.iconType}
                            colorClass={skill.colorClass}
                            darkModeClass={skill.darkModeClass}
                            activeRole={activeRole}
                        />
                    ))} */}

                {skillsToShow.map((skill, index) => (
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

export default Profile; 
