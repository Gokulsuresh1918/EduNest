// store.js
import { create } from "zustand";
import {  persist } from "zustand/middleware";

// Define the types for your data
interface User {
  id: string;
  name: string;
  email: string;
}

interface Classroom {
  title: string;
  description: string;
  code: string;
  profilePicture: string;
  ownerId: string;
}

// Define the store interfaces
interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
}

interface ClassroomStore {
  classrooms: Classroom[];
  createClassroom: (classroom: Classroom) => void;
}

const userStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null, 
      setUser: (user: User) => set(() => ({ user })),
    }),
    { name: "UserZustand" }
  )
);

const classroomStore = create<ClassroomStore>((set) => ({
  classrooms: [],
  createClassroom: (classroom: Classroom) =>
    set((state) => ({
      classrooms: [...state.classrooms, classroom],
    })),
}));

export { userStore, classroomStore };
