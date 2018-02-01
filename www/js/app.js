
(function() {

	var signup        = document.getElementsByClassName("signup")[0],
		login         = document.getElementsByClassName("login")[0],
		error         = signup.getElementsByClassName("error")[0],
		loginErr      = login.getElementsByClassName("error")[0],
		homeView      = document.getElementById("home-views"),
		mainView      = document.getElementById("main-views"),
		viewNotes	  = mainView.getElementsByClassName("view notes")[0]
		notePad       = mainView.getElementsByClassName("view notepad")[0],
		mainNote      = document.getElementsByClassName("main")[0],
		signupPointer = document.getElementsByClassName("pointer")[0],
		loginPointer  = document.getElementsByClassName("pointer")[1],
		fab			  = document.getElementsByClassName("def-fab add-note")[0],
		backFab		  = document.getElementsByClassName("back")[0],
		ul 			  = document.getElementsByClassName("note-list")[0],
		xhr	          = new XMLHttpRequest();

	$on(backFab, "click", function(e) {
		e.preventDefault();

		notePad.classList.toggle("module-active");
		viewNotes.classList.toggle("module-active");
	})

	$on(fab, "click", function(e) {
		e.preventDefault();

		mainNote.reset();
		notePad.classList.toggle("module-active");
	})

	$on(signupPointer, "click", function(e) {
		e.preventDefault();

		signup.classList.toggle("module-active");
	})

	$on(loginPointer, "click", function(e) {
		e.preventDefault();

		signup.classList.toggle("module-active");
	})

	//signUp
	$on(signup, "submit", function(e) {

		e.preventDefault();

		var data = "",
			elements = this.elements;

		Array.prototype.forEach.call(elements, function(v,i,a) {

			data += encodeURIComponent(v.name);
			data += "=";
			data += encodeURIComponent(v.value);
			data += "&";
		})

		data = data.substring(0, data.length -1);
		//"https://scribblenoteapp.herokuapp.com/api/v1/users
		//"http://192.168.99.100:2000/api/v1/users"
		xhr.open("POST", "https://scribblenoteapp.herokuapp.com/api/v1/users");

		xhr.setRequestHeader("Content-Type", "Application/x-www-form-urlencoded");

		xhr.onreadystatechange = function() {
			signUpResponse(xhr, signup, login, error);
		}

		xhr.send(data);
	})

	//login
	$on(login, "submit", function(e) {

		e.preventDefault();

		var data = {},
			elements = this.elements;

		Array.prototype.forEach.call(elements, function(v,i,a) {
			data[encodeURIComponent(v.name)] = encodeURIComponent(v.value); 
		});
		
		xhr.open("POST", "https://scribblenoteapp.herokuapp.com/api/v1/auth");

		xhr.setRequestHeader("Content-Type", "application/json")

		xhr.onreadystatechange = function() {

			manageLoginResponse(xhr, homeView, mainView, notePad, loginErr);
		}

		xhr.send(JSON.stringify(data));
	})


	//addNotes
	$on(mainNote, "submit", function(e) {

		e.preventDefault();

		var data = "",
			elements = this.elements;

		Array.prototype.forEach.call(elements, function(v, i, a) {

			data += encodeURIComponent(v.name);
			data += "=";
			data += encodeURIComponent(v.value);
			data += "&";
		})

		data = data.substring(0, data.length - 1);

		xhr.open("POST", "https://scribblenoteapp.herokuapp.com/api/v1/notes")

		xhr.setRequestHeader("Content-Type", "Application/x-www-form-urlencoded")
		xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("token"));

		xhr.onreadystatechange = function() {
			addNote(xhr)
		}

		xhr.send(data);
	})

	function addNote(http) {

		if(http.readyState == 4) {
			if(http.status == 200 || http.status == 304) {

				var data = JSON.parse(http.responseText);

				if(data.hasOwnProperty("users")) {

					var li = document.createElement("li");

					li.setAttribute("id", "listNote");
					li.setAttribute("class", "note card");
					li.setAttribute("data-id", data._id);

					var	noteTitle = document.createElement("h4");
					noteTitle.setAttribute("class", "note-title");
					var	noteTitleVal = document.createTextNode(data.title);
					noteTitle.appendChild(noteTitleVal);

					var dateCreated = document.createElement("h5");
					dateCreated.setAttribute("class", "date-created");
					var dateCreatedVal = document.createTextNode(data.momentDate);
					dateCreated.appendChild(dateCreatedVal);

					var noteBrief = document.createElement("p");
					noteBrief.setAttribute("class", "note-brief");
					var noteBriefVal = document.createTextNode(data.note);
					noteBrief.appendChild(noteBriefVal);

					var deleteIcon = document.createElement("div");
					deleteIcon.setAttribute("class", "delete-icon delete-note");

					li.appendChild(noteTitle);
					li.appendChild(noteBrief);
					li.appendChild(dateCreated);
					li.appendChild(deleteIcon);

					ul.appendChild(li);

					$on(deleteIcon, "click", function(e) {

						e.preventDefault();

						var id = this.parentNode.getAttribute("data-id");

						xhr.open("DELETE", "https://scribblenoteapp.herokuapp.com/api/v1/notes/" + id);

						xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("token"))

						xhr.onreadystatechange = function() {
							removeNote(xhr, id);
						}

						xhr.send(null);
					})

					function removeNote(http, id) {
						if(http.readyState === 4) {
							if(http.status == 200) {
								var info = JSON.parse(http.responseText);
								
								var respId = info._id;
								console.log("this is the response id " + respId);
								console.log(id);
								if(id == respId) {

   									ul.removeChild(li);
								}
							}
						}
					}

					notePad.classList.remove("module-active");
					viewNotes.classList.add("module-active");
				}
			}
		}
	}

	//fetch Notes
	$on(window, "load", function(e) {

		e.preventDefault();

		var id    = localStorage.getItem("_id"),
		    token = localStorage.getItem("token");

		if(!token) {
			return console.log("No token found");
		}

		xhr.open("GET", "https://scribblenoteapp.herokuapp.com/api/v1/users/" + id);

		xhr.setRequestHeader("Content-Type", "Application/json");
		xhr.setRequestHeader("Authorization", "Bearer " + token);

		xhr.onreadystatechange = function() {
			getNotes(xhr)
		}

		xhr.send(null)
	})

	function getNotes(http) {

		if(http.readyState == 4) {

			if(http.status == 200 || http.status == 304) {
				var data = JSON.parse(http.responseText);

				for(var i = 0, len = data.length; i < len; i++) {

					var info = data[i];
					var id = info._id;

				    var li = document.createElement("li");

					li.setAttribute("class", "note card");
					li.setAttribute("id", "listNote");
					li.setAttribute("data-id", id);

					var	noteTitle = document.createElement("h4");
					noteTitle.setAttribute("class", "note-title");
					var	noteTitleVal = document.createTextNode(info.title);
					noteTitle.appendChild(noteTitleVal);

					var dateCreated = document.createElement("h5");
					dateCreated.setAttribute("class", "date-created");
					var dateCreatedVal = document.createTextNode(info.date);
					dateCreated.appendChild(dateCreatedVal);

					var noteBrief = document.createElement("p");
					noteBrief.setAttribute("class", "note-brief");
					var noteBriefVal = document.createTextNode(info.note);
					noteBrief.appendChild(noteBriefVal);

					var deleteIcon = document.createElement("div");
					deleteIcon.setAttribute("class", "delete-icon delete-note");

					li.appendChild(noteTitle);
					li.appendChild(noteBrief);
					li.appendChild(dateCreated);
					li.appendChild(deleteIcon);

					ul.appendChild(li);

					$on(deleteIcon, "click", function(e) {

						e.preventDefault();

						var noteId = this.parentNode.getAttribute("data-id");

						xhr.open("DELETE", "https://scribblenoteapp.herokuapp.com/api/v1/notes/" + noteId);

						xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("token"))

						xhr.onreadystatechange = function() {
							deleteNote(xhr, noteId);
						}

						xhr.send(null);
					})

				}
			}
		}
	}	

}())