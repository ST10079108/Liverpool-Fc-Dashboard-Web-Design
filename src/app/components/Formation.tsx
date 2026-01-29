import { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { motion } from 'motion/react';
import { players, Player } from '@/app/data/players';
import { Shield, Trophy } from 'lucide-react';

interface Position {
  id: string;
  x: number;
  y: number;
  playerId: number | null;
}

interface DraggablePlayerProps {
  player: Player;
  onPitch?: boolean;
  onRemove?: () => void;
}

const ItemType = 'PLAYER';

function DraggablePlayer({ player, onPitch = false, onRemove }: DraggablePlayerProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType,
    item: { player },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <motion.div
      ref={drag}
      whileHover={{ scale: onPitch ? 1.1 : 1.05 }}
      className={`cursor-move ${isDragging ? 'opacity-50' : 'opacity-100'}`}
      onClick={onRemove}
    >
      <div className="relative">
        {/* Player Card */}
        <div className="backdrop-blur-xl bg-white/40 border-2 border-white/30 rounded-2xl p-3 shadow-xl text-center min-w-[100px]">
          {/* Photo */}
          <div className="relative mx-auto mb-2">
            <div className="w-16 h-16 rounded-full overflow-hidden border-3 border-[#C8102E] shadow-lg mx-auto">
              <img
                src={player.photo}
                alt={player.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Badges */}
            {player.isCaptain && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#FDB913] rounded-full flex items-center justify-center shadow-md">
                <Trophy className="w-3 h-3 text-black" />
              </div>
            )}
            {player.isViceCaptain && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
                <Shield className="w-3 h-3 text-[#C8102E]" />
              </div>
            )}
          </div>
          
          {/* Name */}
          <p className="text-xs font-bold text-white font-['Poppins'] mb-1 truncate">
            {player.name.split(' ').pop()}
          </p>
          
          {/* Number */}
          <div className="w-8 h-8 rounded-lg bg-[#C8102E] text-white font-bold text-sm flex items-center justify-center mx-auto">
            {player.number}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

interface PositionSlotProps {
  position: Position;
  onDrop: (playerId: number, positionId: string) => void;
  player: Player | null;
  onRemove: () => void;
}

