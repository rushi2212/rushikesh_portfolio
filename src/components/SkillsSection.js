import React from "react";

export default function SkillsSection({ skills }) {
  return (
    <section id="skills" className="bg-white py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">
            Technical Expertise
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Proficient in modern technologies and frameworks for full-stack
            development
          </p>
        </div>
        <div className="portfolio-skill-grid grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6">
          {skills.map((skill, index) => (
            <article
              key={index}
              className="skill-card bg-slate-50 rounded-2xl p-6 lg:p-7 hover:shadow-xl transition-all transform hover:-translate-y-1 border border-slate-100"
            >
              <div className="skill-card-heading">
                <div className="skill-icon text-blue-600">{skill.icon}</div>
              </div>
              <h3 className="text-xl font-semibold mb-5 text-slate-800">
                {skill.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skill.items.map((item, itemIndex) => (
                  <span
                    key={itemIndex}
                    className="skill-chip bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-xs font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
