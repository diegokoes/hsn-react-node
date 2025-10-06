Here’s how React Router is wired in your app:

Router instance

The router is created in router using createBrowserRouter. It defines a root route with path “/” that renders AppLayout, and nested child routes:
Index route: renders Landing at “/”
“/auth/login”: renders Login
“/auth/registro”: renders Registro
“*”: renders NotFound for any unmatched child path
The same NotFound is also provided as errorElement at the root level to render if a route throws during navigation (e.g., loader/action errors).
Router provider

In main.jsx, the router instance is passed to <RouterProvider router={router} />. This mounts the SPA router, hooks into browser history, and renders the current route element.
App layout with Outlet

AppLayout is the root element of the “/” route. It renders the persistent header and footer and uses <Outlet /> to render the currently matched child route between them. This is why the page content (Landing, Login, Registro) appears between Header and Footer on navigation.
Header links and navigation

The header component Header uses <Link> from react-router-dom[to navigate to “/auth/registro” and “/auth/login”.](http://_vscodecontentref_/10)<Link> performs client-side navigation (no full page reload), so the matched child element is swapped in the <Outlet />.
Route matching summary

“/” matches the index route and shows Landing.
“/auth/login” shows Login.
“/auth/registro” shows Registro.
Any other path under “/” falls back to the child “*” route and shows NotFound. If a route throws, the root errorElement also shows NotFound.
Path aliases for imports

The imports like @/features/... in router are resolved by the Vite alias configured in vite.config.js ("@": "./src").
In short: RouterProvider mounts the router; AppLayout provides header/footer and an <Outlet />; the header’s <Link>s navigate to child routes so their components render between header and footer.
