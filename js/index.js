

$(document).ready(function() 
//(function()
 {

console.log( "ready!" );
	
//var value = tizen.tvinputdevice.getSupportedKeys();
//console.log(value);

document.addEventListener('tizenhwkey', function(e) {
    if(e.keyName == "back")
try {
	var r = confirm("Press Ok to exit the app...");
	  if (r == true) {
		  tizen.application.getCurrentApplication().exit();
	  } else {
	   console.log("You pressed Cancel!");
	  }
	} catch (ignore) {
	}
});


var database = app_fireBase.database();

var starCountRef = database.ref("Courses");

var mainDiv = $("#ParentDiv");
//var	mainDiv = document.querySelector("#ParentDiv");
var counter = 0;	
 starCountRef.once("value")
 .then(function(snapshot){
	 
	 snapshot.forEach(function(child){
		 
		 //CourseList.push(child.child("CourseName").val());
		 
		 
		 var CourseKey = child.child("CourseName").key;
		 var CourseName = child.child("CourseName").val();
		 var CourseLecturer = child.child("CourseLecturer").val();
		 var CourseTumbnail = child.child("CourseTumbnail").val();
		 var CourseTotlalDuration = child.child("CourseTotlalDuration").val();
/*
		 
		 var CourseTumbnailBorder = document.createElement("a");
		 CourseTumbnailBorder.classList.add("row");
		 if (counter===0){
		 CourseTumbnailBorder.classList.add("courseTumbnail");
			 }
		 else{
			 CourseTumbnailBorder.classList.add("courseTumbnail-opcity-active");
		 }
			 
		 CourseTumbnailBorder.setAttribute('data-id',CourseKey);
		 CourseTumbnailBorder.setAttribute("href", "https://www.w3schools.com");
			
		 
		 
		 
		 var CourseImgDivInTumbnail = document.createElement("div"); //image div
		 CourseImgDivInTumbnail.classList.add("col-lg-5");
		 
		 var CourseImgImgInTumbnail = document.createElement("img"); //image Object
		 CourseImgImgInTumbnail.classList.add("img-thumbnail");
		 CourseImgImgInTumbnail.setAttribute("src",CourseTumbnail);
		 
		 
		 var CourseInfosInTumbnail = document.createElement("div"); // Info DIV
		 CourseInfosInTumbnail.classList.add("col-lg-7");
		 
		 var CourseInfosCourseNameInTumbnail = document.createElement("h3");
		 CourseInfosCourseNameInTumbnail.textContent = CourseName;
			 
		 var CourseInfosCourseLecturerInTumbnail = document.createElement("h4");
		 CourseInfosCourseLecturerInTumbnail.textContent = CourseLecturer; 
		 
			 
		 var CourseInfosDurationInTumbnail = document.createElement("h5");
		 CourseInfosDurationInTumbnail.textContent = "Duration: "+CourseTotlalDuration;
		 
		 
		 CourseImgDivInTumbnail.appendChild(CourseImgImgInTumbnail);
		 
		 
		 CourseInfosInTumbnail.appendChild(CourseInfosCourseNameInTumbnail);
		 CourseInfosInTumbnail.appendChild(CourseInfosCourseLecturerInTumbnail);
		 CourseInfosInTumbnail.appendChild(CourseInfosDurationInTumbnail);
		 //CourseTumbnailBorder.onmouseover = changeStyle(this);
 			
		 
		 CourseTumbnailBorder.appendChild(CourseImgDivInTumbnail);
		 CourseTumbnailBorder.appendChild(CourseInfosInTumbnail);
		 
		 
		 
		 mainDiv.appendChild(CourseTumbnailBorder);
		 */
		 
		 
		 var newElement= '<a id="'+CourseName+'" focusable href="www.google.com" class="row courseTumbnail-opcity-active" ><div class="col-5"><img src="'+CourseTumbnail+'" class="img-thumbnail" ></div><div class="col-7"><h4>'+CourseName+'</h4><h5>'+CourseLecturer+'</h5><p>Duration :'+CourseTotlalDuration+'</p></div></a>';
		 
		 mainDiv.append(newElement);
		 
		 //CourseList.push(child.child("CourseName").val());
		 counter++;
		 
	 });
 });
});




function change(){
	sessionStorage.setItem("student","Hi this is working");
	window.location.href = "userpage.html";
}
