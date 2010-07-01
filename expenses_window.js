Ti.include('db.js');
win = Ti.UI.currentWindow


var expenses_today_table = Ti.UI.createTableView({data:expenses_table_array_by_time('today')});


summary = count_and_sum_by_time('today');
var summary_row_view = Ti.UI.createView();
var summary_row_label = Ti.UI.createLabel({
	text: summary.count + ' purchases totalling $' + summary.sum
});
var summary_row = Ti.UI.createTableViewRow();
summary_row_view.add(summary_row_label);
summary_row.add(summary_row_view);
expenses_today_table.insertRowBefore(0, summary_row);


Ti.App.addEventListener('expense_added', function(e){
	new_summary = count_and_sum_by_time('today');
	summary_row_label.text = new_summary.count + ' purchases totalling $' + new_summary.sum.toFixed(2);
	new_row = Ti.UI.createTableViewRow({title:'$' + e.expense.the_amount + '\t' + e.expense.category});
	expenses_today_table.insertRowBefore(1, new_row);
});

win.add(expenses_today_table);
