var app_fireBase ={};

(function(){
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyBWVuIG4qJzriq-2AaMVKREaDcKRlcoBbs",
      authDomain: "els-tv-1547972414428.firebaseapp.com",
      databaseURL: "https://els-tv-1547972414428.firebaseio.com",
      projectId: "els-tv-1547972414428",
      storageBucket: "els-tv-1547972414428.appspot.com",
      messagingSenderId: "144842642083"
    };

    firebase.initializeApp(config);
    app_fireBase = firebase;
})()