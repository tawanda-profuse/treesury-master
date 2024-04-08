import TreeForm from "../../components/Partials/Tree_Form";

const NewTree = () => {
  return (
    <>
      <h2 class="page-header">New Tree</h2>
      <form action="/trees" method="POST">
        <TreeForm />
        <div class="form-row form-row-end btn-row">
          <a class="btn btn-danger" href="/trees">
            Cancel
          </a>
          <button class="btn btn-primary" type="submit">
            Add
          </button>
        </div>
      </form>
    </>
  );
};

export default NewTree;
