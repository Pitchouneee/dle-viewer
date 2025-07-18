export interface AnswerEntry {
    champion_name: string;
    splash_img_url?: string;
    ability_img_url?: string;
    image?: string;
    question?: string;
    audio_url?: string;
    game_numero: number;
}

export interface Answers {
    europe: Record<string, AnswerEntry>;
    america: Record<string, AnswerEntry>;
}
