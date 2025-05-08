export const firebaseErrorMessages = {
  // Authentication Errors
  'auth/email-already-in-use': 'Email already in use',
  'auth/invalid-email': 'Invalid email address',
  'auth/weak-password': 'Password should be at least 6 characters',
  'auth/user-not-found': 'User not found',
  'auth/wrong-password': 'Wrong password',
  'auth/too-many-requests': 'Too many attempts, try again later',
  'auth/requires-recent-login': 'Please login again to perform this action',
  
  // Firestore Errors
  'permission-denied': 'You do not have permission to perform this action',
  'not-found': 'Document not found',
  'already-exists': 'Document already exists',
  
  // Generic
  'unavailable': 'Service unavailable, please try again later'
};

export const getFriendlyError = (error) => {
  const code = error.code || error.message;
  return firebaseErrorMessages[code] || 'Something went wrong. Please try again.';
};