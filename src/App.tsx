import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Signup } from './Pages/Signup'
import { Signin } from './Pages/Signin'
// import HomePage from '/HomePage'  // Add HomePage component
import HomePage from './components/HomePage'
import AllClub from './components/AllClub'
import Painting from './components/Painting'
import Writer from './components/Writer'
import ShowWrite from './components/ShowWrite'
import ShowPainting from './components/ShowPainting'

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />  {/* Add route for / */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/:title" element={<AllClub />} />
        <Route path="/Paintings" element={<Painting />} />
        <Route path="/Paintings/:id" element={<ShowPainting />} />
        <Route path="/kavya" element={<Writer />} />
        <Route path="/writers/:id" element={<ShowWrite />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
