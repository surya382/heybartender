import { createContext, useState } from "react";

export const Authcontext=createContext();

export const AuthcontextProvider=({children})=>{

    let cred=JSON.parse(localStorage.getItem("cred")) || {};

    const [authstate,setauth]=useState({
        token:cred.token || null,
        name:cred.name || ""
    });

    const login=(credential)=>{

        setauth({...authstate,token:credential.token,name:credential.name});
        localStorage.setItem("cred",JSON.stringify(credential));

    }

    const logout=()=>{
        setauth({...authstate,token:null,name:""});
        localStorage.removeItem("cred");
    }



    return <Authcontext.Provider value={{authstate,login,logout}}>{children}</Authcontext.Provider>
}