
	//the response text returned by ajax is not a javascript object
	//this function creates a json object
	function buildData() {
		
		var response = $.ajax({type: "GET", url: "https://santro-velo.herokuapp.com:443/users", async: false}).responseText
		//create a JS object from the text data
		var array = JSON.parse(response);
		var data = array.message
		
		return data
	};
			
	var data = buildData()
	
			
	//enter a customer name and return their info
	//member is the JSON array derived from gdoc	
	function memberSearch(data) {
		
		var firstLast;
		var newMember;
		var results;
		
		data = buildData();
		firstLast = $("#searchBox").val().toLowerCase();
		newMember = $("#searchBox").val();
		results = "";

		for (var i = 0; i < data.length; i++) {
			
			//formatting
			var memberName = data[i].firstname+" "+data[i].lastname;
			
			//.toLowerCase santizes so name doesn't have to capitalized
			//.indexOf used so you can search by first or last name
			//.length, only starts to search if you have entered two characters
			if(memberName.toLowerCase().indexOf(firstLast) >= 0 && firstLast.length >= 2 && data[i].valid == true) {
				results += memberName + "&nbsp;&nbsp;&nbsp;" + data[i].phone + "&nbsp;&nbsp;&nbsp;" + data[i].datejoined.substring(0,10) + "\<br>";	
				
			}
			} 
			
		if (results == "" && firstLast.length >= 2){
				results = "Not found, click to add \""+newMember+"\"";
			}
	
		$("#print").html(results);
	}

	//used to add members to the database
	//currently unfinished
	function addMember(data) {
		var newMember;
		var firstname
		var lastname
		var datejoined
		
		newMember = $("#searchBox").val();
		
		var ans = confirm("are you sure you want to add "+ newMember + " as a new member?");
		
		if (ans == true) {//&& newMember.indexOf(" ") /= 0 || undefined) {
			firstname = newMember
		} else {
			alert("re-type full name to try again");
		}
	}
		
		
	$( "#searchBox" ).keyup(function() {
		memberSearch(data);
	})

	console.log("supbrah".indexOf(" "))