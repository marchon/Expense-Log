Ti.include('db.js');
win = Ti.UI.currentWindow


var expenses_today_table = Ti.UI.createTableView({data:expenses_table_array_by_time('this week')});

Ti.App.addEventListener('expense_added', function(e){
	new_row = Ti.UI.createTableViewRow({title:e.expense});
	expenses_today_table.insertRowBefore(0, new_row);
});

win.add(expenses_today_table);
