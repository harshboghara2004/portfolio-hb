"use client";

import { useRef, useState } from "react";
import { experience } from "../data/exp";

export default function Exp() {
    const [active, setActive] = useState(0);
    const [swipeDirection, setSwipeDirection] = useState("");

    const swipeStart = useRef(null);
    const swipeCurrent = useRef(null);

    const item = experience[active];

    const selectExperience = (index) => {
        setActive(index);
    };

    const goPrevious = () => {
        if (active === 0) return;

        setSwipeDirection("right");
        setActive((current) => current - 1);
    };

    const goNext = () => {
        if (active === experience.length - 1) return;

        setSwipeDirection("left");
        setActive((current) => current + 1);
    };

    /* =========================
       SWIPE / DRAG
    ========================= */

    const handlePointerDown = (event) => {
        swipeStart.current = event.clientX;
        swipeCurrent.current = event.clientX;

        event.currentTarget.setPointerCapture?.(event.pointerId);
    };

    const handlePointerMove = (event) => {
        if (swipeStart.current === null) {
            return;
        }

        swipeCurrent.current = event.clientX;
    };

    const handlePointerUp = (event) => {
        if (swipeStart.current === null || swipeCurrent.current === null) {
            return;
        }

        const distance = swipeCurrent.current - swipeStart.current;

        if (Math.abs(distance) >= 60) {
            if (distance < 0) {
                // Swipe left → next
                goNext();
            } else {
                // Swipe right → previous
                goPrevious();
            }
        }

        swipeStart.current = null;
        swipeCurrent.current = null;

        event.currentTarget.releasePointerCapture?.(event.pointerId);
    };

    const handlePointerCancel = (event) => {
        swipeStart.current = null;
        swipeCurrent.current = null;

        event.currentTarget.releasePointerCapture?.(event.pointerId);
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

                {/* Timeline */}

                <div className="exp-timeline">
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

                {/* Active company */}

                <div
                    className="exp-view"
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={handlePointerCancel}
                >
                    <article
                        className={`exp-card ${
                            swipeDirection ? `exp-swipe-${swipeDirection}` : ""
                        }`}
                        onAnimationEnd={() => setSwipeDirection("")}
                    >
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

                                <span className="exp-period">
                                    {item.period}
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

                {/* Navigation */}

                <div className="exp-nav">
                    <button
                        onClick={goPrevious}
                        disabled={active === 0}
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
                        onClick={goNext}
                        disabled={active === experience.length - 1}
                        aria-label="Next experience"
                    >
                        →
                    </button>
                </div>
            </div>
        </section>
    );
}
