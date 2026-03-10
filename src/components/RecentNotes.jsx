import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getUserNotes, saveNote } from '../utils/firestore';
import { Save, RefreshCw } from 'lucide-react';

export default function RecentNotes() {
  const { currentUser } = useAuth();
  const [noteContent, setNoteContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      if (!currentUser) return;
      try {
        const notes = await getUserNotes(currentUser.uid);
        if (notes['scratchpad']) {
          setNoteContent(notes['scratchpad'].content);
          setLastSaved(new Date(notes['scratchpad'].updatedAt).toLocaleTimeString());
        }
      } catch (err) {
        setError('Failed to load notes');
        console.error(err);
      }
    };
    fetchNotes();
  }, [currentUser]);

  const handleSave = async () => {
    if (!currentUser) return;
    setIsSaving(true);
    setError(null);
    try {
      await saveNote(currentUser.uid, 'scratchpad', noteContent);
      setLastSaved(new Date().toLocaleTimeString());
    } catch (err) {
      setError('Failed to save notes');
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="mt-8 rounded-xl bg-[#161b22] border border-gray-800 shadow-sm overflow-hidden flex flex-col h-[400px]">
      <div className="flex items-center justify-between border-b border-gray-800 bg-[#0a0d14] px-6 py-3">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold font-mono text-white">Recent Notes / Scratchpad</h2>
          {lastSaved && (
            <span className="text-xs text-gray-400 font-mono">
              Last saved: {lastSaved}
            </span>
          )}
          {error && (
            <span className="text-xs text-red-400 font-mono">
              {error}
            </span>
          )}
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold font-mono text-neon-green shadow-sm hover:bg-gray-700 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-gray-700"
        >
          {isSaving ? (
            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          {isSaving ? 'Saving...' : 'Save Notes'}
        </button>
      </div>
      <div className="flex-1 p-0 relative">
        <textarea
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          placeholder="# Lab Notes&#10;&#10;Use this space to document commands and vulnerabilities discovered during CTFs...&#10;&#10;## Payload examples&#10;- <script>alert(1)</script>"
          className="w-full h-full resize-none border-0 bg-[#0D1117] text-gray-300 placeholder:text-gray-600 focus:ring-0 p-6 font-mono text-sm leading-relaxed"
          spellCheck="false"
        />
      </div>
    </div>
  );
}