function PositionSlot({ position, onDrop, player, onRemove }: PositionSlotProps) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemType,
    drop: (item: { player: Player }) => {
      onDrop(item.player.id, position.id);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      style={{
        position: 'absolute',
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
      className="z-10"
    >
      {player ? (
        <DraggablePlayer player={player} onPitch={true} onRemove={onRemove} />
      ) : (
        <motion.div
          animate={{
            scale: isOver ? 1.1 : 1,
            backgroundColor: isOver ? 'rgba(200, 16, 46, 0.3)' : 'rgba(255, 255, 255, 0.2)',
          }}
          className="w-24 h-24 rounded-full border-4 border-dashed border-white/50 flex items-center justify-center backdrop-blur-sm"
        >
          <span className="text-white text-xs font-['Inter'] font-medium">Drop Here</span>
        </motion.div>
      )}
    </div>
  );
}

export function Formation() {
  // Default 4-3-3 formation positions
  const [positions, setPositions] = useState<Position[]>([
    // Goalkeeper
    { id: 'gk', x: 50, y: 90, playerId: 1 },
    // Defenders
    { id: 'rb', x: 75, y: 72, playerId: 4 },
    { id: 'rcb', x: 60, y: 75, playerId: 3 },
    { id: 'lcb', x: 40, y: 75, playerId: 6 },
    { id: 'lb', x: 25, y: 72, playerId: 5 },
    // Midfielders
    { id: 'rcm', x: 60, y: 50, playerId: 9 },
    { id: 'cm', x: 50, y: 45, playerId: 12 },
    { id: 'lcm', x: 40, y: 50, playerId: 10 },
    // Forwards
    { id: 'rw', x: 70, y: 20, playerId: 14 },
    { id: 'st', x: 50, y: 15, playerId: 16 },
    { id: 'lw', x: 30, y: 20, playerId: 15 },
  ]);

  const handleDrop = (playerId: number, positionId: string) => {
    setPositions((prev) =>
      prev.map((pos) =>
        pos.id === positionId ? { ...pos, playerId } : pos
      )
    );
  };

  const handleRemove = (positionId: string) => {
    setPositions((prev) =>
      prev.map((pos) =>
        pos.id === positionId ? { ...pos, playerId: null } : pos
      )
    );
  };

  const usedPlayerIds = positions.map((pos) => pos.playerId).filter((id) => id !== null);
  const availablePlayers = players.filter((p) => !usedPlayerIds.includes(p.id));

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="backdrop-blur-xl bg-white/20 border border-white/20 rounded-2xl p-6 shadow-xl"
      >
        <h2 className="text-3xl font-bold font-['Poppins'] text-white mb-2">
          Team Formation
        </h2>
        <p className="text-gray-200 font-['Inter']">
          Drag and drop players to create your ideal lineup (4-3-3 Formation)
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Football Pitch */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2"
        >
          <div className="backdrop-blur-xl bg-white/20 border border-white/20 rounded-2xl p-6 shadow-xl">
            {/* Pitch Container */}
            <div className="relative w-full aspect-[2/3] max-w-[600px] mx-auto">
              {/* Pitch Background */}
              <div
                className="absolute inset-0 rounded-3xl overflow-hidden"
                style={{
                  background: 'linear-gradient(180deg, #1a4d2e 0%, #2d5f3e 50%, #1a4d2e 100%)',
                }}
              >
                {/* Grass Stripes */}
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-full h-[10%]"
                    style={{
                      top: `${i * 10}%`,
                      backgroundColor: i % 2 === 0 ? 'rgba(0, 0, 0, 0.1)' : 'transparent',
                    }}
                  />
                ))}

                {/* Pitch Markings */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 150">
                  {/* Border */}
                  <rect
                    x="2"
                    y="2"
                    width="96"
                    height="146"
                    fill="none"
                    stroke="white"
                    strokeWidth="0.5"
                    opacity="0.6"
                  />
                  
                  {/* Center Line */}
                  <line
                    x1="2"
                    y1="75"
                    x2="98"
                    y2="75"
                    stroke="white"
                    strokeWidth="0.5"
                    opacity="0.6"
                  />
                  
                  {/* Center Circle */}
                  <circle
                    cx="50"
                    cy="75"
                    r="12"
                    fill="none"
                    stroke="white"
                    strokeWidth="0.5"
                    opacity="0.6"
                  />
                  
                  {/* Center Dot */}
                  <circle cx="50" cy="75" r="1" fill="white" opacity="0.6" />
                  
                  {/* Top Penalty Box */}
                  <rect
                    x="22"
                    y="2"
                    width="56"
                    height="20"
                    fill="none"
                    stroke="white"
                    strokeWidth="0.5"
                    opacity="0.6"
                  />
                  
                  {/* Top Goal Box */}
                  <rect
                    x="35"
                    y="2"
                    width="30"
                    height="8"
                    fill="none"
                    stroke="white"
                    strokeWidth="0.5"
                    opacity="0.6"
                  />
                  
                  {/* Bottom Penalty Box */}
                  <rect
                    x="22"
                    y="128"
                    width="56"
                    height="20"
                    fill="none"
                    stroke="white"
                    strokeWidth="0.5"
                    opacity="0.6"
                  />
                  
                  {/* Bottom Goal Box */}
                  <rect
                    x="35"
                    y="140"
                    width="30"
                    height="8"
                    fill="none"
                    stroke="white"
                    strokeWidth="0.5"
                    opacity="0.6"
                  />
                  
                  {/* Penalty Spots */}
                  <circle cx="50" cy="12" r="1" fill="white" opacity="0.6" />
                  <circle cx="50" cy="138" r="1" fill="white" opacity="0.6" />
                </svg>
              </div>

              {/* Position Slots */}
              {positions.map((position) => {
                const player = players.find((p) => p.id === position.playerId) || null;
                return (
                  <PositionSlot
                    key={position.id}
                    position={position}
                    onDrop={handleDrop}
                    player={player}
                    onRemove={() => handleRemove(position.id)}
                  />
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Available Players */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <div className="backdrop-blur-xl bg-white/20 border border-white/20 rounded-2xl p-6 shadow-xl">
            <h3 className="text-xl font-bold font-['Poppins'] text-white mb-4">
              Available Players
            </h3>
            <div className="space-y-3 max-h-[800px] overflow-y-auto pr-2">
              {availablePlayers.map((player) => (
                <DraggablePlayer key={player.id} player={player} />
              ))}
              {availablePlayers.length === 0 && (
                <p className="text-gray-300 font-['Inter'] text-center py-8">
                  All players are on the pitch
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
