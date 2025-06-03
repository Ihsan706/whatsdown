//the script to update that group msgs are here
	/*
	name = "gust";
	group = "test";
	
	
	write Replace "///////" with "" to debug
	*/
	make_an_acount = false;
	want_to_go_down = true;
	a_file_has_been_selected = false;
	olddata = "";
	textsize = "normal";
	send_mail = false;
	is_it_a_link = false;
	url = false;
	group_msgs = false

	
	function check(data){
		securte2 = data.split("__sec__");
		securte = securte2[1] ?? "no-data";
	if(securte === "pass" || data === 'true'){
	///////only remove on debuging console.log("securte chack pass");
	
	name = localStorage.getItem('whatsname') ?? 'no-name';
	password = localStorage.getItem('whatspassword') ?? 'no-pas';
	
	///////only remove on debuging console.log(name + password);
	}else{
	if(securte == 'wait'){
	location.reload();
	}
	if(securte == 'faild'){
		localStorage.clear("whatsname");
		localStorage.clear("whatspassword");
		make_an_acount = true;
		
		wait = setTimeout(() => {
		location.reload();
		},3000)
	}
	}
	}
	
	name = localStorage.getItem('whatsname') ?? 'no-name';
	password = localStorage.getItem('whatspassword') ?? 'no-pas';
	group = localStorage.getItem('whatsgroup') ?? 'everyone';
	
	if(name == "no-name" || password == "no-pas"){
	make_an_acount = true;
    fetch('http://ihsan.ddns.net/whatsdown/tests/lab2/server.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({make_an_ac: true})//here is the msg
    })
    .then(response => response.text()) // or response.json() if JSON output
    .then(data3 => {
	data2 = data3.split("__sec__");
	data = data2[0];
	
	///////only remove on debuging console.log(data)
	chose_a_group("sign-in");
	const container = document.getElementById('sign-in');
    container.innerHTML = data; // Places all <h1> elements inside the div
	
	
	check(data3);
	
	})
    .catch(error => console.error('Error:', error));
	}

setInterval(() => {
if(make_an_acount == false){
fetch('http://ihsan.ddns.net/whatsdown/tests/lab2/server.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
		update_conv : true,
        group: group,//change this later
		name: name,
		password:password
    })
})
.then(response => response.text()) // or response.json() if JSON output
.then(data3 => {
	///////only remove on debuging console.log(data3)
	data2 = data3.split("__sec__");
	data = data2[0];
	data4 = data.replace(olddata, "");
	console.log(data4);
	if(data4 !== ""){
	const container = document.getElementById('chat-messages');
	if (data.length > olddata.length && group == group_msgs && data != data4) {
    container.innerHTML += data4; // Places all <h1> elements inside the div
	}else{
		container.innerHTML = data;
	}
    console.log("new data are" + data4);
	}else{
		console.log("there is no data to add");
	}
	check(data3);
	//window.scrollTo(0, document.body.scrollHeight);
	
	Scroll = document.getElementById("chat-messages2");
    if (Scroll && want_to_go_down === true) {
    Scroll.scrollTo({
	top: Scroll.scrollHeight,
	behavior: 'smooth'
    });
    }
	group_msgs = group;
	olddata = data;
})
.catch(error => console.error('Error:', error));
}
}, 1000);



setInterval(() => {
if(make_an_acount == false){
sendmsg = document.getElementById("send-msg").value;
//if(sendmsg != ''){
fetch('http://ihsan.ddns.net/whatsdown/tests/lab2/server.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
		writing: true,
        group: group, // Replace with dynamic value
		send: sendmsg,
		name: name,
		password:password
    })
})
.then(response => response.text()) // or response.json() if JSON output
.then(data3 => {
    data2 = data3.split("__sec__");
	data = data2[0];

	///////only remove on debuging console.log(data)
	
	check(data3);
})
.catch(error => console.error('Error:', error));
///////only remove on debuging console.log(sendmsg);
}
}, 5001);



function send_msg(){
	sendmsg = document.getElementById("send-msg").value;
	if(is_it_a_link === true){
	url = document.getElementById("link_url").value;
	}
//if(sendmsg != ''){
fetch('http://ihsan.ddns.net/whatsdown/tests/lab2/server.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
		send_msg: true,
        group: group, // Replace with dynamic value
		message: sendmsg,
		name: name,
		password:password,
		writing: true,
		size: textsize,
		links :is_it_a_link,
		link_url :url,
		send: ''
    })
})
.then(response => response.text()) // or response.json() if JSON output
.then(data3 => {
    data2 = data3.split("__sec__");
	data = data2[0];

	///////only remove on debuging console.log(data)
	document.getElementById("send-msg").value = '';
	
	if(is_it_a_link === true){
	document.getElementById("link_url").value = '';
	}
	
	check(data3);
	
})
 .catch(error => console.error('Error:', error));
 ///////only remove on debuging console.log(sendmsg);
}

