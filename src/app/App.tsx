import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Header } from '@/app/components/Header';
import { ClubOverview } from '@/app/components/ClubOverview';
import { PlayersGrid } from '@/app/components/PlayersGrid';
import { Formation } from '@/app/components/Formation';
import { StartingXI } from '@/app/components/StartingXI';
import { ClubStats } from '@/app/components/ClubStats';

export default function App() {
  const [activeSection, setActiveSection] = useState('dashboard');

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen relative overflow-x-hidden font-['Inter']">
        {/* Animated Background with Gradient */}
        <div className="fixed inset-0 -z-10">
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#C8102E] via-[#8B0A1F] to-[#000000]" />
          
          {/* Animated circles */}
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#C8102E] rounded-full blur-[150px] opacity-40 animate-pulse" />
          <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-[#FDB913] rounded-full blur-[200px] opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-white rounded-full blur-[180px] opacity-10 animate-pulse" style={{ animationDelay: '2s' }} />
          
          {/* Football pattern overlay */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `radial-gradient(circle at 20px 20px, rgba(255,255,255,0.2) 2px, transparent 0)`,
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <Header activeSection={activeSection} onNavigate={setActiveSection} />

        <main className="max-w-[1600px] mx-auto px-8 py-8 space-y-8">
          {/* Dashboard Section */}
          {activeSection === 'dashboard' && (
            <>
              <ClubOverview />
              <div className="grid grid-cols-1 gap-8">
                <StartingXI />
              </div>
            </>
          )}

          {/* Players Section */}
          {activeSection === 'players' && <PlayersGrid />}

          {/* Club Stats Section */}
          {activeSection === 'stats' && <ClubStats />}

          {/* Teamsheet Section */}
          {activeSection === 'teamsheet' && <Formation />}

          {/* Starting XI Section */}
          {activeSection === 'starting-xi' && <StartingXI />}
        </main>
      </div>
    </DndProvider>
  );
}
