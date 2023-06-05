import React from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Homepage from "./pages/homepage/Homepage";
import Orders from "./pages/orders/Orders";
import Services from "./pages/Services/Services";
import Gig from "./pages/Service/Service";
import MyGigs from "./pages/myServices/MyServices";
import Add from "./pages/add/Add";
import Messages from "./pages/messages/Messages";
import Message from "./pages/message/Message";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Success from "./pages/success/Success";
import Pay from "./pages/pay/Pay";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/single/:id" element={<Gig />} />
        <Route path="/bookings" element={<Orders />} />
        <Route path="//myservices" element={<MyGigs />} />
        <Route path="/add" element={<Add />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/messages/:id" element={<Message />} />
        <Route path="/pay/:id" element={<Pay />} />
        <Route path="/success" element={<Success />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
