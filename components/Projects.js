"use client";

import { useRef, useState } from "react";
import { projects } from "../data/projects";

export default function Projects() {
    const [active, setActive] = useState(0);
    const [swipeDirection, setSwipeDirection] = useState("");

    const swipeStart = useRef(null);
    const swipeCurrent = useRef(null);

    const project = projects[active];

    const goPrevious = () => {
        if (active === 0) return;

        setSwipeDirection("right");
        setActive((current) => current - 1);
    };

    const goNext = () => {
        if (active === projects.length - 1) return;

        setSwipeDirection("left");
        setActive((current) => current + 1);
    };

    const handlePointerDown = (event) => {
        swipeStart.current = event.clientX;
        swipeCurrent.current = event.clientX;
    };

    const handlePointerMove = (event) => {
        if (swipeStart.current === null) {
            return;
        }

        swipeCurrent.current = event.clientX;
    };

    const handlePointerUp = () => {
        if (swipeStart.current === null || swipeCurrent.current === null) {
            return;
        }

        const distance = swipeCurrent.current - swipeStart.current;

        if (Math.abs(distance) >= 60) {
            if (distance < 0) {
                goNext();
            } else {
                goPrevious();
            }
        }

        swipeStart.current = null;
        swipeCurrent.current = null;
    };

    const handlePointerCancel = () => {
        swipeStart.current = null;
        swipeCurrent.current = null;
    };

    return (
        <section className="projects section" id="projects">
            <div className="wrap">
                <div className="section-head">
                    <p className="section-number">03</p>

                    <div>
                        <p className="section-label">PROJECTS</p>

                        <h2>
                            Things I&apos;ve
                            <br />
                            <span>built.</span>
                        </h2>
                    </div>
                </div>

                {/* Project Timeline */}

                <div
                    className="project-timeline"
                    style={{
                        "--project-count": projects.length,
                    }}
                >
                    <div className="project-track" aria-hidden="true" />

                    <div className="project-timeline-points">
                        {projects.map((item, index) => (
                            <button
                                key={`project-point-${index}`}
                                className={`project-point ${
                                    active === index ? "active" : ""
                                }`}
                                onClick={() => setActive(index)}
                                aria-label={`View ${item.name}`}
                            >
                                <span className="project-dot" />

                                <span className="project-point-info">
                                    <span className="project-point-short">
                                        {item.title}
                                    </span>

                                    <span className="project-point-date">
                                        {item.period}
                                    </span>
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Active Project */}

                <div
                    className="project-view"
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={handlePointerCancel}
                >
                    <article
                        className={`project-card ${
                            swipeDirection
                                ? `project-swipe-${swipeDirection}`
                                : ""
                        }`}
                        onAnimationEnd={() => setSwipeDirection("")}
                    >
                        <div className="project-card-head">
                            <div className="project-card-title">
                                <p className="project-type">{project.type}</p>

                                <h3>{project.name}</h3>
                            </div>

                            <div className="project-meta">
                                <div className="project-links">
                                    {project.links?.map((link, index) => {
                                        if (!link.name) {
                                            return null;
                                        }

                                        if (!link.url) {
                                            return (
                                                <span
                                                    className="project-link project-link-disabled"
                                                    key={`${link.name}-${index}`}
                                                >
                                                    {link.name}
                                                </span>
                                            );
                                        }

                                        return (
                                            <a
                                                className="project-link"
                                                key={`${link.name}-${index}`}
                                                href={link.url}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                {link.name} ↗
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="project-card-body">
                            {/* Description */}

                            <p className="project-description">
                                {project.description}
                            </p>

                            {/* Tech */}

                            <div className="project-section">
                                <p className="project-section-label">
                                    TECH USED
                                </p>

                                <div className="project-tech">
                                    {project.tech.map((tech, index) => (
                                        <span key={`${tech}-${index}`}>
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Highlights */}

                            <div className="project-highlights">
                                {project.highlights.map((highlight, index) => (
                                    <div
                                        className="project-highlight"
                                        key={`highlight-${index}`}
                                    >
                                        <p>{highlight.label}</p>

                                        <span>{highlight.value}</span>
                                    </div>
                                ))}
                            </div>

                            {/* What I Built */}

                            <div className="project-section project-work">
                                <p className="project-section-label">
                                    WHAT I BUILT
                                </p>

                                <div className="project-points">
                                    {project.points.map((point, index) => (
                                        <div key={`point-${index}`}>
                                            <span />
                                            <p>{point}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </article>
                </div>

                {/* Navigation */}

                <div className="project-nav">
                    <button
                        onClick={goPrevious}
                        disabled={active === 0}
                        aria-label="Previous project"
                    >
                        ←
                    </button>

                    <span>
                        {String(active + 1).padStart(2, "0")}
                        <i>/</i>
                        {String(projects.length).padStart(2, "0")}
                    </span>

                    <button
                        onClick={goNext}
                        disabled={active === projects.length - 1}
                        aria-label="Next project"
                    >
                        →
                    </button>
                </div>
            </div>
        </section>
    );
}
