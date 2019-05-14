import React from 'react';
import {connect} from 'react-redux';
import {fetchStream, editStream} from '../../actions';
import StreamForm from './StreamForm';


class StreamEdit extends React.Component{
    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id);
    }

    onSubmit = formValues =>{
        this.props.editStream(this.props.match.params.id, formValues).then(res => {
            if (res.status === 200) {
              this.props.history.push('/')
            }
          })
        
    }

   render(){
    if (!this.props.stream) {
        return  <div>Loading...</div>
      } else if (this.props.stream.userId === this.props.currentUserId){
        console.log(this.props)
        return (
          <div>
            <h3>Edit A Stream</h3>
            <StreamForm initialValues= {
              {title: this.props.stream.title, description: this.props.stream.description}
            }
            onSubmit={this.onSubmit} />
          </div>
        );
      }
      return "You do not have permission to edit this stream."
   }
    
}

const mapStateToProps=(state, ownProps)=>{
return {stream: state.stream[ownProps.match.params.id],currentUserId: state.auth.userId}
}

export default connect(mapStateToProps, {fetchStream,editStream}) (StreamEdit);