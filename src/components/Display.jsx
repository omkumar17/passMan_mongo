import React, { useRef, useContext } from 'react';
import { context } from '../context/context';
import { contextEdit } from '../context/context';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { Link } from 'react-router-dom';

const Display = () => {
  const eyeRef = useRef([]);
  const passShow = useRef([]);
  const [form, setForm] = useContext(context); 
  const [edit, setEdit] = useContext(contextEdit);
 
  const safeForm = Array.isArray(form) ? form : [];

  //Oconsole.log("form", safeForm);
  //Oconsole.log("eyeref", eyeRef);
  //Oconsole.log("passshow", passShow);

  const toggleEye = (index) => {
    if (eyeRef.current[index] && passShow.current[index]) {
      if (eyeRef.current[index].src.includes('public/img/eye.png')) {
        eyeRef.current[index].src = 'public/img/eye-off.png';
        passShow.current[index].type = 'text';
      } else {
        eyeRef.current[index].src = 'public/img/eye.png';
        passShow.current[index].type = 'password';
      }
    }
  };

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

  const deletePassword = async (id) => {
    //Oconsole.log("id", id);
    if(confirm("Are you sure you want to delete")){
    const res = await fetch('http://localhost:3000/', { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id}) })
    getPasswords()
    if(res.status===200){
      toast.success("successfully deleted !",{
  style: { fontWeight:'900',color: 'black' }})
    }
    else{
      toast.error(res.statusText)
    }
  }
    // //Oconsole.log("res", res)
    // setForm(form);

   
    // const updatedForm = safeForm.filter(element => element.id !== id);
    // localStorage.setItem("passwords", JSON.stringify(updatedForm));
    // setForm(updatedForm);
  };

  const editPassword = (id) => {
    // alert("edit pass"+id)
    const updatedForm = safeForm.filter(element => element.id === id);
    //Oconsole.log("updatedform",updatedForm)
    setEdit(updatedForm)
    // const updatedForm = safeForm.filter(element => element.id !== id);
    // localStorage.setItem("passwords", JSON.stringify(updatedForm));
    // setForm(safeForm.filter(element => element.id !== id));
    // deletePassword(id)
  };

  return (
    <>
      {form.length === 0 && <h1 className='w-1/2 mx-auto font-bold my-10 text-3xl text-center text-slate-600'>No passwords to show<br></br>Enter passwords in above box</h1>}
      {form.length !== 0 &&
        <div>
          <table className='w-3/4 mx-auto border-2 border-white-500 my-4 text-center'>
            <thead>
              <tr className='bg-slate-500 text-white p-4'>
                <th className='p-4 border-4 border-white-600 w-1/3'>Site name</th>
                <th className='p-4 border-4 border-white-600 w-1/4'>User Name</th>
                <th className='p-4 border-4 border-white-600 w-1/4'>Password</th>
                <th className='p-4 border-4 border-white-600 w-1/5'>Action</th>
              </tr>
            </thead>
            <tbody>
              {safeForm.map((entry, index) => (
                <tr key={index}>
                  <td className='p-1 border-1 border-white-600'><a href={entry.site} target='_blank'>{entry.site}</a></td>
                  <td className='p-1 border-1 border-white-600'>{entry.username}</td>
                  <td className='p-1 border-1 border-white-600 relative'>
                    <input
                      ref={(element) => passShow.current[index] = element}
                      value={entry.password}
                      type="password"
                      className='p-2 px-4 rounded-lg w-full'
                      name="password"
                      id={"password" + index}
                      placeholder='password'
                      readOnly
                    />
                    <span className='absolute top-3 right-3'>
                      <img
                        className='cursor-pointer'
                        ref={(element) => eyeRef.current[index] = element}
                        onClick={() => toggleEye(index)}
                        src="public/img/eye.png"
                        alt="showpass"
                      />
                    </span>
                  </td>
                  <td className='p-1 border-1 border-white-600 flex items-center justify-center gap-4'>
                    <span className='cursor-pointer ' onClick={() => editPassword(entry.id)}>
                      <img src="public/img/pencil.png" alt="edit" />
                    </span>
                    <span className='cursor-pointer ' onClick={() => deletePassword(entry.id)}>
                      <img src="public/img/trash-2.png" alt="delete" />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }
    </>
  );
};

export default Display;
