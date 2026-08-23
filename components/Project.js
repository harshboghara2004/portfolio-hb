export default function Project({ project }) {
    return (
        <article
            className={`project-card ${project.featured ? "featured" : ""}`}
        >
            <div className="project-top">
                <div>
                    <p className="project-type">{project.type}</p>
                    <h3>{project.title}</h3>
                </div>

                <span className="project-period">{project.period}</span>
            </div>

            <p className="project-description">{project.description}</p>

            <div className="project-tech">
                {project.tech.map((tech) => (
                    <span key={tech}>{tech}</span>
                ))}
            </div>

            <div className="project-details">
                {project.details.map((detail) => (
                    <div className="project-detail" key={detail}>
                        <span>+</span>
                        <p>{detail}</p>
                    </div>
                ))}
            </div>
        </article>
    );
}
