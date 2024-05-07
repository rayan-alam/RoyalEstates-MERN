import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import About from './pages/About'
import Profile from './pages/Profile'
import Header from './components/Header'

function App() {
  return <BrowserRouter>
  <Header></Header>
  <Routes>
    <Route path='/' element={<Home></Home>}></Route>
    <Route path='/sign-in' element={<Signin></Signin>}></Route>
    <Route path='/sign-up' element={<Signup></Signup>}></Route>
    <Route path='/about' element={<About></About>}></Route>
    <Route path='/profile' element={<Profile></Profile>}></Route>
  </Routes>
  </BrowserRouter>
}

export default App