import "./components/registerStyles.css" 
import { useRef, useState, useEffect } from "react";
import {faCircleCheck, faCircleXmark, faCircleQuestion} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./App.css"

const USER_REGEX: RegExp = /^[A-z][A-z0-9-_]{3,23}$/;

const Register = () => {
    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);
    
    const userRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        userRef.current?.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

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
            </div> 
    )
}

export default Register