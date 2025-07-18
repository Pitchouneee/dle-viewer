interface AnswerListProps {
    region: string;
    answers: Record<string, any>; // Pour simplifier ici, on peut typer mieux plus tard
}

function AnswerList({ region, answers }: AnswerListProps) {
    const keys = Object.keys(answers || {});

    return (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {keys.map((key) => {
                const entry = answers[key];
                const image =
                    entry.splash_img_url || entry.ability_img_url || entry.image || null;

                return (
                    <div
                        key={key}
                        className="bg-white rounded-xl shadow-sm p-4 flex flex-col items-center text-center space-y-2"
                    >
                        {/* Type */}
                        <h3 className="text-sm font-semibold capitalize text-gray-500">
                            {key}
                        </h3>

                        {/* Image */}
                        {image && (
                            <img
                                src={image}
                                alt={entry.champion_name}
                                className="w-full max-w-[200px] aspect-square object-cover rounded"
                            />
                        )}

                        {/* Champion */}
                        <div className="text-lg font-bold text-blue-700">
                            {entry.champion_name}
                        </div>

                        {/* Optional Question */}
                        {entry.question && typeof entry.question === "string" && (
                            <p className="italic text-xs text-gray-600 px-2">
                                “{entry.question}”
                            </p>
                        )}

                        {/* Optional audio */}
                        {entry.audio_url && (
                            <audio controls className="w-full">
                                <source src={entry.audio_url} type="audio/ogg" />
                            </audio>
                        )}

                        {/* Game number */}
                        <div className="text-[10px] text-gray-400">
                            Game #{entry.game_numero}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default AnswerList