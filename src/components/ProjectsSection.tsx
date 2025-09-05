import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "Caterpillar E-commerce Platform",
    category: "E-commerce",
    description: "Enterprise-level e-commerce platform built with React and Node.js, serving thousands of daily users with real-time inventory management.",
    fullDescription: "Led the frontend development of Caterpillar's comprehensive e-commerce platform, implementing advanced product catalog systems, real-time inventory tracking, and seamless checkout flows. The platform processes over 10,000 transactions daily and maintains 99.9% uptime.",
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Redis", "AWS"],
    image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg",
    metrics: {
      users: "50K+ Daily Active Users",
      performance: "99.9% Uptime",
      growth: "40% Conversion Rate Increase"
    },
    features: [
      "Real-time inventory management",
      "Advanced search and filtering",
      "Personalized product recommendations",
      "Multi-currency support",
      "Progressive Web App capabilities"
    ]
  },
  {
    id: 2,
    title: "Bed Bath & Beyond SAAS Platform",
    category: "SAAS",
    description: "Modern SAAS solution for retail management with advanced analytics and automated workflows, improving operational efficiency by 60%.",
    fullDescription: "Developed a comprehensive SAAS platform for Bed Bath & Beyond's retail operations, featuring advanced analytics dashboards, automated inventory management, and integrated POS systems. The platform reduced manual work by 60% and improved decision-making through data-driven insights.",
    technologies: ["Next.js", "React", "GraphQL", "MongoDB", "Docker", "Kubernetes"],
    image: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg",
    metrics: {
      efficiency: "60% Operational Improvement",
      stores: "500+ Store Locations",
      data: "10TB+ Data Processed Daily"
    },
    features: [
      "Real-time analytics dashboard",
      "Automated workflow management",
      "Integrated POS system",
      "Multi-tenant architecture",
      "Advanced reporting suite"
    ]
  },
  {
    id: 3,
    title: "Desktime Productivity System",
    category: "Productivity",
    description: "AI-powered productivity tracking system with intelligent time management features and detailed analytics for remote teams.",
    fullDescription: "Built an innovative productivity tracking system that leverages AI to analyze work patterns and provide intelligent recommendations. The system includes automatic time tracking, project management tools, and comprehensive analytics to help teams optimize their workflow.",
    technologies: ["React", "Python", "TensorFlow", "FastAPI", "PostgreSQL", "WebSockets"],
    image: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg",
    metrics: {
      productivity: "35% Productivity Boost",
      teams: "1000+ Remote Teams",
      accuracy: "95% Time Tracking Accuracy"
    },
    features: [
      "AI-powered time tracking",
      "Intelligent productivity insights",
      "Real-time collaboration tools",
      "Automated reporting",
      "Cross-platform synchronization"
    ]
  }
];

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  technologies: string[];
  image: string;
  metrics: Record<string, string>;
  features: string[];
}

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 transform-gpu">
        <div className="relative overflow-hidden h-48">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-full border border-blue-400/30">
              {project.category}
            </span>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">
            {project.title}
          </h3>
          <p className="text-white/70 text-sm mb-4 line-clamp-2">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, 3).map((tech: string) => (
              <span
                key={tech}
                className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded border border-purple-400/30"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-2 py-1 bg-white/10 text-white/50 text-xs rounded">
                +{project.technologies.length - 3} more
              </span>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium flex items-center gap-1"
            >
              View Details
              <ExternalLink size={14} />
            </motion.button>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              >
                <Github size={16} className="text-white/70" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              >
                <ExternalLink size={16} className="text-white/70" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-gray-900/95 backdrop-blur-md rounded-2xl border border-white/20 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-64 object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
          >
            <X className="text-white" size={20} />
          </button>
        </div>
        
        <div className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-3xl font-bold text-white">{project.title}</h2>
            <span className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full border border-blue-400/30">
              {project.category}
            </span>
          </div>
          
          <p className="text-white/80 text-lg mb-8 leading-relaxed">
            {project.fullDescription}
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {Object.entries(project.metrics).map(([key, value]) => (
              <div key={key} className="bg-white/5 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-400 mb-2">{value as string}</div>
                <div className="text-white/60 capitalize">{key}</div>
              </div>
            ))}
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">Key Features</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {project.features.map((feature: string, index: number) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-2 h-2 bg-blue-400 rounded-full" />
                  <span className="text-white/80">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">Technologies Used</h3>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech: string) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-lg border border-purple-400/30"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2"
            >
              <ExternalLink size={20} />
              View Live Project
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 border border-white/30 text-white py-3 px-6 rounded-lg font-medium hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Github size={20} />
              View Source Code
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="projects"
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
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Projects</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Showcasing impactful solutions built for industry leaders, demonstrating expertise in modern web technologies
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
            >
              <ProjectCard
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}