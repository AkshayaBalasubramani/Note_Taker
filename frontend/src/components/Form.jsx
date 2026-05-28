import {useState} from "react";
import api from "../api";
import "../styles/Form.css";
import {useNavigate} from "react-router-dom";
import {ACCESS_TOKEN,REFRESH_TOKEN} from "../constants";
import LoadingIndicator from "./LoadingIndicator";

function Form({route,method}){
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();

    //based on the function the form header will change to login or register
    const name = method==="login"?"Login":"Register"

    //on submit of the form 
    const handleSubmit = async(e)=>{
        setLoading(true);
        e.preventDefault();

        //login/register
        try{
            //based on the route the data will be passed to the backend
            const res = await api.post(`/api/${route}/`,{
                username,
                password
            });
            //the access tokens will be set
            if (method === "login"){
                localStorage.setItem(ACCESS_TOKEN,res.data.access);
                localStorage.setItem(REFRESH_TOKEN,res.data.refresh);
                navigate("/");
            }
            else{
                navigate("/login");

            }
        }
        catch(error){
            console.log(error.response.data);
            alert(JSON.stringify(error.response.data));

            console.error("Error during authentication:", error);
        }
        // catch(error){
        //     alert(error)
        //     console.error("Error during authentication:",error);
        // }
        finally{
            setLoading(false);
        }
    
    }

    return <form onSubmit={handleSubmit} className="form-container">
        <h1>{ name}</h1>
        <input 
            className="form-input"
            type="text"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            placeholder="Username"
        />
        <input 
            className="form-input"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            placeholder="Password"
        />
        {loading && <LoadingIndicator />}
        <button className="form-button" type="submit" disabled={loading}>
            {name}
        </button>
    </form>
}

export default Form