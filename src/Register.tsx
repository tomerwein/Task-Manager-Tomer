import "./components/registerStyles.css" 
import { useRef, useState, useEffect } from "react";
import {faCircleCheck, faCircleXmark, faCircleQuestion} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./App.css"

const USER_REGEX: RegExp = /^[A-z][A-z0-9-_]{3,23}$/;
const PASSWORD_REGEX: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[?^*!@#$%]).{8,24}$/;
const REGISTER_URL: string = 'http://localhost:3500/register';

const Register = () => {
    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [isValidPassword, setIsValidPwd] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchPassword, setMatchPassword] = useState('');
    const [isMatchPasswords, setIsMatchPasswords] = useState(false);
    const [matchPasswordFocus, setMatchPasswordFocus] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);
    
    const userRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        userRef.current?.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
        setIsValidPwd(PASSWORD_REGEX.test(password));
        setIsMatchPasswords(password === matchPassword)
        setErrorMessage('');
    }, [user, password, matchPassword]) 

    const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
        console.log("hey");
        e.preventDefault();

        try {
            const response = await fetch(REGISTER_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user: user, password: password })
            });
    
            const data = await response.json();
            console.log(response);
            console.log(data);
            setSuccess(true);
            setUser('');
            setPassword('');
            setMatchPassword('');

             
        } catch (err: any) {
            console.log(`err: ${err.message}`);
            if (!err?.response) {
                setErrorMessage("No server response");
                console.log(errorMessage);
                console.log("wow1");
            } else if (err.response?.status === 409) {
                setErrorMessage('Username Taken');
            } else {
                setErrorMessage('Registration Failed')
            }
        }
        
    }

    return (
        <div className="register_box">
        <span className="register_heading"> Register </span>    
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

                <p id="user_instructions"
                    className={userFocus && user && !validName ? "info_if_not_valid" : "clean_screen"}>
                    <FontAwesomeIcon icon={faCircleQuestion} />
                    You must enter 4 to 24 characters.<br />
                    Must begin with a letter.<br />
                    Only Letters, numbers, underscores and hyphens allowed
                </p>  
            
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

                <p id="password_instruction" className={passwordFocus && !isValidPassword && password ?
                    "info_if_not_valid" : "clean_screen"}>
                    <FontAwesomeIcon icon={faCircleQuestion} />
                     8 to 24 characters.<br />
                    Must include uppercase letter, lowercase letter,<br />
                    number and special character<br />
                </p> 

            </div>

                


            <span className="matchPasswords"> Confirm password: </span>
            
            <div className="match_container">
                <input
                    type="password"
                    id="matchPasswords"
                    onChange={(e) => setMatchPassword(e.target.value)}
                    value={matchPassword}
                    required
                    aria-invalid={isMatchPasswords ? "false" : "true"}
                    aria-describedby="match_password_instruction"
                    onFocus={() => setMatchPasswordFocus(true)}
                    onBlur={() => setMatchPasswordFocus(false)}
                />
                
                <span className="icon_match_passwords">
                    <FontAwesomeIcon icon={faCircleCheck}
                        className={isMatchPasswords && matchPassword ? "show_v" : "hide_v"} />
                    <FontAwesomeIcon icon={faCircleXmark}
                        className={matchPassword && !isMatchPasswords ? "show_x" : "hide_x"} />
                </span>

                <p id="match_password_instruction" 
                    className={matchPasswordFocus && !isMatchPasswords && matchPassword ?
                    "info_if_not_valid" : "clean_screen"}>
                    <FontAwesomeIcon icon={faCircleQuestion} />
                    The passwords don't match<br />       
                </p> 

            </div>           
            
            <button className="sign_up_button" 
            disabled={!validName || !isValidPassword || !isMatchPasswords ? true : false}
            onClick={handleSubmit}>
                Sign Up
            </button>
            
            </div> 
            
    )
}

export default Register