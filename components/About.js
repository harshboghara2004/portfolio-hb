export default function About() {
    return (
        <section className="about section" id="about">
            <div className="wrap">
                <div className="section-head">
                    <p className="section-number">01</p>

                    <div>
                        <p className="section-label">ABOUT</p>

                        <h2>
                            Engineering with a
                            <br />
                            <span>security-first mindset.</span>
                        </h2>
                    </div>
                </div>

                <div className="about-grid">
                    <div className="about-main">
                        <p className="about-lead">
                            I&apos;m a Backend Developer focused on{" "}
                            <strong>C++</strong>, <strong>cryptography</strong>,
                            and <strong>secure infrastructure</strong>.
                        </p>

                        <p>
                            My current work involves building{" "}
                            <strong>enterprise key management systems</strong>,
                            implementing the{" "}
                            <strong>OASIS KMIP protocol</strong>, integrating{" "}
                            <strong>Hardware Security Modules</strong>, and
                            developing backend APIs for cryptographic
                            operations.
                        </p>

                        <p>
                            My background also includes full-stack development
                            with <strong>React</strong>,{" "}
                            <strong>Next.js</strong>,{" "}
                            <strong>PostgreSQL</strong>, and{" "}
                            <strong>Firebase</strong>.
                        </p>
                    </div>

                    <div className="about-focus">
                        <div className="focus-heading">
                            <span>WHAT I FOCUS ON</span>
                            <i />
                        </div>

                        <div className="focus-item">
                            <span>01</span>

                            <div>
                                <h3>Backend Systems</h3>
                                <p>C++ · REST APIs · Database Architecture</p>
                            </div>
                        </div>

                        <div className="focus-item">
                            <span>02</span>

                            <div>
                                <h3>Security & Cryptography</h3>
                                <p>OpenSSL · KMIP · HSM · Key Management</p>
                            </div>
                        </div>

                        <div className="focus-item">
                            <span>03</span>

                            <div>
                                <h3>Problem Solving</h3>
                                <p>
                                    Algorithms · Data Structures · Competitive
                                    Programming
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
