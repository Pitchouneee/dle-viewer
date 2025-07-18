import { Globe } from 'lucide-react';

interface RegionSelectorProps {
    region: 'europe' | 'america';
    onChange: (region: 'europe' | 'america') => void;
}

export default function RegionSelector({ region, onChange }: RegionSelectorProps) {
    return (
        <div className="flex justify-center mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-1 flex gap-1">
                {(['europe', 'america'] as const).map((r) => (
                    <button
                        key={r}
                        onClick={() => onChange(r)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${region === r
                            ? r === 'europe'
                                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                                : 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
                            : 'text-gray-400 hover:text-white hover:bg-white/10'
                            }`}
                    >
                        <Globe className="w-4 h-4" />
                        {r.charAt(0).toUpperCase() + r.slice(1)}
                    </button>
                ))}
            </div>
        </div>
    );
}
