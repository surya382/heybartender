import { cock_get,single_cock,delete_cock} from "./actionTypes";

const init={
    loading:false,
    cocktail:[],
    error:false,
    single:{}
};

export const reducer=(state=init,action)=>{

    switch(action.type){

        case "loading":{
            return {
                ...state,loading:true
            }
        }

        case cock_get:{
            return {
                ...state,loading:false,cocktail:action.payload
            }
        }

        case single_cock:{
            return {
                ...state,loading:false,single:action.payload
            }
        }

        case delete_cock:{

            let del=state.cocktail.filter((el)=>{
                return el._id!==action.payload
            });
            
            return {
                ...state,loading:false,cocktail:del
            }
        }

        case "error": {
            return {
                ...state,loading:false,error:true
            }
        }
        

        default:{
            return state;
        }
    }
}