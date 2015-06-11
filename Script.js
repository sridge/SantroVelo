	$("#newMemberForm").hide()
	$("#submit").hide()
	$("#memberTable").hide()
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
		var names = "";
		var phone = "";
		var date = "";
		
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
				//results += memberName + "&nbsp;&nbsp;&nbsp;" + data[i].phone + "&nbsp;&nbsp;&nbsp;" + data[i].datejoined.substring(0,10) + "\<br>";
				names += memberName + "\<br>"
				phone += "(" + data[i].phone.substring(0,3) + ") " + data[i].phone.substring(3,6) + "-" + data[i].phone.substring(6,10) + "\<br>"
				date += data[i].datejoined.substring(0,10) + "\<br>"
			}
			} 
			
			if (names.length >=1 && firstLast.length >= 2) {	
				
				//} else if (firstLast.length >= 2) {
				console.log(names)
				$("#memberTable").show()
				$("#memberName").html(names)
				$("#phone").html(phone)
				$("#date").html(date)		
			} else {
				$("#memberTable").hide()
			}
			
		results = "Not found? click to add \""+newMember+"\"";
		$("#print").html(results);
		
	

		
	
	}

	//used to add members to the database
	//currently unfinished
	function addMember(data) {
		var newMember;
		var firstname = "";
		var lastname = "";
		var datejoined;
		var split = ""
		
		newMember = $("#searchBox").val();
		
		var ans = confirm("add a new member?");
		
		if (ans == true && newMember.indexOf(" ") != 0 && newMember.indexOf(" ") != -1) {
			
			$("#hideme").hide();
			$("#searchBox").hide();
			$("#newMemberForm").show();
			$("#submit").show();
			
			split = newMember.indexOf(" ");
			firstname = newMember.substring(0,split);
			lastname = newMember.substring(split+1);
			$("#firstname").val(firstname);
			$("#lastname").val(lastname);
			
			// var httpString ="?firstname="+$("#firstname").val()+"&lastname="+$("#lastname").val()+"&datejoined=2015-04-25&phone="+$("#phone").val()+"&valid=true"
			
			var httpString = "https://santro-velo.herokuapp.com:443/users?firstname=Sean&lastname=MacdDonald&datejoined=2015-04-25&phone=8043496591&valid=true"
			
			
			$("#submit").click(function(){
				xmlhttp.open("POST","https://santro-velo.herokuapp.com:443/users",false);
				xmlhttp.send(httpString)
			});
		} else {
			alert("re-type full name to try again");
		}
	}
		
		
	$( "#searchBox" ).keyup(function() {
		memberSearch(data);
	})

	