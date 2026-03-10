import { doc, getDoc, setDoc, updateDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

// Function to get user progress
export const getUserProgress = async (uid) => {
  try {
    const progressRef = collection(db, `users/${uid}/module_progress`);
    const snapshot = await getDocs(progressRef);
    const progress = {};
    snapshot.forEach((doc) => {
      progress[doc.id] = doc.data();
    });
    return progress;
  } catch (error) {
    console.error('Error fetching user progress:', error);
    throw error;
  }
};

// Function to update lab status
export const updateLabStatus = async (uid, labId, data) => {
  try {
    const labRef = doc(db, `users/${uid}/module_progress`, labId);
    await setDoc(labRef, { ...data, updatedAt: new Date().toISOString() }, { merge: true });
    return true;
  } catch (error) {
    console.error('Error updating lab status:', error);
    throw error;
  }
};

// Function to get user notes
export const getUserNotes = async (uid) => {
  try {
    const notesRef = collection(db, `users/${uid}/lab_notes`);
    const snapshot = await getDocs(notesRef);
    const notes = {};
    snapshot.forEach((doc) => {
      notes[doc.id] = doc.data();
    });
    return notes;
  } catch (error) {
    console.error('Error fetching user notes:', error);
    throw error;
  }
};

// Function to save note
export const saveNote = async (uid, noteId, content) => {
  try {
    const noteRef = doc(db, `users/${uid}/lab_notes`, noteId);
    await setDoc(noteRef, { content, updatedAt: new Date().toISOString() }, { merge: true });
    return true;
  } catch (error) {
    console.error('Error saving note:', error);
    throw error;
  }
};
