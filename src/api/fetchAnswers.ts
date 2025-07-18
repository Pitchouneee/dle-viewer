import AES from 'crypto-js/aes';
import UTF8 from 'crypto-js/enc-utf8';
import type { Answers, AnswerEntry } from '../types/answers';

const DOMAINS: Record<string, string> = {
    loldle: "loldle.net",
    pokedle: "pokedle.net",
    smashdle: "smashdle.net",
    dotadle: "dotadle.net",
    onepiecedle: "onepiecedle.net",
    narutodle: "narutodle.net",
};

const KEY_RESPONSE_BODY = "D5XCtTOObw";
const KEY_ANSWERS = "QhDZJfngdx";

const decrypt = (str: string, key: string): string =>
    AES.decrypt(str, key).toString(UTF8);

// Fonction de normalisation pour sécuriser les données brutes
const normalizeEntry = (raw: any): AnswerEntry => {
    return {
        champion_name: raw.champion_name,
        splash_img_url: raw.splash_img_url ?? undefined,
        ability_img_url: raw.ability_img_url ?? undefined,
        image: raw.image ?? undefined,
        question: typeof raw.question === 'string' ? raw.question : undefined,
        audio_url: raw.audio_url ?? undefined,
        game_numero: raw.game_numero,
    };
};

export async function fetchAnswers(game: string): Promise<Answers> {
    const domain = DOMAINS[game] || DOMAINS["loldle"];

    const resp = await fetch(`https://cache.${domain}/cache.json?_${Date.now()}`, {
        headers: {
            "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.3",
        },
    });

    if (!resp.ok) throw new Error("Error while fetching");

    const cypheredAnswers = await resp.text();
    const rawAnswers = JSON.parse(decrypt(cypheredAnswers, KEY_RESPONSE_BODY));

    const answers: Answers = { europe: {}, america: {} };

    for (const [key, value] of Object.entries(rawAnswers)) {
        if (key.includes("answerName")) continue;

        try {
            const region = key.split("_")[2] as 'europe' | 'america';
            const questionType = key.replace(`_${region}`, "").replace("_answerEncrypted", "");
            const decrypted = decrypt(value as string, KEY_ANSWERS);
            const parsed = JSON.parse(decrypted);

            const entry = normalizeEntry(parsed);

            answers[region][questionType] = entry;
        } catch (err) {
            console.warn("Parsing error for ", key, err);
        }
    }

    return answers;
}
