import { useEffect } from "react";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Buffer } from "buffer";
import DeleteForm from "../../components/Partials/DeleteForm";
import useFetch from "../../utils/useFetch";
import "./Tree.css";

const TreeDetails = () => {
  const { id } = useParams();
  const url = window.location.origin.includes("localhost")
    ? `http://localhost:7000/trees/${id}`
    : `https://treesury-master.vercel.app/trees/${id}`;
  const [data, isPending, error] = useFetch(url);

  useEffect(() => {
    if(data.tree){
      document.title = `Tree Details for ${data.tree.tree_name}`;
    }
  });

  return (
    <>
      {error && <p>{error}</p>}
      {isPending && <p>Loading...</p>}
      {data.tree &&  (
        <>
          <h2 class="page-header">{data.tree.tree_name}</h2>
          <div class="book-details">
            <div>
              <img
                class="book-cover"
                src={`data:${data.tree.coverImageType};base64, ${Buffer.from(
                  data.tree.coverImage.data
                ).toString("base64")}`}
                alt={data.tree.tree_name}
              />
              <div class="book-details-btn-grid">
                <Link
                  class="btn btn-primary edit-button"
                  to={`/trees/${data.tree._id}/edit`}
                >
                  <i class="fas fa-pen"></i>
                </Link>
                <DeleteForm ID={data.tree._id} directory={"trees"} />
                <Link
                  class="btn btn-primary view-button"
                  to={`/categories/${data.tree.category}`}
                >
                  <i class="fas fa-eye"></i>
                </Link>
              </div>
            </div>
            <div class="book-details-grid">
              <div class="book-details-label">Family (Genus):</div>
              <div>{data.categoryName}</div>
              <div class="book-details-label">Tree Description:</div>
              <div>{data.tree.description}</div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TreeDetails;
