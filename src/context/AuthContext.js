import { createContext, useState, useEffect, useContext } from 'react';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail
} from "firebase/auth";
import { auth } from "../firebase";

// Create authentication context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //Unified auth action handler with error processing
  const authAction = async (action, ...args) => {
    try {
      const result = await action(...args);

      // Automatically send verification email after signup
      if (action === createUserWithEmailAndPassword) {
        await sendEmailVerification(result.user);
      }
      return result;
    } catch (error) {
      throw new Error(getFriendlyError(error));
    }
  };

  // Subscribe to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user ? { 
        email: user.email, 
        uid: user.uid,
        emailVerified: user.emailVerified 
      } : null);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ 
      user,
      loading,
      signup: (email, password) => authAction(createUserWithEmailAndPassword, email, password),
      login: (email, password) => authAction(signInWithEmailAndPassword, email, password),
      logout: () => signOut(auth),
      resetPassword: (email) => sendPasswordResetEmail(auth, email),
      verifyEmail: () => auth.currentUser && sendEmailVerification(auth.currentUser)
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

//Converts Firebase error codes to user-friendly messages
const getFriendlyError = (error) => {
  const errors = {
    'auth/email-already-in-use': 'Email already registered',
    'auth/invalid-email': 'Invalid email address',
    'auth/weak-password': 'Password must be 6+ characters',
    'auth/user-not-found': 'Account not found',
    'auth/wrong-password': 'Incorrect password',
    'auth/too-many-requests': 'Too many attempts. Try again later'
  };
  return errors[error.code] || error.message;
};