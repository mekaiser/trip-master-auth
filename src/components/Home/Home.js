import React from "react";
import Cards from "../Cards/Cards";
import Header from "../Header/Header";
import "./Home.css";

const Home = () => {
  return (
    <section className="body-image">
      <Header></Header>
        <Cards></Cards>
    </section>
  );
};

export default Home;
