import "./App.css";
import {
  BrowserRouter,
  Route,
  Switch,
} from "react-router-dom/cjs/react-router-dom.min";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import Landing from "./pages/Landing/Landing";
import PageTitle from "./components/Partials/PageTitle";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Details from "./pages/Categories/Details";
import Trees from "./pages/Trees/Trees";
import TreeDetails from "./pages/Trees/TreeDetails";
import NewTree from "./pages/Trees/NewTree";
import NotFound from "./pages/NotFound";
import CategoryIndex from "./pages/Categories/Categories";
import CreateCategory from "./pages/Categories/CreateCategory";

function App() {
  return (
    <>
      <PageTitle title="Welcome to Treesury" />
      <BrowserRouter>
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
                <CategoryIndex/>
              </Route>
              <Route exact path="/categories/:id">
                <Details />
              </Route>
              <Route exact path="/category/new">
                <CreateCategory/>
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
              <Route path="*">
                <NotFound />
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
      </BrowserRouter>
    </>
  );
}

export default App;
