import { useState } from 'react';
import { Sparkles, Volume2, Trophy } from 'lucide-react';
import type { AnswerEntry } from '../types/answers';

interface Props {
    type: string;
    entry: AnswerEntry;
    index: number;
    game: string;
}

export default function AnswerCard({ type, entry, index, game }: Props) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const image = entry.splash_img_url || entry.ability_img_url || entry.image || null;

    const typeConfig = {
        splash: { icon: '🎨', color: 'from-purple-500 to-pink-500', label: 'Splash Art' },
        ability: { icon: '⚡', color: 'from-blue-500 to-cyan-500', label: 'Ability' },
        quote: { icon: '💬', color: 'from-green-500 to-emerald-500', label: 'Quote' },
        classic: { icon: '👑', color: 'from-yellow-500 to-orange-500', label: 'Classic' },
        emoji: { icon: '😊', color: 'from-red-500 to-pink-500', label: 'Emoji' },
        card: { icon: '🃏', color: 'from-indigo-500 to-purple-600', label: 'Card' },
        flavor: { icon: '🍭', color: 'from-pink-400 to-pink-600', label: 'Flavor Text' },
        silhouette: { icon: '👤', color: 'from-gray-500 to-gray-700', label: 'Silhouette' },
        finalSmash: { icon: '💥', color: 'from-red-600 to-orange-600', label: 'Final Smash' },
        kirby: { icon: '🌟', color: 'from-pink-500 to-yellow-400', label: 'Kirby Copy' },
        loadingscreen: { icon: '⏳', color: 'from-slate-500 to-slate-700', label: 'Loading Screen' },
        laugh: { icon: '😆', color: 'from-yellow-400 to-pink-400', label: 'Laugh' },
        wanted: { icon: '📜', color: 'from-yellow-700 to-orange-800', label: 'Wanted Poster' },
        devilFruit: { icon: '🍎', color: 'from-red-500 to-purple-500', label: 'Devil Fruit' },
        eye: { icon: '👁️', color: 'from-indigo-600 to-blue-600', label: 'Eye' },
        jutsu: { icon: '🌀', color: 'from-blue-700 to-indigo-700', label: 'Jutsu' }
    };

    const config = typeConfig[type as keyof typeof typeConfig] || {
        icon: '🎮', color: 'from-gray-500 to-gray-600', label: type
    };

    function shouldShowField(field: 'splash' | 'ability' | 'quote') {
        const ignored: Record<string, Record<string, boolean>> = {
            loldle: {},
            pokedle: { splash: true, ability: true, quote: true },
            smashdle: { splash: true, ability: true, quote: true },
            dotadle: { quote: true },
            onepiecedle: { splash: true, ability: true, quote: true },
            narutodle: { splash: true, ability: true },
        };

        return !(ignored[game]?.[field]);
    }

    return (
        <div
            className={`group relative bg-white/5 backdrop-blur-sm rounded-3xl p-6 transition-all duration-500 transform hover:scale-105 hover:bg-white/10 border border-white/10 hover:border-white/20 ${isHovered ? 'shadow-2xl shadow-purple-500/20' : 'shadow-lg shadow-black/20'
                }`}
            style={{ animationDelay: `${index * 100}ms` }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Badge */}
            <div className={`absolute -top-3 left-6 px-4 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${config.color} text-white shadow-lg`}>
                <div className="flex items-center gap-1">
                    <span>{config.icon}</span>
                    <span>{config.label}</span>
                </div>
            </div>

            {/* Image */}
            {image && shouldShowField(type as 'splash' | 'ability') && (
                <div className="relative mb-4 mt-2">
                    <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
                        <img
                            src={image}
                            alt={entry.champion_name}
                            className={`w-full h-full object-cover transition-all duration-500 ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
                            onLoad={() => setImageLoaded(true)}
                        />
                        {!imageLoaded && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                            </div>
                        )}
                    </div>
                    <div className={`absolute inset-0 bg-gradient-to-r ${config.color} opacity-20 rounded-2xl blur-xl transition-opacity duration-300 ${isHovered ? 'opacity-40' : 'opacity-0'
                        }`} />
                </div>
            )}

            {/* Champion Name */}
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                {entry.champion_name}
            </h3>

            {/* Quote */}
            {entry.question && type !== 'ability' && shouldShowField('quote') && (
                <blockquote className="text-gray-300 italic text-sm mb-4 p-3 bg-white/5 rounded-xl border-l-4 border-purple-500">
                    "{entry.question}"
                </blockquote>
            )}

            {/* Audio */}
            {entry.audio_url && (
                <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Volume2 className="w-4 h-4 text-purple-400" />
                        <span className="text-sm text-gray-400">Audio Quote</span>
                    </div>
                    <audio controls className="w-full rounded-lg">
                        <source src={entry.audio_url} type="audio/ogg" />
                    </audio>
                </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between text-sm text-gray-400 mt-4 pt-4 border-t border-white/10">
                <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4" />
                    <span>Game #{entry.game_numero}</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Live</span>
                </div>
            </div>
        </div>
    );
}
