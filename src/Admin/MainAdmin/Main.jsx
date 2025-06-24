import React from "react";
import Dashboard from "./dashboard/dashboard"; // Import the Dashboard component
import Uniadmin from "./UniAdmin/Uniadmin";
import Universities from "./Universities/universities";

const Main = () => {
 
  return (
    <div>
        <Dashboard  /> 
        <Uniadmin />
        <Universities />

    </div>
  );
};

export default Main;
