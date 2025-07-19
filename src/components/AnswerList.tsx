import type { AnswerEntry } from '../types/answers';
import AnswerCard from './AnswerCard';

interface Props {
    region: string;
    game: string;
    answers: Record<string, AnswerEntry>;
}

export default function AnswerList({ answers, game }: Props) {
    const ignoredTypesByGame: Record<string, string[]> = {
        loldle: [],
        pokedle: ['splash', 'ability', 'quote'],
        smashdle: ['splash', 'ability', 'quote'],
        dotadle: ['splash', 'emoji'],
        onepiecedle: ['splash', 'ability', 'quote'],
        narutodle: ['splash', 'ability'],
    };

    const ignoredTypes = ignoredTypesByGame[game] || [];

    const keys = Object.keys(answers || {}).filter((key) => !ignoredTypes.includes(key));

    return (
        <div className="space-y-6">
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {keys.map((key, index) => (
                    <AnswerCard key={key} type={key} entry={answers[key]} index={index} game={game} />
                ))}
            </div>

            {keys.length === 0 && (
                <div className="text-center py-12">
                    <div className="text-6xl mb-4">🔍</div>
                    <p className="text-gray-400 text-lg">Aucun résultat trouvé</p>
                    <p className="text-gray-500 text-sm mt-2">Essayez avec un autre terme de recherche</p>
                </div>
            )}
        </div>
    );
}
