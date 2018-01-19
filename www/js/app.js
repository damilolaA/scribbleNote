
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
		xhr	          = new XMLHttpRequest();

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
				console.log(info)
				if(info.hasOwnProperty("token")) {
					localStorage.setItem("token", info.token);
					localStorage.setItem("email", info.email);

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

		console.log(data);

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
				console.log(data.email)
				if(data.hasOwnProperty("email")) {
					notePad.classList.remove("module-active");
					viewNotes.classList.add("module-active");
				}
			}
		}
	}

}())