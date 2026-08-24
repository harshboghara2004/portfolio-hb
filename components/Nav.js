"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Achievements", href: "#achievements" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <header className="navbar">
            <div className="wrap navbar-inner">
                <Link href="/" className="navbar-logo" onClick={closeMenu}>
                    HB<span>.</span>
                </Link>

                {/* Desktop navigation */}
                <nav className="navbar-links" aria-label="Main navigation">
                    {navItems.map((item) => (
                        <Link key={item.href} href={item.href}>
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* Mobile menu button */}
                <button
                    type="button"
                    className={`navbar-menu ${menuOpen ? "is-open" : ""}`}
                    onClick={() => setMenuOpen((open) => !open)}
                    aria-label={
                        menuOpen ? "Close navigation" : "Open navigation"
                    }
                    aria-expanded={menuOpen}
                >
                    <span />
                    <span />
                </button>
            </div>

            {/* Mobile navigation */}
            <nav
                className={`navbar-mobile ${menuOpen ? "is-open" : ""}`}
                aria-label="Mobile navigation"
            >
                {navItems.map((item, index) => (
                    <Link key={item.href} href={item.href} onClick={closeMenu}>
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        {item.label}
                    </Link>
                ))}
            </nav>
        </header>
    );
}
