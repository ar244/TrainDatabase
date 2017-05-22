// Initialize Firebase
var config = {
	apiKey: "AIzaSyDb0Mi5C0OV5o4WA0gyIdKSsLLOrjKurX4",
	authDomain: "train-timetable.firebaseapp.com",
	databaseURL: "https://train-timetable.firebaseio.com",
	projectId: "train-timetable",
	storageBucket: "train-timetable.appspot.com",
	messagingSenderId: "282918709880"
};
firebase.initializeApp(config);

var dataRef = firebase.database();

// Initial Values
var train = "";
var destination = "";
var startTime = 0;
var frequency = "";
var nextArr = "";
var minsAway = 0;
var time;
var diff;

// Capture Button Click
$("#submit").on("click", function(event) {
	event.preventDefault();

  	train = $("#train-input").val().trim();
  	destination = $("#dest-input").val().trim();
  	startTime = $("#start-input").val().trim();
  	frequency = $("#freq-input").val().trim();

  	nextArr = "xxx";
  	minsAway = 0;


  	// Code for the push
	dataRef.ref().push({

		train: train,
		destination: destination,
		startTime: startTime,
		frequency: frequency,
		// minsAway: minsAway,
		// dateAdded: firebase.database.ServerValue.TIMESTAMP
	});
});

// Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
dataRef.ref().on("child_added", function(childSnapshot) {

	// Log everything that's coming out of snapshot
	console.log(childSnapshot.val().train);
	console.log(childSnapshot.val().destination);
	console.log(childSnapshot.val().startTime);
	console.log(childSnapshot.val().frequency);
	

	train = childSnapshot.val().train;
	destination = childSnapshot.val().destination;
	frequency = childSnapshot.val().frequency;
	startTime = childSnapshot.val().startTime;

	time = moment(startTime, "HH:mm");
	var now = moment();
	console.log(time + " " + now);
	diff = now.diff(time, "minutes");
	console.log("diff = " + diff);
	minsAway = frequency-(diff %frequency);
	nextArr = now.add(minsAway, "minutes").format("HH:mm");
	

	// add each train record to the table
	$("#train-table > tbody").append("<tr><td>" + train + "</td><td>" + 
		destination + "</td><td>" + frequency + "</td><td>" + nextArr + 
		"</td><td>" + minsAway + "</td></tr>");

});



