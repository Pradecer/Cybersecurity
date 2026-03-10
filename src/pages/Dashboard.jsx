import { useProgressTracking } from '../hooks/useProgressTracking';
import curriculumData from '../data/curriculum.json';
import CourseCard from '../components/CourseCard';
import RecentNotes from '../components/RecentNotes';
import { Target, Shield } from 'lucide-react';

export default function Dashboard() {
  const { progress, markLabComplete, getOverallProgress } = useProgressTracking();

  const primaryProgress = getOverallProgress('primary', curriculumData);
  const secondaryProgress = getOverallProgress('secondary', curriculumData);

  return (
    <div className="max-w-7xl mx-auto space-y-12">
      {/* Progress Overview Section */}
      <section>
        <h1 className="text-2xl font-bold font-mono text-white mb-6">Learning Journey</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Primary Track Progress */}
          <div className="bg-[#161b22] border border-gray-800 rounded-xl p-6 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-5 w-5 text-neon-green" />
                <h3 className="text-lg font-semibold font-mono text-white">Primary Track</h3>
              </div>
              <p className="text-sm text-gray-400 font-mono">Red Teaming & Bug Bounty</p>
            </div>
            <div className="relative h-20 w-20 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-gray-800"
                  strokeWidth="3"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-neon-green"
                  strokeDasharray={`${primaryProgress}, 100`}
                  strokeWidth="3"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-sm font-bold font-mono text-white">
                {primaryProgress}%
              </span>
            </div>
          </div>

          {/* Secondary Track Progress */}
          <div className="bg-[#161b22] border border-gray-800 rounded-xl p-6 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-5 w-5 text-electric-blue" />
                <h3 className="text-lg font-semibold font-mono text-white">Secondary Track</h3>
              </div>
              <p className="text-sm text-gray-400 font-mono">Blue Teaming / SOC</p>
            </div>
            <div className="relative h-20 w-20 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-gray-800"
                  strokeWidth="3"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-electric-blue"
                  strokeDasharray={`${secondaryProgress}, 100`}
                  strokeWidth="3"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-sm font-bold font-mono text-white">
                {secondaryProgress}%
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Roadmap Section */}
      <section>
        <h2 className="text-2xl font-bold font-mono text-white mb-8">Curriculum Roadmap</h2>
        <div className="space-y-12">
          {curriculumData.phases.map((phase) => (
            <div key={phase.id} className="relative">
              <div className="flex items-center gap-4 mb-6">
                <div className={`h-8 w-1 rounded-full ${phase.track === 'primary' ? 'bg-neon-green' : 'bg-electric-blue'}`}></div>
                <h3 className="text-xl font-bold font-mono text-white">{phase.title}</h3>
                <span className={`px-2 py-1 text-xs font-medium font-mono rounded border ${
                  phase.track === 'primary'
                    ? 'border-neon-green/30 text-neon-green bg-neon-green/10'
                    : 'border-electric-blue/30 text-electric-blue bg-electric-blue/10'
                }`}>
                  {phase.track === 'primary' ? 'Primary Track' : 'Secondary Track'}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {phase.labs.map((lab) => (
                  <CourseCard
                    key={lab.id}
                    lab={lab}
                    isComplete={progress[lab.id]?.status === 'complete'}
                    onMarkComplete={markLabComplete}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Notes Section */}
      <section>
        <RecentNotes />
      </section>
    </div>
  );
}
