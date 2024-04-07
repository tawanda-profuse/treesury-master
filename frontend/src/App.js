import "./App.css";
import {
  BrowserRouter,
  Route,
  Switch,
} from "react-router-dom/cjs/react-router-dom.min";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import Landing from "./pages/Landing/Landing";
import PageTitle from "./components/PageTitle";
import Header from "./components/Header";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <PageTitle title="Welcome to Treesury" />
      <div className="container">
        <BrowserRouter>
          <Route exact path="/">
            <Landing />
          </Route>
          <Switch>
            <Header />
            <div className="inner-container">
              <Route exact path="/roots">
                <Home/>
              </Route>
            </div>
            <footer>
              <a
                href="https://en.wikipedia.org/wiki/List_of_tree_genera"
                target="_blank"
                rel="noreferrer"
              >
                Tree Family Reference <i class="fas fa-tree"></i>
              </a>
            </footer>
          </Switch>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
