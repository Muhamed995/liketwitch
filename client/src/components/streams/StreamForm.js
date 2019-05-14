import React from 'react';
import {Field, reduxForm} from 'redux-form';




class StreamForm extends React.Component{

  renderError({touched,error}){
 
    if(touched && error){
      return (
      <div className="ui error message">
      <div className="header">{error}</div>
      </div>

      )
    }

  }

    renderInput =(formProps)=>{
    
        
        return (
            <div className="field">
            <label>{formProps.label}</label>
        <input {...formProps.input} autoComplete="off"/>
        <div>{this.renderError(formProps.meta)}</div>
        </div>
        )
        
    }

    onSubmit=(formValues)=>{
        this.props.onSubmit(formValues)
    
    }

    

   render(){
   
    return(
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
          <Field  name="title" type="text" component={this.renderInput} label="Enter title" />
          <Field  name="description" type="text" component={this.renderInput} label="Enter description" />

          <button className="ui button primary" onSubmit={this.isAuthenticated}>Submit</button>
      </form>

    )
   }
}

const validate = values => {
    const errors = {}
    if (!values.title) {
      errors.title = 'You must enter a title'
    }else if(values.title.length<6){
      errors.title = 'Your title name needs to be at least 6 character long'
    } 
    if (!values.description) {
      errors.description = 'You must enter a description'
    } 
    
    return errors
  }

//pošto moramo da povežemo oba elementa u connect, i redux form i klasu, i onda još mapstatetoProps
//ovo dole nam je najbolji način, znači kreiramo novu objekt formWrapped koji će imati smješetn u sebi
//formu i validaciju a onda u connect povezujemo sve ostalo 

export default reduxForm({
    form:'streamForm',
    validate:validate,
    enableReinitialize: true
})(StreamForm);

