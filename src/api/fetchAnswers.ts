import AES from 'crypto-js/aes';
import UTF8 from 'crypto-js/enc-utf8';

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

export interface Answers {
    europe: Record<string, string>;
    america: Record<string, string>;
}

export async function fetchAnswers(game: string): Promise<Answers> {
    const domain = DOMAINS[game] || DOMAINS["loldle"];

    const resp = await fetch(`https://cache.${domain}/cache.json?_${Date.now()}`, {
        headers: {
            "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.3",
        },
    });

    if (!resp.ok) throw new Error("Erreur lors de la récupération");

    const cypheredAnswers = await resp.text();
    const rawAnswers = JSON.parse(decrypt(cypheredAnswers, KEY_RESPONSE_BODY));

    const answers: Answers = { europe: {}, america: {} };

    Object.entries(rawAnswers).forEach(([k, v]) => {
        if (k.includes("answerName")) return;

        const region = k.split("_")[2] as "europe" | "america";
        const question = k.replace(`_${region}`, "").replace("_answerEncrypted", "");

        answers[region][question] = JSON.parse(decrypt(v as string, KEY_ANSWERS));
    });

    return answers;
}
