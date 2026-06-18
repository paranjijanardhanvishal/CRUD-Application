import { useState } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Users from './Users.jsx'
import CreateUser from './CreateUser.jsx'
import UpdateUser from './UpdateUser.jsx'
import { NetworkProvider } from './context/NetworkContext.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
        <NetworkProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Users />}></Route>
                    <Route path='/create' element={<CreateUser />}></Route>
                    <Route path='/update/:id' element={<UpdateUser />}></Route>
                </Routes>
            </BrowserRouter>
        </NetworkProvider>
    </div>
  )
}

export default App
