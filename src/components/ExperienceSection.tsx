import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, MapPin, Users, TrendingUp } from 'lucide-react';

const experiences = [
  {
    company: "Caterpillar Inc.",
    position: "Senior Frontend Developer",
    duration: "2022 - Present",
    location: "Bengaluru, India",
    type: "Full-time",
    description: "Leading frontend development for enterprise e-commerce platforms serving 50K+ daily active users. Architected scalable React applications with TypeScript, improving performance by 40% and user engagement by 35%.",
    achievements: [
      "Led a team of 6 developers in migrating legacy systems to modern React architecture",
      "Implemented micro-frontend architecture reducing bundle size by 45%",
      "Established CI/CD pipelines improving deployment frequency by 300%",
      "Mentored junior developers and conducted technical interviews"
    ],
    technologies: ["React", "TypeScript", "Node.js", "AWS", "Docker", "Kubernetes"],
    metrics: {
      team: "6 Developers",
      users: "50K+ DAU",
      performance: "40% Improvement"
    }
  },
  {
    company: "Bed Bath & Beyond",
    position: "Frontend Developer",
    duration: "2021 - 2022",
    location: "Remote",
    type: "Contract",
    description: "Developed comprehensive SAAS platform for retail management with advanced analytics. Built responsive web applications using React and Next.js, serving 500+ store locations with real-time data processing.",
    achievements: [
      "Built real-time analytics dashboard processing 10TB+ daily data",
      "Implemented automated testing reducing bug reports by 60%",
      "Optimized application performance achieving 95+ Lighthouse scores",
      "Collaborated with cross-functional teams across different time zones"
    ],
    technologies: ["Next.js", "React", "GraphQL", "MongoDB", "Jest", "Cypress"],
    metrics: {
      stores: "500+ Locations",
      data: "10TB+ Daily",
      performance: "95+ Lighthouse"
    }
  },
  {
    company: "Desktime",
    position: "Full Stack Developer",
    duration: "2020 - 2021",
    location: "Bengaluru, India",
    type: "Full-time",
    description: "Built AI-powered productivity tracking system with intelligent time management features. Developed both frontend and backend components, serving 1000+ remote teams with 95% time tracking accuracy.",
    achievements: [
      "Designed and implemented machine learning algorithms for productivity insights",
      "Built real-time collaboration tools with WebSocket integration",
      "Created cross-platform mobile app using React Native",
      "Established monitoring and alerting systems with 99.9% uptime"
    ],
    technologies: ["React", "React Native", "Python", "TensorFlow", "FastAPI", "PostgreSQL"],
    metrics: {
      teams: "1000+ Teams",
      accuracy: "95% Tracking",
      uptime: "99.9%"
    }
  }
];

function ExperienceCard({ experience, index }: { experience: any; index: number }) {
  const isEven = index % 2 === 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -30 : 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className={`relative ${isEven ? 'md:pr-8' : 'md:pl-8 md:text-right'}`}
    >
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 group hover:bg-white/10">
        <div className="flex items-start justify-between mb-4">
          <div className={isEven ? '' : 'md:text-right'}>
            <h3 className="text-xl font-semibold text-white group-hover:text-blue-300 transition-colors">
              {experience.position}
            </h3>
            <h4 className="text-lg text-blue-400 font-medium">
              {experience.company}
            </h4>
          </div>
          <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-full border border-purple-400/30 whitespace-nowrap">
            {experience.type}
          </span>
        </div>
        
        <div className={`flex items-center gap-4 mb-4 text-white/60 text-sm ${isEven ? '' : 'md:justify-end'}`}>
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            {experience.duration}
          </div>
          <div className="flex items-center gap-1">
            <MapPin size={14} />
            {experience.location}
          </div>
        </div>
        
        <p className="text-white/80 mb-6 leading-relaxed">
          {experience.description}
        </p>
        
        <div className="grid grid-cols-3 gap-4 mb-6">
          {Object.entries(experience.metrics).map(([key, value]) => (
            <div key={key} className="text-center">
              <div className="text-lg font-bold text-blue-400">{value as string}</div>
              <div className="text-white/50 text-xs capitalize">{key}</div>
            </div>
          ))}
        </div>
        
        <div className="mb-6">
          <h5 className="text-white font-medium mb-3">Key Achievements</h5>
          <ul className={`space-y-2 ${isEven ? '' : 'md:text-right'}`}>
            {experience.achievements.map((achievement: string, idx: number) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: isEven ? -10 : 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + idx * 0.05 + 0.3 }}
                className={`flex items-start gap-3 text-white/70 text-sm ${isEven ? '' : 'md:flex-row-reverse'}`}
              >
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                <span>{achievement}</span>
              </motion.li>
            ))}
          </ul>
        </div>
        
        <div className={`flex flex-wrap gap-2 ${isEven ? '' : 'md:justify-end'}`}>
          {experience.technologies.map((tech: string) => (
            <span
              key={tech}
              className="px-3 py-1 bg-gray-800/50 text-gray-300 text-xs rounded border border-gray-600/30"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
      
      {/* Timeline dot */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full border-4 border-gray-900 hidden md:block" />
    </motion.div>
  );
}

export default function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="experience"
      className="min-h-screen py-20 relative"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Journey</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            4+ years of experience building scalable web applications for industry leaders
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-gradient-to-b from-blue-500 via-purple-500 to-transparent hidden md:block" />
          
          <div className="space-y-16">
            {experiences.map((experience, index) => (
              <ExperienceCard
                key={experience.company}
                experience={experience}
                index={index}
              />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <TrendingUp className="text-blue-400 mb-4 mx-auto" size={32} />
              <div className="text-2xl font-bold text-white mb-2">4+</div>
              <div className="text-white/60">Years Experience</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <Users className="text-purple-400 mb-4 mx-auto" size={32} />
              <div className="text-2xl font-bold text-white mb-2">15+</div>
              <div className="text-white/60">Team Members Led</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <Calendar className="text-green-400 mb-4 mx-auto" size={32} />
              <div className="text-2xl font-bold text-white mb-2">25+</div>
              <div className="text-white/60">Projects Delivered</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <MapPin className="text-orange-400 mb-4 mx-auto" size={32} />
              <div className="text-2xl font-bold text-white mb-2">3</div>
              <div className="text-white/60">Countries Worked</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}