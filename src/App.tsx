import { useState, useEffect } from 'react'
import './App.css'
import { fetchAnswers } from './api/fetchAnswers';
import type { Answers } from './api/fetchAnswers';
import GameSelector from './components/GameSelector';
import AnswerList from './components/AnswerList';

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
        setError("Erreur lors du chargement des données.");
      }
      setLoading(false);
    };

    load();
  }, [game]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mt-8 mb-4">
        🎮 <span className="text-purple-700">*dle Answers Viewer</span>
      </h1>

      {/* Sélecteur de jeu */}
      <GameSelector game={game} onChange={setGame} />

      {/* Sélecteur de région */}
      <div className="flex justify-center gap-4 mt-4 mb-6">
        <button
          onClick={() => setRegion('europe')}
          className={`px-4 py-1 rounded-full text-sm font-semibold ${region === 'europe'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-800'
            }`}
        >
          🌍 Europe
        </button>
        <button
          onClick={() => setRegion('america')}
          className={`px-4 py-1 rounded-full text-sm font-semibold ${region === 'america'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-800 text-white'
            }`}
        >
          🌎 America
        </button>
      </div>

      {/* Chargement / erreurs */}
      {loading && <p className="text-center text-gray-600">Chargement...</p>}
      {error && <p className="text-red-600 text-center">{error}</p>}

      {/* Réponses */}
      {answers && <AnswerList region={region} answers={answers[region]} />}
    </div>
  );
}

export default App
