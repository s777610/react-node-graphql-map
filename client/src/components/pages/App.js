import React from "react";
import withRoot from "../../withRoot";
import Map from "../Map";
import Header from "../Header";

const App = () => {
  return (
    <>
      <Header />
      <Map />
    </>
  );
};

export default withRoot(App);
