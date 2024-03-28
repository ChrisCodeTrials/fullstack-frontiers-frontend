import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import HeaderNav from "./Components/HeaderNav";
import LandingPage from "./Components/LandingPage";
import FindDoctor from "./Components/FindDoctor";
import MotivationalQuotes from "./Components/MotivationalQuotes";
import AboutUs from "./Components/AboutUs";
import Resources from "./Components/Resources";
import QuoteDetails from "./Components/QuoteDetails";
import AppointmentDetails from "./Components/AppointmentDetails";

function App() {
  return (
    <div>
      <HeaderNav />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/quotes" element={<MotivationalQuotes />} />
        <Route path="/about" element={<AboutUs />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/find-doctor" element={<FindDoctor />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/quotes/quote/:id" element={<QuoteDetails />}/>
          <Route path="/appointments/appointment/:appointment_id" element={<AppointmentDetails />} />
        </Route>
      </Routes>

    </div>
  );
}

export default App;
