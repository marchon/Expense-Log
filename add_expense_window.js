Ti.include('db.js');

win = Ti.UI.currentWindow

var label2 = Ti.UI.createLabel({text:'Amount: ', top:50});

var amount_input = Ti.UI.createTextField({top:100, width:200});

var submit_button = Ti.UI.createButton({title:'Submit', width:100, left:10});
var cancel_button = Ti.UI.createButton({title:'Cancel', width:100, right:10});

var success_alert = Ti.UI.createAlertDialog({
	message:'Saved Successfully',
	buttonNames:['OK']
});

success_alert.addEventListener('click', function(){
	win.close();
});

submit_button.addEventListener('click', function() {
	category = win.categoryName;
	add_expense(category, (Number(amount_input.value).toFixed(2)));
	success_alert.show();
});

cancel_button.addEventListener('click', function() {
	win.close();
});

win.add(label2);
win.add(amount_input);
win.add(submit_button);
win.add(cancel_button);

