// Punto central para envolver la aplicación con providers globales si se necesitan
// (theme, query client, stores, i18n, etc.). Mantener simple por ahora.

export default function AppProvider({ children }) {
  return children;
}