//setname = document.getElementById("name").innerHTML
function set_everything(){
wait = setTimeout(() => {
		name = localStorage.getItem('whatsname') ?? 'no-name';
	password = localStorage.getItem('whatspassword') ?? 'no-pas';
	//group = localStorage.getItem('whatsgroup') ?? 'everyone';
	
setname =  "name: " + name;
document.getElementById("name").innerHTML = setname;
setname =  "your name is " + name;
document.getElementById("name2").innerHTML = setname;

document.getElementById("chat_name").innerHTML = group;
setgroup_name =  "you are at " + group + " group right now";
document.getElementById("chat_name2").innerHTML = setgroup_name;
},3000);
}





//sendmsg = document.getElementById("test").value;
//if(sendmsg != ''){
fetch('http://ihsan.ddns.net/whatsdown/tests/lab2/server.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
		see_all_groups: true, // done
		name: name,
		password:password
    })
})
.then(response => response.text()) // or response.json() if JSON output
.then(data3 => {

    data2 = data3.split("__sec__");
	data = data2[0];
	
	///////only remove on debuging console.log(data)
	data += '<form method="POST" action="make_a_chat.php"> <button type="submit" name="new_group" class="make-group"> make a group </button> </form>';
		const container = document.getElementById('talk_to');
    container.innerHTML = data; // Places all <h1> elements inside the div
	
	check(data3);
	
})
.catch(error => console.error('Error:', error));
/////////only remove on debuging console.log(sendmsg);
//}




function chose_chat(chose_group){
group = chose_group;
chose_a_group();
set_everything();
}
set_everything();




function make_an_ac(){
	namee = document.getElementById("sign-in-name").value;
	passwordd = document.getElementById("password").value;
	///////only remove on debuging console.log(namee);
	///////only remove on debuging console.log(passwordd);
	fetch('http://ihsan.ddns.net/whatsdown/tests/lab2/server.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
		sub: true, // done
		make_an_ac: true,
		name: namee,
		password:passwordd
    })
    })
    .then(response => response.text()) // or response.json() if JSON output
    .then(data3 => {
		
    data2 = data3.split("__sec__");
	data = data2[0];
		
	///////only remove on debuging console.log(data);
	const container = document.getElementById('sign-in');
    container.innerHTML = data; // Places all <h1> elements inside the div
	if(data == "true"){
	localStorage.setItem("whatsname" , namee);
    localStorage.setItem("whatspassword" , passwordd);
	chose_a_group();
	set_everything();
	wait = setTimeout(() => {
	location.reload();
	},8000);
	}else{
		container.innerHTML += '<h1 class="wrong_pas">wrong password</h1>';
		localStorage.clear("whatsname");
		localStorage.clear("whatspassword");
	}
	
    })
    .catch(error => console.error('Error:', error));
}

function otbuttonfun(){
	otbutton = document.getElementById('otbutton');
	want_to_go_down = !want_to_go_down;
	if(want_to_go_down === true){
    otbutton.className = "otbutton-active";
	}else{
	otbutton.className = "otbutton";
	}
}
/*
setInterval(() => {
	sendmsg = document.getElementById("send-msg").value;
	if(sendmsg !== ''){
		remove_add_img();
	}
},500);
*/
function more_less(){
	msgdiv = document.getElementById("input-div");
	otbutton = document.getElementById("otbutton");
	more = document.getElementById("more");
	imgs = document.getElementById("add_img");
	morechose = document.getElementsByClassName("morechose");
	file = document.getElementById("select-file");
	
	if(more.innerHTML == "More"){
	msgdiv.style.height = "65vh";
	more.innerHTML = "Less";
	otbutton.style.display = "none";
	imgs.style.display = "unset";
	file.style.display = "block";
	for (let i = 0; i < morechose.length; i++) {
    morechose[i].style.display = "unset";
	}
	}else{
	msgdiv.style.height = "unset";
	more.innerHTML = "More";
	otbutton.style.display = "unset";
	imgs.style.display = "none";
	file.style.display = "none";
	for (let i = 0; i < morechose.length; i++) {
    morechose[i].style.display = "none";
	}
	}
}

