import { LayoutDashboard, Users, BarChart3, ClipboardList, Users2 } from 'lucide-react';
import { motion } from 'motion/react';

interface HeaderProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'players', label: 'Players', icon: Users },
  { id: 'stats', label: 'Club Stats', icon: BarChart3 },
  { id: 'teamsheet', label: 'Teamsheet', icon: ClipboardList },
  { id: 'starting-xi', label: 'Starting XI', icon: Users2 },
];

export function Header({ activeSection, onNavigate }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/30 border-b border-white/20 shadow-lg">
      <div className="max-w-[1600px] mx-auto px-8 py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-14 h-14 bg-[#C8102E] rounded-xl flex items-center justify-center shadow-lg"
            >
              <span className="text-white text-2xl font-bold font-['Poppins']">LFC</span>
            </motion.div>
            <div>
              <h1 className="text-xl font-bold font-['Poppins'] text-[#C8102E]">
                Liverpool FC
              </h1>
              <p className="text-sm text-gray-600 font-['Inter']">Dashboard</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <motion.button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    px-6 py-3 rounded-xl font-['Inter'] font-medium
                    flex items-center gap-2 transition-all duration-300
                    ${
                      isActive
                        ? 'bg-[#C8102E] text-white shadow-lg shadow-[#C8102E]/30'
                        : 'bg-white/50 text-gray-700 hover:bg-white/80 hover:shadow-md'
                    }
                  `}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-600'}`} />
                  <span className="hidden md:inline">{item.label}</span>
                </motion.button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
