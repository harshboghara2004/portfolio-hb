"use client";

import { useRef, useState } from "react";
import { experience } from "../data/exp";

export default function Exp() {
    const [active, setActive] = useState(0);
    const [direction, setDirection] = useState("next");
    const [isAnimating, setIsAnimating] = useState(false);

    const touchStartX = useRef(0);
    const touchCurrentX = useRef(0);

    const item = experience[active];

    const changeExperience = (nextIndex, swipeDirection) => {
        if (isAnimating || nextIndex === active) return;

        setDirection(swipeDirection);
        setIsAnimating(true);

        setTimeout(() => {
            setActive(nextIndex);

            requestAnimationFrame(() => {
                setIsAnimating(false);
            });
        }, 180);
    };

    const selectExperience = (index) => {
        if (index === active || isAnimating) return;

        changeExperience(index, index > active ? "next" : "previous");
    };

    const nextExperience = () => {
        if (active >= experience.length - 1) return;

        changeExperience(active + 1, "next");
    };

    const previousExperience = () => {
        if (active <= 0) return;

        changeExperience(active - 1, "previous");
    };

    const handleTouchStart = (event) => {
        touchStartX.current = event.touches[0].clientX;
        touchCurrentX.current = event.touches[0].clientX;
    };

    const handleTouchMove = (event) => {
        touchCurrentX.current = event.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        const distance = touchCurrentX.current - touchStartX.current;

        const threshold = 60;

        if (Math.abs(distance) < threshold) return;

        if (distance < 0) {
            nextExperience();
        } else {
            previousExperience();
        }
    };

    return (
        <section className="experience section" id="experience">
            <div className="wrap">
                <div className="section-head">
                    <p className="section-number">02</p>

                    <div>
                        <p className="section-label">EXPERIENCE</p>

                        <h2>
                            Where I&apos;ve been
                            <br />
                            <span>building things.</span>
                        </h2>
                    </div>
                </div>

                <div
                    className="exp-timeline"
                    style={{
                        "--experience-count": experience.length,
                    }}
                >
                    <div className="exp-track" />

                    {experience.map((company, index) => (
                        <button
                            className={`exp-point ${
                                active === index ? "active" : ""
                            }`}
                            key={company.company}
                            onClick={() => selectExperience(index)}
                            aria-label={`View ${company.company} experience`}
                        >
                            <span className="exp-dot" />

                            <span className="exp-point-info">
                                <span className="exp-point-date">
                                    {company.period}
                                </span>

                                <span className="exp-point-company">
                                    {company.company}
                                </span>
                            </span>
                        </button>
                    ))}
                </div>

                <div
                    className={`exp-view ${
                        isAnimating
                            ? `exp-swiping-${direction}`
                            : `exp-swiped-in-${direction}`
                    }`}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <article className="exp-card">
                        <div className="exp-card-head">
                            <div>
                                <p className="exp-type">{item.type}</p>

                                <h3>{item.role}</h3>

                                <p className="exp-company">
                                    {item.company}

                                    {item.link && (
                                        <a
                                            href={item.link}
                                            target="_blank"
                                            rel="noreferrer"
                                            aria-label={`Visit ${item.company}`}
                                        >
                                            ↗
                                        </a>
                                    )}
                                </p>
                            </div>

                            <div className="exp-meta">
                                <span className="exp-location">
                                    <i />
                                    {item.location}
                                </span>
                            </div>
                        </div>

                        <div className="exp-card-body">
                            <div className="exp-tech">
                                {item.tech.map((tech) => (
                                    <span key={tech}>{tech}</span>
                                ))}
                            </div>

                            <p className="exp-intro">{item.intro}</p>

                            <div className="exp-points">
                                {item.points.map((point) => (
                                    <div key={point}>
                                        <span className="exp-bullet" />
                                        <p>{point}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </article>
                </div>

                <div className="exp-nav">
                    <button
                        onClick={previousExperience}
                        disabled={active === 0 || isAnimating}
                        aria-label="Previous experience"
                    >
                        ←
                    </button>

                    <span>
                        {String(active + 1).padStart(2, "0")}
                        <i>/</i>
                        {String(experience.length).padStart(2, "0")}
                    </span>

                    <button
                        onClick={nextExperience}
                        disabled={
                            active === experience.length - 1 || isAnimating
                        }
                        aria-label="Next experience"
                    >
                        →
                    </button>
                </div>
            </div>
        </section>
    );
}
