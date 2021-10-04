import MainContentContainer from "../Components/SharedContent/mainContainer"
import {Redirect} from 'react-router-dom'
import {AuthContext} from '../Context/AuthContext'
import React, {useContext} from 'react'

function UserContent(){

    const authCtx = useContext(AuthContext)

    // Check if there is a user loggedin, else redirect to login page
    return (
        <React.Fragment>
            {authCtx.currentUser? null : <Redirect to="/login" />}
            <MainContentContainer />
        </React.Fragment>
    )
}

export default UserContent