// JavaScript Document
var database = app_fireBase.database();
const rootRef= database.ref();
var mainApp= {};
var courses = {
		
	};

$( document ).ready(function() 
//(function()
 {
	document.addEventListener('tizenhwkey', function(e) {
	    if(e.keyName == "back")
	try {
		var r = confirm("Press Ok to back the main page");
		  if (r == true) {
			  window.history.back();
		  } else {
		   console.log("You pressed Cancel!");
		  }
		} catch (ignore) {
		}
	});
		firebase = app_fireBase;
			var UserID = null;
			
			firebase.auth().onAuthStateChanged(function(user) {

				if (user) {
					
					console.log("User is Valid");
					UserID = user.uid;
					sessionStorage.setItem("UserID",UserID); // Save Student ID to web Storage
					
					listOfRegisteredCourseByUserID(UserID); //List of Course Student Registred for that
					
					getStudentInfo(UserID); 	//Get Student Information
					
					getTheListOfAvilableCourses(); //Get List of Available Course (Maybe Student Registered or not)
				}
				else{
					alert("User is not valid");
					uid = null;
					window.location.replace("index.html");
				}
			  });	

			function logOut (){
    			firebase.auth().signOut();
			}

	mainApp.logOut = logOut;
	
	//var UserUID = sessionStorage.getItem("UserUID");
	
	
	});

function retrivingData(UserUID){

	console.log("ready!");
	var studentData = database.ref("Students");//Connecting to Student Database
	studentData.once("value").then(function(snapshot){
		snapshot.forEach(function(child){
		
		if(child.key === UserUID){
			
				var studentName = child.child("Name").val(); //Getting User Data
				console.log(studentName); // Printing Studetn Name
			
			child.child("Course").forEach(function (child){ //Getting Course that user Registred
				
				console.log(child.val());// Printing Course Info
				});
			}
			
			else
			{
				console.log("No Such User");
			}
	});
	});
}
function retrivingCourseData(){
	var CourseName;
	
	var starCountRef = database.ref("Courses");
	starCountRef.once("value")
		.then(function(snapshot){
		snapshot.forEach(function(child){
		 
		 //CourseList.push(child.child("CourseName").val());
		 //if(child.key === CourseID){
				var CourseKey = child.key;
			 	var CourseName = child.child("CourseName").val();
			 	//CourseName = child.child("CourseName").val();
				courses[CourseKey] = CourseName;
			});
	});
	
	setTimeout(function () {
		console.log("I am here");
        //return(CourseName);
		
    }, 1000);
	
	
}

function datafromFireBase(){
	var returnArrTwo = [];
	
	database.ref('Courses/Course1').on('value', function(snapshot) {
    returnArrTwo = snapshotToArray(snapshot);
	});
	setTimeout(function () {
        console.log(returnArrTwo[0]);
    }, 1000);
	
}

function snapshotToArray(snapshot) {
    var returnArr = [];

    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;

        returnArr.push(item);
    });

    return returnArr;
}



function getStudentInfo(userID){
	
	var userID; 
	const StudentInfo = rootRef.child("Students").child(userID);
		StudentInfo.once("value").then(function(snapshot){
			
			var name = snapshot.child("Name").val();
			sessionStorage.setItem("StudentName",name); //Save Student Name To SessionStorage
			$("#studentName").text(name);
		});
}

function listOfRegisteredCourseByUserID(userID){
	
	const courseList = database.ref("Registration").orderByChild('UID').equalTo(userID);
	//const courseInfo = database.ref("Courses").orderByChild("CourseName").equalTo()
	//console.log(courseList);
	
	courseList.once("value").then(function(snapshot){
		
		snapshot.forEach(function(child){
			
		//console.log(child.child("CourseName").val());
			var courseName =child.child("CourseName").val();
			var course=child.child("Course").val();
			const courseInfo = database.ref("Courses").orderByChild("CourseName").equalTo(courseName);
				
			courseInfo.once("value").then(function(snapshot){
					
					snapshot.forEach(function (child){
						
						var courseImage = child.child("CourseTumbnail").val();
						console.log(courseImage);
						creatMyCourseTumbnail(course,courseName,courseImage);
					});
					
					
				});
			});
		//console.log(snapshot.child("Course").val());
	});
	
}

function creatMyCourseTumbnail(course,courseName,courseImage){
	
	var newElement = '<a name ="'+courseName+'" focusable onclick="saveCourseNameToSessionStorage(this.id,this.name)" id="'+course+'" href="videopage.html" class="col-lg-2 offset-lg-1 text-center"><img src="'+courseImage+'" class="img-fluid img-thumbnail"><br><h4 style="text-align: left; margin-top:20px;">'+courseName+'</h4></a>'
	
	var mainDiv = $("#MyCourseList");
		 
	mainDiv.append(newElement);
	
}

function getTheListOfAvilableCourses(){
	
	var ListOfAvailableCourses = database.ref("Courses");
	
 ListOfAvailableCourses.once("value")
 .then(function(snapshot){
	 
	 snapshot.forEach(function(child){
		 
		 //CourseList.push(child.child("CourseName").val());
		 var CourseKey = child.key;
		 var CourseName = child.child("CourseName").val();
		 var CourseLecturer = child.child("CourseLecturer").val();
		 var CourseTumbnail = child.child("CourseTumbnail").val();
		 var CourseTotlalDuration = child.child("CourseTotlalDuration").val();
		
		 creatAvailabeCourseTumbnail(CourseKey,CourseName,CourseTumbnail);
	
	
	 	});
 });
}

function creatAvailabeCourseTumbnail(course,courseName,courseImage){
	
	var newElement = '<a name ="'+courseName+'" focusable onclick="saveCourseNameToSessionStorage(this.id,this.name)" id="'+course+'" href="videopage.html" class="col-lg-2 offset-lg-1 text-center"><img src="'+courseImage+'" class="img-fluid img-thumbnail"><br><h4 style="text-align: left; margin-top:20px;">'+courseName+'</h4></a>'
	
	var mainAvialableCourses = $("#AvailableCourseList");
		 
	mainAvialableCourses.append(newElement);
	
}

function saveCourseNameToSessionStorage(courseId, courseName){
	
	sessionStorage.setItem("courseName",courseId);
	sessionStorage.setItem("NameofCourse",courseName);
	
	console.log("This id clicked and saved "+ courseName );
}



