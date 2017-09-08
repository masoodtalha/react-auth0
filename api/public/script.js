$(document).ready(function(){
	$("#submitButton").click(function(e){
		e.preventDefault();
		var searchString = $("#s").val();
		if(searchString.length < 10){
			alert("Minimum search size not met")
			return;
		}
		$.ajax({
		  type: "POST",
		  url: 'http://35.164.63.188/api/search',
		  data: {
		  	searchString: searchString
		  },
		  success: function(data){
		  	location.href='/result.html';
		  },
		  fail: function(data){
		  	alert("Something Went Wrong. Can you please try again?")
		  },
		  dataType: 'json'
		});
	});
});
