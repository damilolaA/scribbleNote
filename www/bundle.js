!function(e){function t(a){if(n[a])return n[a].exports;var o=n[a]={i:a,l:!1,exports:{}};return e[a].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,a){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:a})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t){!function(){function e(e){if(4==e.readyState)if(200==e.status||304==e.status){var t=JSON.parse(e.responseText);t.hasOwnProperty("_id")&&(o.classList.toggle("module-active"),s.classList.toggle("module-active"))}else if(500==e.status){var n=document.createTextNode("email exists already");r.appendChild(n),r.classList.toggle("module-active")}}function t(e){if(4==e.readyState){if(200==e.status||304==e.status){var t=JSON.parse(e.responseText);t.hasOwnProperty("token")&&(localStorage.setItem("token",t.token),localStorage.setItem("_id",t._id),l.classList.toggle("module-active"),notePad.classList.add("module-active"))}}else if(500==e.status){var n=document.createTextNode("invalid username and/or password");i.appendChild(n),i.classList.add("module-active")}}function n(e){function t(e){if(4===e.readyState&&200==e.status){if(JSON.parse(e.responseText).hasOwnProperty("_id")){var t=document.getElementById("listNote");t.parentNode.removeChild(t)}}}if(4==e.readyState&&(200==e.status||304==e.status)){var n=JSON.parse(e.responseText);if(console.log(n),n.hasOwnProperty("users")){var a=document.createElement("li");a.setAttribute("id","listNote"),a.setAttribute("class","note card"),a.setAttribute("data-id",n._id);var o=document.createElement("h4");o.setAttribute("class","note-title");var s=document.createTextNode(n.title);o.appendChild(s);var r=document.createElement("h5");r.setAttribute("class","date-created");var i=document.createTextNode(n.date);r.appendChild(i);var l=document.createElement("p");l.setAttribute("class","note-brief");var c=document.createTextNode(n.note);l.appendChild(c);var u=document.createElement("div");u.setAttribute("class","delete-icon delete-note"),$on(u,"click",function(e){e.preventDefault();var a=n._id;console.log("This is the note "+a),xhr.open("DELETE","https://scribblenoteapp.herokuapp.com/api/v1/notes/"+a),xhr.setRequestHeader("Authorization","Bearer "+localStorage.getItem("token")),xhr.onreadystatechange=function(){t(xhr)},xhr.send(null)}),a.appendChild(o),a.appendChild(l),a.appendChild(r),a.appendChild(u),ul.appendChild(a),notePad.classList.remove("module-active"),d.classList.add("module-active")}}}function a(e){function t(e){if(4===e.readyState&&200==e.status){if(JSON.parse(e.responseText).hasOwnProperty("_id")){var t=document.getElementById("listNote");t.parentNode.removeChild(t)}}}if(4==e.readyState&&(200==e.status||304==e.status))for(var n=JSON.parse(e.responseText),a=0,o=n.length;a<o;a++){var s=n[a],r=s._id,i=document.createElement("li");i.setAttribute("class","note card"),i.setAttribute("id","listNote"),i.setAttribute("data-id",r);var l=document.createElement("h4");l.setAttribute("class","note-title");var c=document.createTextNode(s.title);l.appendChild(c);var d=document.createElement("h5");d.setAttribute("class","date-created");var u=document.createTextNode(s.date);d.appendChild(u);var p=document.createElement("p");p.setAttribute("class","note-brief");var m=document.createTextNode(s.note);p.appendChild(m);var h=document.createElement("div");h.setAttribute("class","delete-icon delete-note"),$on(h,"click",function(e){e.preventDefault();var n=this.parentNode.getAttribute("data-id");console.log("This is the note "+n),xhr.open("DELETE","https://scribblenoteapp.herokuapp.com/api/v1/notes/"+n),xhr.setRequestHeader("Authorization","Bearer "+localStorage.getItem("token")),xhr.onreadystatechange=function(){t(xhr)},xhr.send(null)}),i.appendChild(l),i.appendChild(p),i.appendChild(d),i.appendChild(h),ul.appendChild(i)}}window.$on=function(e,t,n){e.addEventListener(t,n,!1)};var o=document.getElementsByClassName("signup")[0],s=document.getElementsByClassName("login")[0],r=o.getElementsByClassName("error")[0],i=s.getElementsByClassName("error")[0],l=document.getElementById("home-views"),c=document.getElementById("main-views"),d=c.getElementsByClassName("view notes")[0];notePad=c.getElementsByClassName("view notepad")[0],mainNote=document.getElementsByClassName("main")[0],signupPointer=document.getElementsByClassName("pointer")[0],loginPointer=document.getElementsByClassName("pointer")[1],fab=document.getElementsByClassName("def-fab add-note")[0],backFab=document.getElementsByClassName("back")[0],ul=document.getElementsByClassName("note-list")[0],xhr=new XMLHttpRequest,$on(backFab,"click",function(e){e.preventDefault(),notePad.classList.toggle("module-active"),d.classList.toggle("module-active")}),$on(fab,"click",function(e){e.preventDefault(),mainNote.reset(),notePad.classList.toggle("module-active")}),$on(signupPointer,"click",function(e){e.preventDefault(),o.classList.toggle("module-active")}),$on(loginPointer,"click",function(e){e.preventDefault(),o.classList.toggle("module-active")}),$on(o,"submit",function(t){t.preventDefault();var n="",a=this.elements;Array.prototype.forEach.call(a,function(e,t,a){n+=encodeURIComponent(e.name),n+="=",n+=encodeURIComponent(e.value),n+="&"}),n=n.substring(0,n.length-1),xhr.open("POST","https://scribblenoteapp.herokuapp.com/api/v1/users"),xhr.setRequestHeader("Content-Type","Application/x-www-form-urlencoded"),xhr.onreadystatechange=function(){e(xhr)},xhr.send(n)}),$on(s,"submit",function(e){e.preventDefault();var n={},a=this.elements;Array.prototype.forEach.call(a,function(e,t,a){n[encodeURIComponent(e.name)]=encodeURIComponent(e.value)}),xhr.open("POST","https://scribblenoteapp.herokuapp.com/api/v1/auth"),xhr.setRequestHeader("Content-Type","application/json"),xhr.onreadystatechange=function(){t(xhr)},xhr.send(JSON.stringify(n))}),$on(mainNote,"submit",function(e){e.preventDefault();var t="",a=this.elements;Array.prototype.forEach.call(a,function(e,n,a){t+=encodeURIComponent(e.name),t+="=",t+=encodeURIComponent(e.value),t+="&"}),t=t.substring(0,t.length-1),xhr.open("POST","https://scribblenoteapp.herokuapp.com/api/v1/notes"),xhr.setRequestHeader("Content-Type","Application/x-www-form-urlencoded"),xhr.setRequestHeader("Authorization","Bearer "+localStorage.getItem("token")),xhr.onreadystatechange=function(){n(xhr)},xhr.send(t)}),$on(window,"load",function(e){e.preventDefault();var t=localStorage.getItem("_id");console.log("This is the users "+t),xhr.open("GET","https://scribblenoteapp.herokuapp.com/api/v1/users/"+t),xhr.setRequestHeader("Content-Type","Application/json"),xhr.setRequestHeader("Authorization","Bearer "+localStorage.getItem("token")),xhr.onreadystatechange=function(){a(xhr)},xhr.send(null)})}()}]);