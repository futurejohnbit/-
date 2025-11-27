import React from 'react';
import { Character, CharacterId } from '../types';
import { CHARACTERS } from '../constants';

interface GameSceneProps {
  backgroundUrl: string;
  activeCharacterId?: CharacterId;
  specialEffect?: 'rain' | 'gold_glow' | 'fade_black';
}

export const GameScene: React.FC<GameSceneProps> = ({ backgroundUrl, activeCharacterId, specialEffect }) => {
  const activeCharacter: Character | undefined = activeCharacterId ? CHARACTERS[activeCharacterId] : undefined;
  
  // Don't show Narrator or Player (Wang Wei) avatar on screen, usually only the person being spoken to or the active speaker if it's a visual novel style
  // Modified logic: Always show Yuan Er if he is the active speaker. 
  // If Wang Wei (Player) is speaking, we might not show an avatar (first person POV), or show a different state.
  // For this fix: We render the avatar if `activeCharacterId` is valid and NOT Narrator.
  const shouldShowAvatar = activeCharacter && activeCharacterId !== CharacterId.Narrator && activeCharacterId !== CharacterId.WangWei;

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
      {/* Background Layer */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-1000 ease-in-out transform scale-105"
        style={{ backgroundImage: `url(${backgroundUrl})` }}
      >
        <div className="absolute inset-0 bg-black/40" /> {/* Darker Dimming for text readability */}
      </div>

      {/* Special Effects Layer */}
      {specialEffect === 'rain' && (
        <div className="absolute inset-0 pointer-events-none bg-[url('https://media.giphy.com/media/t7Qb8655Z1VfBGr5XB/giphy.gif')] opacity-30 bg-cover mix-blend-screen z-20" />
      )}
      
      {specialEffect === 'gold_glow' && (
        <div className="absolute inset-0 pointer-events-none animate-pulse bg-yellow-500/10 z-20" />
      )}

      {/* Character Layer - Fixed Positioning */}
      {shouldShowAvatar && activeCharacter.avatarUrl && (
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-10 flex items-end justify-center h-full pb-[180px] pointer-events-none transition-opacity duration-500">
           {/* 
              Using a container to ensure the image sits correctly relative to the dialogue box.
              pb-[180px] accounts for the dialogue box height.
           */}
          <img 
            src={activeCharacter.avatarUrl} 
            alt={activeCharacter.name} 
            className="max-h-[70vh] w-auto object-contain drop-shadow-[0_0_15px_rgba(0,0,0,0.8)] filter brightness-90"
          />
        </div>
      )}
    </div>
  );
};