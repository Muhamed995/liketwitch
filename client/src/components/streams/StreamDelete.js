import React from 'react';
import Modal from '../Modal';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchStream, deleteStream} from '../../actions';

class StreamDelete extends React.Component{

    componentDidMount(){
       this.props.fetchStream(this.props.match.params.id)
    }

renderActions(){
   return (
        <div>
        <Link to={`/`} className="ui button"> Cancel</Link>
        <button className="ui red button" onClick={()=>{this.props.deleteStream(this.props.match.params.id)}}> Delete</button>
        </div>
    )
}


renderContent(){
    if(!this.props.stream){
        return 'Are you sure you want do delete a stream?'
    }else{
        return `Are you sure you want do delete a stream with title: ${this.props.stream.title}`
    }
}

render(){

   
    return(
        <div>
            
            <Modal title="Delete stream" description={this.renderContent()} actions={this.renderActions()}/>
            </div>

    );
}
}

const mapStateToProps=(state, ownProps)=>{
    return {stream: state.stream[ownProps.match.params.id]}
    }
    

export default connect(mapStateToProps,{fetchStream,deleteStream}) (StreamDelete);