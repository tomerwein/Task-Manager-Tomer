import {useEffect, useState} from 'react'
import Task from './components/taskInfo';
import TaskManager from './TaskManager';


const SIGNIN_URL: string = 'http://localhost:3500/signin';

interface Props {
    user: string;
    password: string;
  }

const RegisterSucceed: React.FC<Props> = ({user, password}) => {
    console.log(user)
    const [importantTasks, setImportantTasks] = useState<Task[]>([]);
    const [generalTasks, setGeneralTasks] = useState<Task[]>([]);
    const [completedTasks, setCompletedTasks] = useState<Task[]>([]);

    const [errorMessage, setErrorMessage] = useState('');

    
    const [checkIn, setCheckIn] = useState(false);
    
    const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            console.log("hey");
            console.log(user);
            const response = await fetch(`${SIGNIN_URL}?user=${user}&password=${password}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            const data = await response.json();

            if (response.status === 200) {                
                const userDetails = data.find((item:any) => item.user === user)
                setImportantTasks (userDetails.important_tasks);
                setGeneralTasks (userDetails.general_tasks);
                setCompletedTasks(userDetails.completed_tasks);

                setCheckIn(true);

                console.log(`checked" ${importantTasks}`)

                localStorage.setItem("loggedInUser", JSON.stringify({
                     username: user, importantTasks: importantTasks,
                      generalTasks: generalTasks, completedTasks: completedTasks }));


            } else if (response.status === 403){
                console.log("user or password");
                setErrorMessage('Username or password is missing');
            } else if (response.status === 404){
                console.log("user name");
                setErrorMessage('Username is not exist');
            } else if (response.status === 401) {
                console.log("passowrd");
                setErrorMessage('Wrong password');
            }
                
        } catch (err: any) {
            console.log(`err: ${err.message}`);
            if (!err?.response) {
                setErrorMessage("No server response");
                console.log(errorMessage);
            } else if (err.response?.status === 409) {
                setErrorMessage('Username Taken');
            } else {
                setErrorMessage('Registration Failed')
            }
        }  
    }


    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
            handleSignIn(e as any);
          }
        };
    
        if (!checkIn) {
            window.addEventListener('keydown', handleKeyPress);
          } else {
            window.removeEventListener('keydown', handleKeyPress);
          }
      
          return () => {
            window.removeEventListener('keydown', handleKeyPress);
          };
        }, [checkIn]);


    return (
        checkIn ? <TaskManager 
        username={user}
        importantTasks={importantTasks}
        setImportantTasks={setImportantTasks}
        generalTasks={generalTasks}
        setGeneralTasks={setGeneralTasks}
        completedTasks={completedTasks}
        setCompletedTasks={setCompletedTasks} /> :

        <div className='succeed_container'>
            <div className='succeed_text_container'>
            <span className='register_succeed_text'>
                Register succeed! <br/> 
            </span>
            
            <form 
            onSubmit={handleSignIn}
            className='submit_register' >

            <span className='check_in_container'> 
                now you can
                

                <button className="check_in_succeed_button" type='submit'>          
                    Check-In!
                </button>
                
            </span>    
            </form>
            </div>
        </div>
  )
}

export default RegisterSucceed