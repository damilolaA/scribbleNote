
window.$on = function(target, event, cb) {
	target.addEventListener(event, cb, false);
}

function checkError(message, err) {
	
	if(err.childNodes.length !== 0) {
		return;
	}

	err.appendChild(message);
	err.classList.toggle("module-active");
}

function signUpResponse(http, signup, login, error) {

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

				checkError(msg, error)
			}
		}
	}
}

function manageLoginResponse(http, homeView, mainView, notePad, loginErr) {

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
			var msg = document.createTextNode("invalid username and/or password");

			checkError(msg, loginErr);
		}
	}
}

function deleteNote(http, id) {
	if(http.readyState === 4) {
		if(http.status == 200) {
			var info = JSON.parse(http.responseText)

			var respId = info._id;

			if(id == respId) {
				
				var element = document.getElementById("listNote");
				element.parentNode.removeChild(element);
			}
		}
	}
}