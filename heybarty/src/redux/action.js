
import { cock_get,single_cock,delete_cock } from "./actionTypes";
import axios from "axios"



export const getCocktail=(page=1,sort,filt,q)=>async(dispatch)=>{

 let cred=JSON.parse(localStorage.getItem("cred"));
   

    dispatch({type:"loading"});

    try{

        if(page!=="" && sort!=="" && filt!=="" && q!==""){
            
            let res=await axios.get(`https://bartender.onrender.com/drink?page=${page}&sort=${sort}&filt=${filt}&q=${q}`,{
                headers:{
                    "Authorization":cred.token
                }
            });

            dispatch({type:cock_get,payload:res.data});

        }

        else if(page!=="" && sort!=="" && filt!==""){

             let res=await axios.get(`https://bartender.onrender.com/drink?page=${page}&sort=${sort}&filt=${filt}`,{
                headers:{
                    "Authorization":cred.token
                }
            });

            dispatch({type:cock_get,payload:res.data});

        }

        else if(page!=="" && sort!=="" && q!==""){
             let res=await axios.get(`https://bartender.onrender.com/drink?page=${page}&sort=${sort}&q=${q}`,{
                headers:{
                    "Authorization":cred.token
                }
            });

            dispatch({type:cock_get,payload:res.data});
        }

        else if(page!=="" && filt!=="" && q!==""){
            
             let res=await axios.get(`https://bartender.onrender.com/drink?page=${page}&filt=${filt}&q=${q}`,{
                headers:{
                    "Authorization":cred.token
                }
            });

            dispatch({type:cock_get,payload:res.data});
        }

        else if(page!=="" && filt!==""){

             let res=await axios.get(`https://bartender.onrender.com/drink?page=${page}&filt=${filt}`,{
                headers:{
                    "Authorization":cred.token
                }
            });

            dispatch({type:cock_get,payload:res.data});

        }
        else if(page!=="" && sort!==""){

             let res=await axios.get(`https://bartender.onrender.com/drink?page=${page}&sort=${sort}`,{
                headers:{
                    "Authorization":cred.token
                }
            });

            dispatch({type:cock_get,payload:res.data});
        }

        else if(page!=="" && q!==""){
           let res=await axios.get(`https://bartender.onrender.com/drink?page=${page}&q=${q}`,{
                headers:{
                    "Authorization":cred.token
                }
            });

            dispatch({type:cock_get,payload:res.data});
        }

        else{
            let res=await axios.get(`https://bartender.onrender.com/drink?page=${page}`,{
                headers:{
                    "Authorization":cred.token
                }
            });
               
            
            dispatch({type:cock_get,payload:res.data});
        }
           


        

    }
    catch(err){
        dispatch({type:"error"});
        console.log(err);
    }

}


export const singlecock=(id)=>async(dispatch)=>{
    let cred=JSON.parse(localStorage.getItem("cred"));
    dispatch({type:"loading"});
try{
  
    let res=await axios.get(`https://bartender.onrender.com/drink/${id}`,{
        headers:{
            "Authorization":cred.token
        }
    });
    dispatch({type:single_cock,payload:res.data})

}
catch(err){
    dispatch({type:"error"});
        console.log(err);
}
}


export const deletecock=(id)=>async(dispatch)=>{
    let cred=JSON.parse(localStorage.getItem("cred"));
    dispatch({type:"loading"});

    try{

        let res=await axios.delete(`https://bartender.onrender.com/drink/${id}`,{
            headers:{
                "Authorization":cred.token
            }
        });

        dispatch({type:delete_cock,payload:id});

    }
    catch(err){
        dispatch({type:"error"});
        console.log(err);
    }
}