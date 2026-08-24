"use client";

import { useEffect, useRef, useState } from "react";
import { projects } from "../data/projects";

export default function Projects() {
    const [active, setActive] = useState(0);
    const [direction, setDirection] = useState("next");

    const timelineRef = useRef(null);

    /* =========================
       TIMELINE SWIPE
    ========================= */

    const timelineTouchStartX = useRef(null);
    const timelineTouchStartY = useRef(null);

    /* =========================
       CARD SWIPE
    ========================= */

    const cardTouchStartX = useRef(null);
    const cardTouchStartY = useRef(null);

    const project = projects[active];

    /* =========================
       SELECT PROJECT
    ========================= */

    const selectProject = (index, swipeDirection = null) => {
        if (index < 0 || index >= projects.length || index === active) {
            return;
        }

        setDirection(swipeDirection || (index > active ? "next" : "previous"));

        setActive(index);
    };

    /* =========================
       KEEP ACTIVE PROJECT VISIBLE
    ========================= */

    useEffect(() => {
        const timeline = timelineRef.current;

        if (!timeline) {
            return;
        }

        const points = timeline.querySelectorAll(".project-point");

        const point = points[active];

        if (!point) {
            return;
        }

        const timelineRect = timeline.getBoundingClientRect();

        const pointRect = point.getBoundingClientRect();

        const pointCenter = pointRect.left + pointRect.width / 2;

        const timelineCenter = timelineRect.left + timelineRect.width / 2;

        const target = timeline.scrollLeft + pointCenter - timelineCenter;

        const maxScroll = Math.max(
            0,
            timeline.scrollWidth - timeline.clientWidth
        );

        timeline.scrollTo({
            left: Math.max(0, Math.min(target, maxScroll)),
            behavior: "smooth",
        });
    }, [active]);

    /* =========================
       TIMELINE TOUCH
    ========================= */

    const handleTimelineTouchStart = (event) => {
        if (!event.touches?.length) {
            return;
        }

        timelineTouchStartX.current = event.touches[0].clientX;

        timelineTouchStartY.current = event.touches[0].clientY;
    };

    const handleTimelineTouchEnd = () => {
        timelineTouchStartX.current = null;
        timelineTouchStartY.current = null;
    };

    /* =========================
       CARD TOUCH START
    ========================= */

    const handleCardTouchStart = (event) => {
        if (!event.touches?.length) {
            return;
        }

        cardTouchStartX.current = event.touches[0].clientX;

        cardTouchStartY.current = event.touches[0].clientY;
    };

    /* =========================
       CARD TOUCH END
    ========================= */

    const handleCardTouchEnd = (event) => {
        if (
            cardTouchStartX.current === null ||
            cardTouchStartY.current === null ||
            !event.changedTouches?.length
        ) {
            return;
        }

        const endX = event.changedTouches[0].clientX;

        const endY = event.changedTouches[0].clientY;

        const deltaX = endX - cardTouchStartX.current;

        const deltaY = endY - cardTouchStartY.current;

        const absX = Math.abs(deltaX);
        const absY = Math.abs(deltaY);

        /*
         * Reset immediately so one gesture
         * can only trigger one project change.
         */
        cardTouchStartX.current = null;
        cardTouchStartY.current = null;

        /*
         * Ignore vertical scrolling.
         */
        if (absY >= absX) {
            return;
        }

        /*
         * Ignore small horizontal movements.
         */
        if (absX < 50) {
            return;
        }

        /*
         * Swipe LEFT -> NEXT project
         */
        if (deltaX < 0) {
            if (active < projects.length - 1) {
                selectProject(active + 1, "next");
            }

            return;
        }

        /*
         * Swipe RIGHT -> PREVIOUS project
         */
        if (active > 0) {
            selectProject(active - 1, "previous");
        }
    };

    const handleCardTouchCancel = () => {
        cardTouchStartX.current = null;
        cardTouchStartY.current = null;
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
                    ref={timelineRef}
                    className="project-timeline"
                    onTouchStart={handleTimelineTouchStart}
                    onTouchEnd={handleTimelineTouchEnd}
                >
                    <div className="project-timeline-inner">
                        <div className="project-track" />

                        <div className="project-timeline-points">
                            {projects.map((item, index) => (
                                <button
                                    type="button"
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
                </div>

                {/* =========================
                    ACTIVE PROJECT
                ========================= */}

                <div
                    className="project-view"
                    onTouchStart={handleCardTouchStart}
                    onTouchEnd={handleCardTouchEnd}
                    onTouchCancel={handleCardTouchCancel}
                >
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
                            <p className="project-description">
                                {project.description}
                            </p>

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
                        type="button"
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
                        type="button"
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
