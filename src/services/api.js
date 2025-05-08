import { db, auth } from '../firebase';
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  doc, 
  updateDoc,
  increment,
  serverTimestamp
} from "firebase/firestore";
import { getFriendlyError } from './errorHandler';


// Shortens a URL and stores it in Firestore
export const shortenUrl = async (longUrl, customSlug = '') => {
  const user = auth.currentUser;
  if (!user) throw new Error("Please login to shorten URLs");

  try {
    const shortCode = customSlug || Math.random().toString(36).slice(2, 8);
    const shortUrl = `lynq/${shortCode}`;

    const docRef = await addDoc(collection(db, "links"), {
      longUrl,
      shortUrl,
      shortCode,
      clicks: 0,
      userId: user.uid,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    return { 
      id: docRef.id, 
      longUrl, 
      shortUrl, 
      clicks: 0 
    };
  } catch (error) {
    throw new Error(getFriendlyError(error));
  }
};

//Fetches all links for the current user
export const getLinks = async () => {
  const user = auth.currentUser;
  if (!user) return [];

  try {
    const q = query(
      collection(db, "links"), 
      where("userId", "==", user.uid)
    );
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error fetching links:", error);
    throw new Error(getFriendlyError(error));
  }
};

//Increments click count for a link
export const incrementClick = async (id) => {
  try {
    const linkRef = doc(db, "links", id);
    await updateDoc(linkRef, {
      clicks: increment(1),
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error("Error tracking click:", error);
    throw new Error(getFriendlyError(error));
  }
};