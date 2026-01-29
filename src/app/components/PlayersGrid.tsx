import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Shield, Award, AlertCircle } from 'lucide-react';
import { players, Player } from '@/app/data/players';

function PlayerCard({ player }: { player: Player }) {
  const [isHovered, setIsHovered] = useState(false);

  const positionColors = {
    GK: '#FDB913',
    DEF: '#4A90E2',
    MID: '#50C878',
    FWD: '#C8102E',
  };

  const positionColor = positionColors[player.position];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
      className="relative group"
    >
      {/* Main Card */}
      <div className="backdrop-blur-xl bg-white/30 border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
        {/* Gradient overlay on hover */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `linear-gradient(135deg, ${positionColor}20, transparent)`,
          }}
        />

        <div className="relative">
          {/* Player Photo and Badges */}
          <div className="flex items-start justify-between mb-4">
            <div className="relative">
              {/* Photo with border */}
              <div
                className="w-20 h-20 rounded-full overflow-hidden border-4 shadow-lg"
                style={{ borderColor: positionColor }}
              >
                <img
                  src={player.photo}
                  alt={player.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Captain/Vice-Captain Badge */}
              {player.isCaptain && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#FDB913] rounded-full flex items-center justify-center shadow-lg"
                  title="Captain"
                >
                  <Trophy className="w-4 h-4 text-black" />
                </motion.div>
              )}
              {player.isViceCaptain && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -bottom-1 -right-1 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-lg"
                  title="Vice-Captain"
                >
                  <Shield className="w-4 h-4 text-[#C8102E]" />
                </motion.div>
              )}
            </div>

            {/* Squad Number */}
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-sm bg-white/40 font-bold text-xl font-['Poppins'] shadow-md"
              style={{ color: positionColor }}
            >
              {player.number}
            </div>
          </div>

          {/* Player Info */}
          <div className="mb-4">
            <h3 className="text-lg font-bold font-['Poppins'] text-white mb-1">
              {player.name}
            </h3>
            <div className="flex items-center gap-2">
              <span
                className="px-3 py-1 rounded-lg text-xs font-bold font-['Inter'] backdrop-blur-sm bg-white/30"
                style={{ color: positionColor }}
              >
                {player.position}
              </span>
              <div className="flex items-center gap-1">
                <Award className="w-4 h-4 text-[#FDB913]" />
                <span className="text-sm font-bold text-white font-['Inter']">
                  {player.rating}
                </span>
              </div>
            </div>
          </div>

          {/* Main Stats */}
          <div className="grid grid-cols-3 gap-3 mb-3">
            <div className="text-center">
              <p className="text-xs text-gray-200 font-['Inter'] mb-1">Apps</p>
              <p className="text-lg font-bold text-white font-['Poppins']">
                {player.appearances}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-200 font-['Inter'] mb-1">Goals</p>
              <p className="text-lg font-bold text-[#FDB913] font-['Poppins']">
                {player.goals}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-200 font-['Inter'] mb-1">Assists</p>
              <p className="text-lg font-bold text-[#FDB913] font-['Poppins']">
                {player.assists}
              </p>
            </div>
          </div>

          {/* Additional Stats */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="backdrop-blur-sm bg-white/20 rounded-lg p-2">
              <p className="text-gray-200 font-['Inter']">Pass Accuracy</p>
              <p className="text-white font-bold font-['Inter']">{player.passAccuracy}%</p>
            </div>
            <div className="backdrop-blur-sm bg-white/20 rounded-lg p-2">
              <p className="text-gray-200 font-['Inter']">Minutes</p>
              <p className="text-white font-bold font-['Inter']">
                {player.minutesPlayed.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Hover Stats - Extra Details */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 pt-3 border-t border-white/20"
              >
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {player.saves !== undefined && (
                    <div className="backdrop-blur-sm bg-white/20 rounded-lg p-2">
                      <p className="text-gray-200 font-['Inter']">Saves</p>
                      <p className="text-white font-bold font-['Inter']">{player.saves}</p>
                    </div>
                  )}
                  {player.tackles !== undefined && (
                    <div className="backdrop-blur-sm bg-white/20 rounded-lg p-2">
                      <p className="text-gray-200 font-['Inter']">Tackles</p>
                      <p className="text-white font-bold font-['Inter']">{player.tackles}</p>
                    </div>
                  )}
                  <div className="backdrop-blur-sm bg-white/20 rounded-lg p-2 flex items-center justify-between">
                    <p className="text-gray-200 font-['Inter']">Cards</p>
                    <div className="flex items-center gap-1">
                      {player.yellowCards > 0 && (
                        <span className="text-yellow-400 font-bold">
                          {player.yellowCards}Y
                        </span>
                      )}
                      {player.redCards > 0 && (
                        <span className="text-red-500 font-bold">
                          {player.redCards}R
                        </span>
                      )}
                      {player.yellowCards === 0 && player.redCards === 0 && (
                        <span className="text-green-400 font-bold">Clean</span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export function PlayersGrid() {
  const [selectedPosition, setSelectedPosition] = useState<string>('ALL');

  const positions = ['ALL', 'GK', 'DEF', 'MID', 'FWD'];
  const positionLabels = {
    ALL: 'All Players',
    GK: 'Goalkeepers',
    DEF: 'Defenders',
    MID: 'Midfielders',
    FWD: 'Forwards',
  };

  const filteredPlayers =
    selectedPosition === 'ALL'
      ? players
      : players.filter((p) => p.position === selectedPosition);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="backdrop-blur-xl bg-white/20 border border-white/20 rounded-2xl p-6 shadow-xl"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold font-['Poppins'] text-white mb-2">
              Squad Players
            </h2>
            <p className="text-gray-200 font-['Inter']">
              {filteredPlayers.length} players • Season 2025/26
            </p>
          </div>

          {/* Position Filter */}
          <div className="flex gap-2 flex-wrap">
            {positions.map((pos) => (
              <motion.button
                key={pos}
                onClick={() => setSelectedPosition(pos)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  px-4 py-2 rounded-xl font-['Inter'] font-medium transition-all duration-300
                  ${
                    selectedPosition === pos
                      ? 'bg-[#C8102E] text-white shadow-lg'
                      : 'bg-white/40 text-gray-700 hover:bg-white/60'
                  }
                `}
              >
                {positionLabels[pos as keyof typeof positionLabels]}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Players Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {filteredPlayers.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </motion.div>
    </div>
  );
}
