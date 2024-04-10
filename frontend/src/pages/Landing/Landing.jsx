import { useEffect } from "react";
import "./Landing.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Landing = () => {
  useEffect(() => {
    document.title = "Welcome to Treesury";
  }, []);
  return (
    <main id="landing-page">
      <header id="showcase">
        <h1>Welcome To Treesury</h1>
        <p>The best place to learn about trees — The oxygen of the earth.</p>
        <Link to="./roots" className="button">
          Continue
        </Link>
        <a className="scroll-down" href="#section-a">
          <i className="fas fa-arrow-down"></i>
        </a>
      </header>
      <section id="section-a">
        <p>
          The name Treesury is a combination of the word 'tree' and 'treasury.'
          The main aim of this project is to raise awareness about trees and
          demonstrate their value to our environment, we should protect them as
          thought they were something of value like gold.
        </p>
      </section>
      <section id="section-b">
        <p>
          Treesury is a project that is inspired by Earth Day. Every year,
          climate optimists celebrate this day to commemorate our commitment to
          keeping planet earth sustainable. Treesury has a specific focus on
          trees and includes data about many tree family groups.
        </p>
      </section>
      <section id="section-a">
        <p>
          The first Earth Day was focused on the United States. In 1990, Denis
          Hayes, the original national coordinator in 1970, took it
          international and organized events in 141 nations. On Earth Day 2016,
          the landmark Paris Agreement was signed by the United States, the
          United Kingdom, China, and 120 other countries. This signing satisfied
          a key requirement for the entry into force of the historic draft
          climate protection treaty adopted by consensus of the 195 nations
          present at the 2015 United Nations Climate Change Conference in Paris.
          Numerous communities engaged in Earth Day Week actions, an entire week
          of activities focused on the environmental issues that the world
          faces. On Earth Day 2020, over 100 million people around the world
          observed the 50th anniversary in what is being referred to as the
          largest online mass mobilization in history.
        </p>
      </section>
      <section id="section-c">
        <div className="box-1">
          <h1>Knowledge</h1>
          <p>
            Are you an expert on the environment? Share your knowledge about
            trees with the world.
          </p>
        </div>
        <div className="box-2">
          <h1>Research</h1>
          <p>
            Are you looking to know more? This is a great resource for
            environmentalists that want to expand their knowledge base.
          </p>
        </div>
        <div className="box-3">
          <h1>Save The World</h1>
          <p>
            You can become one of the many super heroes that live on planet
            earth. This website has the potential to save the earth.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Landing;
