
(function() {

	window.$on = function(target, event, cb) {
		target.addEventListener(event, cb, false);
	}

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
					mainView.classList.add("module-active");
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
				console.log(data);
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

					$on(deleteIcon, "click", function(e) {

						e.preventDefault();

						var id = data._id;
						console.log("This is the note " + id);

						xhr.open("DELETE", "https://scribblenoteapp.herokuapp.com/api/v1/notes/" + id);

						xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("token"))

						xhr.onreadystatechange = function() {
							removeNote(xhr);
						}

						xhr.send(null);
					})

					function removeNote(http) {
						if(http.readyState === 4) {
							if(http.status == 200) {
								var info = JSON.parse(http.responseText)

								if(info.hasOwnProperty('_id')) {
									var element = document.getElementById("listNote");
   									element.parentNode.removeChild(element);
								}
							}
						}
					}

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

	$on(window, "load", function(e) {

		e.preventDefault();

		var id = localStorage.getItem("_id");

		console.log("This is the users " + id);

		xhr.open("GET", "https://scribblenoteapp.herokuapp.com/api/v1/users/" + id);

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

					console.log(info);
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

					$on(deleteIcon, "click", function(e) {

						e.preventDefault();

						var noteId = this.parentNode.getAttribute("data-id");

						console.log("This is the note " + noteId);

						xhr.open("DELETE", "https://scribblenoteapp.herokuapp.com/api/v1/notes/" + noteId);

						xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("token"))

						xhr.onreadystatechange = function() {
							deleteNote(xhr);
						}

						xhr.send(null);
					})

					function deleteNote(http) {
						if(http.readyState === 4) {
							if(http.status == 200) {
								var info = JSON.parse(http.responseText)

								if(info.hasOwnProperty('_id')) {
									var element = document.getElementById("listNote");
   									element.parentNode.removeChild(element);
								}
							}
						}
					}

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