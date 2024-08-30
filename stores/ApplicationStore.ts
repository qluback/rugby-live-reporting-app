import { create } from "zustand";

type Store = {
  teamHome: string;
  teamVisitor: string;
  setTeamHome: (name: string) => void,
  setTeamVisitor: (name: string) => void,
}

const useApplicationStore = create<Store>((set) => ({
  teamHome: "",
  teamVisitor: "",
  setTeamHome: (name: string) => set({teamHome: name}),
  setTeamVisitor: (name: string) => set({teamVisitor: name}),
}));

export default useApplicationStore;