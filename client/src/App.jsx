
import DashboardPage from './pages/DashboardPage';
import CancelPage from './pages/CancelPage';
import CompletedPage from './pages/CompletedPage';
import CreatedPage from './pages/CreatedPage';
import LoginPage from './pages/LoginPage';
import NewPage from './pages/NewPage';
import ProfilePage from './pages/ProfilePage';
import RegistrationPage from './pages/RegistrationPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProgressPage from "./pages/ProgressPage.jsx";
import {getToken} from "./helper/SessionHelper.js";
import SendOtpPage from "./pages/SendOtpPage.jsx";
import OtpVerifyPage from "./pages/OtpVerifyPage.jsx";
import ResetPasswordPage from "./pages/ResetPasswordPage.jsx";

const App = () => {
  if (getToken()){
    return (
        <BrowserRouter>
          <Routes>
              <Route path='/' element = { <DashboardPage/> } />
            <Route path='/cancel' element = { <CancelPage/> } />
            <Route path='/completed' element = { <CompletedPage/> } />
            <Route path='/created' element = { <CreatedPage/> } />
            <Route path='/new' element = { <NewPage/> } />
            <Route path='/profile' element = { <ProfilePage/>} />
            <Route path='/progress' element = { <ProgressPage/>} />

          </Routes>
        </BrowserRouter>
    )
  }else {
    return (
        <BrowserRouter>
          <Routes>
            <Route path='/' element = { <LoginPage/> } />
            <Route path='/registration' element = { <RegistrationPage/>} />
              <Route path= "/send/otp" element={<SendOtpPage/>} />
              <Route path= "/otp/verify" element={<OtpVerifyPage/>} />
              <Route path= "/new/password" element={<ResetPasswordPage/>} />
          </Routes>
        </BrowserRouter>
    )
  }
}

export default App;
