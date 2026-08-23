"use client";

import {
    FaGithub,
    FaLinkedinIn,
    FaInstagram,
    FaXTwitter,
} from "react-icons/fa6";

import { contact } from "../data/contact";

const socialIcons = {
    github: <FaGithub />,
    linkedin: <FaLinkedinIn />,
    instagram: <FaInstagram />,
    x: <FaXTwitter />,
};

export default function Contact() {
    return (
        <section className="contact section" id="contact">
            <div className="wrap">
                <div className="section-head">
                    <p className="section-number">06</p>

                    <div>
                        <p className="section-label">CONTACT</p>

                        <h2>
                            Let&apos;s build
                            <br />
                            <span>something useful.</span>
                        </h2>
                    </div>
                </div>

                <div className="contact-content">
                    <p className="contact-description">
                        Have a backend, systems, or security project in mind?
                        I&apos;d be happy
                        <br className="contact-description-break" />
                        to talk.
                    </p>

                    <a
                        className="contact-email"
                        href={`mailto:${contact.email}`}
                    >
                        <span>{contact.email}</span>
                        <span className="contact-arrow">↗</span>
                    </a>

                    <div className="contact-socials">
                        {contact.socials.map((social) => (
                            <a
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noreferrer"
                                className="contact-social"
                                aria-label={social.name}
                            >
                                <span className="contact-social-icon">
                                    {socialIcons[social.icon]}
                                </span>

                                <span>{social.name}</span>

                                <span className="contact-social-arrow">↗</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
