import React from 'react';
import {connect} from 'react-redux';
import {signIn, signOut} from '../actions';
class GoogleAuth extends React.Component{


    componentDidMount() {
        //pozivamo ovu biblioteku (ovo je ovakva procedura)
        //prvo poziv client auth2 i nakon toga callback u kojem smještamo sve informacije
        //mogli smo ovo uraditi i sa async await
        window.gapi.load("client:auth2",  () => {
           window.gapi.client.init({
            clientId: '691450624483-tl4mghenh3scamtr5ga2f89est21jkaf.apps.googleusercontent.com', // Replace CLIENT_ID with yours
            scope: "profile email"
          }).then(()=>{
              this.auth= window.gapi.auth2.getAuthInstance();
            	this.onAuthChange(this.auth.isSignedIn.get())
              //ovdje ispod pozivamo metod koji će nam automatski kazati jesmo li ili nismo signed in!
              //bez da moramo reloadat page
              this.auth.isSignedIn.listen(this.onAuthChange);

          })
      
       
        });
      }
//ovo je ovdje promjena nakon redux-a (dodavanja)
//pošto mi znamo da će nam isSignedIn vratiti true ili false (check Google API for this)
//radimo simple if uslov, ako je isSignedIn vrati mi signIn preko props-a naravno
//jer nam je smješten u action creatoru
//tako i za signOut isto!!
      onAuthChange=(isSignedIn)=>{
        if(isSignedIn){
          this.props.signIn(this.auth.currentUser.get().getId())
        }else{
          this.props.signOut()
        }
      }

      renderAuthButton(){
          //ako je početna vrijednost našeg state-a
          if(this.props.isSignedIn===null){
            return null;
          }else if(this.props.isSignedIn){
              //ako je korisnik signed in
              return (
                  <button className="ui red google button" onClick={this.onSignOutClick}>
                    <i className="google icon"/>
                    Sign out
                  </button>
              )
          }else{
              //ako korisnik nije signed in
              return (
                <button className="ui red google button" onClick={this.onSignInClick}>
                <i className="google icon"/>
                    Sign in
                </button>
                )
          }
      }

      onSignInClick=()=>{
        this.auth.signIn();
      }

      onSignOutClick=()=>{
        this.auth.signOut();
    }

    render(){
        return(
        <div>
            {this.renderAuthButton()}
        </div>
        )
    }
}

//dodajemo mapStatetoProps u kojem imamo state, i ovdje vršimo promjenu state-a kad se nešto dogodi
//zamjena za setState ustvari
const mapStateToProps=(state)=>{
  return {isSignedIn: state.auth.isSignedIn}
}
//dole u connectu (kojeg pozivamo na samom startu ove komponente) pozivamo mapstatetoprops
//signIn i signOut i posljednju naravno cijelu ovu komponentu GoogleAuth
export default connect(mapStateToProps, {signIn,signOut})(GoogleAuth);