import Nav from "../components/Nav";
import Hero from "../components/Hero";
import About from "../components/About";
import Exp from "../components/Exp";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Achivements from "../components/Achievements";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
    return (
        <>
            <Nav />

            <main>
                <Hero />
                <About />
                <Exp />
                <Projects />
                <Skills />
                <Achivements />
                <Contact />
            </main>

            <Footer />
        </>
    );
}
