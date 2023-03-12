import "./components/registerStyles.css" 
import { useRef, useState, useEffect } from "react";
import {faCircleCheck, faCircleXmark, faCircleQuestion} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./App.css"
import Register from "./Register";

const REGISTER_URL: string = 'http://localhost:3500/register';

const SignIn = () => {
    const [errorMessage, setErrorMessage] = useState('');

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
            console.log(response);
            console.log(data);
            if (response.status === 200) {
                console.log("success");
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

                <span className="icon_user">
                <FontAwesomeIcon icon={faCircleCheck} 
                    className={validName ? "show_v" : "hide_v"} />
                <FontAwesomeIcon icon={faCircleXmark}
                    className={user && !validName ? "show_x" : "hide_x"} />
                </span>              

                {/* <p id="user_instructions"
                    className={userFocus && user && !validName ? "info_if_not_valid" : "clean_screen"}>
                    <FontAwesomeIcon icon={faCircleQuestion} />
                    You must enter 4 to 24 characters.<br />
                    Must begin with a letter.<br />
                    Only Letters, numbers, underscores and hyphens allowed
                </p>   */}
            
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

                <span className="icon_password">
                    <FontAwesomeIcon icon={faCircleCheck}
                        className={isValidPassword ? "show_v" : "hide_v"} />
                    <FontAwesomeIcon icon={faCircleXmark}
                        className={password && !isValidPassword ? "show_x" : "hide_x"} />
                </span>   

                {/* <p id="password_instruction" className={passwordFocus && !isValidPassword && password ?
                    "info_if_not_valid" : "clean_screen"}>
                    <FontAwesomeIcon icon={faCircleQuestion} />
                     8 to 24 characters.<br />
                    Must include uppercase letter, lowercase letter,<br />
                    number and special character<br />
                </p>  */}

            </div>          
            
            <button className="sign_in_button"
            onClick={handleSubmit}>
                Login
            </button>

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