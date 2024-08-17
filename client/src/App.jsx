
import './App.css'
import Quotation from './Quotation'
import Add from './Add'
import Home from './Home'
import AddDisp from './AddDisp'
import Suggest from './Suggest'

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import LoginCard from './LoginCard'

function App() {

  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginCard />} />
            <Route path="/get_quotation" element={<Quotation />} />
            <Route path="/add" element={<AddDisp />} />
            <Route path="/auto" element={<Suggest />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
