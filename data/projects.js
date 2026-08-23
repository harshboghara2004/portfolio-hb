export const projects = [
    {
        name: "E-Key Management Server",
        title: "EKMS",
        type: "SECURITY / BACKEND",
        period: "NOV 2025 — PRESENT",

        description:
            "A production-grade Enterprise Key Management Server built around KMIP, designed to securely manage the complete lifecycle of cryptographic keys and perform hardware-backed cryptographic operations.",

        tech: ["C++", "OpenSSL", "Crow", "Oracle", "PostgreSQL", "HSM"],

        highlights: [
            {
                label: "PROTOCOL",
                value: "OASIS KMIP",
            },
            {
                label: "ALGORITHMS",
                value: "AES · 3DES · RSA · EC · ECDSA · EdDSA",
            },
            {
                label: "SECURITY",
                value: "OAuth 2.0 · RBAC · HSM",
            },
            {
                label: "CRYPTO",
                value: "Signing · Verification · Encryption · Decryption",
            },
            {
                label: "DATABASE",
                value: "Oracle · PostgreSQL",
            },
        ],

        points: [
            "Implemented cryptographic key lifecycle management across creation, storage, retrieval, usage, and destruction.",
            "Built a multi-database architecture supporting both Oracle and PostgreSQL.",
            "Integrated HSM-backed cryptographic operations for secure key storage and hardware-based processing.",
            "Implemented OAuth 2.0 authentication and RBAC-based authorization for fine-grained access control.",
        ],

        links: [
            {
                name: "PRODUCT INFO",
                url: "https://jisasoftech.com/jisa-key-management-system-kms/",
            },
        ],
    },

    {
        name: "Art Gallery",
        title: "ART GALLERY",
        type: "FULL-STACK WEB",
        period: "JUN 2024",

        description:
            "A full-stack art gallery platform for discovering and managing artwork, combining authentication, image storage, reviews, and secure payments into a single web experience.",

        tech: [
            "Next.js",
            "React",
            "PostgreSQL",
            "Prisma",
            "Clerk",
            "EdgeStore",
            "Stripe",
            "Tailwind CSS",
        ],

        highlights: [
            {
                label: "FRAMEWORK",
                value: "Next.js 14 · React",
            },
            {
                label: "DATABASE",
                value: "PostgreSQL · Prisma",
            },
            {
                label: "AUTH",
                value: "Clerk",
            },
            {
                label: "STORAGE",
                value: "EdgeStore",
            },
            {
                label: "PAYMENTS",
                value: "Stripe",
            },
        ],

        points: [
            "Built the application using Next.js 14 with server-side rendering and client-side routing.",
            "Implemented secure authentication and session management using Clerk.",
            "Designed the database layer using Prisma ORM with PostgreSQL.",
            "Integrated EdgeStore for artwork image storage and Stripe for secure payment processing.",
        ],

        links: [
            {
                name: "LIVE",
                url: "https://art-gallery-tau-nine.vercel.app/",
            },
        ],
    },

    {
        name: "SplitSync",
        title: "SPLITSYNC",
        type: "MOBILE / FINTECH",
        period: "2024",

        description:
            "A collaborative expense-splitting application that simplifies group expenses and automatically reduces complicated debt relationships into a minimal set of transactions.",

        tech: ["Flutter", "Dart", "Firebase"],

        highlights: [
            {
                label: "PLATFORM",
                value: "Flutter",
            },
            {
                label: "BACKEND",
                value: "Firebase",
            },
            {
                label: "AUTH",
                value: "Firebase Authentication",
            },
            {
                label: "DATA",
                value: "Realtime Database",
            },
            {
                label: "ALGORITHM",
                value: "Graph-based transaction reduction",
            },
        ],

        points: [
            "Built real-time expense and group management for friends and shared activities.",
            "Implemented graph-based debt simplification to reduce unnecessary transactions.",
            "Used Firebase Authentication and Realtime Database for synchronized user and transaction data.",
        ],

        links: [
            {
                name: "LIVE",
                url: "https://splitsync-91f14.web.app/",
            },
        ],
    },
];
