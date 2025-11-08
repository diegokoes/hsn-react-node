import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

const useGlobalState = create(
  devtools(
    persist(
      (set, get, store) => ({
        clientData: null,
        accessToken: null,
        cart: {
          items: [],
          state: "",
          paymentDate: null,
          paymentMethod: null,
          paymentAddress: null,
          shipmentAddress: null,
          shippingCost: 0,
          subtotal: 0,
          total: 0,
        },

        setClientData: (data) => set({ clientData: data }),
        setAccessToken: (token) => set({ accessToken: token }),

        addCartItem: (item) =>
          set((state) => {
            const existingItem = state.cart.items.find((i) => i.producto._id === item.producto._id);
            const items = existingItem
              ? state.cart.items.map((i) =>
                  i.producto._id === item.producto._id ? { ...i, cantidad: i.cantidad + item.cantidad } : i
                )
              : [...state.cart.items, item];
            return { cart: { ...state.cart, items, ...calculateTotals(items, state.cart.shippingCost) } };
          }),

        removeCartItem: (productId) =>
          set((state) => {
            const items = state.cart.items.filter((i) => i.producto._id !== productId);
            return { cart: { ...state.cart, items, ...calculateTotals(items, state.cart.shippingCost) } };
          }),

        updateCartItem: (productId, cantidad) =>
          set((state) => {
            const items = state.cart.items.map((i) => (i.producto._id === productId ? { ...i, cantidad } : i));
            return { cart: { ...state.cart, items, ...calculateTotals(items, state.cart.shippingCost) } };
          }),

        clearCart: () =>
          set((state) => ({
            cart: { ...state.cart, items: [], subtotal: 0, total: 0 },
          })),

        setShippingAddress: (address) =>
          set((state) => ({
            cart: { ...state.cart, shipmentAddress: address },
          })),

        setBillingAddress: (address) =>
          set((state) => ({
            cart: { ...state.cart, paymentAddress: address },
          })),

        setPaymentMethod: (method) =>
          set((state) => ({
            cart: { ...state.cart, paymentMethod: method },
          })),

        setShippingCost: (cost) =>
          set((state) => {
            const totals = calculateTotals(state.cart.items, cost);
            return { cart: { ...state.cart, shippingCost: cost, ...totals } };
          }),
      }),
      {
        name: "hsn-global-state",
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          ...state,
          clientData: state.clientData ? { ...state.clientData, password: undefined } : null,
        }),
      }
    )
  )
);

const calculateTotals = (items, shippingCost) => {
  const subtotal = items.reduce(
    (acc, item) => acc + item.producto.Precio * (1 - item.producto.Oferta / 100) * item.cantidad,
    0
  );
  return {
    subtotal,
    total: subtotal + shippingCost,
  };
};

export default useGlobalState;
