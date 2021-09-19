import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom'
import { JournalScreen } from '../journal/JournalScreen'
import { AuthRouter } from './AuthRouter'
import {firebase} from '../../firebase/firebase-config'
import { useDispatch } from 'react-redux'
import { login } from '../../actions/auth'
import { PublicRoute } from './PublicRoute'
import { PrivateRoute } from './PrivateRoute'
import {  startLoadingNotes } from "../../actions/notes";

export const AppRouter = () => {

    const dispatch = useDispatch();
    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setisLoggedIn] = useState(false);


    useEffect(() => {
        firebase.auth().onAuthStateChanged(async(user) => {
            if(user?.uid){
                dispatch(login(user.uid, user.displayName));
                
                
                //loadNotes(user.uid);
                
                dispatch(startLoadingNotes(user.uid));

                setisLoggedIn(true);
            }else{
                setisLoggedIn(false);
            }
            setChecking(false);
        })
    }, [dispatch, setChecking, setisLoggedIn])

    if(checking){
        return(
            <h1>Espere...</h1>
        )
    }

    return (
        <div>
            <Router>
                <Switch>
                    <PublicRoute path="/auth" isAuthenticated={isLoggedIn} component={AuthRouter} />
                    <PrivateRoute path="/" isAuthtenticated={isLoggedIn} component={JournalScreen} />
                    <Redirect to="/auth/login" />
                </Switch>
            </Router>
        </div>
    )
}
