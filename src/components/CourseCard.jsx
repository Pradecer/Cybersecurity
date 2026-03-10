import { useState } from 'react';
import { CheckCircle2, PlayCircle, Info } from 'lucide-react';

export default function CourseCard({ lab, isComplete, onMarkComplete }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const isHTB = lab.platform === 'HackTheBox';

  return (
    <div className="relative flex flex-col justify-between rounded-xl bg-[#161b22] border border-gray-800 p-6 transition-all hover:border-gray-600 hover:shadow-lg">
      <div>
        <div className="flex items-start justify-between">
          <span
            className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium font-mono ring-1 ring-inset ${
              isHTB
                ? 'bg-green-400/10 text-neon-green ring-green-400/20'
                : 'bg-blue-400/10 text-electric-blue ring-blue-400/20'
            }`}
          >
            {lab.platform}
          </span>
          <div className="relative flex items-center">
            <button
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Info className="h-4 w-4" />
            </button>
            {showTooltip && (
              <div className="absolute right-0 top-6 z-10 w-64 rounded-md bg-gray-800 p-3 text-sm text-gray-200 shadow-xl border border-gray-700">
                <p className="font-semibold text-white mb-1">Real-World Application:</p>
                <p className="leading-relaxed text-xs">{lab.realWorldApp}</p>
              </div>
            )}
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold font-mono text-white line-clamp-2">
            {lab.title}
          </h3>
          <p className="mt-1 text-sm text-gray-400 font-mono">
            Type: {lab.type}
          </p>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-x-3">
        {isComplete ? (
          <button
            disabled
            className="flex flex-1 items-center justify-center rounded-md bg-gray-800 px-3 py-2 text-sm font-semibold text-green-400 shadow-sm border border-gray-700 cursor-not-allowed font-mono"
          >
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Completed
          </button>
        ) : (
          <>
            <button
              onClick={() => onMarkComplete(lab.id)}
              className="flex flex-1 items-center justify-center rounded-md bg-[#1f2937] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 hover:text-neon-green transition-colors border border-gray-600 font-mono"
            >
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Mark Complete
            </button>
            <button
              className={`flex flex-1 items-center justify-center rounded-md px-3 py-2 text-sm font-semibold text-black shadow-sm transition-colors font-mono ${
                isHTB
                  ? 'bg-neon-green hover:bg-green-400'
                  : 'bg-electric-blue hover:bg-blue-400'
              }`}
            >
              <PlayCircle className="mr-2 h-4 w-4" />
              Continue
            </button>
          </>
        )}
      </div>
    </div>
  );
}
