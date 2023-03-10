import React, { useState } from 'react';
import './App.css';
import Input from './components/Input';
import Task from './taskInfo';
import TaskList from './components/TaskList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

/* tomer */
interface Props {
  importantTasks: Task[],
  setImportantTasks: React.Dispatch<React.SetStateAction<Task[]>>,
  generalTasks: Task[],
  setGeneralTasks: React.Dispatch<React.SetStateAction<Task[]>>,
  completedTasks: Task[],
  setCompletedTasks: React.Dispatch<React.SetStateAction<Task[]>>
}

// React.FC --> I deleted this
/* tomer */

const TaskManager = ({
  importantTasks, setImportantTasks,
  generalTasks, setGeneralTasks,
  completedTasks, setCompletedTasks,
}: Props) => {
    const [task, setTask] = useState<string>("");
    // const [importantTasks, setImportantTasks] = useState<Task[]>([]);
    // const [generalTasks, setGeneralTasks] = useState<Task[]>([]);
    // const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
    
    const addToImportantList = (e: React.FormEvent) => {
      e.preventDefault();
      if (task){
        setImportantTasks([...importantTasks, {id: Date.now(), task: task, type: "important", isDone: false}]);
        setTask("");
      } 
    }
  
    const addToGeneralList = (e: React.FormEvent) => {
      e.preventDefault();
      if (task){
        setGeneralTasks([...generalTasks, {id: Date.now(), task: task, type: "general", isDone: false}]);
        setTask("");
      } 
    }
  
    const onDragEnd = (result: DropResult) => {
      const {source, destination} = result;
      
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
  
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="App">
          <span className="heading"> Task Manager </span>
          <Input task={task} setTask={setTask} addToImportantList={addToImportantList} addToGeneralList={addToGeneralList} />
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