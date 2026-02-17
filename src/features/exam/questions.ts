export type QuestionCategory =
    | 'Hard Skills'
    | 'DevOps'
    | 'Logging & Observability'
    | 'Testing & QA'
    | 'Soft Skills'
    | 'Agile Methodologies'
    | 'English Expertise'
    | 'Product & Design'
    | 'Stakeholders & PM';

export interface QuestionOption {
    text: string;
    points: number; // 0-3
}

export interface Question {
    id: string;
    category: QuestionCategory;
    text: string;
    /** 4 real options — "I don't know" is appended by the UI */
    options: QuestionOption[];
}

export const CATEGORIES: QuestionCategory[] = [
    'Hard Skills',
    'DevOps',
    'Logging & Observability',
    'Testing & QA',
    'Soft Skills',
    'Agile Methodologies',
    'English Expertise',
    'Product & Design',
    'Stakeholders & PM',
];

export const MAX_POINTS_PER_CATEGORY = 9; // 3 questions × 3 max points

export const QUESTIONS: Question[] = [
    // ═══════════════════════════════════════
    // 1. HARD SKILLS (Backend, Frontend, DB)
    // ═══════════════════════════════════════
    {
        id: 'hs1',
        category: 'Hard Skills',
        text: 'Which of the following lists contains ONLY backend frameworks or technologies?',
        options: [
            { text: 'Node.js, Django, Spring Boot, .NET', points: 3 },
            { text: 'React, Angular, Vue, Svelte', points: 0 },
            { text: 'Figma, Sketch, Adobe XD, Canva', points: 0 },
            { text: 'MySQL, PostgreSQL, MongoDB, Redis', points: 1 },
        ],
    },
    {
        id: 'hs2',
        category: 'Hard Skills',
        text: 'What is the key difference between a Single Page Application (SPA) and Server-Side Rendering (SSR)?',
        options: [
            { text: 'SPA renders pages in the browser using JavaScript; SSR generates HTML on the server before sending it to the client', points: 3 },
            { text: 'SSR only works with React and SPA only works with Angular', points: 0 },
            { text: 'SPA requires a backend server and SSR does not', points: 0 },
            { text: 'There is no real difference — they are the same approach', points: 0 },
        ],
    },
    {
        id: 'hs3',
        category: 'Hard Skills',
        text: 'Which of the following is a document-based (NoSQL) database or a cloud database service?',
        options: [
            { text: 'MongoDB, DynamoDB, or Firestore', points: 3 },
            { text: 'MySQL and PostgreSQL only', points: 1 },
            { text: 'Apache Kafka and RabbitMQ', points: 0 },
            { text: 'Jenkins and GitHub Actions', points: 0 },
        ],
    },

    // ═══════════════════════════════════════
    // 2. DEVOPS (Git, CI/CD, Docker/Jenkins)
    // ═══════════════════════════════════════
    {
        id: 'do1',
        category: 'DevOps',
        text: 'What is the purpose of branching in Git?',
        options: [
            { text: 'To work on features or fixes in isolation without affecting the main codebase', points: 3 },
            { text: 'To delete old code permanently', points: 0 },
            { text: 'To compress the repository size', points: 0 },
            { text: 'To back up the database', points: 0 },
        ],
    },
    {
        id: 'do2',
        category: 'DevOps',
        text: 'What is Docker primarily used for?',
        options: [
            { text: 'Writing automated tests', points: 0 },
            { text: 'Managing Git repositories', points: 0 },
            { text: 'Containerizing applications to ensure consistent environments across development and production', points: 3 },
            { text: 'Designing user interfaces', points: 0 },
        ],
    },
    {
        id: 'do3',
        category: 'DevOps',
        text: 'What is the main goal of a CI/CD pipeline (e.g. Jenkins, GitHub Actions)?',
        options: [
            { text: 'To manually deploy code to the server', points: 1 },
            { text: 'To write documentation', points: 0 },
            { text: 'To design database schemas', points: 0 },
            { text: 'To automate building, testing, and deploying code every time changes are pushed', points: 3 },
        ],
    },

    // ═══════════════════════════════════════
    // 3. LOGGING & OBSERVABILITY
    // ═══════════════════════════════════════
    {
        id: 'lo1',
        category: 'Logging & Observability',
        text: 'What are logs used for in a production application?',
        options: [
            { text: 'To make the application run faster', points: 0 },
            { text: 'To store user passwords securely', points: 0 },
            { text: 'To record events, errors, and system behavior for debugging and monitoring', points: 3 },
            { text: 'To replace the need for a database', points: 0 },
        ],
    },
    {
        id: 'lo2',
        category: 'Logging & Observability',
        text: 'Which of these are commonly used for metrics and monitoring?',
        options: [
            { text: 'Microsoft Word and Excel', points: 0 },
            { text: 'Grafana, Datadog, New Relic, or Prometheus', points: 3 },
            { text: 'Photoshop and Figma', points: 0 },
            { text: 'Slack and Discord', points: 0 },
        ],
    },
    {
        id: 'lo3',
        category: 'Logging & Observability',
        text: 'What is the risk of NOT having logging or monitoring in production?',
        options: [
            { text: 'Nothing, it is optional and rarely needed', points: 0 },
            { text: 'The application will crash immediately', points: 1 },
            { text: 'You cannot detect or diagnose issues, leading to longer downtimes and blind spots', points: 3 },
            { text: 'It only affects mobile applications', points: 0 },
        ],
    },

    // ═══════════════════════════════════════
    // 4. TESTING & QA
    // ═══════════════════════════════════════
    {
        id: 'qa1',
        category: 'Testing & QA',
        text: 'What is a test case?',
        options: [
            { text: 'A document that describes the final product design', points: 0 },
            { text: 'A type of database query', points: 0 },
            { text: 'A set of conditions and expected results to verify that a feature works correctly', points: 3 },
            { text: 'A deployment configuration file', points: 0 },
        ],
    },
    {
        id: 'qa2',
        category: 'Testing & QA',
        text: 'In the testing pyramid, which type of test should you have the MOST of?',
        options: [
            { text: 'End-to-End (E2E) tests', points: 1 },
            { text: 'Manual tests', points: 0 },
            { text: 'Performance tests', points: 1 },
            { text: 'Unit tests — they are fast, cheap, and test individual pieces of logic', points: 3 },
        ],
    },
    {
        id: 'qa3',
        category: 'Testing & QA',
        text: 'What is the difference between an integration test and a unit test?',
        options: [
            { text: 'There is no difference, they are the same', points: 0 },
            { text: 'Unit tests are only for frontend code', points: 0 },
            { text: 'Integration tests are only manual', points: 0 },
            { text: 'Unit tests check individual functions; integration tests check how multiple components work together', points: 3 },
        ],
    },

    // ═══════════════════════════════════════
    // 5. SOFT SKILLS
    // ═══════════════════════════════════════
    {
        id: 'ss1',
        category: 'Soft Skills',
        text: 'A teammate disagrees with your technical approach during a code review. What do you do?',
        options: [
            { text: 'Ignore their comments and merge anyway', points: 0 },
            { text: 'Escalate to the manager immediately', points: 1 },
            { text: 'Delete the pull request and start over', points: 0 },
            { text: 'Listen to their perspective, discuss trade-offs, and find the best solution together', points: 3 },
        ],
    },
    {
        id: 'ss2',
        category: 'Soft Skills',
        text: 'What is the most important communication skill for a developer working in a team?',
        options: [
            { text: 'Writing long and detailed emails every day', points: 1 },
            { text: 'Being clear, concise, and proactive — sharing blockers and progress openly', points: 3 },
            { text: 'Only communicating through code comments', points: 0 },
            { text: 'Waiting until asked before sharing any updates', points: 0 },
        ],
    },
    {
        id: 'ss3',
        category: 'Soft Skills',
        text: 'How should you handle unexpected changes to project requirements mid-sprint?',
        options: [
            { text: 'Refuse the change — the sprint is locked', points: 1 },
            { text: 'Work overtime silently to absorb the change', points: 0 },
            { text: 'Assess the impact, communicate with the team, and adapt the plan if agreed upon', points: 3 },
            { text: 'Let the product owner handle it alone', points: 0 },
        ],
    },

    // ═══════════════════════════════════════
    // 6. AGILE METHODOLOGIES
    // ═══════════════════════════════════════
    {
        id: 'ag1',
        category: 'Agile Methodologies',
        text: 'What is the main purpose of a Daily Standup in Scrum?',
        options: [
            { text: 'To report to the manager what you did', points: 1 },
            { text: 'To review code together', points: 0 },
            { text: 'To sync the team on progress, blockers, and plans for the day', points: 3 },
            { text: 'To assign tasks to developers', points: 0 },
        ],
    },
    {
        id: 'ag2',
        category: 'Agile Methodologies',
        text: 'What is the difference between Scrum and Kanban?',
        options: [
            { text: 'They are the same methodology', points: 0 },
            { text: 'Kanban is only for hardware projects', points: 0 },
            { text: 'Scrum uses time-boxed sprints; Kanban uses a continuous flow with WIP limits', points: 3 },
            { text: 'Scrum does not have roles while Kanban does', points: 0 },
        ],
    },
    {
        id: 'ag3',
        category: 'Agile Methodologies',
        text: 'Who is responsible for prioritizing the Product Backlog in Scrum?',
        options: [
            { text: 'The Scrum Master', points: 1 },
            { text: 'The development team votes on it', points: 1 },
            { text: 'The stakeholders directly', points: 0 },
            { text: 'The Product Owner', points: 3 },
        ],
    },

    // ═══════════════════════════════════════
    // 7. ENGLISH EXPERTISE
    // ═══════════════════════════════════════
    {
        id: 'en1',
        category: 'English Expertise',
        text: 'What level of English do you consider necessary to work in the international software industry?',
        options: [
            { text: 'Basic — just reading documentation is enough', points: 1 },
            { text: 'It is not necessary — tools can translate everything', points: 0 },
            { text: 'B2 or higher — you need to communicate fluently in meetings, emails, and code reviews', points: 3 },
            { text: 'Only writing skills matter, not speaking', points: 0 },
        ],
    },
    {
        id: 'en2',
        category: 'English Expertise',
        text: 'Which English accents are you most likely to encounter in global tech teams?',
        options: [
            { text: 'Only American English', points: 1 },
            { text: 'Only British English', points: 1 },
            { text: 'American, British, Indian, and various non-native accents — adaptability is key', points: 3 },
            { text: 'Latin American English only', points: 0 },
        ],
    },
    {
        id: 'en3',
        category: 'English Expertise',
        text: 'Why is technical English important beyond just speaking?',
        options: [
            { text: 'It is only important for writing resumes', points: 0 },
            { text: 'It is not — everything is visual in software', points: 0 },
            { text: 'Only managers need it', points: 0 },
            { text: 'You need to read docs, write clear PRs and tickets, and participate in async communication', points: 3 },
        ],
    },

    // ═══════════════════════════════════════
    // 8. PRODUCT & DESIGN
    // ═══════════════════════════════════════
    {
        id: 'pd1',
        category: 'Product & Design',
        text: 'As a developer, how well should you understand what the product does and who uses it?',
        options: [
            { text: 'Not at all — the designer and PM handle that', points: 0 },
            { text: 'Only if asked during a meeting', points: 1 },
            { text: 'Deeply — understanding the user and business context helps you build better solutions', points: 3 },
            { text: 'Only if you are the team lead', points: 0 },
        ],
    },
    {
        id: 'pd2',
        category: 'Product & Design',
        text: 'A designer hands you a UI that is technically complex and the deadline is tight. What do you do?',
        options: [
            { text: 'Build it exactly as designed no matter what', points: 1 },
            { text: 'Skip the design and build what is easier', points: 0 },
            { text: 'Discuss trade-offs with the designer — propose simpler alternatives that still serve the user', points: 3 },
            { text: 'Tell the designer to redesign it completely', points: 0 },
        ],
    },
    {
        id: 'pd3',
        category: 'Product & Design',
        text: 'What is the biggest risk when developers build features without understanding the "why"?',
        options: [
            { text: 'Nothing — code is code regardless of context', points: 0 },
            { text: 'The only risk is slower delivery', points: 1 },
            { text: 'You may build the wrong thing, miss edge cases, and waste time on rework', points: 3 },
            { text: 'It only matters for frontend developers', points: 0 },
        ],
    },

    // ═══════════════════════════════════════
    // 9. STAKEHOLDERS & PM
    // ═══════════════════════════════════════
    {
        id: 'st1',
        category: 'Stakeholders & PM',
        text: 'What is a stakeholder in the context of software development?',
        options: [
            { text: 'Only the CEO of the company', points: 1 },
            { text: 'The person who writes the code', points: 0 },
            { text: 'Anyone who has an interest or is affected by the project — clients, managers, users, etc.', points: 3 },
            { text: 'Only the investors', points: 0 },
        ],
    },
    {
        id: 'st2',
        category: 'Stakeholders & PM',
        text: 'A stakeholder requests a new feature mid-project. What is the proper approach?',
        options: [
            { text: 'Add it immediately to make them happy', points: 0 },
            { text: 'Evaluate the impact on scope, timeline, and resources — then discuss priorities', points: 3 },
            { text: 'Ignore it — the plan was already set', points: 1 },
            { text: 'Tell them to wait for the next project', points: 0 },
        ],
    },
    {
        id: 'st3',
        category: 'Stakeholders & PM',
        text: 'Why is it important for developers to understand product management basics?',
        options: [
            { text: 'It is not — developers should only focus on code', points: 0 },
            { text: 'Only if you want to become a manager', points: 1 },
            { text: 'It helps make better technical decisions, communicate value, and align with business goals', points: 3 },
            { text: 'It is only required for senior engineers', points: 0 },
        ],
    },
];
