// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();

Ti.include('db.js');



//
// create base UI tab and root window
//
var all_categories_window = Ti.UI.createWindow({
	title:'Categories',
	font:{fontSize:18},
	top:40,
	backgroundColor:'#000',
	url: 'all_categories_window.js'
});



var tab1 = Titanium.UI.createTab({
    icon:'KS_nav_views.png',
    title:'Tab 1',
    window:all_categories_window
});






var win2 = Titanium.UI.createWindow({
    title:'Tab 2',
    backgroundColor:'#000'
});
var tab2 = Titanium.UI.createTab({
    icon:'KS_nav_ui.png',
    title:'Tab 2',
    window:win2
});

var label2 = Titanium.UI.createLabel({
	color:'#999',
	text:'I am Window 2',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

win2.add(label2);




//
//  add tabs
//
tabGroup.addTab(tab1);
tabGroup.addTab(tab2);


// open tab group
tabGroup.open();
