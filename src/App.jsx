import { useState } from "react";
import { FavoritesProvider } from "./context/FavoritesContext";
import Navigation from "./components/Navigation/Navigation";
import Home from "./pages/Home/Home";
import Favorites from "./pages/Favorites/Favorites";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  return (
    <FavoritesProvider>
      <div className="app">
        <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <main className="container">
          {currentPage === "home" ? <Home /> : <Favorites />}
        </main>
      </div>
    </FavoritesProvider>
  );
}

export default App;
