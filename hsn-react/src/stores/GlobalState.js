// todos los componentes acceden a él <-
import { create } from "zustand";

const useGlobalState = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears) => set({ bears: newBears }),
}));
//  a traves de este hook acceden los componententes a los datos
export default useGlobalState;
