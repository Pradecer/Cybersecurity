import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getUserProgress, updateLabStatus, getUserNotes, saveNote } from './firestore';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';

// Mock Firebase config
vi.mock('../firebase/config', () => ({
  db: {}
}));

// Mock Firestore functions
vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  getDocs: vi.fn(),
  doc: vi.fn(),
  setDoc: vi.fn()
}));

describe('Firestore Utilities', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getUserProgress', () => {
    it('should return progress data successfully', async () => {
      const mockDocs = [
        { id: 'lab1', data: () => ({ status: 'complete' }) },
        { id: 'lab2', data: () => ({ status: 'incomplete' }) }
      ];
      getDocs.mockResolvedValueOnce(mockDocs);

      const result = await getUserProgress('testuid');

      expect(collection).toHaveBeenCalledWith({}, 'users/testuid/module_progress');
      expect(result).toEqual({
        lab1: { status: 'complete' },
        lab2: { status: 'incomplete' }
      });
    });

    it('should throw error when fetching fails', async () => {
      getDocs.mockRejectedValueOnce(new Error('Network error'));
      await expect(getUserProgress('testuid')).rejects.toThrow('Network error');
    });
  });

  describe('updateLabStatus', () => {
    it('should update lab status successfully', async () => {
      setDoc.mockResolvedValueOnce(undefined);
      doc.mockReturnValueOnce('mockRef');

      const result = await updateLabStatus('testuid', 'lab1', { status: 'complete' });

      expect(doc).toHaveBeenCalledWith({}, 'users/testuid/module_progress', 'lab1');
      expect(setDoc).toHaveBeenCalledWith('mockRef', expect.objectContaining({
        status: 'complete',
        updatedAt: expect.any(String)
      }), { merge: true });
      expect(result).toBe(true);
    });

    it('should throw error when updating fails', async () => {
      setDoc.mockRejectedValueOnce(new Error('Permission denied'));
      await expect(updateLabStatus('testuid', 'lab1', {})).rejects.toThrow('Permission denied');
    });
  });

  describe('getUserNotes', () => {
    it('should return user notes successfully', async () => {
      const mockDocs = [
        { id: 'note1', data: () => ({ content: 'test note 1' }) },
        { id: 'note2', data: () => ({ content: 'test note 2' }) }
      ];
      getDocs.mockResolvedValueOnce(mockDocs);

      const result = await getUserNotes('testuid');

      expect(collection).toHaveBeenCalledWith({}, 'users/testuid/lab_notes');
      expect(result).toEqual({
        note1: { content: 'test note 1' },
        note2: { content: 'test note 2' }
      });
    });

    it('should throw error when fetching notes fails', async () => {
      getDocs.mockRejectedValueOnce(new Error('Network error'));
      await expect(getUserNotes('testuid')).rejects.toThrow('Network error');
    });
  });

  describe('saveNote', () => {
    it('should save note successfully', async () => {
      setDoc.mockResolvedValueOnce(undefined);
      doc.mockReturnValueOnce('mockRef');

      const result = await saveNote('testuid', 'note1', 'My note content');

      expect(doc).toHaveBeenCalledWith({}, 'users/testuid/lab_notes', 'note1');
      expect(setDoc).toHaveBeenCalledWith('mockRef', expect.objectContaining({
        content: 'My note content',
        updatedAt: expect.any(String)
      }), { merge: true });
      expect(result).toBe(true);
    });

    it('should throw error when saving note fails', async () => {
      setDoc.mockRejectedValueOnce(new Error('Permission denied'));
      await expect(saveNote('testuid', 'note1', 'My note content')).rejects.toThrow('Permission denied');
    });
  });
});
