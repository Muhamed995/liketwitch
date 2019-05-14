//prvo kreiramo initial state odnosno polaznu tačku(obe vrijednosti su null) odakle ćemo
// dalje preko switch uslova pozivati potrebne stvari
//kod SIGN_IN action type-a vraćamo kompletan state (...state) 
// i postavljamo vrijednost isSignedIn vrijednosti na true
// userId pozivamo preko action.payload-a iz naše action creatora.
// za signout sve isto osim što je isSignedIn tu false
//defaultna vrijednost nam je vraćanje state-a
const INITIAL_STATE={
    isSignedIn:null,
    userId:null
}
 

export default(state=INITIAL_STATE,action) =>{
    switch(action.type){
        case 'SIGN_IN':
        return {...state, isSignedIn:true, userId:action.payload}

        case 'SIGN_OUT':
        return {...state, isSignedIn:false, userId:null}

        default:
        return state;
    }
}
