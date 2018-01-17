 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB6kcsq5hwz5qCy_q3OJ2ZIGX_qvD3hwLY",
    authDomain: "traindatabase-c2c03.firebaseapp.com",
    databaseURL: "https://traindatabase-c2c03.firebaseio.com",
    projectId: "traindatabase-c2c03",
    storageBucket: "traindatabase-c2c03.appspot.com",
    messagingSenderId: "873189364290"
  };
  
 firebase.initializeApp(config);
 var database = firebase.database();

 	
$("#submitTrain").on("click", function(){
	event.preventDefault();

		// Grabs user input
		var trainName = $("#trainNameInput").val().trim();
		var desName = $("#desInput").val().trim();
		var trainTimeInput = moment($("#trainTimeInput").val().trim(), "HH:mm").subtract(10, "years").format("X");;
		var frequencyInput = parseInt($("#frequencyInput").val().trim());


		// Console Log
		console.log(trainName);
		console.log(desName);
		console.log(trainTimeInput);
		console.log(frequencyInput);

		
		// Put Items on Firebase
		var newTrain = {
			Name:  trainName,
			Destination: desName,
			Time: trainTimeInput,
			Frequency: frequencyInput,
		}

		// push to Firebase
		  database.ref().push(newTrain);
	

		//Clear Inputfields
		 $("#trainNameInput").val("");
		 $("#lineInput").val("");
		 $("#trainInput").val("");
		 $("#frequencyInput").val("");
	});

database.ref().on("child_added", function(childSnapshot, prevChildKey){

		console.log("ch:" + childSnapshot.val());

		// assign firebase variables to snapshots.
		var firebaseName = childSnapshot.val().name;
		var firebaseDes = childSnapshot.val().desName;
		var firebaseTrainTimeInput = childSnapshot.val().Time;
		var firebaseFrequency = childSnapshot.val().frequency;
		
		var diffTime = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes");
		var timeRemainder = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes") % firebaseFrequency ;
		var minutes = firebaseFrequency - timeRemainder;

		var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A"); 
		
		// Console Log
		console.log(minutes);
		console.log(nextTrainArrival);
		console.log(moment().format("hh:mm A"));
		console.log(nextTrainArrival);
		console.log(moment().format("X"));

		// Add new info
		$("#trainTable > tbody").append("<tr><td>" + firebaseName + "</td><td>" + firebaseDes + "</td><td>" + firebaseFrequency + " mins" + "</td><td>" + nextTrainArrival + "</td><td>" + minutes + "</td></tr>");

	});
