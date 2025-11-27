import React, { useEffect, useState } from 'react';
import { CharacterId, Choice } from '../types';
import { CHARACTERS } from '../constants';

interface DialogueBoxProps {
  characterId?: CharacterId;
  text: string;
  choices?: Choice[];
  onOptionSelected: (choice: Choice) => void;
}

export const DialogueBox: React.FC<DialogueBoxProps> = ({ characterId, text, choices, onOptionSelected }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const speakerName = characterId ? CHARACTERS[characterId].name : '';
  const isNarrator = characterId === CharacterId.Narrator;

  // Typewriter effect
  useEffect(() => {
    setDisplayedText('');
    setShowOptions(false);
    let index = 0;
    
    // 調整速度為 150ms，非常慢，適合小學生閱讀
    const typingSpeed = 150; 
    
    const intervalId = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;
      if (index >= text.length) {
        clearInterval(intervalId);
        // 打字結束後顯示選項
        setTimeout(() => {
            setShowOptions(true);
        }, 500);
      }
    }, typingSpeed);

    return () => clearInterval(intervalId);
  }, [text]);

  return (
    <div className="absolute bottom-0 w-full p-4 z-30 flex justify-center">
      <div className="w-full max-w-4xl bg-stone-900/95 border-t-4 border-b-4 border-yellow-700/80 rounded-md shadow-2xl p-6 md:p-8 min-h-[250px] relative flex flex-col justify-between">
        
        {/* Speaker Name Tag */}
        {!isNarrator && speakerName && (
          <div className="absolute -top-5 left-8 bg-stone-200 text-stone-900 px-6 py-1 text-xl font-bold border-2 border-stone-800 shadow-md transform -skew-x-12 z-40">
             <span className="block transform skew-x-12">{speakerName}</span>
          </div>
        )}

        {/* Text Content Area */}
        <div className="flex-grow">
          <p className={`text-xl md:text-2xl leading-loose tracking-wider font-serif ${isNarrator ? 'text-stone-400 italic text-center' : 'text-stone-100'}`}>
            {displayedText}
            {!showOptions && <span className="animate-pulse inline-block ml-1 text-yellow-500">|</span>}
          </p>
        </div>

        {/* Choices Area (Rendered inside the box at the bottom) */}
        {showOptions && choices && choices.length > 0 && (
          <div className="mt-6 grid gap-3 animate-fade-in">
            {choices.map((choice) => (
              <button
                key={choice.id}
                onClick={() => onOptionSelected(choice)}
                className="w-full text-left bg-stone-800 hover:bg-yellow-900/40 border border-stone-600 hover:border-yellow-500 text-stone-200 py-3 px-5 rounded transition-all duration-200 group"
              >
                <span className="text-yellow-500 mr-2 group-hover:text-yellow-300">➤</span>
                <span className="text-lg md:text-xl">{choice.text}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};