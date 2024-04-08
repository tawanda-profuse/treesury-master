import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from "../../utils/useFetch";
import { useEffect } from "react";
import CategoryGrid from "../../components/Partials/DataGrid";

const Details = () => {
  const { id } = useParams();
  const url = window.location.origin.includes("localhost")
    ? `http://localhost:7000/categories/${id}`
    : `https://treesury.onrender.com/categories/${id}`;
  const [data, error, isPending] = useFetch(url);

  useEffect(() => {
    if (data) {
      document.title = `Trees in the ${data.category.name} category`;
    }
  });

  return (
    <>
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {data && (
        <>
          <h2 class="page-header">Trees in the {data.category.name} Family</h2>
          <CategoryGrid category={data} />
        </>
      )}
    </>
  );
};

export default Details;
