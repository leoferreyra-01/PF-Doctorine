import { BrowserRouter, Route, Routes } from "react-router-dom";
// import "./App.css";
import SignUp from "./Components/SignUp/SignUp.jsx";
import SignIn from "./Components/SignIn/SignIn.jsx";
import PasswordReset from "./Components/PasswordReset/PasswordReset.jsx";
import NewPassword from "./Components/NewPassword/NewPassword"; 


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/passwordReset" element={<PasswordReset />} />
        <Route path="/newPassword" element={<NewPassword />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
