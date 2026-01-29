import { motion } from 'motion/react';
import { Trophy, Shield, Target, Activity } from 'lucide-react';
import { players, Player } from '@/app/data/players';

interface StarterCardProps {
  player: Player;
  index: number;
}

function StarterCard({ player, index }: StarterCardProps) {
  const positionColors = {
    GK: '#FDB913',
    DEF: '#4A90E2',
    MID: '#50C878',
    FWD: '#C8102E',
  };

  const positionColor = positionColors[player.position];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="relative group"
    >
      {/* Glassmorphic Card */}
      <div className="backdrop-blur-xl bg-white/30 border border-white/20 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `linear-gradient(135deg, ${positionColor}30, transparent)`,
          }}
        />

        <div className="relative p-6">
          {/* Photo Section */}
          <div className="flex items-start justify-between mb-4">
            <div className="relative">
              {/* Player Photo */}
              <div
                className="w-24 h-24 rounded-2xl overflow-hidden border-4 shadow-xl"
                style={{ borderColor: positionColor }}
              >
                <img
                  src={player.photo}
                  alt={player.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Captain Badge with Glow */}
              {player.isCaptain && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: index * 0.1 + 0.3, type: 'spring' }}
                  className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-[#FDB913] to-[#FFD700] rounded-full flex items-center justify-center shadow-lg"
                  style={{
                    boxShadow: '0 0 20px rgba(253, 185, 19, 0.6)',
                  }}
                >
                  <Trophy className="w-5 h-5 text-black" />
                </motion.div>
              )}

              {/* Vice-Captain Badge */}
              {player.isViceCaptain && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: index * 0.1 + 0.3, type: 'spring' }}
                  className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-white to-gray-200 rounded-full flex items-center justify-center shadow-lg"
                  style={{
                    boxShadow: '0 0 20px rgba(200, 16, 46, 0.4)',
                  }}
                >
                  <Shield className="w-5 h-5 text-[#C8102E]" />
                </motion.div>
              )}
            </div>

            {/* Squad Number */}
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center backdrop-blur-sm bg-white/40 font-bold text-2xl font-['Poppins'] shadow-lg"
              style={{ color: positionColor }}
            >
              {player.number}
            </div>
          </div>

          {/* Player Info */}
          <div className="mb-4">
            <h3 className="text-xl font-bold font-['Poppins'] text-white mb-2">
              {player.name}
            </h3>
            <div className="flex items-center gap-2 mb-3">
              <span
                className="px-4 py-1.5 rounded-lg text-sm font-bold font-['Inter'] backdrop-blur-sm bg-white/40 shadow-md"
                style={{ color: positionColor }}
              >
                {player.position}
              </span>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg backdrop-blur-sm bg-white/40 shadow-md">
                <Activity className="w-4 h-4 text-[#FDB913]" />
                <span className="text-sm font-bold text-white font-['Inter']">
                  {player.rating}
                </span>
              </div>
            </div>
          </div>

          {/* Key Stats Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="backdrop-blur-sm bg-white/20 rounded-xl p-3 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Target className="w-4 h-4 text-[#FDB913]" />
              </div>
              <p className="text-2xl font-bold text-white font-['Poppins']">
                {player.goals}
              </p>
              <p className="text-xs text-gray-200 font-['Inter']">Goals</p>
            </div>
            
            <div className="backdrop-blur-sm bg-white/20 rounded-xl p-3 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Activity className="w-4 h-4 text-[#FDB913]" />
              </div>
              <p className="text-2xl font-bold text-white font-['Poppins']">
                {player.assists}
              </p>
              <p className="text-xs text-gray-200 font-['Inter']">Assists</p>
            </div>
          </div>

          {/* Additional Stats */}
          <div className="grid grid-cols-3 gap-2">
            <div className="backdrop-blur-sm bg-white/20 rounded-lg p-2 text-center">
              <p className="text-xs text-gray-200 font-['Inter'] mb-1">Apps</p>
              <p className="text-sm font-bold text-white font-['Poppins']">
                {player.appearances}
              </p>
            </div>
            <div className="backdrop-blur-sm bg-white/20 rounded-lg p-2 text-center">
              <p className="text-xs text-gray-200 font-['Inter'] mb-1">Pass%</p>
              <p className="text-sm font-bold text-white font-['Poppins']">
                {player.passAccuracy}%
              </p>
            </div>
            <div className="backdrop-blur-sm bg-white/20 rounded-lg p-2 text-center">
              <p className="text-xs text-gray-200 font-['Inter'] mb-1">Mins</p>
              <p className="text-sm font-bold text-white font-['Poppins']">
                {(player.minutesPlayed / 1000).toFixed(1)}k
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function StartingXI() {
  const startingPlayers = players.filter((p) => p.isStarting);

  // Group by position for better organization
  const goalkeeper = startingPlayers.filter((p) => p.position === 'GK');
  const defenders = startingPlayers.filter((p) => p.position === 'DEF');
  const midfielders = startingPlayers.filter((p) => p.position === 'MID');
  const forwards = startingPlayers.filter((p) => p.position === 'FWD');

  return (
    <section className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="backdrop-blur-xl bg-white/20 border border-white/20 rounded-2xl p-6 shadow-xl"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold font-['Poppins'] text-white mb-2">
              Starting XI
            </h2>
            <p className="text-gray-200 font-['Inter']">
              Today's lineup • 4-3-3 Formation
            </p>
          </div>
          <div className="backdrop-blur-sm bg-[#C8102E]/30 border border-[#C8102E]/50 rounded-2xl px-6 py-3">
            <p className="text-sm text-gray-200 font-['Inter'] mb-1">Total Players</p>
            <p className="text-3xl font-bold text-white font-['Poppins']">
              {startingPlayers.length}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Formation Sections */}
      <div className="space-y-8">
        {/* Forwards */}
        {forwards.length > 0 && (
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl font-bold font-['Poppins'] text-white mb-4 flex items-center gap-2"
            >
              <div className="w-3 h-3 rounded-full bg-[#C8102E]" />
              Forwards
            </motion.h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {forwards.map((player, index) => (
                <StarterCard key={player.id} player={player} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* Midfielders */}
        {midfielders.length > 0 && (
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl font-bold font-['Poppins'] text-white mb-4 flex items-center gap-2"
            >
              <div className="w-3 h-3 rounded-full bg-[#50C878]" />
              Midfielders
            </motion.h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {midfielders.map((player, index) => (
                <StarterCard key={player.id} player={player} index={index + forwards.length} />
              ))}
            </div>
          </div>
        )}

        {/* Defenders */}
        {defenders.length > 0 && (
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl font-bold font-['Poppins'] text-white mb-4 flex items-center gap-2"
            >
              <div className="w-3 h-3 rounded-full bg-[#4A90E2]" />
              Defenders
            </motion.h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {defenders.map((player, index) => (
                <StarterCard
                  key={player.id}
                  player={player}
                  index={index + forwards.length + midfielders.length}
                />
              ))}
            </div>
          </div>
        )}

        {/* Goalkeeper */}
        {goalkeeper.length > 0 && (
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl font-bold font-['Poppins'] text-white mb-4 flex items-center gap-2"
            >
              <div className="w-3 h-3 rounded-full bg-[#FDB913]" />
              Goalkeeper
            </motion.h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {goalkeeper.map((player, index) => (
                <StarterCard
                  key={player.id}
                  player={player}
                  index={index + forwards.length + midfielders.length + defenders.length}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
