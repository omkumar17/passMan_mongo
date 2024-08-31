import { useState } from 'react'
import Navbar from './components/Navbar'
import Form from './components/Form'
import Display from './components/Display'
import { context } from './context/context'
import { contextEdit } from './context/context'
import { Link } from 'react-router-dom';



import './App.css'
import { ToastContainer } from 'react-toastify'

function App() {
  const [form, setForm] = useState([]);
  const [edit, setEdit] = useState({});

  return (
    <>
      <context.Provider value={[form,setForm]}>
      <contextEdit.Provider value={[edit,setEdit]}>
        <Navbar />
        <ToastContainer/>
        <Form />
        <Display/>
        </contextEdit.Provider>
        </context.Provider>
      
    </>
  )
}

export default App
