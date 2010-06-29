var db = Titanium.Database.open('db1');
db.execute('create table if not exists expenses (id integer primary key autoincrement, amount real, created_at datetime default CURRENT_TIMESTAMP, category_id integer)');
db.execute('create table if not exists categories (id integer primary key autoincrement, name text)');

function add_category(name) {
	db.execute('insert into categories (name) values(?)', name);
	//custom event to notify views to refresh?
}

function add_expense(category_name, amount) {
	rows = db.execute('select id from categories where name=?', category_name);
	category_id = rows.fieldByName('id');
	rows.close();
	db.execute('insert into expenses (amount, category_id) values(?,?)', amount, category_id);
}

function categories_table_array() {
	rows = db.execute('select * from categories');
	Ti.API.info('fetched result set');
	var categories = [];
	if (rows) {
		Ti.API.info('entered if statement');
		while (rows.isValidRow()) {
			Ti.API.info('entered while loop');
			var item =  {title:rows.fieldByName('name')};
			Ti.API.info('created an object with title: ' + item.title);
			categories.push(item);
			Ti.API.info('pushed item into categories array');
			rows.next();
		}
	}
	Ti.API.info('about to return categories array of length: ' + categories.length);
	rows.close();
	return categories;
}

function expenses_table_array_by_time(time_period) {
	var expenses = [];
	switch (time_period) {
		case 'today':
			rows = db.execute("select * from expenses where created_at > date('now')");
			//change this
			if (rows) {
				while (rows.isValidRow()) {
					var item =  {title:rows.fieldByName('name') + ': $' + rows.fieldByName('amount') };
					categories.push(item);
					rows.next();
				}
			}
			rows.close();
			return expenses;
		break;
		case 'this week':

		break;
		case 'this month':

		break;
		case 'this year':

		break;
	}
}
