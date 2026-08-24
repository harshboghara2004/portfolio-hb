"use client";

import { useRef, useState } from "react";
import { projects } from "../data/projects";

export default function Projects() {
    const [active, setActive] = useState(0);
    const [direction, setDirection] = useState("next");

    const touchStartX = useRef(null);
    const touchStartY = useRef(null);
    const swipeHandled = useRef(false);

    const project = projects[active];

    const selectProject = (index, swipeDirection = null) => {
        if (index < 0 || index >= projects.length || index === active) {
            return;
        }

        setDirection(swipeDirection || (index > active ? "next" : "previous"));

        setActive(index);
    };

    /* =========================
       SWIPE
    ========================= */

    const handleTouchStart = (event) => {
        if (!event.touches?.length) {
            return;
        }

        touchStartX.current = event.touches[0].clientX;
        touchStartY.current = event.touches[0].clientY;
        swipeHandled.current = false;
    };

    const handleTouchMove = (event) => {
        if (
            touchStartX.current === null ||
            touchStartY.current === null ||
            swipeHandled.current ||
            !event.touches?.length
        ) {
            return;
        }

        const currentX = event.touches[0].clientX;
        const currentY = event.touches[0].clientY;

        const deltaX = currentX - touchStartX.current;
        const deltaY = currentY - touchStartY.current;

        /*
         * Ignore mostly vertical gestures.
         */
        if (Math.abs(deltaY) > Math.abs(deltaX)) {
            return;
        }

        /*
         * Require a meaningful horizontal swipe.
         */
        if (Math.abs(deltaX) < 50) {
            return;
        }

        swipeHandled.current = true;

        if (deltaX < 0) {
            // Swipe left -> next
            if (active < projects.length - 1) {
                selectProject(active + 1, "next");
            }
        } else {
            // Swipe right -> previous
            if (active > 0) {
                selectProject(active - 1, "previous");
            }
        }

        touchStartX.current = null;
        touchStartY.current = null;
    };

    const handleTouchEnd = () => {
        touchStartX.current = null;
        touchStartY.current = null;
        swipeHandled.current = false;
    };

    /* =========================
       MOUSE DRAG
       ========================= */

    const mouseStartX = useRef(null);
    const mouseStartY = useRef(null);
    const mouseDragging = useRef(false);

    const handleMouseDown = (event) => {
        mouseStartX.current = event.clientX;
        mouseStartY.current = event.clientY;
        mouseDragging.current = true;
    };

    const handleMouseUp = (event) => {
        if (!mouseDragging.current || mouseStartX.current === null) {
            return;
        }

        const deltaX = event.clientX - mouseStartX.current;
        const deltaY = event.clientY - mouseStartY.current;

        mouseDragging.current = false;
        mouseStartX.current = null;
        mouseStartY.current = null;

        if (Math.abs(deltaY) > Math.abs(deltaX)) {
            return;
        }

        if (Math.abs(deltaX) < 50) {
            return;
        }

        if (deltaX < 0) {
            if (active < projects.length - 1) {
                selectProject(active + 1, "next");
            }
        } else {
            if (active > 0) {
                selectProject(active - 1, "previous");
            }
        }
    };

    const handleMouseLeave = () => {
        mouseDragging.current = false;
        mouseStartX.current = null;
        mouseStartY.current = null;
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

                {/* =========================
                    PROJECT TIMELINE
                ========================= */}

                <div
                    className="project-timeline"
                    style={{
                        "--project-count": projects.length,
                    }}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className="project-track" aria-hidden="true" />

                    <div className="project-timeline-points">
                        {projects.map((item, index) => (
                            <button
                                key={`project-point-${index}`}
                                className={`project-point ${
                                    active === index ? "active" : ""
                                }`}
                                onClick={() => selectProject(index)}
                                aria-label={`View ${item.name}`}
                            >
                                <span className="project-dot" />

                                <span className="project-point-info">
                                    <span className="project-point-short">
                                        {item.title}
                                    </span>

                                    {active === index && (
                                        <span className="project-point-date">
                                            {item.period}
                                        </span>
                                    )}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* =========================
                    ACTIVE PROJECT
                ========================= */}

                <div className="project-view">
                    <article
                        className={`project-card project-card-${direction}`}
                        key={project.name}
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

                {/* =========================
                    NAVIGATION
                ========================= */}

                <div className="project-nav">
                    <button
                        onClick={() => selectProject(active - 1, "previous")}
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
                        onClick={() => selectProject(active + 1, "next")}
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
