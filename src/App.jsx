import Formulario from "./formulario";
import Login from "./login.jsx";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/formulario" element={<Formulario />} />
    </Routes>
  );
};

export default App;
