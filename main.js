var CourseList = [];

$( document ).ready(function() {
    console.log( "ready!" );
	


var database = firebase.database();

var starCountRef = firebase.database().ref("Courses");
 starCountRef.once("value")
 .then(function(snapshot){
	 
	 snapshot.forEach(function(child){
		 
		 
		 CourseList.push(child.child("CourseName").val());
		 
	 });
 });
 
});
	console.log(CourseList);
	

//console.log(JSresponse);





$("#submitBtn").click(function(){
	
 alert("Hi,  I am Here.");
	var starCountRef = firebase.database().ref().child('Students');
 starCountRef.on('value', function(snap){
	 JSresponse = snap.val() ;
	 console.log(snap.val());
	 console.log(JSresponse.Student2.BirthDate);
 });
 
 });

var settings = {
		  "async": true,
		  "crossDomain": true,
		  "url": "https://accounts.google.com/o/oauth2/device/code",
		  "method": "POST",
		  "headers": {
		    "Content-Type": "application/x-www-form-urlencoded",
		    "cache-control": "no-cache",
		  },
		  "data": {
		    "client_id": "48333948172-860ocogn4labb9mv2s7e2emm8meukkge.apps.googleusercontent.com",
		    "scope": "email"
		  }
		}



$("#customBtn").click(function(){
	$.ajax(settings).done(function (response) {
		
		var obj = jQuery.parseJSON(response);
		
		console.log(obj);
		});
});


function loadVideoList() {
    	
    	$.ajax({ 
    		  type : 'GET', 
    		  url : 'js/els-tv-1547972414428-export.json', 
    		  async : false, 
    		  beforeSend : function(){/*loading*/},
    		  dataType : 'json', 
    		  success : function(result){
    		   var buffer="";
    		    $.each(result, function(index, val){ 

    		      for(var i=0; i < val.length; i++){ 
    		        var item = val[i]; 
    		        console.log(item.name);
    		        buffer+=" <li><a style='color:white;' href='#"+item.name+"'>"+item.name+"</a></li> <li><a style='color:white;' href='#"+item.command+"'>"+item.command+"</a></li>"; 
    		      } 
    		      $('#ul').html(buffer);
    		    });
    		  }
    		 });
                
 }
