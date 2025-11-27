import React, { useState, useEffect } from 'react';
import { GameScene } from './components/GameScene';
import { DialogueBox } from './components/DialogueBox';
import { STORY_SCRIPT } from './constants';
import { GameState, Choice } from './types';

const INITIAL_STATE: GameState = {
  currentSceneId: 'start',
  growthScore: 0,
  history: [],
  showFeedback: false,
  isThinking: false
};

export default function App() {
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
  
  const currentScene = STORY_SCRIPT[gameState.currentSceneId];

  // Handle player choice
  const handleChoiceSelect = (choice: Choice) => {
    // Calculate new score
    const newScore = choice.isGrowthMindset ? gameState.growthScore + 1 : gameState.growthScore;
    const showFeedback = choice.isGrowthMindset;

    // Update state
    setGameState(prev => ({
      ...prev,
      currentSceneId: choice.nextSceneId,
      growthScore: newScore,
      history: [...prev.history, prev.currentSceneId],
      showFeedback: showFeedback
    }));
  };

  // Turn off feedback animation after a delay
  useEffect(() => {
    if (gameState.showFeedback) {
      const timer = setTimeout(() => {
        setGameState(prev => ({ ...prev, showFeedback: false }));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [gameState.showFeedback]);

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden font-serif select-none">
      
      {/* 1. Main Visual Scene */}
      <GameScene 
        backgroundUrl={currentScene.backgroundUrl}
        activeCharacterId={currentScene.characterId}
        specialEffect={currentScene.specialEffect}
      />

      {/* 2. Feedback Overlay (Growth Mindset +1) */}
      {gameState.showFeedback && (
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 animate-[bounce_1s_infinite]">
          <div className="bg-gradient-to-r from-yellow-600/80 to-yellow-800/80 text-white px-8 py-4 rounded-full border-2 border-yellow-300 shadow-[0_0_30px_rgba(234,179,8,0.6)] backdrop-blur-md">
             <span className="text-2xl font-bold tracking-widest">✨ 成長值 +1</span>
          </div>
        </div>
      )}

      {/* 3. Dialogue Interface (Includes Choices) */}
       <DialogueBox 
          key={currentScene.id} // Reset typewriter on scene change
          characterId={currentScene.characterId}
          text={currentScene.text}
          choices={currentScene.choices}
          onOptionSelected={handleChoiceSelect}
       />
      
      {/* 4. Simple HUD (Top Right) */}
      <div className="absolute top-4 right-4 z-40 flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <span className="text-stone-300 text-sm">成長值: {gameState.growthScore}</span>
      </div>

    </div>
  );
}