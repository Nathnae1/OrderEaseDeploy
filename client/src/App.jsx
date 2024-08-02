import { useState } from 'react'
import './App.css'

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/contact"
              element={<Contact />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
