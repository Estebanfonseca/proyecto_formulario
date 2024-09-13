import Formulario from './formulario';
import Login from './login.jsx';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  <Routes>
    <Route path='/formulario' element={<Formulario/>} />
    <Route path='/login' element={<Login/>} />
  </Routes>
};

export default App;