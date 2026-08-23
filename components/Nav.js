export default function Nav() {
    return (
        <header className="nav">
            <div className="wrap nav-inner">
                <a href="#" className="logo">
                    HB<span>.</span>
                </a>

                <nav className="nav-links">
                    <a href="#about">About</a>
                    <a href="#experience">Experience</a>
                    <a href="#projects">Projects</a>
                    <a href="#skills">Skills</a>
                    <a href="#achievements">Achievements</a>
                </nav>

                <a href="#contact" className="nav-contact">
                    Contact
                </a>
            </div>
        </header>
    );
}
