const _mongoose = require('./model');
let mongoose = new _mongoose()
const _schema = mongoose.Schema;
module.exports = class Schema {
    constructor(config) {
        let schema = new _schema(config.data);
        let Model = mongoose.model(config.modelName, schema); //new database
        return Model
    }
}