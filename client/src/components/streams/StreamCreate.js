import React from 'react';
import {connect} from 'react-redux';
import {createStream} from '../../actions/index';
import StreamForm from './StreamForm';



class StreamCreate extends React.Component{

    onSubmit=(formValues)=>{
        this.props.createStream(formValues).then(res => {
          if (res.status === 201) {
            this.props.history.push('/')
          }
        })
    
    }

    

   render(){
   
    return(
      <div>
        <h3>Create stream</h3>
        <StreamForm onSubmit={this.onSubmit}/>
      </div>

    )
   }
}


//pošto moramo da povežemo oba elementa u connect, i redux form i klasu, i onda još mapstatetoProps
//ovo dole nam je najbolji način, znači kreiramo novu objekt formWrapped koji će imati smješetn u sebi
//formu i validaciju a onda u connect povezujemo sve ostalo 



export default connect(null, {createStream})(StreamCreate)