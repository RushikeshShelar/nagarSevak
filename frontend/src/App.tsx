
import './App.css'

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Search from './components/Search'
import EditForm from './components/AddForm'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/sevak/edit/:id" element={<EditForm />} />
      </Routes>
    </Router>
  )
}

export default App
