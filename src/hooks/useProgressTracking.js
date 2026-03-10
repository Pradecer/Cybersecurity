import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getUserProgress, updateLabStatus } from '../utils/firestore';

export function useProgressTracking() {
  const { currentUser } = useAuth();
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProgress = useCallback(async () => {
    if (!currentUser) return;

    try {
      setLoading(true);
      const data = await getUserProgress(currentUser.uid);
      setProgress(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  const markLabComplete = async (labId) => {
    if (!currentUser) return;

    try {
      await updateLabStatus(currentUser.uid, labId, { status: 'complete' });
      setProgress(prev => ({
        ...prev,
        [labId]: { ...prev[labId], status: 'complete' }
      }));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const getOverallProgress = (track, curriculum) => {
    let completedLabs = 0;
    let totalLabs = 0;

    curriculum.phases.forEach(phase => {
      if (phase.track === track) {
        phase.labs.forEach(lab => {
          totalLabs++;
          if (progress[lab.id]?.status === 'complete') {
            completedLabs++;
          }
        });
      }
    });

    return totalLabs === 0 ? 0 : Math.round((completedLabs / totalLabs) * 100);
  };

  return {
    progress,
    loading,
    error,
    markLabComplete,
    getOverallProgress,
    refreshProgress: fetchProgress
  };
}
