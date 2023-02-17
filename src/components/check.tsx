



// import React, { useRef } from 'react'
// import "./styles.css"

// interface Props { 
//     task: string,
//     setTask: React.Dispatch<React.SetStateAction<string>> 
//     addToImportantList: (e:React.FormEvent) => void;
//     addToGeneralList: (e:React.FormEvent) => void; 

// }

// const Input = ({task, setTask, addToImportantList, addToGeneralList}: Props) => {
//   const inputRef = useRef<HTMLTextAreaElement>(null);
//   return (
//     <form className='input' onSubmit={(e) => 
//       {addToGeneralList(e);
//       inputRef.current?.blur();}}>
//         <textarea
//         ref={inputRef}
//         value={task}
//         onChange={(e) => {
//           setTask(e.target.value);
//           if (e.target.value.length >= 100) {
//             e.target.style.height = `${e.target.scrollHeight}px`;
//           }
//         }}
//         placeholder='Enter a task' 
//         className='input_box'
//         maxLength={100}
//         // style={{ height: inputRef.current?.scrollHeight }}
//         >
//         </textarea> 
        

//         {/* </input>  */}
        
//         <button className='input_button_1' 
//         onClick={(e) => 
//           {addToGeneralList(e);
//             inputRef.current?.blur();}}>
//         Add to general
//         </button>

//         <button className='input_button_2' 
//         onClick={(e) => 
//           {addToImportantList(e);
//             inputRef.current?.blur();}}>
//         Add to important
//         </button>
//     </form>
//   )
// }
// export default Input

import React, { useRef } from 'react'
import "./styles.css"

interface Props { 
    task: string,
    setTask: React.Dispatch<React.SetStateAction<string>> 
    addToImportantList: (e:React.FormEvent) => void;
    addToGeneralList: (e:React.FormEvent) => void; 

}

const Input = ({task, setTask, addToImportantList, addToGeneralList}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <form className='input' onSubmit={(e) => 
      {addToGeneralList(e);
      inputRef.current?.blur();}}>
        <input
        ref = {inputRef}
        type='input'
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder='Enter a task' 
        className='input_box'
        maxLength={110}
        >

        </input> 
        
        <button className='input_button_1' 
        onClick={(e) => 
          {addToGeneralList(e);
            inputRef.current?.blur();}}>
        Add to general
        </button>

        <button className='input_button_2' 
        onClick={(e) => 
          {addToImportantList(e);
            inputRef.current?.blur();}}>
        Add to important
        </button>
    </form>
  )
}


export default Input