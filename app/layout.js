import "./globals.css";
import "../styles/experience.css";
import "../styles/projects.css";
import "../styles/skills.css";
import "../styles/achievements.css";
import "../styles/contact.css";
import "../styles/hero.css";
import "../styles/nav.css";
import AmbientBackground from "../components/AmbientBackground";
import ScrollReveal from "../components/ScrollReveal";

export const metadata = {
    title: "Harsh Boghara | Backend Developer",
    description:
        "Portfolio of Harsh Boghara — Backend Developer focused on C++, cryptography, and secure systems.",
    icons: {
        icon: "/favicon.svg?v=2",
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <AmbientBackground />
                <ScrollReveal />
                {children}
            </body>
        </html>
    );
}
