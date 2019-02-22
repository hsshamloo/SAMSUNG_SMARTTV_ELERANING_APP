var database = app_fireBase.database();
const rootRef= database.ref();
var courses = {};
var UserID; 		
var courseName;
var studentName;

$( document ).ready(function() 
//(function()
 {
	 UserID = sessionStorage.getItem("UserID");
	 courseName = sessionStorage.getItem("courseName");
	 studentName = sessionStorage.getItem("StudentName");
	
	//var nameofCourse = sessionStorage.getItem("NameofCourse");
	var nameofCourse ;
	
	var courseInfo =  database.ref("Courses");
	courseInfo.once("value").then(function(snapshot){
		
		snapshot.forEach(function(child){
			
			if (child.key === courseName)
				{
				$("#CourseNameForList").text(child.child("CourseName").val());
				nameofCourse = child.child("CourseName").val();
				//alert(child.child("CourseName").val());
				
				}
			
			
		});
	});
	
	
	
	$("#studentName").text(studentName);
	
	var courseName = sessionStorage.getItem("courseName");
	
	
	//var courseName = "Course1"; 
	
	if (!courseName){
		
		console.log("You fucked!");
	}
	
	else
	{
		setTimeout(function(){
			
			alert("Name of this Course is " + nameofCourse)
			
			CheckIfUserRegisterInCourse(UserID,courseName,nameofCourse);
			
			}, 2500);
		
		getListofVideosForCourse(courseName);
		//appenUnRolleButton(UserID,courseName);
		
		
		//getStudentInfo(UserID);
	
	}
	});


function getListofVideosForCourse(courseName){
	
	const videoList = database.ref("Videos").orderByChild('Course').equalTo(courseName);
	
	videoList.once("value").then(function(snapshot){
		
		snapshot.forEach(function(child){
			var videoName = child.child("Name").val();
			var vidoAddress = child.child("Address").val()
			console.log(child.child("Name").val());
			console.log(child.child("Address").val());
			createVideoTumbnail(videoName,vidoAddress);
			});
		
	});
}

var VideoListParent = $("#videoParent");

function createVideoTumbnail(videoName,vidoAddress){
	
	var Element = '<a focusable onclick="changeVideoSourse(this.id)" id="'+vidoAddress+'" href="#" class="list-group-item">'+videoName+'</a>';
	
	VideoListParent.append(Element);
	
}

function appenUnRolleButton(userID,courseName){
	
	
	var elemenButton = '<button id="unrollBtn" focusable type="button" onclick="unregisterFromCourse()" class="btn btn-danger">Unenroll from the course</button>';
	VideoListParent.append(elemenButton);
	
}

function changeVideoSourse(videoAddress){
	
	var vid = document.getElementById("myVideo");
	studentName = sessionStorage.getItem("StudentName");
	console.log("I am in Video Player");
	
			vid.src = videoAddress;
		  	vid.load();
		  	send_statement(studentName,videoAddress)
		  	
}



/*function CheckIfUserRegisterInCourse(userID,courseName){
	
	
	console.log("Check User Validity with this data,UseID :" + userID + "CourseName : " +courseName );
	const courseList = database.ref("Registration").orderByChild('Course').equalTo(courseName);
	
	console.log(courseList);
	
	courseList.once("value").then(function(snapshot){
		console.log("This is SnapShot");
		console.log(snapshot.hasChild("UID"));
		
		
		snapshot.forEach(function(child){
			
			console.log(child.child("UID").val());
			
			if (child.child("UID").val() === userID){
				
				console.log("User is Registred in this Course"); 
			}
			
			else{
				
				var r = confirm("You are not registred in this course, press Ok to register");
				if (r == true) {
					console.log("You are registred!");
				 } else {
						console.log("You pressed Cancel!");
					}
				}
			});
			
			});
	
	}*/

function CheckIfUserRegisterInCourse(userID,courseName,nameofCourse){
	const registrationTabale = database.ref("Registration");
	
	var registred = false;
	var combinitation = courseName+"_"+userID;
	console.log("The combinitation is: " + combinitation);
	const courseList = registrationTabale.orderByChild('IDR').equalTo(combinitation);
	
	
	courseList.once("value").then(function(snapshot){
		
		snapshot.forEach(function(child){
			
		
		if(child.hasChild("IDR")){
			
			registred = true;
		}
		
		});
		
	});
	
	setTimeout(function(){
		
		if (registred){
			
			alert("User Registred in this course");
			appenUnRolleButton();
			
		} 
		
		else
			{
			
			var r = confirm("You are not registred in this course, press Ok to register");
			if (r == true) {
				
				var Key = registrationTabale.push().key;
				
				database.ref('Registration/' + Key).set({
					Course: courseName,
					UID: userID,
					CourseName: nameofCourse,
					IDR : combinitation
				  });
				alert("Happy, You are registred, lets us orgnize it, back again");
				window.location.replace("userpage.html");
				
			 } else {
					alert("Ok, Maybe next time");
					window.location.replace("userpage.html");
				}
			
			}
		}, 2000);
}



function unregisterFromCourse(){
	
	var UserID = sessionStorage.getItem("UserID");
	var courseName = sessionStorage.getItem("courseName");
	const registrationTabale = database.ref("Registration");
	
	var combinitation = courseName+"_"+UserID;
	
	console.log("The combinitation is: " + combinitation);
	
	const courseList = registrationTabale.orderByChild('IDR').equalTo(combinitation);
	
	courseList.once("value").then(function(snapshot){
		
		snapshot.forEach(function(child){
			

			var r = confirm("Do you want to unenroll from this course, press Ok to unregister");
			if (r == true) {
				
				var Key = child.key;
				confirm("You unenroll from this course" + child.key);
					database.ref('Registration/'+Key).remove();
					window.location.replace("userpage.html");
				
			}
			else{
				
				confirm("You want to stay in this course");
			}
			
			
		
		});
		
	});	
}