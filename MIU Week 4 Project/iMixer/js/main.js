/* Michael Frohberg id 0003262761
 MDVBS VFW 1212 
Project 4 - Forms
iPlayDate - main.js
*/
window.addEventListener("DOMContentLoaded", function() {
	function $(x) {
		var theValue = document.getElementById(x);
		return theValue;
	}
//		Build select element with options
	function makeCats () {
		var formTag = document.getElementsByTagName("form"),
			 selectDiv = $("select"),
			 makeSelect = document.createElement("select");
			 makeSelect.setAttribute("id", "groups");
		for(var i=0, j=samples.length; i<j; i++) {
			 var createOption = document.createElement("option");		
			 var optText = samples[i];	
			 createOption.setAttribute("value", optText);
			 createOption.innerHTML = optText;
			 makeSelect.appendChild(createOption);		
		}
		selectDiv.appendChild(makeSelect);
	}
	function getRadioValue (){
		var radios = document.forms[0].frame;
		for(var i=0; i<radios.length; i++) {
			if(radios[i].checked){
				frameRate = radios[i].value;
			}
		}
	}
	function getCheckbox() {
		if($("reftone").checked) {
			refTone = $("reftone").value;														
		} else {
			refTone = "None";
		}
	}
	function toggleControls(n) {
		switch(n) {
			case "on":
				$("soundReport").style.display = "none";
				$("clear").style.display = "inline";
				$("display").style.display = "none";
				$("addnew").style.display = "inline";
				break;
			case "off":
				$("soundReport").style.display = "block";
				$("clear").style.display = "inline";
				$("display").style.display = "none";
				$("addnew").style.display = "inline";
				$("items").style.display = "none";
				break;
			default:
				return false;
		}
	}
	function saveData(key) {
		if(!key) {
			var id = Math.floor(Math.random()*1000001);
		} else {
			id = key;
		}
		getRadioValue ();
		getCheckbox();
		var item						= {};
			 item.groups			= ["Project Type:", $("groups").value];
			 item.project			= ["Project Name:", $("project").value];
			 item.production		= ["Production Company:", $("production").value];
			 item.contact			= ["Production Contact:", $("contact").value];
			 item.cphone			= ["Contact Phone #:", $("cPhone").value];
			 item.mixer				= ["Sound Mixer:", $("mixer").value];
			 item.mphone			= ["Mixer Phone #:", $("mPhone").value];
			 item.email				= ["Mixer Email:", $("email").value];
			 item.date				= ["Shoot Date:", $("date").value];
			 item.media				= ["Project Media:",$("media").value];
			 item.select			= ["Sample Rate:", $("sampleRates").value];
			 item.radios			= ["Frame Rate:", frameRate];
			 item.box				= ["1khz Reference Tone:", refTone];
			 item.track1			= ["Track 1:", $("track1").value];
			 item.track2			= ["Track 2:", $("track2").value];
			 item.track3			= ["Track 3:", $("track3").value];
			 item.track4			= ["Track 4:", $("track4").value];
			 item.track5			= ["Track 5:", $("track5").value];
			 item.track6			= ["Track 6:", $("track6").value];
			 item.track7			= ["Track 7:", $("track7").value];
			 item.track8			= ["Track 8:", $("track8").value];
			 item.scene				= ["Scene Number/Name:", $("scene").value];
			 item.take				= ["Take Number/Name:", $("take").value];
			 item.notes				= ["Scene/Take Notes:", $("notes").value];
			 item.fader				= ["Fader Level:", $("fader").value];
		localStorage.setItem(id, JSON.stringify(item));
		alert("Report Saved!");
	}
	function autoFillData(){
		for(var n in json){
			var id = Math.floor(Math.random()*1000001);		
			localStorage.setItem(id, JSON.stringify(json[n]));
		}
	} 	
	function getData() {
		toggleControls("on");
		if(localStorage.length === 0) {
			alert("No data in local storage. Default form values were added.");
			autoFillData();		
		}
		var makeDiv = document.createElement("div");
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement("ul");
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$("items").style.display = "block";
		for(var i=0, len=localStorage.length; i<len; i++) {
			var makeLi = document.createElement("li");
			makeLi.setAttribute("class", "list");
			var linksLi = document.createElement("li");
			makeList.appendChild(makeLi);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
//	  Converting local storage string into an object
			var object = JSON.parse(value);
			var makeSubList = document.createElement("ul");
			makeLi.appendChild(makeSubList);
			getImage(object.groups[1], makeSubList);
			for(var n in object){
				var makeSubLi = document.createElement("li");
				makeSubList.setAttribute("class", "things")
				makeSubList.appendChild(makeSubLi);
				var optSubText = object[n][0]+" "+object[n][1];
				makeSubLi.innerHTML = optSubText;
				makeSubList.appendChild(linksLi);
			}
	//	create edit and delete links for local storage			
			makeItemLinks(localStorage.key(i), linksLi); 
		}
	}
	function getImage(catName, makeSubList) {
		var imageLi = document.createElement("li");
		makeSubList.appendChild(imageLi);
		var newImg = document.createElement("img");
		var setSrc = newImg.setAttribute("src", "images/"+ catName + ".png");
		imageLi.appendChild(newImg);
	} 
	function editItem(){
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		toggleControls("off");
		$("groups").value = item.groups[1];
		$("project").value = item.project[1];
		$("production").value = item.production[1];
		$("contact").value = item.contact[1];
		$("cPhone").value = item.cphone[1];
		$("mixer").value = item.mixer[1];
		$("mPhone").value = item.mphone[1];
		$("email").value = item.email[1];
		$("date").value = item.date[1];
		$("media").value = item.media[1];
		$("sampleRates").value = item.select[1];
		$("track1").value = item.track1[1];
		$("track2").value = item.track2[1];
		$("track3").value = item.track3[1];
		$("track4").value = item.track4[1];
		$("track5").value = item.track5[1];
		$("track6").value = item.track6[1];
		$("track7").value = item.track7[1];
		$("track8").value = item.track8[1];		
		$("scene").value = item.scene[1];		
		$("take").value = item.take[1];		
		$("notes").value = item.notes[1];
		$("fader").value = item.fader[1];
		var radios = document.forms[0].frame;		
		for(var i=0; i<radios.length; i++) {
			if(radios[i].value == "23.97 FPS" && item.radios[1] == "23.97 FPS"){
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value == "24 FPS" && item.radios[1] == "24 FPS"){
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value == "25 FPS" && item.radios[1] == "25 FPS"){
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value == "29.97 FPS" && item.radios[1] == "29.97 FPS"){
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value == "30 FPS" && item.radios[1] == "30 FPS"){
				radios[i].setAttribute("checked", "checked");
			}
		}	
		var box = document.forms[0].reftone
		if(item.box[1] == "Yes") {
			$("reftone").setAttribute("checked", "checked");
		}
//		remove save input initial event listener
		save.removeEventListener("click", saveData);
//		change submit button value to edit  to edit
		$("submit").value = "Edit Report";
		var editSubmit = $("submit");
// 	key value established as property of editSubmit
// 	so it can be used when data is saveData		
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;
	}
	function deleteItem (){
		var ask = confirm("Are you positive you want to delete this entry?");
		if(ask){
			localStorage.removeItem(this.key);
			alert("Entry deleted.")
			window.location.reload();		
		}else{
			alert("Entry was not deleted.");
		}
	}
// calling the json object, using it to populate empty forms	
	
	function makeItemLinks(key, linksLi) {
		var editLink = document.createElement("a");
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Report";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
		var breakTag = document.createElement("br");
		linksLi.appendChild(breakTag);
		var deleteLink = document.createElement("a");
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Report";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);	
	}	
// creates edit and delete links
	function clearLocal() {
		if(localStorage.length === 0) {
			alert("Nothing to Clear!");
		} else {
			localStorage.clear();
			alert("Everything is Deleted!");
			window.location.reload();
			return false;
		}
	}
	function validate(e){
		var getGroup = $("groups");
		var getProject = $("project");
		var getProduction = $("production");
		var getContact = $("contact");
		var getCPhone = $("cPhone");
		var getMixer = $("mixer");
		var getEmail = $("email");
		var getMPhone = $("mPhone");
		var getDate = $("date");		
//		error reset
		errMsg.innerHTML = "";
		getGroup.style.border = "1px solid black";
		getProject.style.border = "1px solid black";
		getProduction.style.border = "1px solid black";
		getContact.style.border = "1px solid black";
		getCPhone.style.border = "1px solid black";
		getMixer.style.border = "1px solid black";
		getMPhone.style.border = "1px solid black";		
		getEmail.style.border = "1px solid black";
		getDate.style.border = "1px solid black";
// 	get error messages
		var messageAry = [];
		if(getGroup.value === "") {
			var groupError = "Please enter a project name.";
			getGroup.style.border = "1px solid red";
			messageAry.push(groupError);
		}
		if(getProject.value === "") {
			var projectError = "Please enter a project name.";
			getProject.style.border = "1px solid red";
			messageAry.push(projectError);
		}
// 	parent name
		if(getProduction.value === "") {
			var productionError = "Please enter a production company.";
			getProduction.style.border = "1px solid red";
			messageAry.push(productionError);
		}
		if(getContact.value === "") {
			var contactError = "Please enter a production contact.";
			getContact.style.border = "1px solid red";
			messageAry.push(contactError);
		}	
		if(getCPhone.value === "") {
			var cPhoneError = "Please enter a production phone number.";
			getCPhone.style.border = "1px solid red";
			messageAry.push(cPhoneError);
		}	
		if(getMixer.value === "") {
			var mixerError = "Please enter a mixer name.";
			getMixer.style.border = "1px solid red";
			messageAry.push(mixerError);
		}		
		if(getMPhone.value === "") {
			var mPhoneError = "Please enter a production phone number.";
			getMPhone.style.border = "1px solid red";
			messageAry.push(mPhoneError);
		}		
// 	email
		var re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if(!(re.exec(getEmail.value))){
			var emailError = "Please enter a valid email address.";
			getEmail.style.border = "1px solid red";
			messageAry.push(emailError);
		}	
		if(getDate.value === "") {
			var getDateError = "Please enter a date.";
			getDate.style.border = "1px solid red";
			messageAry.push(getDateError);
		}	
		
//		display any errors on screen
		if (messageAry.length >= 1) {
			for(var i=0, j=messageAry.length; i<j; i++) {
				var txt = document.createElement("li");
				txt.innerHTML = messageAry[i];
				errMsg.appendChild(txt);
			}
			e.preventDefault();
			return false;
		} else {
			saveData(this.key);
		}
		
	}
// 	variables
	var samples = ["Choose...", 
					"Film", 
					"TV",
					"Live Event",
					"News"],
		frameRate,
		refTone = "No",
		errMsg = $("errors");
	makeCats(); 
//		Links and Submit Button
	var displayData = $("display");
	displayData.addEventListener("click", getData);
	var clearData = $("clear");
	clearData.addEventListener("click", clearLocal);
	var save = $("submit");
	save.addEventListener("click", validate);
});

