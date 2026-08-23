import { skills } from "../data/skills";

export default function Skills() {
    return (
        <section className="skills section" id="skills">
            <div className="wrap">
                <div className="section-head">
                    <p className="section-number">04</p>

                    <div>
                        <p className="section-label">TECHNICAL SKILLS</p>

                        <h2>
                            Tools I use to
                            <br />
                            <span>build things.</span>
                        </h2>
                    </div>
                </div>

                <div className="skills-grid">
                    {skills.map((group) => (
                        <article className="skill-card" key={group.number}>
                            <div className="skill-card-head">
                                <span className="skill-number">
                                    {group.number}
                                </span>

                                <h3>{group.name}</h3>
                            </div>

                            <div className="skill-list">
                                {group.skills.map((skill) => (
                                    <span className="skill-tag" key={skill}>
                                        {skill}
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
