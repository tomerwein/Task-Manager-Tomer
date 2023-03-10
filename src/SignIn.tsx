import "./components/registerStyles.css" 
import { useRef, useState, useEffect } from "react";
import {faTriangleExclamation} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./App.css"
import Register from "./Register";
import TaskManager from "./TaskManager";
import Task from "./taskInfo";

const REGISTER_URL: string = 'http://localhost:3500/register';

const SignIn = () => {
    const [importantTasks, setImportantTasks] = useState<Task[]>([]);
    const [generalTasks, setGeneralTasks] = useState<Task[]>([]);
    const [completedTasks, setCompletedTasks] = useState<Task[]>([]);

    const [errorMessage, setErrorMessage] = useState('');
    const [userAllowToEnterTaskManager, setUserAllowToEnterTaskManager] = useState(false);
    const [notRegister, setNotRegister] = useState(false);

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [isValidPassword, setIsValidPwd] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);
    
    const userRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        userRef.current?.focus();
        setErrorMessage('');
    }, [])

    const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            const response = await fetch(`${REGISTER_URL}?user=${user}&password=${password}`, {
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
                setUserAllowToEnterTaskManager(true);
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

    return (
        userAllowToEnterTaskManager ? <TaskManager
        importantTasks={importantTasks}
        setImportantTasks={setImportantTasks}
        generalTasks={generalTasks}
        setGeneralTasks={setGeneralTasks}
        completedTasks={completedTasks}
        setCompletedTasks={setCompletedTasks}/> :
        notRegister ? <Register/> :
        <div className="register_box">
            <div className="border_the_login">
        <span className="sign_in_heading"> Login </span>    
            <span className="username"> Username: </span>     
            <div className="user_container"> 
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                    aria-invalid={validName ? "false" : "true"}
                    aria-describedby="user_instructions"
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                />        
            </div>


            <span className="password"> Password: </span>
            
            <div className="password_container">
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                    aria-invalid={isValidPassword && password ? "false" : "true"}
                    aria-describedby="password_instruction"
                    onFocus={() => setPasswordFocus(true)}
                    onBlur={() => setPasswordFocus(false)}
                />
            </div>          
            
            <button className="sign_in_button"
            onClick={handleSubmit}>
                Login
            </button>

            <p className={errorMessage === "Username is not exist" ?
                "error_message" : "clean_screen"}>
                <FontAwesomeIcon icon={faTriangleExclamation} style={{ paddingRight: "8px" }}/>
                    User name is not exist, try again! <br />       
            </p> 

            <p className={errorMessage === "Wrong password" ?
                "error_message" : "clean_screen"}>
                <FontAwesomeIcon icon={faTriangleExclamation} style={{ paddingRight: "8px" }}/>
                    Oops password is wrong <br />       
            </p>

            <p className={errorMessage === "Username or password is missing" ?
                "error_message" : "clean_screen"}>
                <FontAwesomeIcon icon={faTriangleExclamation} style={{ paddingRight: "8px" }}/>
                    Username or password is missing <br />       
            </p>  

            <span className="register_password_container"> 
                <button className="register_password_button" 
                    onClick={() => setNotRegister(true)}>          
                    Don't have an account?
                </button>

                <button className="register_password_button">          
                    Forgot your password?
                </button>
            </span>
            
            </div>
            </div> 

                        
    )
}

export default SignIn