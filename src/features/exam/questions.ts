export type QuestionTopic =
    | 'Hard Skills'
    | 'DevOps'
    | 'Observability'
    | 'Testing'
    | 'Soft Skills'
    | 'Agile'
    | 'Product';

export interface Question {
    id: string;
    topic: QuestionTopic;
    text: string;
    options: string[];
    correctAnswer: number; // Index of the correct option
}

export const QUESTIONS: Question[] = [
    // 1. Hard Skills
    {
        id: 'hs1',
        topic: 'Hard Skills',
        text: 'Which of the following creates a new React component?',
        options: [
            'function MyComponent() {}',
            'const MyComponent = new Component()',
            '<MyComponent />',
            'div.create()'
        ],
        correctAnswer: 0
    },
    // 2. DevOps
    {
        id: 'do1',
        topic: 'DevOps',
        text: 'What is the primary purpose of a CI/CD pipeline?',
        options: [
            'To write code automatically',
            'To automate testing and deployment',
            'To manage database backups',
            'To monitor user activity'
        ],
        correctAnswer: 1
    },
    // 3. Observability
    {
        id: 'ob1',
        topic: 'Observability',
        text: 'Which tool is commonly used for visualization of metrics?',
        options: [
            'PostgreSQL',
            'Grafana',
            'Nginx',
            'Redis'
        ],
        correctAnswer: 1
    },
    // 4. Testing
    {
        id: 'qa1',
        topic: 'Testing',
        text: 'What type of test checks if the entire application works together?',
        options: [
            'Unit Test',
            'Integration Test',
            'End-to-End (E2E) Test',
            'Smoke Test'
        ],
        correctAnswer: 2
    },
    // 5. Soft Skills
    {
        id: 'ss1',
        topic: 'Soft Skills',
        text: 'When a requirement is unclear, what is the best approach?',
        options: [
            'Guess and implement it',
            'Ignore the requirement',
            'Ask clarifying questions to stakeholders',
            'Wait for someone else to do it'
        ],
        correctAnswer: 2
    },
    // 6. Agile
    {
        id: 'ag1',
        topic: 'Agile',
        text: 'In Scrum, who is responsible for the Product Backlog?',
        options: [
            'The Scrum Master',
            'The Development Team',
            'The Product Owner',
            'The Stakeholders'
        ],
        correctAnswer: 2
    },
    // 7. Product
    {
        id: 'pd1',
        topic: 'Product',
        text: 'What is an MVP?',
        options: [
            'Most Valuable Player',
            'Minimum Viable Product',
            'Maximum Viable Product',
            'Minimum Variable Process'
        ],
        correctAnswer: 1
    }
];
