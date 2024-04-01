import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import HeaderNav from "./Components/HeaderNav";
import LandingPage from "./Components/LandingPage";
import AboutUs from "./Components/AboutUs";
import Resources from "./Components/Resources";
import QuoteDetails from "./Components/QuoteDetails";
import MotivationalQuotes from "./Components/MotivationalQuotesForm"
import AppointmentDetails from "./Components/AppointmentDetails";
import AllQuotes from "./Components/AllQuotes";
import ScheduleAppointment from "./Components/ScheduleAppointment";
import DeleteOrRescheduleAppt from "./Components/DeleteOrRescheduleAppt"

function App() {

  const [logUser, setLogUser] = useState(false)

  return (
    <div>
      <HeaderNav logUser={logUser} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login setLogUser={setLogUser}/>} />
        <Route path="/register" element={<Register setLogUser={setLogUser}/>} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/resources" element={<Resources logUser={logUser}/>} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard  setLogUser={setLogUser}/>} />
          <Route path="/quotes" element={<AllQuotes />} />
          <Route path="/quote/create" element={<MotivationalQuotes />}/>
          <Route path="/quotes/quote/:id" element={<QuoteDetails />}/>
          <Route path="/appointments/create" element={<ScheduleAppointment />}/>
          <Route path="/appointments/appointment/:appointment_id/reschedule" element={<DeleteOrRescheduleAppt />}  />
          <Route path="/appointments/appointment/:appointment_id" element={<AppointmentDetails />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;