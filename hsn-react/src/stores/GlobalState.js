// todos los componentes acceden a él <-
import { create } from "zustand";

const useGlobalState = create((set, get, store) => ({
  // repasar docs y clase sobre objetos deconstruir...
}));
//  a traves de este hook acceden los componententes a los datos
export default useGlobalState;
