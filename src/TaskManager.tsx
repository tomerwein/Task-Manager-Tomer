import React, { useEffect, useState } from 'react';
import './App.css';
import Input from './components/Input';
import Task from './components/taskInfo';
import TaskList from './components/TaskList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import SignIn from './SignIn';

const UPDATE_URL: string = 'http://localhost:3500/update-tasks';

interface Props {
  username: string,
  importantTasks: Task[],
  setImportantTasks: React.Dispatch<React.SetStateAction<Task[]>>,
  generalTasks: Task[],
  setGeneralTasks: React.Dispatch<React.SetStateAction<Task[]>>,
  completedTasks: Task[],
  setCompletedTasks: React.Dispatch<React.SetStateAction<Task[]>>
}

const TaskManager = ({
  username,
  importantTasks, setImportantTasks,
  generalTasks, setGeneralTasks,
  completedTasks, setCompletedTasks,
}: Props) => {
    const [task, setTask] = useState<string>("");
    const [dragFinished, setDragFinished] = useState<boolean>(false);
    const [logout, setLogout] = useState<boolean>(false);
    
    const handleUpdateTaskListsInDataBase = async () => { 
      try {
        const response = await fetch(UPDATE_URL, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: username,
            important_tasks: importantTasks,
            general_tasks: generalTasks,
            completed_tasks: completedTasks,
          }),
        });
    
        const data = await response.json();
    
        if (response.status === 200) {
          console.log('Tasks updated successfully');
          updateLocalStorage();
        } else {
          console.error(`Error updating tasks: ${data.message}`);
        }
      } catch (error) {
        console.error('Error:', error);
      }
  }

  useEffect(() => {
    handleUpdateTaskListsInDataBase();
    if(dragFinished){
      setDragFinished(false);
    }
    updateLocalStorage();
  }, [importantTasks, generalTasks, completedTasks, dragFinished]);
    
    const addToImportantList = async (e: React.FormEvent) => {
      e.preventDefault();
      if (task){
        console.log("hello")
        setImportantTasks([...importantTasks, {id: Date.now(), task: task, type: "important", isDone: false}]);
        setTask("");
      } 
    }
  
    const addToGeneralList = async (e: React.FormEvent) => {
      e.preventDefault();
      if (task){
        console.log("hello2")
        setGeneralTasks([...generalTasks, {id: Date.now(), task: task, type: "general", isDone: false}]);
        setTask("");
      } 

    }
  
    const onDragEnd = (result: DropResult) => {
      const {source, destination} = result;
      setDragFinished(true);
      
      if (!destination) return;
  
      if (
        source.index === destination.index && 
        source.droppableId === destination.droppableId
      )
        return;
  
      let add,
        important = importantTasks,
        general = generalTasks,
        complete = completedTasks;
  
      if (source.droppableId === 'ImportantList'){
        add = important[source.index];
        important.splice(source.index, 1);
      } else if (source.droppableId === 'GeneralList'){
        add = general[source.index];
        general.splice(source.index, 1)
      } else {
        add = complete[source.index];
        complete.splice(source.index, 1)
      }
  
      if (destination.droppableId === 'ImportantList'){
        add.type = "important";
        important.splice(destination.index, 0, add)
      } else if (destination.droppableId === 'GeneralList'){
        add.type = "general";
        general.splice(destination.index, 0, add)
      } else { 
        complete.splice(destination.index, 0, add) 
      }
  
     setImportantTasks(important); 
     setGeneralTasks(general);
     setCompletedTasks(complete);
    }

    const updateLocalStorage = () => {
      localStorage.setItem("loggedInUser", JSON.stringify({
        username: username,
        importantTasks: importantTasks,
        generalTasks: generalTasks,
        completedTasks: completedTasks
      }));
    }
  
    return (
      logout ? <SignIn/> :
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="App">
            <span className="heading"> Task Manager </span>
            <div className='logout_container'>
              <span className="username"> {username} </span>
              
              <button className='logout' 
              onClick={() => {setLogout(true);
                localStorage.removeItem("loggedInUser");
                }}>
                Logout
              </button>
            </div>

          <Input task={task} setTask={setTask}
           addToImportantList={addToImportantList} 
           addToGeneralList={addToGeneralList} />
          
          <TaskList
            importantTasks={importantTasks}
            setImportantTasks={setImportantTasks}
            generalTasks={generalTasks}
            setGeneralTasks={setGeneralTasks}
            completedTasks={completedTasks}
            setCompletedTasks={setCompletedTasks}
          />
        
        </div>
      </DragDropContext>
    );
  };

export default TaskManager