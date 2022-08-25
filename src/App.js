import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';
import Navbar from "./components/Navbar";
import AskQuestion from './pages/AskQuestion';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import QuestionDetails from './pages/QuestionDetails';

function App() {
  const { user } = useAuthContext()
  return (
    <BrowserRouter>
      <Navbar />
      <div>
        <Routes>
          <Route path='/' element={user ? <Dashboard /> : <Navigate to='/login' />} />
          <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
          <Route path='/signup' element={!user ? <Signup /> : <Navigate to='/' />} />
          <Route path='/askquestion' element={user && <AskQuestion />} />
          <Route path='/:id' element={user && <QuestionDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
