"use client";

import { useRef, useState } from "react";
import { experience } from "../data/exp";

export default function Exp() {
    const [active, setActive] = useState(0);
    const [direction, setDirection] = useState("next");
    const [isAnimating, setIsAnimating] = useState(false);

    const timelineRef = useRef(null);

    const timelineStartX = useRef(0);
    const timelineCurrentX = useRef(0);

    const cardStartX = useRef(0);
    const cardCurrentX = useRef(0);

    const item = experience[active];

    /* =========================
       CENTER ACTIVE TIMELINE ITEM
    ========================= */

    const scrollActivePoint = (index) => {
        const timeline = timelineRef.current;

        if (!timeline) return;

        const point = timeline.querySelector(`[data-exp-index="${index}"]`);

        if (!point) return;

        point.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
        });
    };

    /* =========================
       CHANGE EXPERIENCE
    ========================= */

    const changeExperience = (nextIndex, swipeDirection) => {
        if (
            isAnimating ||
            nextIndex === active ||
            nextIndex < 0 ||
            nextIndex >= experience.length
        ) {
            return;
        }

        setDirection(swipeDirection);
        setIsAnimating(true);

        setTimeout(() => {
            setActive(nextIndex);

            requestAnimationFrame(() => {
                setIsAnimating(false);

                scrollActivePoint(nextIndex);
            });
        }, 180);
    };

    /* =========================
       SELECT EXPERIENCE
    ========================= */

    const selectExperience = (index) => {
        if (index === active || isAnimating) return;

        changeExperience(index, index > active ? "next" : "previous");
    };

    /* =========================
       NEXT
    ========================= */

    const nextExperience = () => {
        if (active >= experience.length - 1) return;

        changeExperience(active + 1, "next");
    };

    /* =========================
       PREVIOUS
    ========================= */

    const previousExperience = () => {
        if (active <= 0) return;

        changeExperience(active - 1, "previous");
    };

    /* =========================
       TIMELINE TOUCH
    ========================= */

    const handleTimelineTouchStart = (event) => {
        timelineStartX.current = event.touches[0].clientX;

        timelineCurrentX.current = event.touches[0].clientX;
    };

    const handleTimelineTouchMove = (event) => {
        timelineCurrentX.current = event.touches[0].clientX;
    };

    const handleTimelineTouchEnd = () => {
        const distance = timelineCurrentX.current - timelineStartX.current;

        const threshold = 60;

        if (Math.abs(distance) < threshold) return;

        if (distance < 0) {
            nextExperience();
        } else {
            previousExperience();
        }
    };

    /* =========================
       CARD TOUCH
    ========================= */

    const handleCardTouchStart = (event) => {
        cardStartX.current = event.touches[0].clientX;

        cardCurrentX.current = event.touches[0].clientX;
    };

    const handleCardTouchMove = (event) => {
        cardCurrentX.current = event.touches[0].clientX;
    };

    const handleCardTouchEnd = () => {
        const distance = cardCurrentX.current - cardStartX.current;

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
                {/* =========================
                    SECTION HEADER
                ========================= */}

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

                {/* =========================
                    TIMELINE
                ========================= */}

                <div
                    ref={timelineRef}
                    className="exp-timeline"
                    style={{
                        "--experience-count": experience.length,
                    }}
                    onTouchStart={handleTimelineTouchStart}
                    onTouchMove={handleTimelineTouchMove}
                    onTouchEnd={handleTimelineTouchEnd}
                >
                    <div className="exp-timeline-points">
                        {/* REAL TRACK */}

                        <div className="exp-track" aria-hidden="true" />

                        {experience.map((company, index) => (
                            <button
                                type="button"
                                className={`exp-point ${
                                    active === index ? "active" : ""
                                }`}
                                key={company.company}
                                data-exp-index={index}
                                onClick={() => selectExperience(index)}
                                aria-label={`View ${company.company} experience`}
                                aria-current={
                                    active === index ? "true" : undefined
                                }
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
                </div>

                {/* =========================
                    ACTIVE EXPERIENCE CARD
                ========================= */}

                <div
                    className={`exp-view ${
                        isAnimating
                            ? `exp-swiping-${direction}`
                            : `exp-swiped-in-${direction}`
                    }`}
                    onTouchStart={handleCardTouchStart}
                    onTouchMove={handleCardTouchMove}
                    onTouchEnd={handleCardTouchEnd}
                >
                    <article className="exp-card">
                        {/* CARD HEADER */}

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
                                            onTouchStart={(event) =>
                                                event.stopPropagation()
                                            }
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

                        {/* CARD BODY */}

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

                {/* =========================
                    NAVIGATION
                ========================= */}

                <div className="exp-nav">
                    <button
                        type="button"
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
                        type="button"
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
