"use client";

import { useRef, useState } from "react";
import { achievements } from "../data/achievements";

export default function Achievements() {
    const [active, setActive] = useState(0);
    const [dragX, setDragX] = useState(0);
    const [dragging, setDragging] = useState(false);

    const startX = useRef(0);

    const achievement = achievements[active];

    const previous = () => {
        setActive((current) => Math.max(0, current - 1));
    };

    const next = () => {
        setActive((current) => Math.min(achievements.length - 1, current + 1));
    };

    const handlePointerDown = (event) => {
        startX.current = event.clientX;

        setDragging(true);

        event.currentTarget.setPointerCapture(event.pointerId);
    };

    const handlePointerMove = (event) => {
        if (!dragging) return;

        const distance = event.clientX - startX.current;

        // Small resistance while dragging beyond boundaries
        if (
            (active === 0 && distance > 0) ||
            (active === achievements.length - 1 && distance < 0)
        ) {
            setDragX(distance * 0.25);
            return;
        }

        setDragX(distance);
    };

    const handlePointerUp = () => {
        if (!dragging) return;

        const threshold = 70;

        if (dragX < -threshold) {
            next();
        } else if (dragX > threshold) {
            previous();
        }

        setDragging(false);
        setDragX(0);
    };

    const handlePointerCancel = () => {
        setDragging(false);
        setDragX(0);
    };

    return (
        <section className="achievements section" id="achievements">
            <div className="wrap">
                <div className="section-head">
                    <p className="section-number">05</p>

                    <div>
                        <p className="section-label">ACHIEVEMENTS</p>

                        <h2>
                            Things worth
                            <br />
                            <span>remembering.</span>
                        </h2>
                    </div>
                </div>

                <div className="achievement-slider">
                    <div
                        className={`achievement-viewport ${
                            dragging ? "dragging" : ""
                        }`}
                        onPointerDown={handlePointerDown}
                        onPointerMove={handlePointerMove}
                        onPointerUp={handlePointerUp}
                        onPointerCancel={handlePointerCancel}
                        style={{
                            "--drag-x": `${dragX}px`,
                        }}
                    >
                        <article
                            className="achievement-card"
                            key={achievement.title}
                        >
                            <div className="achievement-content">
                                <div className="achievement-card-head">
                                    <div>
                                        <p className="achievement-type">
                                            {achievement.type}
                                        </p>

                                        <h3>{achievement.title}</h3>
                                    </div>

                                    <span className="achievement-year">
                                        {achievement.year}
                                    </span>
                                </div>

                                {achievement.highlight && (
                                    <p className="achievement-highlight">
                                        {achievement.highlight}
                                    </p>
                                )}

                                <p className="achievement-description">
                                    {achievement.description}
                                </p>

                                <div className="achievement-points">
                                    {achievement.points.map((point, index) => (
                                        <div
                                            key={`${achievement.title}-${index}`}
                                        >
                                            <span />
                                            <p>{point}</p>
                                        </div>
                                    ))}
                                </div>

                                {achievement.certificate && (
                                    <a
                                        href={achievement.certificate}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="achievement-certificate-link"
                                        onPointerDown={(event) =>
                                            event.stopPropagation()
                                        }
                                    >
                                        VIEW CERTIFICATE ↗
                                    </a>
                                )}
                            </div>
                        </article>
                    </div>
                </div>

                <div className="achievement-controls">
                    <button
                        type="button"
                        className="achievement-nav"
                        onClick={previous}
                        disabled={active === 0}
                        aria-label="Previous achievement"
                    >
                        ←
                    </button>

                    <span className="achievement-counter">
                        {String(active + 1).padStart(2, "0")}
                        {" / "}
                        {String(achievements.length).padStart(2, "0")}
                    </span>

                    <button
                        type="button"
                        className="achievement-nav"
                        onClick={next}
                        disabled={active === achievements.length - 1}
                        aria-label="Next achievement"
                    >
                        →
                    </button>
                </div>
            </div>
        </section>
    );
}
