import { Outlet } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

export default function Layout() {
  return (
    <div className="app">
      <Navigation />
      <main className="container">
        <Outlet />
      </main>
    </div>
  );
}
