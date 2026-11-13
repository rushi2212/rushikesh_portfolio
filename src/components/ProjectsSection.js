import React from "react";
import { ExternalLink } from "lucide-react";

export default function ProjectsSection({ projects }) {
  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Showcase of my latest work in web development and AI integration
          </p>
        </div>
        <div className="portfolio-project-grid grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-7">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className={`project-card project-card-${index + 1} bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 flex flex-col h-full`}
            >
              <div className="project-image relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-52 object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 lg:p-7 flex-1 flex flex-col">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 text-slate-800">
                    {project.title}
                  </h3>
                  <p className="text-blue-600 font-medium mb-3 text-sm">
                    {project.subtitle}
                  </p>
                  <p className="text-slate-600 mb-5 leading-relaxed text-sm line-clamp-3">
                    {project.description}
                  </p>
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2 text-slate-700 text-xs uppercase tracking-[0.14em]">
                      Key Features:
                    </h4>
                    <div className="grid grid-cols-1 gap-1">
                      {project.features.slice(0, 3).map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-center gap-2 text-xs text-slate-600"
                        >
                          <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tech.slice(0, 4).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg text-[11px] font-semibold"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-auto">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full transition-all transform hover:scale-105 text-sm w-full justify-center"
                  >
                    <ExternalLink size={14} />
                    View Project
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
