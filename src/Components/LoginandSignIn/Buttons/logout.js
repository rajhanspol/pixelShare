import { useContext, useState } from 'react'
import {AuthContext} from '../../../Context/AuthContext'
import {useHistory} from 'react-router-dom'

function LogOut(){

    const [error, setError] = useState("")

    const authCtx = useContext(AuthContext)
    const history = useHistory()
    
    async function onLogOutHandler(){
        setError("")

        try {
            await authCtx.logOut()
            history.push('/')
        } catch {
            setError("Failed to LogOut")
        }
    }

    

    return(
        <div className='logoutContainer'>
            {error && error}
            <h4>{authCtx.currentUser.email}</h4>
            <button className="logOutBtn" onClick={onLogOutHandler}>Logout</button>
        </div>
    )
}

export default LogOut