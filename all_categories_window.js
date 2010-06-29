Ti.include('db.js');

var category_table = Ti.UI.createTableView({data:categories_table_array()});



var first_row = Ti.UI.createTableViewRow({
	title:'Add a Category',
	color:'#FF0000'
});

/*first_row.addEventListener('click', function() {
	add_category_window.open();
}); */

category_table.insertRowBefore(0, first_row);

category_table.addEventListener('click', function(e) {
	Ti.API.info(e.row.title);
	if (e.row.title == 'Add a Category') {
		Ti.UI.createWindow({
			title:'New Category',
			backgroundColor:'#000',
			modal:true,
			url: 'add_category_window.js'
		}).open();
	} else {
		var category_name = e.row.title;
		Ti.UI.createWindow({
			title:'Add expense',
			url:'add_expense_window.js',
			modal:true,
			categoryName:category_name
		}).open();
	}
});

Ti.App.addEventListener('category_added', function(e) {
	var new_row = Ti.UI.createTableViewRow({title:e.category});
	category_table.appendRow(new_row);
});

Ti.UI.currentWindow.add(category_table);
