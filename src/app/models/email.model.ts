export interface Email {
    id: string;
    sender: string;
    senderEmail: string;
    subject: string;
    snippet: string;
    body: string;
    date: string;
    isStarred: boolean;
    isRead: boolean;
    labels: string[]; // e.g., 'Frontend', 'Backend', 'Security'
    techStack?: string[];
    type: 'primary' | 'promotions' | 'social';
}
