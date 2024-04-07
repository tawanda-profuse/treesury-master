const Header = () => {
  return (
    <nav className="header-nav">
      <div className="navbar__container">
        <a className="header-title" href="/roots">
          <img
            width="150px"
            src="/public/images/treesury.png"
            alt="Treesury Logo"
            id="navbar__logo"
          />
        </a>
        <div className="navbar__toggle" id="mobile-menu">
          <span className="bar" title="Toggle menu">
            <i className="fas fa-folder-tree"></i>
          </span>
        </div>
        <ul className="nav">
          <li className="navbar__item" title="View all categories">
            <a className="navbar__links" href="/#section-a">
              About
            </a>
          </li>
          <li className="navbar__item" title="View all categories">
            <a className="navbar__links" href="/categories">
              Categories
            </a>
          </li>
          <li className="navbar__item" title="Create a new category">
            <a className="navbar__links" href="/categories/new">
              Add Category
            </a>
          </li>
          <li className="navbar__item" title="View all trees">
            <a className="navbar__links" href="/trees">
              Trees
            </a>
          </li>
          <li className="navbar__item" title="Add a new tree">
            <a className="navbar__links" href="/trees/new">
              New Tree
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
