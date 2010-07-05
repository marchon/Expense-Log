Ti.include('db.js');
win = Ti.UI.currentWindow;

today = category_count_and_sum_by_time('today', win.categoryName);
week = category_count_and_sum_by_time('this week', win.categoryName);
month = category_count_and_sum_by_time('this month', win.categoryName);

view = Ti.UI.createView();

today_string =  'Today: \t\t' + today.count + ' purchases, $' + (Number(today.sum)).toFixed(2) + '\n';
week_string =  'Last Week:\t ' + week.count + ' purchases, $' + (Number(week.sum)).toFixed(2) + '\n';
month_string =  'This Month:\t ' + month.count + ' purchases, $' + (Number(month.sum)).toFixed(2) + '\n';


label = Ti.UI.createLabel({
	font: {fontSize:18},
	text: today_string + week_string + month_string
});

view.add(label);
win.add(view);
//view.show();
