!function(e){function t(a){if(n[a])return n[a].exports;var o=n[a]={i:a,l:!1,exports:{}};return e[a].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,a){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:a})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t){!function(){function e(e){function t(e,t){if(4===e.readyState&&200==e.status){var n=JSON.parse(e.responseText),o=n._id;console.log("this is the response id "+o),console.log(t),t==o&&ul.removeChild(a)}}if(4==e.readyState&&(200==e.status||304==e.status)){var n=JSON.parse(e.responseText);if(n.hasOwnProperty("users")){var a=document.createElement("li");a.setAttribute("id","listNote"),a.setAttribute("class","note card"),a.setAttribute("data-id",n._id);var o=document.createElement("h4");o.setAttribute("class","note-title");var r=document.createTextNode(n.title);o.appendChild(r);var s=document.createElement("h5");s.setAttribute("class","date-created");var i=document.createTextNode(n.momentDate);s.appendChild(i);var c=document.createElement("p");c.setAttribute("class","note-brief");var d=document.createTextNode(n.note);c.appendChild(d);var u=document.createElement("div");u.setAttribute("class","delete-icon delete-note"),a.appendChild(o),a.appendChild(c),a.appendChild(s),a.appendChild(u),ul.appendChild(a),$on(u,"click",function(e){e.preventDefault();var n=this.parentNode.getAttribute("data-id");xhr.open("DELETE","https://scribblenoteapp.herokuapp.com/api/v1/notes/"+n),xhr.setRequestHeader("Authorization","Bearer "+localStorage.getItem("token")),xhr.onreadystatechange=function(){t(xhr,n)},xhr.send(null)}),notePad.classList.remove("module-active"),l.classList.add("module-active")}}}function t(e){if(4==e.readyState&&(200==e.status||304==e.status))for(var t=JSON.parse(e.responseText),n=0,a=t.length;n<a;n++){var o=t[n],r=o._id,s=document.createElement("li");s.setAttribute("class","note card"),s.setAttribute("id","listNote"),s.setAttribute("data-id",r);var i=document.createElement("h4");i.setAttribute("class","note-title");var l=document.createTextNode(o.title);i.appendChild(l);var c=document.createElement("h5");c.setAttribute("class","date-created");var d=document.createTextNode(o.date);c.appendChild(d);var u=document.createElement("p");u.setAttribute("class","note-brief");var p=document.createTextNode(o.note);u.appendChild(p);var m=document.createElement("div");m.setAttribute("class","delete-icon delete-note"),s.appendChild(i),s.appendChild(u),s.appendChild(c),s.appendChild(m),ul.appendChild(s),$on(m,"click",function(e){e.preventDefault();var t=this.parentNode.getAttribute("data-id");xhr.open("DELETE","https://scribblenoteapp.herokuapp.com/api/v1/notes/"+t),xhr.setRequestHeader("Authorization","Bearer "+localStorage.getItem("token")),xhr.onreadystatechange=function(){deleteNote(xhr,t)},xhr.send(null)})}}var n=document.getElementsByClassName("signup")[0],a=document.getElementsByClassName("login")[0],o=n.getElementsByClassName("error")[0],r=a.getElementsByClassName("error")[0],s=document.getElementById("home-views"),i=document.getElementById("main-views"),l=i.getElementsByClassName("view notes")[0];notePad=i.getElementsByClassName("view notepad")[0],mainNote=document.getElementsByClassName("main")[0],signupPointer=document.getElementsByClassName("pointer")[0],loginPointer=document.getElementsByClassName("pointer")[1],fab=document.getElementsByClassName("def-fab add-note")[0],backFab=document.getElementsByClassName("back")[0],ul=document.getElementsByClassName("note-list")[0],xhr=new XMLHttpRequest,$on(backFab,"click",function(e){e.preventDefault(),notePad.classList.toggle("module-active"),l.classList.toggle("module-active")}),$on(fab,"click",function(e){e.preventDefault(),mainNote.reset(),notePad.classList.toggle("module-active")}),$on(signupPointer,"click",function(e){e.preventDefault(),n.classList.toggle("module-active")}),$on(loginPointer,"click",function(e){e.preventDefault(),n.classList.toggle("module-active")}),$on(n,"submit",function(e){e.preventDefault();var t="",r=this.elements;Array.prototype.forEach.call(r,function(e,n,a){t+=encodeURIComponent(e.name),t+="=",t+=encodeURIComponent(e.value),t+="&"}),t=t.substring(0,t.length-1),xhr.open("POST","https://scribblenoteapp.herokuapp.com/api/v1/users"),xhr.setRequestHeader("Content-Type","Application/x-www-form-urlencoded"),xhr.onreadystatechange=function(){signUpResponse(xhr,n,a,o)},xhr.send(t)}),$on(a,"submit",function(e){e.preventDefault();var t={},n=this.elements;Array.prototype.forEach.call(n,function(e,n,a){t[encodeURIComponent(e.name)]=encodeURIComponent(e.value)}),xhr.open("POST","https://scribblenoteapp.herokuapp.com/api/v1/auth"),xhr.setRequestHeader("Content-Type","application/json"),xhr.onreadystatechange=function(){manageLoginResponse(xhr,s,i,notePad,r)},xhr.send(JSON.stringify(t))}),$on(mainNote,"submit",function(t){t.preventDefault();var n="",a=this.elements;Array.prototype.forEach.call(a,function(e,t,a){n+=encodeURIComponent(e.name),n+="=",n+=encodeURIComponent(e.value),n+="&"}),n=n.substring(0,n.length-1),xhr.open("POST","https://scribblenoteapp.herokuapp.com/api/v1/notes"),xhr.setRequestHeader("Content-Type","Application/x-www-form-urlencoded"),xhr.setRequestHeader("Authorization","Bearer "+localStorage.getItem("token")),xhr.onreadystatechange=function(){e(xhr)},xhr.send(n)}),$on(window,"load",function(e){e.preventDefault();var n=localStorage.getItem("_id"),a=localStorage.getItem("token");if(!a)return console.log("No token found");xhr.open("GET","https://scribblenoteapp.herokuapp.com/api/v1/users/"+n),xhr.setRequestHeader("Content-Type","Application/json"),xhr.setRequestHeader("Authorization","Bearer "+a),xhr.onreadystatechange=function(){t(xhr)},xhr.send(null)})}()}]);