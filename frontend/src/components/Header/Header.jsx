import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./Header.css";
import { useState } from "react";

const Header = () => {
  const [active, setActive] = useState(false);

  return (
    <nav className="header-nav">
      <div className="navbar__container">
        <Link className="header-title" to="/roots">
          <img
            width="150px"
            src={"/images/treesury.png"}
            alt="Treesury Logo"
            id="navbar__logo"
          />
        </Link>
        <div
          className={`navbar__toggle ${active ? "is-active" : ""}`}
          id="mobile-menu"
          onClick={() => setActive(!active)}
        >
          <span className="bar" title="Toggle menu">
            <i className={`fas ${active ? "fa-times" : "fa-folder-tree"}`}></i>
          </span>
        </div>
        <ul className={`nav ${active ? "active" : ""}`}>
          <li className="navbar__item" title="View all categories">
            <Link className="navbar__links" to="/categories">
              Categories
            </Link>
          </li>
          <li className="navbar__item" title="Create a new category">
            <Link className="navbar__links" to="/category/new">
              Add Category
            </Link>
          </li>
          <li className="navbar__item" title="View all trees">
            <Link className="navbar__links" to="/trees">
              Trees
            </Link>
          </li>
          <li className="navbar__item" title="Add a new tree">
            <Link className="navbar__links" to="/tree/new">
              New Tree
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
