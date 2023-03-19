import React, { useEffect, useState } from 'react'
import Register from './Register'
import TaskManager from './TaskManager'
import SignIn from './SignIn'
import Task from './taskInfo'

const App: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  const [importantTasks, setImportantTasks] = useState<Task[]>([]);
  const [generalTasks, setGeneralTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);

  useEffect(() => {
    const storedData = localStorage.getItem("loggedInUser");
    if (storedData) {
      const { username, importantTasks, generalTasks, completedTasks } = JSON.parse(storedData);
      setLoggedInUser(username);
      setImportantTasks (importantTasks);
      setGeneralTasks (generalTasks);
      setCompletedTasks(completedTasks);
    }
  }, []);


  return (
    loggedInUser ? 
    <TaskManager username={loggedInUser}
    importantTasks={importantTasks}
    setImportantTasks={setImportantTasks}
    generalTasks={generalTasks}
    setGeneralTasks={setGeneralTasks}
    completedTasks={completedTasks}
    setCompletedTasks={setCompletedTasks}
    /> :
    <div>
      <SignIn/>
    </div>
  )
}

export default App
