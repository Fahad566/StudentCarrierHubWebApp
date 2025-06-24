import React from "react";
import Unidashboard from "./Unidashboard/Unidashboard";
import Students from "./Students/Students";
import Teachers from "./Teachers/Teachers";
import Companies from "./Companies/companies";

const Main = () => {
 
  return (
    <div>
        <Unidashboard /> 
        <Companies />
        <Students />
        <Teachers />

    </div>
  );
};

export default Main;
