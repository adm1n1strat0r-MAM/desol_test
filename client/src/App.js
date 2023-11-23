// App.jsx or wherever your Routes are defined
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./auth/login.jsx";
import Car from "./cars/car.jsx"; // Import the Car component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/car" element={<Car />} /> {/* Add the route for "/car" */}
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
