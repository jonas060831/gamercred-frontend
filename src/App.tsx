import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./ui/navbar/Navbar";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

import './index.css'
import ReportFormPage from "./pages/ReportFormPage";
import Footer from "./ui/footer/Footer";
import AboutUsPage from "./pages/AboutUsPage";

const  App = ()  => {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element= {<HomePage />} />
          <Route path='/register' element= {<RegisterPage />} />
          <Route path="/login" element={ <LoginPage/> }/>
          <Route path="/report-form" element={<ReportFormPage />} />
          <Route path="/aboutus" element={<AboutUsPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
