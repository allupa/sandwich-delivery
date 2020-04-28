var orderSchema = require('./orderSchema');

module.exports.dbAddOrder = function dbAddOrder(order){
    console.log("Got order", order);
    var mOrder = new orderSchema({
        id: order.id,
        sandwichId: order.sandwichId,
        status: order.status
    });
    mOrder.save(function(err){
        if (err) console.log("Error in saving", err);
    });
};

module.exports.dbGetOrderById = function dbGetOrderById(orderId){
    return new Promise(function(resolve, reject){
        var q = orderSchema.find({id: orderId});
        console.log("LOOKUP", orderId);
        q.exec(function(err, docs){
            console.log("Err", err);
            console.log("Docs", docs);
            if (err) reject();
            else resolve(docs);
        })
    });
}

module.exports.dbRemoveOrderById = function dbRemoveOrderById(orderId){
    orderSchema.deleteOne({id: orderId}, function(err){
        if (err) console.log("err deleting", err);
        else console.log("deleted order", orderId);
    });
}

module.exports.dbUpdateOrderById = function dbUpdateOrderById(orderId, newStatus){
    console.log("Trying to update with", orderId, newStatus);
    orderSchema.updateOne({id: orderId}, {status: newStatus}, function(err){
        if (err) console.log("err updating", err);
        else console.log("updated order", orderId);
    })
}