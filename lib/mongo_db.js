/**
 * Created by tuyou on 16/11/12.
 */

var Rx = require("rx");
var log = require("./log");

function split_page(pageSize, count) {
    var allPage = Math.ceil(count / pageSize);
    log("count:" + count + " need " + allPage + " pages");
    var ret = [];
    if(pageSize >= count) {
        ret.push({
            "start": 0,
            "size": count
        });
    } else {
        for (var i = 0; i < allPage - 1; i++) {
            ret.push({
                "start": i * pageSize,
                "size": pageSize
            });
        }
        ret.push({
            "start": i * pageSize,
            "size": count - i * pageSize
        });
    }
    return ret;
}

function split_page_append_property(pageSize, count, val) {
    var allPage = Math.ceil(count / pageSize);
    log("---- count:" + count + " need " + allPage + " pages");
    var ret = [];
    if(pageSize >= count) {
        ret.push({
            "start": 0,
            "size": count,
            "key":val
        });
    } else {
        for (var i = 0; i < allPage - 1; i++) {
            ret.push({
                "start": i * pageSize,
                "size": pageSize,
                "key":val
            });
        }
        ret.push({
            "start": i * pageSize,
            "size": count - i * pageSize,
            "key":val
        });
    }
    return ret;
}


function remove(model, condition, callback) {
    model.remove(condition, function (err, res) {
        if (err) {
            callback(err);
        } else {
            callback(null, res);
        }
    });
};

function rx_remove(model, condition) {
    return Rx.Observable.create(function (observe) {
        remove(model, condition, function (err, res) {
            if (err) {
                observe.onError(err);
            } else {
                observe.onNext(res);
                observe.onCompleted();
            }
        });
    });
};


function count(model, condition, callback) {
    model.count(condition, function (err, res) {
        if (err) {
            callback(err);
        } else {
            callback(null, res);
        }
    });
};

function rx_count(model, condition) {
    return Rx.Observable.create(function (observe) {
        count(model, condition, function (err, res) {
            if (err) {
                observe.onError(err);
            } else {
                observe.onNext(res);
                observe.onCompleted();
            }
        });
    });
};




function find(model, conditions, fields, callback) {
    model.find(conditions, fields || null, {}, function (err, res) {
        if (err) {
            callback(err);
        } else {
            callback(null, res);
        }
    });
};
function rx_find(model, conditions, fields) {
    return Rx.Observable.create(function (observe) {
        find(model, conditions, fields, function (err, res) {
            if (err) {
                observe.onError(err);
            } else {
                observe.onNext(res);
                observe.onCompleted();
            }
        });
    });
};

function find_range(model, conditions, fields, start, size, callback) {
    model.find(conditions, fields || null, {}, function (err, res) {
        if (err) {
            callback(err);
        } else {
            callback(null, res);
        }
    }).skip(start).limit(size);
};
function rx_find_range(model, conditions, fields, start, size) {
    return Rx.Observable.create(function (observe) {
        find_range(model, conditions, fields, start, size, function (err, res) {
            if (err) {
                observe.onError(err);
            } else {
                observe.onNext(res);
                observe.onCompleted();
            }
        });
    });
};

function find_one(model, conditions, fields, callback) {
    model.findOne(conditions, fields || null, {}, function (err, res) {
        if (err) {
            callback(err);
        } else {
            callback(null, res);
        }
    });
};
function rx_find_one(model, conditions, fields) {
    return Rx.Observable.create(function (observe) {
        find_one(model, conditions, fields, function (err, res) {
            if (err) {
                observe.onError(err);
            } else {
                observe.onNext(res);
                observe.onCompleted();
            }
        });
    });
};

function save(model, data, callback) {
    var entity = new model(data);
    entity.save(function (err, res) {
        if (err) {
            if (callback) callback(err);
        } else {
            if (callback) callback(null, res);
        }
    });
};
function rx_save(model, data) {
    return Rx.Observable.create(function (observe) {
        save(model, data, function (err, res) {
            if (err) {
                observe.onError(err);
            } else {
                observe.onNext(res);
                observe.onCompleted();
            }
        });
    });
};


function update(model, conditions, data, callback) {
    if (!data || !conditions) {
        if (callback) callback({msg: 'Parameter error'});
        return;
    }
    model.update(conditions, {$set: data}, {multi: true, upsert: true}, function (err, res) {
        if (err) {
            if (callback) callback(err);
        } else {
            if (callback) callback(null, res);
        }
    });
};
function rx_update(model, conditions, data) {
    return Rx.Observable.create(function (observe) {
        update(model, conditions, data, function (err, res) {
            if (err) {
                observe.onError(err);
            } else {
                observe.onNext(res);
                observe.onCompleted();
            }
        });
    });
};

function update_condition(model, conditions, update_fields, callback) {
    if (!update_fields || !conditions) {
        if (callback) callback({msg: 'Parameter error'});
        return;
    }
    model.findOneAndUpdate(conditions, update_fields, {multi: true, upsert: true}, function (err, data) {
        if (callback) callback(err, data);
    });
};
function rx_update_condition(model, conditions, update_fields) {
    return Rx.Observable.create(function (observe) {
        update_condition(model, conditions, update_fields, function (err, res) {
            if (err) {
                observe.onError(err);
            } else {
                observe.onNext(res);
                observe.onCompleted();
            }
        });
    });
};


function insert_or_update(model, condition, data, callback) {
    find_one(model, condition, null, function (err, res) {
        if (err) {
            callback(err);
        } else {
            if (res) {
                update(model, {_id: res._id}, data, function (err_update, res_update) {
                    if (err_update) {
                        callback(err_update);
                    } else {
                        callback(null, {
                            _id:res._id
                        });
                    }
                });
            }
            else {
                save(model, data, function (err_save, res_save) {
                    if (err_save) {
                        callback(err_save);
                    } else {
                        callback(null, res_save);
                    }
                });
            }
        }
    });
}

function rx_insert_or_update(model, condition, data) {
    return Rx.Observable.create(function (observe) {
        insert_or_update(model, condition, data, function (err, res) {
            if (err) {
                observe.onError(err);
            } else {
                observe.onNext(res);
                observe.onCompleted();
            }
        });
    });
}

function remove_fields_id(fields) {
    var obj = fields;
    delete obj._id;
    return obj;
}




exports.split_page = split_page;
exports.split_page_append_property = split_page_append_property;
exports.remove = remove;
exports.rx_remove = rx_remove;
exports.count = count;
exports.rx_count = rx_count;
exports.find = find;
exports.rx_find = rx_find;
exports.find_range = find_range;
exports.rx_find_range = rx_find_range;
exports.find_one = find_one;
exports.rx_find_one = rx_find_one;
exports.save = save;
exports.rx_save = rx_save;
exports.update = update;
exports.rx_update = rx_update;
exports.insert_or_update = insert_or_update;
exports.rx_insert_or_update = rx_insert_or_update;