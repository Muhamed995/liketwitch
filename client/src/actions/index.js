//ovdje kreiramo naše action creators
//po arhitekturi projekta su nam potrebna samo ova 2 signIn i signOut
//imamo normalno type prop i kod signIn-a smo dodali i ID koji direktno uzimamo od google-a
//ovo sve deklarišemo u naššem reduceru pod nazivom authReducer.js

import streams from '../apis/streams';
import history from '../history';


export const signIn =(userId)=>{
    return{
        type:'SIGN_IN',
        payload:userId 
    }
}

export const signOut =()=>{
    return{
        type:'SIGN_OUT'
    }
}



export const createStream =(formValues)=>{
    return async (dispatch,getState)=>{
        const {userId} = getState().auth;
    const response = await streams.post('./streams' , {...formValues, userId})
    dispatch({type:'CREATE_STREAM', payload:response.data})

    //ovdje ćemo izvršiti programmatic navigation
    //user back to root
    return response;
    }


}

export const fetchStreams =()=>{
    return async dispatch=>{
       const response = await streams.get('./streams');
       dispatch({ type:'FETCH_STREAMS',payload:response.data})
    }
}
export const fetchStream =(id)=>{
    return async dispatch=>{
       const response = await streams.get(`/streams/${id}`);
       dispatch({ type:'FETCH_STREAM',payload:response.data})
    }
}

export const editStream =(id,formValues)=>{
    return async dispatch=>{
       const response = await streams.patch(`/streams/${id}`,formValues);
       dispatch({ type:'EDIT_STREAM',payload:response.data})

       return response;
    }
}

export const deleteStream =(id)=>{
    return async dispatch=>{
       await streams.delete(`/streams/${id}`);
       dispatch({ type:'DELETE_STREAM',payload:id})

       history.push('/')
    }
}