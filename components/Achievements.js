"use client";

import { useRef, useState } from "react";
import { achievements } from "../data/achievements";

export default function Achievements() {
    const [active, setActive] = useState(0);
    const [dragX, setDragX] = useState(0);
    const [dragging, setDragging] = useState(false);
    const [direction, setDirection] = useState("next");

    const startX = useRef(0);
    const startY = useRef(0);
    const didSwipe = useRef(false);

    const achievement = achievements[active];

    /* =========================
       NAVIGATION
    ========================= */

    const previous = () => {
        setActive((current) => {
            if (current === 0) {
                return current;
            }

            setDirection("previous");

            return current - 1;
        });
    };

    const next = () => {
        setActive((current) => {
            if (current === achievements.length - 1) {
                return current;
            }

            setDirection("next");

            return current + 1;
        });
    };

    /* =========================
       POINTER DOWN
    ========================= */

    const handlePointerDown = (event) => {
        startX.current = event.clientX;
        startY.current = event.clientY;

        didSwipe.current = false;

        setDragging(true);

        event.currentTarget.setPointerCapture(event.pointerId);
    };

    /* =========================
       POINTER MOVE
    ========================= */

    const handlePointerMove = (event) => {
        if (!dragging) {
            return;
        }

        const distanceX = event.clientX - startX.current;
        const distanceY = event.clientY - startY.current;

        /*
         * Ignore mostly vertical movement.
         */
        if (Math.abs(distanceY) > Math.abs(distanceX)) {
            return;
        }

        /*
         * Resistance at the boundaries.
         */
        if (
            (active === 0 && distanceX > 0) ||
            (active === achievements.length - 1 && distanceX < 0)
        ) {
            setDragX(distanceX * 0.25);
            return;
        }

        setDragX(distanceX);
    };

    /* =========================
       POINTER UP
    ========================= */

    const handlePointerUp = (event) => {
        if (!dragging) {
            return;
        }

        const distance = event.clientX - startX.current;

        const threshold = 70;

        if (
            Math.abs(distance) >= threshold &&
            Math.abs(distance) >= Math.abs(event.clientY - startY.current)
        ) {
            didSwipe.current = true;

            if (distance < 0) {
                // Swipe left -> next
                if (active < achievements.length - 1) {
                    setDirection("next");
                    setActive((current) => current + 1);
                }
            } else {
                // Swipe right -> previous
                if (active > 0) {
                    setDirection("previous");
                    setActive((current) => current - 1);
                }
            }
        }

        setDragging(false);
        setDragX(0);

        try {
            event.currentTarget.releasePointerCapture(event.pointerId);
        } catch {
            // Pointer may already have been released.
        }
    };

    /* =========================
       POINTER CANCEL
    ========================= */

    const handlePointerCancel = (event) => {
        setDragging(false);
        setDragX(0);

        try {
            event.currentTarget.releasePointerCapture(event.pointerId);
        } catch {
            // Pointer may already have been released.
        }
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
                            className={`achievement-card ${
                                dragging ? "is-dragging" : ""
                            } ${
                                direction === "next"
                                    ? "slide-next"
                                    : "slide-previous"
                            }`}
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
