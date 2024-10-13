import "./App.css";
import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import PageTitle from "./components/Partials/PageTitle";
import Home from "./pages/Home/Home";
import Trees from "./pages/trees/Trees";
import TreeDetails from "./pages/trees/TreeDetails";
import CategoryIndex from "./pages/categories/Categories";
import CreateCategory from "./pages/categories/CreateCategory";
import CategoryDetails from "./pages/categories/CategoryDetails";
import NewTree from "./pages/trees/NewTree";
import NotFound from "./pages/NotFound/NotFound";
import EditCategory from "./pages/categories/EditCategory";
import EditTree from "./pages/trees/EditTree";

function App() {
  return (
    <>
      <PageTitle title="Welcome to Treesury" />
      <Routes>
      </Routes>
      {/* <div className="container"> */}
      {/* <Header /> */}
      {/* <div className="inner-container"> */}
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/roots" element={<Home />} />
        <Route exact path="/categories" element={<CategoryIndex />} />
        <Route exact path="/categories/:id" element={<CategoryDetails />} />
        <Route exact path="/category/new" element={<CreateCategory />} />
        <Route exact path="/categories/:id/edit" element={<EditCategory />} />
        <Route exact path="/trees" element={<Trees />} />
        <Route exact path="/trees/:id" element={<TreeDetails />} />
        <Route exact path="/tree/new" element={<NewTree />} />
        <Route exact path="/trees/:id/edit" element={<EditTree />} />
        <Route exact path="*" element={<NotFound />} />
      </Routes>
      {/* </div> */}
      {/* <footer>
          <a
            href="https://en.wikipedia.org/wiki/List_of_tree_genera"
            target="_blank"
            rel="noreferrer"
          >
            Tree Family Reference <i className="fas fa-tree"></i>
          </a>
        </footer> */}
      {/* </div> */}
    </>
  );
}

export default App;
