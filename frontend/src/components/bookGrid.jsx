const bookGrid = (trees) => {
  const bookCoverClass = "book-cover-large";
  const bookGridClass = "book-grid-large";
  return (
    <>
      <div className={`book-grid ${bookGridClass}`}>
        {trees.map((tree) => (
          <a href={`/trees/{tree.id}`}>
            <img
              className={`book-cover ${bookCoverClass}`}
              src={tree.coverImagePath}
              alt=""
            />
            {tree.tree_name}
          </a>
        ))}
      </div>
    </>
  );
};

export default bookGrid;
