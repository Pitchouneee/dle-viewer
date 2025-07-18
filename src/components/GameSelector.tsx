interface GameSelectorProps {
    game: string;
    onChange: (gameId: string) => void;
}

const GAMES = [
    { id: "loldle", label: "LoLdle", icon: "🏆" },
    { id: "pokedle", label: "Pokédle", icon: "⚡" },
    { id: "smashdle", label: "Smashdle", icon: "🥊" },
    { id: "dotadle", label: "Dotadle", icon: "⚔️" },
    { id: "onepiecedle", label: "Onepiecedle", icon: "🏴‍☠️" },
    { id: "narutodle", label: "Narutodle", icon: "🍃" },
];

export default function GameSelector({ game, onChange }: GameSelectorProps) {
    return (
        <div className="flex flex-wrap justify-center gap-3 mb-8">
            {GAMES.map((g) => (
                <button
                    key={g.id}
                    onClick={() => onChange(g.id)}
                    className={`group relative px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${game === g.id
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/25'
                        : 'bg-white/10 backdrop-blur-sm text-gray-300 hover:bg-white/20 hover:text-white'
                        }`}
                >
                    <div className="flex items-center gap-2">
                        <span className="text-lg">{g.icon}</span>
                        <span>{g.label}</span>
                    </div>
                    {game === g.id && (
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-75 -z-10"></div>
                    )}
                </button>
            ))}
        </div>
    );
}
