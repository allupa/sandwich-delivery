var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://mongo:27017/test', { useNewUrlParser: true });
var db = mongoose.connection;


var orderSchema = new Schema({
    id: String,
    sandwichId: Number,
    status: {
        type: String,
        enum: [
            "ordered",
            "received",
            "inQueue",
            "ready",
            "failed"
        ]
    }
});

module.exports = db.model("Order", orderSchema);
