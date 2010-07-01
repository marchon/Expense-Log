var db = Titanium.Database.open('db1');
db.execute("create table if not exists expenses (id integer primary key autoincrement, amount real, created_at datetime default datetime('now', 'localtime'), category_id integer)");
db.execute('create table if not exists categories (id integer primary key autoincrement, name text)');

//db.execute('delete from categories');
//db.execute('delete from expenses');

function add_category(name) {
	db.execute('insert into categories (name) values(?)', name);
}

function add_expense(category_name, amount) {
	rows = db.execute('select id from categories where name=?', category_name);
	category_id = rows.fieldByName('id');
	rows.close();
	db.execute('insert into expenses (amount, category_id) values(?,?)', amount, category_id);
	return {the_amount:amount.toFixed(2), category:category_name};
}

function categories_table_array() {
	rows = db.execute('select * from categories');
	var categories = [];
	if (rows) {
		while (rows.isValidRow()) {
			var item =  {title:rows.fieldByName('name')};
			categories.push(item);
			rows.next();
		}
	}
	rows.close();
	return categories;
}

function count_and_sum_by_time(time_period) {
	var results = {};
	switch (time_period) {
		case 'today':
			rows = db.execute("select sum(amount), count(amount) from expenses where created_at > date('now', 'localtime') order by created_at DESC");
			if (rows) {
				results.sum = rows.field(0);
				results.count = rows.field(1);
				rows.close();
			} else {
				results.sum = 0;
				results.count = 0;
			}

		break;
		case 'this week':
			rows = db.execute("select sum(amount), count(amount) from expenses where created_at > date('now', 'localtime', '-7 days') order by created_at DESC");
			if (rows) {
				results.sum = rows.field(0);
				results.count = rows.field(1);
				rows.close();
			} else {
				results.sum = 0;
				results.count = 0;
			}

		break;
		case 'this month':
			rows = db.execute("select sum(amount), count(amount) from expenses where created_at > date('now', 'localtime', 'start of month') order by created_at DESC");
			if (rows) {
				results.sum = rows.field(0);
				results.count = rows.field(1);
				rows.close();
			} else {
				results.sum = 0;
				results.count = 0;
			}

		break;
	}
	return results;
}


function expenses_table_array_by_time(time_period) {
	var expenses = [];
	switch (time_period) {
		case 'today':
			rows = db.execute("select * from expenses where created_at > date('now', 'localtime') order by created_at DESC");
			//change this
			if (rows) {
				while (rows.isValidRow()) {
					category_row = db.execute("select name from categories where id=?", rows.fieldByName('category_id'));
					category = category_row.fieldByName('name');
					category_row.close();
					created = rows.fieldByName('created_at');
					year = created.match(/\d\d\d\d/);
					the_date = created.match(/-(\d\d-\d\d)/)[1].replace(/-/, '/').replace(/^0/, '');
					amount = (Number(rows.fieldByName('amount'))).toFixed(2);
					item =  {title:the_date + '\t' + '$' + amount + '\t\t' + category};
					expenses.push(item);
					rows.next();
				}
			}
			rows.close();
			return expenses;
		break;
		case 'this week':
			rows = db.execute("select * from expenses where created_at > date('now', 'localtime', '-7 days') order by created_at DESC");
			//change this
			if (rows) {
				while (rows.isValidRow()) {
					category_row = db.execute("select name from categories where id=?", rows.fieldByName('category_id'));
					category = category_row.fieldByName('name');
					category_row.close();
					created = rows.fieldByName('created_at');
					the_date = created.match(/-(\d\d-\d\d)/)[1].replace(/-/, '/').replace(/^0/, '');
					amount = (Number(rows.fieldByName('amount'))).toFixed(2);
					item =  {title:the_date + '\t' + '$' + amount + '\t\t' + category};
					expenses.push(item);
					rows.next();
				}
			}
			rows.close();
			return expenses;
		break;
		case 'this month':
			rows = db.execute("select * from expenses where created_at > date('now', 'localtime', 'start of month') order by created_at DESC");
			//change this
			if (rows) {
				while (rows.isValidRow()) {
					category_row = db.execute("select name from categories where id=?", rows.fieldByName('category_id'));
					category = category_row.fieldByName('name');
					category_row.close();
					created = rows.fieldByName('created_at');
					the_date = created.match(/-(\d\d-\d\d)/)[1].replace(/-/, '/').replace(/^0/, '');
					amount = (Number(rows.fieldByName('amount'))).toFixed(2);
					item =  {title:the_date + '\t' + '$' + amount + '\t\t' + category};
					expenses.push(item);
					rows.next();
				}
			}
			rows.close();
			return expenses;
		break;
	}
}
