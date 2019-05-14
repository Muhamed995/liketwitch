import React from 'react';
import {connect} from 'react-redux';
import {fetchStreams} from '../../actions';
import Camera from '../../assets/camera.jpeg';
import {Link} from 'react-router-dom';

class StreamList extends React.Component{
    componentDidMount(){
        this.props.fetchStreams();
    }

    renderAdmin(stream){
        if(stream.userId===this.props.currentUserId && !!this.props.currentUserId){
        return (
        <div>
            <Link to={`/streams/edit/${stream.id}`} className="ui primary button"> EDIT</Link>
            <Link to={`/streams/delete/${stream.id}`} className="ui red button"> DELETE</Link>
        </div>)
        }
    }

    renderList (){
        return this.props.stream.map(stream=>{
            return(
                <div key={stream.id} className="ui card middle" style={{width:'50%', marginTop:'30px'}}>
                <div className="image middle">
                 <img src={Camera} alt="img"/>
                </div>
                <div className="content">
                <div className="header"><Link to={`/streams/${stream.id}`} className="header" style={{cursor:'pointer'}}>{stream.title}</Link></div>
                <div className="description">{stream.description}</div>
                </div>
                <div className="content" style={{display:'flex', justifyContent:'center'}}>
                {this.renderAdmin(stream)}</div>
                </div>
               
            )
        });

    }

    renderCreate(){
        if(this.props.isSignedIn){
            return(
                <div style={{textAlign:'right', marginRight:'20px'}}>
                    <Link to="/streams/new" className="ui button primary">
                    Create Stream
                    </Link>
                </div>
            )
        }
    }

    

    render(){
        console.log(this.props.stream);
        
        return (
        <div>
            <h2 style={{fontSize:'22px', marginLeft:'15px'}}>All streams:</h2>
            {this.renderCreate()}
            <div className="ui celled" style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
            {this.renderList()}</div>
            
        </div>
        )
    }
}


const mapStateToProps = (state)=>{
    //turns all objects into an array for easy manipulation
    return {
         stream : Object.values(state.stream),
         currentUserId: state.auth.userId,
         isSignedIn: state.auth.isSignedIn
        }
}

export default connect(mapStateToProps, {fetchStreams})(StreamList);