import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';
import Navbar from "./components/Navbar";
import AskQuestion from './pages/AskQuestion';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  const { user } = useAuthContext()
  return (
    <BrowserRouter>
      <Navbar />
      <div>
        <Routes>
          <Route exact path='/' element={user ? <Dashboard /> : <Navigate to='/login' />} />
          <Route exact path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
          <Route exact path='/signup' element={!user ? <Signup /> : <Navigate to='/' />} />
          <Route exact path='/askquestion' element={user ? <AskQuestion /> : <Navigate to='/login' />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
