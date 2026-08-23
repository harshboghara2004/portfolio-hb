"use client";

import { useEffect, useState } from "react";

const name = "Harsh Boghara";

const nameColors = [
    "#FFFFFF", // bright white
    "#7DF9FF", // bright cyan
    "#FFB347", // bright orange
    "#C77DFF", // bright violet
    "#FF6B9D", // bright pink
    "#FFD166", // bright yellow

    "#5C6BC0", // dark indigo
    "#008B8B", // dark cyan
    "#B05A00", // dark orange
    "#7B2CBF", // dark purple
    "#A8325C", // dark pink
    "#B8860B", // dark gold
];

export const cpRatings = [
    {
        platform: "CODEFORCES",
        rating: "1540",
        rank: "Specialist",
        url: "https://codeforces.com/profile/harshboghara004",
        className: "cp-codeforces",
    },
    {
        platform: "CODECHEF",
        rating: "1651",
        rank: "3 stars",
        url: "https://www.codechef.com/users/harsh_boghara",
        className: "cp-codechef",
    },
    {
        platform: "LEETCODE",
        rating: "1969",
        rank: "Knight",
        url: "https://leetcode.com/u/Harsh_Boghara/",
        className: "cp-leetcode",
    },
];

export default function Hero() {
    const [displayName, setDisplayName] = useState("");
    const [nameColor, setNameColor] = useState(nameColors[0]);

    useEffect(() => {
        let index = 0;
        let deleting = false;
        let timer;

        const typeSpeed = 65;
        const deleteSpeed = 45;
        const pauseAfterTyping = 10000;

        const run = () => {
            if (!deleting) {
                if (index < name.length) {
                    index += 1;
                    setDisplayName(name.slice(0, index));

                    timer = setTimeout(run, typeSpeed);
                    return;
                }

                // Wait only after the complete name is visible.
                timer = setTimeout(() => {
                    deleting = true;
                    run();
                }, pauseAfterTyping);

                return;
            }

            if (index > 0) {
                index -= 1;
                setDisplayName(name.slice(0, index));

                timer = setTimeout(run, deleteSpeed);
                return;
            }

            deleting = false;

            setNameColor(
                nameColors[Math.floor(Math.random() * nameColors.length)]
            );

            timer = setTimeout(run, 250);
        };

        run();

        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="hero" id="about">
            <div className="hero-inner">
                <div className="hero-main">
                    <p className="hero-intro">
                        I&apos;m{" "}
                        <span
                            className="hero-name"
                            style={{ color: nameColor }}
                        >
                            {displayName}
                            <i />
                        </span>
                    </p>

                    <p className="hero-kicker">
                        BACKEND DEVELOPER
                        <span>/</span>
                        C++
                        <span>/</span>
                        SECURITY
                    </p>

                    <h1 className="hero-title">
                        Building secure
                        <br />
                        <span>systems with C++.</span>
                    </h1>

                    <p className="hero-description">
                        I build backend systems, cryptographic services, and
                        security infrastructure with C++, OpenSSL, KMIP, and
                        modern databases.
                    </p>

                    <div className="hero-actions">
                        <a
                            href="#projects"
                            className="hero-button hero-button-primary"
                        >
                            View projects
                            <span>↗</span>
                        </a>

                        <a href="#contact" className="hero-button">
                            Contact me
                        </a>
                    </div>

                    <div className="hero-cp">
                        {cpRatings.map((item) => (
                            <a
                                key={item.platform}
                                href={item.url}
                                target="_blank"
                                rel="noreferrer"
                                className={`hero-cp-item ${item.className}`}
                            >
                                <div className="hero-cp-top">
                                    <span className="hero-cp-platform">
                                        {item.platform}
                                    </span>

                                    <span className="hero-cp-max">MAX</span>
                                </div>

                                <strong>{item.rating}</strong>

                                <span className="hero-cp-rank">
                                    {item.rank} ↗
                                </span>
                            </a>
                        ))}
                    </div>
                </div>

                <div className="hero-profile">
                    <div className="hero-profile-top">
                        <span className="hero-profile-label">PROFILE</span>

                        <span className="hero-profile-dot" />
                    </div>

                    <div className="hero-profile-content">
                        <div className="hero-profile-row hero-profile-education">
                            <span>education</span>

                            <div>
                                <strong>
                                    B.Tech · Computer Science and Engineering
                                </strong>

                                <small>Nirma University</small>
                            </div>
                        </div>

                        <div className="hero-profile-row">
                            <span>graduated</span>
                            <strong>May 2025</strong>
                        </div>

                        <div className="hero-profile-row">
                            <span>cgpa</span>
                            <strong>8.17 / 10</strong>
                        </div>

                        <div className="hero-profile-row">
                            <span>focus</span>
                            <strong>Backend · Security</strong>
                        </div>

                        <div className="hero-profile-row">
                            <span>specialization</span>
                            <strong>Cryptography</strong>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
