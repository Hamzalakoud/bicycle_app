import "bootstrap/dist/css/bootstrap.min.css";
import NavigationBar from "./components/NavigationBar";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Maps from "./components/maps";
import BicycleSpot from "./components/BicycleSpot";
import Book from "./components/Book";
import Customers from "./components/Customers";
import PrivateRoute from "./components/PrivateRoute"; // Adjust the path as needed
import Profile from "./components/Profile"; // Adjust the path as needed
import SignUp from "./components/SignUp"; // Adjust the path as needed
import SignIn from "./components/SignIn"; // Adjust the path as needed
import Confirm from "./components/confirm"; // Adjust the path based on your file structure
import Paiment from "./components/Paiment";

function App() {
// Empty dependency array ensures this runs only once when the component mounts

  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/Maps" element={<Maps />} />
        <Route path="/bike-spots/:id/bikes" element={<BicycleSpot />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/book/:spotId/:bikeId" element={<Book />} />

        <Route path="/confirm" element={<Confirm />} />
        <Route path="/paiment" element={<Paiment />} />
        <Route
          path="/customers"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <Customers />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute allowedRoles={["user"]}>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
  