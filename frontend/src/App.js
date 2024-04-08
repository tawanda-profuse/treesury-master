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
import Categories from "./pages/Categories/Categories";
import NewCategory from "./pages/Categories/NewCategory";
import Details from "./pages/Categories/Details";
import Trees from "./pages/Trees/Trees";
import TreeDetails from "./pages/Trees/TreeDetails";

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
                <Categories />
              </Route>
              <Route exact path="/categories/:id">
                <Details />
              </Route>
              <Route exact path="/categories/new">
                <NewCategory />
              </Route>
              <Route exact path="/trees">
                <Trees />
              </Route>
              <Route exact path="/trees/:id">
                <TreeDetails />
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
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
