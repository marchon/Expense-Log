Ti.include('db.js');
win = Ti.UI.currentWindow


var expenses_table = Ti.UI.createTableView({data:expenses_table_array_by_time('this month')});


summary = count_and_sum_by_time('this month');
var summary_row_view = Ti.UI.createView();
var summary_row_label = Ti.UI.createLabel({
	text: summary.count + ' purchases totalling $' + (Number(summary.sum)).toFixed(2)
});
var summary_row = Ti.UI.createTableViewRow();
summary_row_view.add(summary_row_label);
summary_row.add(summary_row_view);
expenses_table.insertRowBefore(0, summary_row);


Ti.App.addEventListener('expense_added', function(e){
	new_summary = count_and_sum_by_time('this month');
	summary_row_label.text = new_summary.count + ' purchases totalling $' + (Number(new_summary.sum)).toFixed(2);
	new_row = Ti.UI.createTableViewRow({title:'$' + e.expense.the_amount + '\t' + e.expense.category});
	expenses_table.insertRowAfter(0, new_row);
});

win.add(expenses_table);
