interface GameSelectorProps {
    game: string;
    onChange: (gameId: string) => void;
}

const GAMES = [
    { id: "loldle", label: "LoLdle" },
    { id: "pokedle", label: "Pokédle" },
    { id: "smashdle", label: "Smashdle" },
    { id: "dotadle", label: "Dotadle" },
    { id: "onepiecedle", label: "Onepiecedle" },
    { id: "narutodle", label: "Narutodle" },
];

function GameSelector({ game, onChange }: GameSelectorProps) {
    return (
        <div className="flex flex-wrap gap-3 justify-center mb-6">
            {GAMES.map(g => (
                <button
                    key={g.id}
                    onClick={() => onChange(g.id)}
                    className={`px-4 py-2 rounded-full border transition 
                        ${game === g.id
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"}`}
                >
                    {g.label}
                </button>
            ))}
        </div>
    );
}

export default GameSelector
