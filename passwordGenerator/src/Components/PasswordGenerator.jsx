import {useState, useCallback ,useEffect , useRef} from 'react';

function passwordGenerator() {
const [length,setLength]=useState(8);
const [numberAllowed,setNumberAllowed]=useState(false);
const [charAllowed,setCharAllowed]=useState(false);
const [password,setPassword]=useState('');

// useRef Hook
const passwordRef=useRef(null);


const passwordGenerator=useCallback(()=>{
  let password="";
  let str="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if(numberAllowed) str+="0123456789";
  if(charAllowed) str+="!@#$%^&*()_+[]{}/;:,.<>?";
  for(let i=1;i<=length;i++){
    let char=Math.floor(Math.random()*str.length+1);
    password += str.charAt(char);
  }
  setPassword(password);
},[length,numberAllowed,charAllowed,setPassword]);

const copyToClipboard= useCallback(()=>{
  if(passwordRef.current){
      passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0,20);
      window.navigator.clipboard.writeText(password);
      alert("Password copied to clipboard");
  }
},[password])

useEffect(()=>{
     passwordGenerator();
    },[length,numberAllowed,charAllowed,passwordGenerator]);

return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 my-40 text-orange-500 bg-gray-600 ">
        <h1 className="text-center">Password Generator</h1> 
      <div className='flex shadow rounded-lg overflow-hidden mb-4 py-4'>
        <input 
        type="text"
        value={password}
        ref={passwordRef}
        className='outline-none w-full py-1 px-3 bg-white' 
        placeholder='Password' 
        readOnly
        />
        <button 
        onClick={copyToClipboard}
        className='outline-none bg-blue-600 text-white px-3 py-0.5 shrink-0 hover:bg-blue-800 hover:font-bold'>Copy</button>
      </div>

      <div className="flex text-sm gap-x-2">
        <div className="flex-items-center gap-x-1">
          <input
          type="range"
          min={8}
          max={100}
          value={length}
          onChange={(e)=>setLength(e.target.value)}
          className='cursor-pointer'
          />
          <label htmlFor="">Length={length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
          type="checkbox"
          checked={numberAllowed}
          id='numberInput'
          onChange={()=>{
            setNumberAllowed(prev=>!prev)}}
          className='cursor-pointer'
          />
          <label htmlFor="numberInput">Numbers</label>  
        </div>

        <div className="flex items-center gap-x-1">
          <input
          type="checkbox"
          checked={charAllowed}
          id='charInput'
          onChange={()=>{
            setCharAllowed(prev=>!prev)}}
          className='cursor-pointer'
          />
          <label htmlFor="charInput">Characteristics</label>  
        </div>
        

      </div>
      </div>
    </>
  )
}

export default passwordGenerator