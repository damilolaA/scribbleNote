
(function() {

	var signup   = document.getElementsByClassName("signup")[0],
		login    = document.getElementsByClassName("login")[0],
		error    = signup.getElementsByClassName("error")[0],
		notePad  = document.getElementsByClassName("view notepad")[0],
		xhr	     = new XMLHttpRequest();

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
					var msg = document.createTextNode("username exists already");
					error.appendChild(msg);
					error.classList.toggle("module-active");
				}
			}
		}
	}


	login.addEventListener("submit", function(e) {
		
		var data = {},
			elements = this.elements;

		Array.prototype.forEach.call(elements, function(v,i,a) {
			data[encodeURIComponent(v.name)] = encodeURIComponent(v.value); 
		});

		xhr.open("POST", "http://192.168.99.100:2000/api/v1/auth");

		xhr.setRequestHeader("Content-Type", "Application/json");

		xhr.onreadystatechange = function() {
			manageResponse(xhr);
		}

		xhr.send(JSON.stringify(data));

		e.preventDefault();
	})

	function manageResponse(http) {
		if(http.readyState == 4) {
			if(http.status == 200 || http.status == 304) {
				var info = JSON.parse(http.responseText);

				if(info.hasOwnProperty("msg")) {
					login.classList.toggle("module-active");
					notePad.classList.toggle("module-active");
				}
			}
		}
	}


}())