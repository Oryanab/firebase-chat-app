import { createContext, useEffect, useState, useContext } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import type { User } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

type AuthContextType = {
  user: User | null;
  logout: () => Promise<void>;
  uploadAvatar: (file: File) => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  logout: async () => {},
  uploadAvatar: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth();
    return onAuthStateChanged(auth, setUser);
  }, []);

  const logout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const uploadAvatar = async (file: File) => {
    if (!user) return;
    try {
      const storage = getStorage();
      const avatarRef = ref(storage, `avatars/${user.uid}`);
      await uploadBytes(avatarRef, file);

      const url = await getDownloadURL(avatarRef);
      await updateProfile(user, { photoURL: url });
      setUser({ ...user, photoURL: url });
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, logout, uploadAvatar }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
