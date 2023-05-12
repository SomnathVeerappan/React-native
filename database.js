import * as SQlite from "expo-sqlite";

const DB = SQlite.openDatabase("reactnative");

export async function createTable() {
	return new Promise((resolve, reject) => {
		DB.transaction(
			(tx) => {
				tx.executeSql(
					"create table if not exists menuItems (id INTEGER PRIMARY KEY AUTOINCREMENT, name text , price text, description text, category text, image text);",
					[],
					(i, r) => {
						console.log("Table Successfully created.");
					},
					(error) => {
						console.log("failed");
					}
				);
			},
			reject,
			resolve
		);
	});
}

export async function getMenuItems() {
	return new Promise((resolve) => {
		DB.transaction((tx) => {
			tx.executeSql("SELECT * FROM menuItems", [], (_, { rows }) => {
				resolve(rows._array);
				// console.log("from getitems", rows._array);
			});
		});
	});
}

export async function saveMenuItems(menuItems) {
	const InsertQuery1 = `INSERT INTO menuItems (name,  price, description, category, image) VALUES ( ?, ?, ?, ?, ? );`;
	// console.log(InsertQuery);

	menuItems.menu.forEach((i) => {
		let name = i.name;
		let price = i.price;
		let description = i.description;
		let category = i.category;
		let image = i.image;

		DB.transaction((tx) => {
			tx.executeSql(
				InsertQuery1,
				[name, price, description, category, image],
				(tx, results) => {
					console.log(`Inserted item ${name} into database`);
				},
				(error) => {
					console.log(`Error inserting item ${name}: ${error.message}`);
				}
			);
		});
	});
}

export async function filterByQueryAndCategories(query, Filters) {
	// console.log(query, Filters.toLowerCase());
	return new Promise((resolve, reject) => {
		const sql =
			"SELECT * FROM menuItems WHERE name LIKE ? AND category IN (" +
			Filters.map(() => "?").join(",") +
			")";
		// console.log(Filters.map(() => "?").join(","));
		DB.transaction((tx) => {
			tx.executeSql(
				sql,
				[`%${query}%`, ...Filters], // use % as wildcard characters before and after the search string
				(tx, results) => {
					console.log(`Found ${results.rows.length} matching items:`);
					resolve(results.rows._array);
					// console.log(results.rows._array);
				},
				(error) => {
					console.log(`Error searching for items: ${error.message}`);
				}
			);
		});
	});
}

export function getSectionListData(menuItems) {
	const menuData = {};

	menuItems.forEach((item) => {
		if (!menuData[item.name]) {
			menuData[item.name] = [];
		}

		menuData[item.name].push({
			price: item.price,
			category: item.category,
			description: item.description,
			image: item.image,
		});
	});

	const sections = Object.keys(menuData).map((name) => ({
		title: name,
		data: menuData[name],
	}));

	return sections;
}
