import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import PageTitle from "./components/Partials/PageTitle";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Trees from "./pages/trees/Trees";
import TreeDetails from "./pages/trees/TreeDetails";
import CategoryIndex from "./pages/categories/Categories";
import CreateCategory from "./pages/categories/CreateCategory";
import CategoryDetails from "./pages/categories/CategoryDetails";
import NewTree from "./pages/trees/NewTree";
import NotFound from "./pages/NotFound/NotFound";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import EditCategory from "./pages/categories/EditCategory";
import EditTree from "./pages/trees/EditTree";

function App() {
  return (
    <>
      <BrowserRouter>
        <PageTitle title="Welcome to Treesury" />
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <div className="container">
            <Header />
            <div className="inner-container">
              <Route exact path="/roots">
                <Home />
              </Route>
              <Route exact path="/categories">
                <CategoryIndex />
              </Route>
              <Route exact path="/categories/:id">
                <CategoryDetails />
              </Route>
              <Route exact path="/category/new">
                <CreateCategory />
              </Route>
              <Route exact path="/categories/:id/edit">
                <EditCategory/>
              </Route>
              <Route exact path="/trees">
                <Trees />
              </Route>
              <Route exact path="/trees/:id">
                <TreeDetails />
              </Route>
              <Route exact path="/tree/new">
                <NewTree />
              </Route>
              <Route exact path="/trees/:id/edit">
                <EditTree/>
              </Route>
            </div>
            <footer>
              <a
                href="https://en.wikipedia.org/wiki/List_of_tree_genera"
                target="_blank"
                rel="noreferrer"
              >
                Tree Family Reference <i className="fas fa-tree"></i>
              </a>
            </footer>
          </div>
          <Redirect to="/not-found" />
        </Switch>
        <Route exact path="/not-found">
          <NotFound />
        </Route>
      </BrowserRouter>
    </>
  );
}

export default App;
