var mainApp= {};

(function(){
    firebase = app_fireBase;
var uid = null;
    firebase.auth().onAuthStateChanged(function(user) {
       
        if (user) {
          
            uid = user.uid;
        }
        else{
            alert("User is not valid");
            uid = null;
            window.location.replace("login.html");
        }
      });

function logOut (){
    firebase.auth().signOut();
}

mainApp.logOut = logOut;
})();