wait = setTimeout(() => {
more_less();
wait = setTimeout(() => {
more_less();
},100);
},1000);


setInterval(() => {
	files = document.getElementById("selected-files");
	select_file_h1 = document.getElementById("select-file_text");
	add_img = document.getElementById("add_img");
	if(files.files[0]){
	select_file_h1.innerHTML = "file selected "+files.files[0].name;
	add_img.innerHTML = "send the file";
	a_file_has_been_selected = true;
	}
},1000);


/*
function send_an_img(){
if (a_file_has_been_selected === true){
	files = document.getElementById("selected-files");
	
	const formData = new FormData();
	
	formData.append("upload", "true"); // sending as string "true"
    formData.append("file", fileInput.files[0]);
    formData.append("name", name);// Ensure 'name' is defined elsewhere
    formData.append("password", password); // Ensure 'password' is defined elsewhere
    // If you want to send additional message data, simply append it
    formData.append("message", message);
	
	
    // Append extra fields as needed
    formData.append("upload", "true"); // sending as string "true"
	
	fetch('http://ihsan.ddns.net/whatsdown/tests/lab2/server.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
		file:Data
    })
    })
    .then(response => response.text()) // or response.json() if JSON output
    .then(data3 => {///////only remove on debuging console.log(data3)})
    .catch(error => console.error('Error:', error));
}
}
*/




function send_an_img() {
  if (a_file_has_been_selected === true) {
    const fileInput = document.getElementById("selected-files");
    const file = fileInput.files[0];
    
    const formData = new FormData();
    formData.append('upload', 'true');
    formData.append('file', file);
    formData.append('name', name);
    formData.append('password', password);

    // DEBUG: Log FormData contents
    for (const pair of formData.entries()) {
      ///////only remove on debuging console.log(pair[0], pair[1]);
    }

    fetch('http://ihsan.ddns.net/whatsdown/tests/lab2/server.php', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      ///////only remove on debuging console.log("Status:", response.status);
      return response.text();
    })
    .then(data3 => {
		///////only remove on debuging console.log(data3);
		sendmsg = document.getElementById("send-msg");
		data2 = data3.split("__sec__");
	    hash = data2[0];
		sendmsg.value = hash;
		send_msg();
	})
    .catch(error => console.error('Error:', error));
  }
}


function bigtext(){
	big = document.getElementById("h1");
	smail = document.getElementById("smailtext");
	if(textsize != "big"){
	textsize = "big";
	big.innerHTML = "make text normal";
	smail.innerHTML = "make text small";
	}else{
	textsize = "normal"
	big.innerHTML = "make text big";
	smail.innerHTML = "make text small";
	}
}
function smailtext(){
	big = document.getElementById("h1");
	smail = document.getElementById("smailtext");
	if(textsize != "smail"){
	textsize = "smail";
	big.innerHTML = "make text big";
	smail.innerHTML = "make text normal";
	}else{
	textsize = "normal"
	big.innerHTML = "make text big";
	smail.innerHTML = "make text small";
	}
}

function send_mail_fun(){
	mail = document.getElementById("mail");
	if(send_mail === true){
		mail.innerHTML = "send an E-mail";
		send_mail = false;
	}else{
		mail.innerHTML = "don't send an E-mail";
		send_mail = true;
	}
}

function links_func(){
	link_bt = document.getElementById("addlink");
	input_div = document.getElementById("send-msg_div");
	send_msg_input = document.getElementById("send-msg");//this is the text space
	if(is_it_a_link === true){
		link_bt.innerHTML = "share a link";
		is_it_a_link = false;
		send_msg_input.classList.replace('link1', 'input');
		send_msg.placeholder = "Type a message";
		
		link_url = document.getElementById("link_url");
		link_url.remove();
		
		//send_msg.style.width = "20%";
		//send_msg.style.position = "relative";
	}else{
		link_bt.innerHTML = "don't share a link";
		is_it_a_link = true;
		send_msg_input.classList.replace('input', 'link1');
		send_msg_input.placeholder = "link name";
		const link_url = document.createElement('input');
		link_url.type = 'text';
		link_url.className = 'link1';
        link_url.id = 'link_url';
		link_url.placeholder = "the link";
// 3. Append it to the DOM
        input_div.appendChild(link_url);
        //document.body.appendChild(newElement);
	}
}
