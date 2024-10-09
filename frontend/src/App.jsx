import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Dashbord } from './pages/Dashbord'
import { Send } from './pages/Send'
import {Home} from './pages/Home'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={ <Home /> } />
          <Route path="/signup" element={ <Signup /> } />
          <Route path="/signin" element={ <Signin /> } />
          <Route path="/dashbord" element= { <Dashbord /> } />
          <Route path="/send" element= { <Send /> } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
