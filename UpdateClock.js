var Bar_Bottom = "Bar_Bottom";
var Bar_Top_Right = "Bar_Top_Right";
var Bar_Top = "Bar_Top";
var Bar_Middle = "Bar_Middle";
var Bar_Bottom_Left = "Bar_Bottom_Left";
var Bar_Top_Left = "Bar_Top_Left";
var Bar_Bottom_Right = "Bar_Bottom_Right";

function getActiveBars(digit) {
	switch(digit) {
		case 0:
			return [Bar_Top, Bar_Top_Right, Bar_Bottom_Right, Bar_Bottom, Bar_Bottom_Left, Bar_Top_Left];
		case 1:
			return [Bar_Top_Right, Bar_Bottom_Right];
		case 2:
			return [Bar_Top, Bar_Top_Right, Bar_Middle, Bar_Bottom_Left, Bar_Bottom];
		case 3:
			return [Bar_Top, Bar_Top_Right, Bar_Middle, Bar_Bottom_Right, Bar_Bottom];
		case 4:
			return [Bar_Top_Left, Bar_Middle, Bar_Top_Right, Bar_Bottom_Right];
		case 5:
			return [Bar_Top, Bar_Top_Left, Bar_Middle, Bar_Bottom_Right, Bar_Bottom];
		case 6:
			return [Bar_Top, Bar_Top_Left, Bar_Bottom_Left, Bar_Bottom, Bar_Bottom_Right, Bar_Middle];
		case 7:
			return [Bar_Top, Bar_Top_Right, Bar_Bottom_Right];
		case 8:
			return [Bar_Bottom, Bar_Top, Bar_Top_Right, Bar_Top_Left, Bar_Bottom_Right, Bar_Bottom_Left, Bar_Middle];
		case 9:
			return [Bar_Middle, Bar_Top_Left, Bar_Top, Bar_Top_Right, Bar_Bottom_Right, Bar_Bottom];
	}
}

function getBar(element, barName) {
	element.children.forEach(function(bar) {
		if(bar.name === barName) return bar;
	});
};

function setBars(element, digit) {
	var activeBars = getActiveBars(digit);
	element.children.forEach(function(bar) {
		bar.visible = activeBars.indexOf(bar.name) >= 0;
	});
}

var digitHoursTens;
var digitHoursOnes;

var digitMinutesTens;
var digitMinutesOnes;

var digitSecondsTens;
var digitSecondsOnes;

this.children.forEach(function(element) {
	if(element.name === "Digit_Hours_Tens") digitHoursTens = element;
	else if(element.name === "Digit_Hours_Ones") digitHoursOnes = element;
	else if(element.name === "Digit_Minutes_Tens") digitMinutesTens = element;
	else if(element.name === "Digit_Minutes_Ones") digitMinutesOnes = element;
	else if(element.name === "Digit_Seconds_Tens") digitSecondsTens = element;
	else if(element.name === "Digit_Seconds_Ones") digitSecondsOnes = element;
});

var rot = 0;

function update(event) {
	var date = new Date();
	date.setTime(date.getTime());
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var seconds = date.getSeconds();
	
	if(hours > 12) hours -= 12;
	
	setBars(digitHoursTens, Math.floor(hours/10));
	setBars(digitHoursOnes, hours % 10);
	setBars(digitMinutesTens, Math.floor(minutes/10));
	setBars(digitMinutesOnes, minutes % 10);
	setBars(digitSecondsTens, Math.floor(seconds/10));
	setBars(digitSecondsOnes, seconds % 10);
	
	rot += 0.01;
	rot %= 360;
	
	var quaternion = new THREE.Quaternion();
	var vector = new THREE.Vector3( 0, rot, 0 );
	var euler = new THREE.Euler(0, 0, 0, "XYZ");
	euler.setFromVector3(vector);
	quaternion.setFromEuler(euler);
	this.quaternion.copy(quaternion);
}

