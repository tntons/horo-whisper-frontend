export const message: Message[] = [
        {
            id: 1,
            content: "Hello! I'm Golf, your fortune teller for today. How can I help you?",
            timestamp: "10:01",
            isUser: true
        },
        {
            id: 2,
            content: "Hi! I'd like to know about my career prospects for the next 3 months",
            timestamp: "10:02",
            isUser: true
        },
        {
            id: 3,
            content: "I'll be happy to help you with that. First, I'll need to know your zodiac sign and birth date to provide accurate insights.",
            timestamp: "10:03",
            isUser: false
        },
        {
            id: 4,
            content: "I'll be happy to help you with that. First, I'll need to know your zodiac sign and birth date to provide accurate insights.",
            timestamp: "10:03",
            isUser: false
        },
        {
            id: 5,
            content: "I'll be happy to help you with that. First, I'll need to know your zodiac sign and birth date to provide accurate insights.",
            timestamp: "10:03",
            isUser: true
        },
        {
            id: 6,
            content: "I'll be happy to help you with that. First, I'll need to know your zodiac sign and birth date to provide accurate insights.",
            timestamp: "10:03",
            isUser: true
        },
        {
            id: 7,
            content: "I'll be happy to help you with that. First, I'll need to know your zodiac sign and birth date to provide accurate insights.",
            timestamp: "10:03",
            isUser: false
        },
        {
            id: 8,
            content: "I'll be happy to help you with that. First, I'll need to know your zodiac sign and birth date to provide accurate insights.",
            timestamp: "10:03",
            isUser: true
        }
    ];



interface Message {
    id: number;
    content: string;
    timestamp: string;
    isUser: boolean;
}