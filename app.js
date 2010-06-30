// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();

Ti.include('db.js');



//
// create base UI tab and root window
//
var all_categories_window = Ti.UI.createWindow({
	font:{fontSize:18},
	top:40,
	backgroundColor:'#000',
	url: 'all_categories_window.js'
});

var expenses_window = Ti.UI.createWindow({
	url: 'expenses_window.js'
});


var expenses_window_week = Ti.UI.createWindow({
	url: 'expenses_window_week.js'
});


var expenses_window_month = Ti.UI.createWindow({
	url: 'expenses_window_month.js'
});





//Tabs
var tab1 = Titanium.UI.createTab({
    title:'Main',
    window:all_categories_window
});

var tab2 = Titanium.UI.createTab({
    title:'Today',
    window:expenses_window
});

var tab3 = Titanium.UI.createTab({
    title:'Week',
    window:expenses_window_week
});


var tab4 = Titanium.UI.createTab({
    title:'Month',
    window:expenses_window_month
});



//
//  add tabs
//
tabGroup.addTab(tab1);
tabGroup.addTab(tab2);
tabGroup.addTab(tab3);
tabGroup.addTab(tab4);

// open tab group
tabGroup.open();
