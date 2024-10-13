import { Link } from "react-router-dom";
import "./Header.css";
import { useState, useEffect, useRef } from "react";

const Header = () => {
  const [active, setActive] = useState(false);
  const navBarToggleRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      // Check if the click is outside of the navbar__toggle element
      if (
        navBarToggleRef.current &&
        !navBarToggleRef.current.contains(event.target)
      ) {
        // Check if the click is on a Link element
        const isLinkClick = event.target.tagName === "A";

        // Close the menu only if the click is outside the navbar or not on a Link element
        if (!isLinkClick) {
          setActive(false);
        }
      }
    };

    // Add event listener to detect clicks on the document body
    document.addEventListener("mousedown", handleOutsideClick);

    // Clean up event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [navBarToggleRef]);

  return (
    <nav className="header-nav">
      <Link
        className="header-title"
        to="/roots"
        onClick={() => setActive(false)}
      >
        <img
          width="150px"
          src={"/images/treesury.png"}
          alt="Treesury Logo"
          id="navbar__logo"
        />
      </Link>
      <div
        ref={navBarToggleRef}
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
          <Link
            className="navbar__links"
            to="/categories"
            onClick={() => setActive(false)}
          >
            Categories
          </Link>
        </li>
        <li className="navbar__item" title="Create a new category">
          <Link
            className="navbar__links"
            to="/category/new"
            onClick={() => setActive(false)}
          >
            Add Category
          </Link>
        </li>
        <li className="navbar__item" title="View all trees">
          <Link
            className="navbar__links"
            to="/trees"
            onClick={() => setActive(false)}
          >
            Trees
          </Link>
        </li>
        <li className="navbar__item" title="Add a new tree">
          <Link
            className="navbar__links"
            to="/tree/new"
            onClick={() => setActive(false)}
          >
            New Tree
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
