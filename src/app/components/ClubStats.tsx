import { motion } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const matchResults = [
  { match: 'vs MUN', result: 'W', goals: 3 },
  { match: 'vs CHE', result: 'W', goals: 2 },
  { match: 'vs ARS', result: 'D', goals: 1 },
  { match: 'vs MCI', result: 'W', goals: 2 },
  { match: 'vs TOT', result: 'W', goals: 4 },
  { match: 'vs NEW', result: 'D', goals: 1 },
];

const performanceData = [
  { category: 'Attack', value: 92 },
  { category: 'Defense', value: 85 },
  { category: 'Possession', value: 88 },
  { category: 'Passing', value: 90 },
  { category: 'Pressing', value: 87 },
  { category: 'Discipline', value: 82 },
];

const monthlyGoals = [
  { month: 'Aug', scored: 12, conceded: 4 },
  { month: 'Sep', scored: 15, conceded: 5 },
  { month: 'Oct', scored: 13, conceded: 6 },
  { month: 'Nov', scored: 16, conceded: 5 },
  { month: 'Dec', scored: 11, conceded: 7 },
  { month: 'Jan', scored: 11, conceded: 5 },
];

export function ClubStats() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="backdrop-blur-xl bg-white/20 border border-white/20 rounded-2xl p-6 shadow-xl"
      >
        <h2 className="text-3xl font-bold font-['Poppins'] text-white mb-2">
          Club Statistics
        </h2>
        <p className="text-gray-200 font-['Inter']">
          Detailed performance analytics and trends
        </p>
      </motion.div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Match Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="backdrop-blur-xl bg-white/30 border border-white/20 rounded-2xl p-6 shadow-xl"
        >
          <h3 className="text-xl font-bold font-['Poppins'] text-white mb-6">
            Recent Match Results
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={matchResults}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="match" stroke="#FFFFFF" />
              <YAxis stroke="#FFFFFF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  color: '#FFFFFF',
                }}
              />
              <Bar dataKey="goals" fill="#C8102E" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Performance Radar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="backdrop-blur-xl bg-white/30 border border-white/20 rounded-2xl p-6 shadow-xl"
        >
          <h3 className="text-xl font-bold font-['Poppins'] text-white mb-6">
            Team Performance Metrics
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart data={performanceData}>
              <PolarGrid stroke="rgba(255,255,255,0.2)" />
              <PolarAngleAxis dataKey="category" stroke="#FFFFFF" />
              <PolarRadiusAxis stroke="#FFFFFF" />
              <Radar
                name="Performance"
                dataKey="value"
                stroke="#C8102E"
                fill="#C8102E"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Monthly Goals Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="backdrop-blur-xl bg-white/30 border border-white/20 rounded-2xl p-6 shadow-xl lg:col-span-2"
        >
          <h3 className="text-xl font-bold font-['Poppins'] text-white mb-6">
            Goals Trend (Season 2025/26)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyGoals}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="#FFFFFF" />
              <YAxis stroke="#FFFFFF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  color: '#FFFFFF',
                }}
              />
              <Line
                type="monotone"
                dataKey="scored"
                stroke="#FDB913"
                strokeWidth={3}
                dot={{ fill: '#FDB913', r: 6 }}
                name="Goals Scored"
              />
              <Line
                type="monotone"
                dataKey="conceded"
                stroke="#C8102E"
                strokeWidth={3}
                dot={{ fill: '#C8102E', r: 6 }}
                name="Goals Conceded"
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}
