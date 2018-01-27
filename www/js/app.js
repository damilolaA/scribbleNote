
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

	backFab.addEventListener("click", function(e) {
		e.preventDefault();

		notePad.classList.toggle("module-active");
		viewNotes.classList.toggle("module-active");

	})

	fab.addEventListener("click", function(e) {
		e.preventDefault();

		notePad.classList.toggle("module-active");
	})

	signupPointer.addEventListener("click", function(e) {
		e.preventDefault();

		signup.classList.toggle("module-active");
	})

	loginPointer.addEventListener("click", function(e) {
		e.preventDefault();

		signup.classList.toggle("module-active");
	})

	signup.addEventListener("submit", function(e) {

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
		xhr.open("POST", "http://192.168.99.100:2000/api/v1/users");

		xhr.setRequestHeader("Content-Type", "Application/x-www-form-urlencoded");

		xhr.onreadystatechange = function() {
			handleResponse(xhr);
		}

		xhr.send(data);
	})

	function handleResponse(http) {

		if(http.readyState == 4) {
			if(http.status == 200 || http.status == 304) {
				var data = JSON.parse(http.responseText);

				if(data.hasOwnProperty("_id")) {
					signup.classList.toggle("module-active");
					login.classList.toggle("module-active");
				} 
			} else {

				if(http.status == 500) {
					var msg = document.createTextNode("email exists already");
					error.appendChild(msg);
					error.classList.toggle("module-active");
				}
			}
		}
	}

	login.addEventListener("submit", function(e) {

		e.preventDefault();

		var data = {},
			elements = this.elements;

		Array.prototype.forEach.call(elements, function(v,i,a) {
			data[encodeURIComponent(v.name)] = encodeURIComponent(v.value); 
		});
		
		xhr.open("POST", "http://192.168.99.100:2000/api/v1/auth");

		xhr.setRequestHeader("Content-Type", "application/json")

		xhr.onreadystatechange = function() {
			manageResponse(xhr);
		}

		xhr.send(JSON.stringify(data));
	})

	function manageResponse(http) {

		if(http.readyState == 4) {
			if(http.status == 200 || http.status == 304) {

				var info = JSON.parse(http.responseText);

				if(info.hasOwnProperty("token")) {
					localStorage.setItem("token", info.token);
					localStorage.setItem("_id", info._id);

					homeView.classList.toggle("module-active");
					notePad.classList.add("module-active");
				}
			}
		} else {

			if(http.status == 500) {
				var err = document.createTextNode("invalid username and/or password");

				loginErr.appendChild(err);
				loginErr.classList.add("module-active");
			}
		}
	}

	mainNote.addEventListener("submit", function(e) {

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

		xhr.open("POST", "http://192.168.99.100:2000/api/v1/notes")

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
					li.setAttribute("class", "note card");
					li.setAttribute("data-id", data._id);

					var	noteTitle = document.createElement("h4");
					noteTitle.setAttribute("class", "note-title");
					var	noteTitleVal = document.createTextNode(data.title);
					noteTitle.appendChild(noteTitleVal);

					var dateCreated = document.createElement("h5");
					dateCreated.setAttribute("class", "date-created");
					var dateCreatedVal = document.createTextNode(data.date);
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

					notePad.classList.remove("module-active");
					viewNotes.classList.add("module-active");
				}
			}
		}
	}

	window.addEventListener("load", function(e) {

		e.preventDefault();

		var id = localStorage.getItem("_id");

		xhr.open("GET", "http://192.168.99.100:2000/api/v1/users/" + id);

		xhr.setRequestHeader("Content-Type", "Application/json");
		xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("token"))

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

				    var li = document.createElement("li");
					li.setAttribute("class", "note card");
					li.setAttribute("data-id", info._id);

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
				}
			}
		}
	}	

}())