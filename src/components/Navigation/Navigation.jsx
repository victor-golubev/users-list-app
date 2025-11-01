import "./Navigation.css";

const Navigation = ({ currentPage, setCurrentPage }) => {
  return (
    <div className="navigation">
      <div className="container">
        <h1>Users List App</h1>
        <nav className="nav-buttons">
          <button
            className={currentPage === "home" ? "active" : ""}
            onClick={() => setCurrentPage("home")}
          >
            Главная
          </button>
          <button
            className={currentPage === "favorites" ? "active" : ""}
            onClick={() => setCurrentPage("favorites")}
          >
            Избранное
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Navigation;
