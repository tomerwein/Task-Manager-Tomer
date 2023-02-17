import React, { useState } from 'react';
import './App.css';
import Input from './components/Input';
import Task from './taskInfo';
import TaskList from './components/TaskList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';


const App: React.FC = () => {
  const [task, setTask] = useState<string>("");
  const [importantTasks, setImportantTasks] = useState<Task[]>([]);
  const [generalTasks, setGeneralTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  
  const addToImportantList = (e: React.FormEvent) => {
    e.preventDefault();
    if (task){
      setImportantTasks([...importantTasks, {id: Date.now(), task: task, type: "important", isDone: false}]);
      setTask("");
      console.log(importantTasks.toLocaleString);
    } 
  }

  const addToGeneralList = (e: React.FormEvent) => {
    e.preventDefault();
    if (task){
      setGeneralTasks([...generalTasks, {id: Date.now(), task: task, type: "general", isDone: false}]);
      setTask("");
      console.log(generalTasks.toLocaleString);
    } 
  }

  // const onDragEnd = (result: DropResult) => {
  //   const { source, destination } = result;
  //   if (!destination) return;
  //   if (source.droppableId === destination.droppableId && source.index === destination.index) return;
  
  //   const active = [...importantTasks];
  //   const complete = [...generalTasks];
  //   const [removed] = active.splice(source.index, 1);
  //   complete.splice(destination.index, 0, removed);
  
  //   setImportantTasks(active);
  //   setGeneralTasks(complete);
  // };
  const onDragEnd = (result: DropResult) => {
    const {source, destination} = result;
   console.log(result);
   if (!destination) return; 
   if (
     source.index === destination.index && 
     source.droppableId === destination.droppableId
     )
     return;

     console.log("check")
    console.log(importantTasks)
    console.log(generalTasks)
   let add,
    important = importantTasks,
     general = generalTasks,
     complete = completedTasks;
     

   if (source.droppableId === 'ImportantList'){
     add = important[source.index];
     important.splice(source.index, 1);
   }
   else if (source.droppableId === 'GeneralList'){
     add = general[source.index];
     general.splice(source.index, 1)
   }

   else {
    add = complete[source.index];
     complete.splice(source.index, 1)
   }

   if (destination.droppableId === 'ImportantList'){
    add.type = "important";
    important.splice(destination.index, 0, add)
   }
   else if (destination.droppableId === 'GeneralList'){
    add.type = "general";
    general.splice(destination.index, 0, add)
  }
   else{ 
    complete.splice(destination.index, 0, add) 
   }

   setImportantTasks(important); 
   setGeneralTasks(general);
   setCompletedTasks(complete);

 }


  return (
    <DragDropContext onDragEnd={onDragEnd}>
    <div className="App">
      <span className="heading"> Task Manager </span> 
      <Input task={task} setTask={setTask} 
      addToImportantList={addToImportantList} 
      addToGeneralList={addToGeneralList}
      
      /> 
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
} 


export default App;
