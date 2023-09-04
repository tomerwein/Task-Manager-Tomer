import React, { useEffect, useState, Suspense, lazy } from 'react'
const TaskManager = lazy(() => import('./TaskManager'));
const SignIn = lazy(() => import('./SignIn'));
import Task from './components/taskInfo'

const App: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<string>('');
  const [loading, setLoading] = useState(true);

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
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {loggedInUser ? 
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
      }
    </Suspense>
  )
}

export default App
