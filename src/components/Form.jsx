import React, { useContext, useEffect, useState, useRef } from 'react';
// var cors = require('cors')
import Display from './Display';
import { context } from '../context/context'
import { contextEdit } from '../context/context';
import { v4 as uuidv4 } from 'uuid';
import Button from './Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';


const Form = () => {

  const [form, setForm] = useContext(context);
  const [edit, setEdit] = useContext(contextEdit);
  const eyeRef = useRef(null);
  const passShow = useRef(null);
  const formRef = useRef(null);
  const btnval=Object.keys(edit).length?"Edit Password":"Save Password";


  const getPasswords = async () => {
    // const storedPasswords = localStorage.getItem('passwords');
    const req = await fetch("http://localhost:3000/")
    const storedPasswords = await req.json()

    if (storedPasswords) {
      try {
        // const parsedPasswords = JSON.parse(storedPasswords);
        setForm(storedPasswords);
        //Oconsole.log('local', storedPasswords);
      } catch (error) {
        //Oconsole.error('Error parsing JSON:', error);
      }
    } else {
      setForm([]);
    }

  }

  useEffect(() => {
    getPasswords()
  }, []);

  useEffect(() => {
    //Oconsole.log("editvalue",edit)
    if (Object.keys(edit).length !== 0) {
      document.getElementById('site').value = edit[0].site;
      document.getElementById('username').value = edit[0].username;
      document.getElementById('password').value = edit[0].password;

      //Oconsole.log("andar",edit)

    }
    // //Oconsole.log("edit",edit[0].id)
    //Oconsole.log("edit",edit)
  }, [edit]);






  const toggleEye = () => {
    if (eyeRef.current.src.includes('public/img/eye.png')) {
      eyeRef.current.src = 'public/img/eye-off.png';
      passShow.current.type = 'text';
    } else {
      eyeRef.current.src = 'public/img/eye.png';
      passShow.current.type = 'password';
    }
  };

  const savePass = async (e) => {
    e.preventDefault();
    const site = document.getElementById('site').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (Object.keys(edit).length !== 0) {
      const res = await fetch('http://localhost:3000/', { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id:edit[0].id, site, username, password }) })
      //Oconsole.log("res", res)
      if(res.status===200){
        toast.success("successfully edited !",{
          style: { fontWeight:'900',color: 'black' }})
      }
      else{
        toast.error(res.statusText)
      }
    }

    // const newEntry = { id: uuidv4(), site, username, password };
    // const updatedForm = [...form, newEntry];
    else {
      const res = await fetch('http://localhost:3000/', { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: uuidv4(), site, username, password }) })
      //Oconsole.log("res", res)
      if(res.status===200){
        toast.success("successfully saved !",{
          style: { fontWeight:'900',color: 'black' }})
      }
      else{
        toast.error(res.statusText)
      }
    }
    setEdit({})
    // setForm(form);
    getPasswords()
    // localStorage.setItem('passwords', JSON.stringify(updatedForm));
    formRef.current.reset();
  };

  return (
    <>

      <div className='flex flex-col gap-2 bg-slate-400 container w-1/2 mx-auto p-4 rounded-md'>
        <form action="" ref={formRef} onSubmit={(e) => { savePass(e) }}>
          <div className='w-full'>
            <input type="text" className='p-2 rounded-lg my-1 w-full' name="site" id="site" placeholder='sitename' required />
          </div>
          <div className='w-full'>
            <input type="text" className='p-2 rounded-lg my-1 w-full' name="username" id="username" placeholder='username' required />
          </div>
          <div className='w-full relative'>
            <input ref={passShow} type="password" className='p-2 rounded-lg my-1 w-full' name="password" id="password" placeholder='password' required />
            <span className='absolute top-3 right-3'>
              <img className='cursor-pointer' ref={eyeRef} onClick={() => { toggleEye() }} src="public/img/eye.png" alt="showpass" />
            </span>
          </div>
          <Button value={btnval} />
        </form>
      </div>


    </>

  );

};

export default Form;
