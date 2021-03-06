import _ from 'lodash';

export default (state = {}, action) =>{

    switch(action.type){
        case 'FETCH_STREAMS':
        return {...state, ...action.payload.reduce((newState,stream)=>{
            newState[stream.id] =stream
            return newState
        }, {})
    }
    /*
    case 'FETCH_STREAMS':
    return { ...state, ..._.MapKeys(action.payload, 'id')}
    */

        case 'FETCH_STREAM':
        return { ...state, [action.payload.id] : action.payload};

        case 'CREATE_STREAM':
        return {...state, [action.payload.id]: action.payload};

        case 'EDIT_STREAM':
        return {...state, [action.payload.id]: action.payload};

        case 'DELETE_STREAM':
        return _.omit(state, action.payload);

        default:
        return state;
    }

} 