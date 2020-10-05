import React from "react";
import "./home-page.scss";
import AdvisorsList from "../../components/advisors-list/AdvisorsList";
import SpecialitiesList from "../../components/specialities-list/SpecialitiesList";
const HomePage = () => {
  return (
    <div className="home-page-container">

      <SpecialitiesList />
      <AdvisorsList />
    </div>
  );
};

export default HomePage;
