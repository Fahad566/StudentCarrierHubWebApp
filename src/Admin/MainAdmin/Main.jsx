import React from "react";
import Dashboard from "./dashboard/dashboard"; // Import the Dashboard component
import Uniadmin from "./UniAdmin/Uniadmin";
import universities from "./Universities/universities";

const Main = () => {
 
  return (
    <div>
        <Dashboard  /> 
        <Uniadmin />
        <universities />

    </div>
  );
};

export default Main;
