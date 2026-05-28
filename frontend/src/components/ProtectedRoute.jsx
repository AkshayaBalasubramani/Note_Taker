import {Navigate} from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import {REFRESH_TOKEN,ACCESS_TOKEN} from "../constants";
import {useState,useEffect} from "react";


function ProtectedRoutes({children}){
    //first check if we are auth before the route can be accessed
    //we will hav to tell them to login if they are not auth
    const [isAuthorized,setIsAuthorized] = useState(null);

    //call the auth check if its auth,refresh if not else unauthorized
    useEffect(()=>{
        auth().catch(()=>setIsAuthorized(false));
    },[]);

    //refresh access token automatically
    const refreshToken = async()=>{
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try{
            //route to base url that we set it previously in api.jsx
            const res=await api.post("/api/token/refresh/",{
                refresh:refreshToken,
            });
            if (res.status === 200){
                localStorage.setItem(ACCESS_TOKEN,res.data.access);
                setIsAuthorized(true);
            }else{
                setIsAuthorized(false);
            }
        }
        catch(error){
            console.error("Error refreshing token:",error);
            setIsAuthorized(false);
        }
    }

    //checks if we hav to refresh or we are good to go
    const auth = async()=>{
        //look at access and check if its expired or not
        //automatically refresh if its expired and then check if we are auth or not
        const accessToken = localStorage.getItem(ACCESS_TOKEN);
        if(!accessToken){
            setIsAuthorized(false);
            return;
        }
        //val and expiration time
        const decoded = jwtDecode(accessToken);
        const tokenExp = decoded.exp;

        //current time in seconds
        const now=Date.now()/1000;

        if(tokenExp < now){
            await refreshToken();
        }else{
            setIsAuthorized(true);
        }
    }
    
    //until its done else keep checking
    if(isAuthorized === null){
        return <div>Loading...</div>
    }

    return isAuthorized ? children : <Navigate to="/login"/>
}

export default ProtectedRoutes;