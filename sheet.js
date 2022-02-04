const { GoogleSpreadsheet } = require('google-spreadsheet');

module.exports = class Sheet {
	constructor() {
		// Initialize the sheet - doc ID is the long id in the sheets URL
		this.doc = new GoogleSpreadsheet(
			'1ZyW8F-jgwiNDVZ4O6KoeDa-UDmg2vTYJqbpm4BIGR7o'
		);
	}
	async load() {
		// Initialize Auth - see https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
		await this.doc.useServiceAccountAuth(require('./credentials.json'));

		await this.doc.loadInfo(); // loads document properties and worksheets
	}
	async addRows(rows) {
		const sheet = this.doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
		await sheet.addRows(rows);
	}
	async getRows() {
		const sheet = this.doc.sheetsByIndex[0];
		return await sheet.getRows();
	}
};
