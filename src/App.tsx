import { useEffect, useState } from 'react';
import { Gamepad2 } from 'lucide-react';
import GameSelector from './components/GameSelector';
import RegionSelector from './components/RegionSelector';
import AnswerList from './components/AnswerList';
import { fetchAnswers } from './api/fetchAnswers';
import type { Answers } from './types/answers';

function App() {
  const [game, setGame] = useState('loldle');
  const [answers, setAnswers] = useState<Answers | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [region, setRegion] = useState<'europe' | 'america'>('europe');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await fetchAnswers(game);
        setAnswers(data);
      } catch (err) {
        setError("Error loading data");
      }
      setLoading(false);
    };

    load();
  }, [game]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Gamepad2 className="w-8 h-8 text-purple-400" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              *dle Answers Viewer
            </h1>
            <Gamepad2 className="w-8 h-8 text-blue-400" />
          </div>
          <p className="text-gray-400 text-lg">
            Discover *dle game answers in real time
          </p>
        </div>

        <GameSelector game={game} onChange={setGame} />
        <RegionSelector region={region} onChange={setRegion} />

        {loading && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-400 text-lg">Loading answers...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">⚠️</div>
            <p className="text-red-400 text-lg">{error}</p>
          </div>
        )}

        {answers && !loading && <AnswerList region={region} game={game} answers={answers[region]} />}
      </div>
    </div>
  );
}

export default App
