import "./components/registerStyles.css" 
import { useRef, useState, useEffect } from "react";
import {faCircleCheck, faCircleXmark, faCircleQuestion} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./App.css"

const USER_REGEX: RegExp = /^[A-z][A-z0-9-_]{3,23}$/;
const PASSWORD_REGEX: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[?^*!@#$%]).{8,24}$/;

const Register = () => {
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

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
        setIsValidPwd(PASSWORD_REGEX.test(password));
    }, [user, password])

    return (
        <div className="register_box">
        <span className="register_heading"> Register </span>    
            <span className="username"> Username: </span>
            <div>
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
                    <FontAwesomeIcon icon={faCircleCheck} className={validName ? "show_v" : "hide_v"} />
                    <FontAwesomeIcon icon={faCircleXmark} className={user && !validName ? "show_x" : "hide_x"} />
                </span>            
            </div>

            <p id="user_instructions" className={userFocus && user && !validName ? "info_if_not_valid" : "clean_screen"}>
                <FontAwesomeIcon icon={faCircleQuestion} />
                You must enter 4 to 24 characters.<br />
                Must begin with a letter.<br />
                Only Letters, numbers, underscores and hyphens allowed.
            </p> 

            <span className="password"> Password: </span>
            <div>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                    aria-invalid={isValidPassword ? "false" : "true"}
                    aria-describedby="password_instruction"
                    onFocus={() => setPasswordFocus(true)}
                    onBlur={() => setPasswordFocus(false)}
                />

                <span className="icon_password">
                    <FontAwesomeIcon icon={faCircleCheck} className={isValidPassword ? "show_v" : "hide_v"} />
                    <FontAwesomeIcon icon={faCircleXmark} className={password && !isValidPassword ? "show_x" : "hide_x"} />
                </span>       

            </div>

            <p id="password_instruction" className={passwordFocus && !isValidPassword ?
                "info_if_not_valid" : "clean_screen"}>
                <FontAwesomeIcon icon={faCircleQuestion} />
                8 to 24 characters.<br />
                Must include uppercase letter, lowercase letter,<br />
                number and special character.<br />
            </p>  

            </div> 
    )
}

export default Register