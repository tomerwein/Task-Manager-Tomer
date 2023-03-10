import {useState} from 'react'
import SignIn from './SignIn';

const RegisterSucceed = () => {
    const [checkIn, setCheckIn] = useState(false);
    
    return (
        checkIn ? <SignIn/> :
        <div className='succeed_container'>
            <div className='succeed_text_container'>
            <span className='register_succeed_text'>
                Register succeed! <br/> 
            </span>
            
            <span className='check_in_container'> 
                now you can  
                <button className="check_in_succeed_button" 
                    onClick={() => setCheckIn(true)}>          
                    Check-In!
                </button>
            </span>    

            </div>
        </div>
  )
}

export default RegisterSucceed