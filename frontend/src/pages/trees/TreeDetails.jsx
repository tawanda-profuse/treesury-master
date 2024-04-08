import { useEffect } from "react";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Buffer } from "buffer";
import DeleteForm from "../../components/Partials/DeleteForm";
import useFetch from "../../utils/useFetch";
import "./Tree.css";

const TreeDetails = () => {
  const { id } = useParams();
  useEffect(() => {
    document.title = "Tree Details";
  }, []);
  const url = window.location.origin.includes("localhost")
    ? `http://localhost:7000/trees/${id}`
    : `https://treesury.onrender.com/trees/${id}`;
  const [data, isPending, error] = useFetch(url);
  return (
    <>
      <h2 class="page-header">{data.tree_name}</h2>
      <div class="book-details">
        <div>
          <img
            class="book-cover"
            src={`data:${data.coverImageType};base64, ${Buffer.from(
              data.coverImage.data
            ).toString("base64")}`}
            alt={data.tree_name}
          />
          <div class="book-details-btn-grid">
            <Link
              class="btn btn-primary edit-button"
              to={`/trees/${data._id}/edit`}
            >
              <i class="fas fa-pen"></i>
            </Link>
            <DeleteForm url={`/trees/${data._id}`} />
            <Link
              class="btn btn-primary view-button"
              to={`/categories/${data.category._id}`}
            >
              <i class="fas fa-eye"></i>
            </Link>
          </div>
        </div>
        <div class="book-details-grid">
          <div class="book-details-label">Family (Genus):</div>
          <div>{data.category.name}</div>
          <div class="book-details-label">Tree Description:</div>
          <div>{data.description}</div>
        </div>
      </div>
    </>
  );
};

export default TreeDetails;
