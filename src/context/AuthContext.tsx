import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  AuthError
} from 'firebase/auth';
import { auth } from '../config/firebase';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  function signup(email: string, password: string) {
    console.log('Attempting to sign up user:', email);
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Signup successful:', {
          email: userCredential.user.email,
          uid: userCredential.user.uid
        });
        setCurrentUser(userCredential.user);
      })
      .catch((error: AuthError) => {
        console.error('Signup error details:', {
          code: error.code,
          message: error.message,
          email: email
        });
        
        // Provide more user-friendly error messages
        let errorMessage = 'Failed to create account. ';
        switch (error.code) {
          case 'auth/email-already-in-use':
            errorMessage += 'This email is already registered.';
            break;
          case 'auth/invalid-email':
            errorMessage += 'Please enter a valid email address.';
            break;
          case 'auth/operation-not-allowed':
            errorMessage += 'Email/password accounts are not enabled.';
            break;
          case 'auth/weak-password':
            errorMessage += 'Please choose a stronger password.';
            break;
          default:
            errorMessage += error.message;
        }
        
        throw new Error(errorMessage);
      });
  }

  function login(email: string, password: string) {
    console.log('Attempting to login user:', email);
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Login successful:', {
          email: userCredential.user.email,
          uid: userCredential.user.uid
        });
        setCurrentUser(userCredential.user);
      })
      .catch((error: AuthError) => {
        console.error('Login error details:', {
          code: error.code,
          message: error.message,
          email: email
        });
        throw error;
      });
  }

  function loginWithGoogle() {
    console.log('Attempting Google sign-in');
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider)
      .then((userCredential) => {
        console.log('Google sign-in successful:', {
          email: userCredential.user.email,
          uid: userCredential.user.uid
        });
        setCurrentUser(userCredential.user);
      })
      .catch((error: AuthError) => {
        console.error('Google sign-in error:', error);
        throw error;
      });
  }

  function resetPassword(email: string) {
    console.log('Attempting to reset password for:', email);
    return sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log('Password reset email sent successfully');
      })
      .catch((error: AuthError) => {
        console.error('Password reset error:', error);
        throw error;
      });
  }

  function logout() {
    console.log('Attempting to logout user');
    return signOut(auth)
      .then(() => {
        console.log('Logout successful');
        setCurrentUser(null);
      })
      .catch((error: AuthError) => {
        console.error('Logout error:', error);
        throw error;
      });
  }

  useEffect(() => {
    console.log('Setting up auth state listener');
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('Auth state changed:', user ? 'User signed in' : 'No user');
      setCurrentUser(user);
      setLoading(false);
    });

    return () => {
      console.log('Cleaning up auth state listener');
      unsubscribe();
    };
  }, []);

  const value = {
    currentUser,
    loading,
    login,
    signup,
    logout,
    loginWithGoogle,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
} 