import {Routes, Route, BrowserRouter} from "react-router-dom"
import Create from "./views/create/create"
import Detail from './views/detail/detail'
import Home from './views/home/home'
import Landing from "./views/landing/landing"

function App() {
  

  return (
    <BrowserRouter>
    <Routes>

   <Route exact path="/home" element={<Home />} />
   <Route path="/home/:id" element={<Detail />} />
   <Route path="/create" element={<Create />} />
   <Route path="/" element={<Landing />} />
    
    </Routes>

    </BrowserRouter>
  )
}

export default App
