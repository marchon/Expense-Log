Ti.include('db.js');

var category_table = Ti.UI.createTableView({data:categories_table_array()});


var first_row = Ti.UI.createTableViewRow();
var first_row_view = Ti.UI.createView({width:'auto', left:2});
var first_row_label = Ti.UI.createLabel({text:'Add a Category', color:'#00CC00', left:1});
first_row_view.add(first_row_label);
first_row.add(first_row_view);


category_table.insertRowBefore(0, first_row);

popup = Ti.UI.createAlertDialog({
	title: 'Choose an Action',
	buttonNames:['Add Expense', 'Stats', 'Cancel'],
	cancel:2
});

popup.addEventListener('click', function(e){
	if (e.index == 0) {
		Ti.UI.createWindow({
			title:'Add expense',
			url:'add_expense_window.js',
			modal:true,
			categoryName: popup.category_name
		}).open();
	}
	if (e.index == 1) {
		Ti.API.info('Stats clicked');
		Ti.UI.createWindow({
			title: popup.category_name,
			url:'single_category_window.js',
			modal:true,
			categoryName: popup.category_name
		}).open();
	}
});

category_table.addEventListener('click', function(e) {
	if (e.index == 0) {
		Ti.UI.createWindow({
			title:'New Category',
			backgroundColor:'#000',
			modal:true,
			url: 'add_category_window.js'
		}).open();
	} else {
		var category_name = e.row.title;
		popup.category_name = category_name
		popup.show();
	}
});

Ti.App.addEventListener('category_added', function(e) {
	var new_row = Ti.UI.createTableViewRow({title:e.category});
	category_table.appendRow(new_row);
});

Ti.UI.currentWindow.add(category_table);
