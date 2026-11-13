import React from "react";

const technologyLogos = {
  "React.js": "react/react-original.svg",
  "Next.js": "nextjs/nextjs-original.svg",
  JavaScript: "javascript/javascript-original.svg",
  TypeScript: "typescript/typescript-original.svg",
  HTML5: "html5/html5-original.svg",
  CSS3: "css3/css3-original.svg",
  "Tailwind CSS": "tailwindcss/tailwindcss-original.svg",
  "Node.js": "nodejs/nodejs-original.svg",
  "Express.js": "express/express-original.svg",
  Java: "java/java-original.svg",
  Python: "python/python-original.svg",
  Flask: "flask/flask-original.svg",
  FastAPI: "fastapi/fastapi-original.svg",
  Postman: "postman/postman-original.svg",
  MongoDB: "mongodb/mongodb-original.svg",
  PostgreSQL: "postgresql/postgresql-original.svg",
  MySQL: "mysql/mysql-original.svg",
  Git: "git/git-original.svg",
  GitHub: "github/github-original.svg",
  Docker: "docker/docker-original.svg",
  Kubernetes: "kubernetes/kubernetes-original.svg",
  Terraform: "terraform/terraform-original.svg",
  "Linux Basics": "linux/linux-original.svg",
};

const getMark = (name) =>
  name
    .replace(/\.js$/i, "")
    .split(/[\s.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

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
                    <span className="skill-logo" aria-hidden="true">
                      <span>{getMark(item)}</span>
                      {technologyLogos[item] && (
                        <img
                          src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${technologyLogos[item]}`}
                          alt=""
                          loading="lazy"
                          onError={(event) => {
                            event.currentTarget.style.display = "none";
                          }}
                        />
                      )}
                    </span>
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
