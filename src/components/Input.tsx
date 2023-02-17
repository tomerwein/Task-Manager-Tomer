
import React, { useRef } from 'react'
import "./styles.css"

interface Props { 
    task: string,
    setTask: React.Dispatch<React.SetStateAction<string>> 
    addToImportantList: (e:React.FormEvent) => void;
    addToGeneralList: (e:React.FormEvent) => void; 

}

const Input = ({task, setTask, addToImportantList, addToGeneralList}: Props) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  return (
    <form className='input' onSubmit={(e) => 
      {addToGeneralList(e);
      inputRef.current?.blur();}}>
        <textarea
        ref={inputRef}
        value={task}
        onChange={(e) => {
          setTask(e.target.value);
        }}

        placeholder='Enter a task' 
        className='input_box'
        wrap='soft'
        maxLength={500}
        style={{resize: "none"}}
        
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addToGeneralList(e);
            inputRef.current?.blur();
          }
        }}
        >
        </textarea> 
        
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