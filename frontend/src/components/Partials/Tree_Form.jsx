import { Link } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from "../../utils/useFetch";

const TreeForm = () => {
  const url = window.location.origin.includes("localhost")
    ? "http://localhost:7000/categories"
    : "https://treesury.onrender.com/categories";
  const [categories, isPending, error] = useFetch(url);
  return (
    <>
      <div class="form-row">
        <div class="form-item">
          <label>Tree Name</label>
          <input type="text" name="tree_name" />
        </div>
        <div class="form-item">
          <label>Family (Genus)</label>
          {error && <label>{error}</label>}
          {isPending && <label>{isPending}</label>}
          <select id="category-selector" name="category">
            {categories &&
              categories.map((category) => (
                <option label={category.name} value={category._id}></option>
              ))}
          </select>
        </div>
        <Link class="new-category" title="Add new category" to="/category/new">
          <i class="fas fa-plus"></i>
        </Link>
      </div>
      <div class="form-row">
        <div class="form-item form-item-no-grow">
          <label>Image</label>
          <input type="file" name="cover" class="book-cover filepond" />
        </div>
        <div class="form-item">
          <label>Description</label>
          <textarea
            name="description"
            placeholder="Give details about the tree"
          ></textarea>
        </div>
      </div>
    </>
  );
};

export default TreeForm;
