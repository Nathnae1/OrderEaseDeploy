
import './App.css'
import Quotation from './Quotation'
import Add from './Add'

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

function App() {

  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/quotation" element={<Quotation />} />
            <Route path="/add" element={<Add />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
