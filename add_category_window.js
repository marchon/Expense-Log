
Ti.include('db.js');

var label = Ti.UI.createLabel({
	text:'Category name: ',
	top:10,
	font:{fontSize:20}
});

var input = Ti.UI.createTextField({
	width:300,
	top:100
});

var add_button = Ti.UI.createButton({
	title:'Add',
	width:120,
	bottom:20,
	left:50
});

var cancel_button = Ti.UI.createButton({
	title:'Cancel',
	width:120,
	bottom:20,
	right:50
});

var success_alert = Ti.UI.createAlertDialog({
	message:'Category saved',
	buttonNames:['OK']
});

success_alert.addEventListener('click', function(){
	Ti.UI.currentWindow.close();
});

add_button.addEventListener('click', function(){
	add_category(input.value);
	Ti.App.fireEvent('category_added', {category:input.value}); //I think this works better putting it before the alert
	success_alert.show();
});

cancel_button.addEventListener('click', function(){
	Ti.UI.currentWindow.close();
});

Ti.UI.currentWindow.add(label);
Ti.UI.currentWindow.add(input);
Ti.UI.currentWindow.add(add_button);
Ti.UI.currentWindow.add(cancel_button);
