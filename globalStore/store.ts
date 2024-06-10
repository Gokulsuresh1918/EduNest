import { create } from "zustand";
import { persist } from "zustand/middleware";

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
  students: Array<string>; 
  teachers: Array<string>; 
}

interface UIState {
  activeSection: string;
  setActiveSection: (section: string) => void;
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

const uiStore = create<UIState>()(
  persist(
    (set) => ({
      activeSection: "UserController",
      setActiveSection: (section: string) => set(() => ({ activeSection: section })),
    }),
    { name: "UIState" }
  )
);

export { userStore, classroomStore, uiStore };
