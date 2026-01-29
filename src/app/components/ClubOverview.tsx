import { Trophy, Target, TrendingUp, Activity, Percent, Crosshair } from 'lucide-react';
import { motion } from 'motion/react';

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  color?: string;
  delay?: number;
}

function StatCard({ icon: Icon, label, value, color = '#C8102E', delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="relative group"
    >
      {/* Glassmorphic card */}
      <div className="backdrop-blur-xl bg-white/30 border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
        {/* Gradient border on hover */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#C8102E]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-['Inter'] text-gray-100 mb-2 uppercase tracking-wider">
              {label}
            </p>
            <p
              className="text-4xl font-bold font-['Poppins']"
              style={{ color }}
            >
              {value}
            </p>
          </div>
          
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-sm bg-white/20 group-hover:scale-110 transition-transform duration-300"
            style={{ boxShadow: `0 4px 20px ${color}40` }}
          >
            <Icon className="w-6 h-6" style={{ color }} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ClubOverview() {
  const stats = [
    { icon: Trophy, label: 'Total Wins', value: 24, color: '#FDB913' },
    { icon: Activity, label: 'Draws', value: 8, color: '#FFFFFF' },
    { icon: TrendingUp, label: 'Losses', value: 6, color: '#C8102E' },
    { icon: Target, label: 'Goals Scored', value: 78, color: '#FDB913' },
    { icon: Crosshair, label: 'Goals Conceded', value: 32, color: '#C8102E' },
    { icon: Percent, label: 'Avg Possession', value: '62%', color: '#FFFFFF' },
    { icon: Activity, label: 'Shots Per Game', value: 18, color: '#FDB913' },
    { icon: Target, label: 'Pass Accuracy', value: '87%', color: '#FFFFFF' },
  ];

  return (
    <section className="space-y-6">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="backdrop-blur-xl bg-white/20 border border-white/20 rounded-2xl p-6 shadow-xl"
      >
        <h2 className="text-3xl font-bold font-['Poppins'] text-white mb-2">
          Club Overview
        </h2>
        <p className="text-gray-200 font-['Inter']">
          Season 2025/26 Performance Metrics
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard
            key={stat.label}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            color={stat.color}
            delay={index * 0.1}
          />
        ))}
      </div>
    </section>
  );
}
