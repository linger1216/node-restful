/**
 * Created by tuyou on 16/11/12.
 */

var Rx = require("rx");

var _ = {

    find: function (model, conditions, fields, options, callback) {
        model.find(conditions, fields || null, options || null, function (err, res) {
            if (err) {
                callback(err);
            } else {
                callback(null, res);
            }
        })
    },

    rx_find: function (model, conditions, fields, options) {
        return Rx.Observable.create(function (observe) {
            _.find(model, conditions, fields, options, function (err, res) {
                if (err) {
                    observe.onError(err);
                } else {
                    observe.onNext(res);
                    observe.onCompleted();
                }
            });
        });
    },

    rx_s_find: function (model, conditions) {
        return Rx.Observable.create(function (observe) {
            _.find(model, conditions, null, null, function (err, res) {
                if (err) {
                    observe.onError(err);
                } else {
                    observe.onNext(res);
                    observe.onCompleted();
                }
            });
        });
    },

    rx_find_range: function (model, conditions, fields, offset, size) {
        return _.rx_find(model, conditions, fields, {skip: offset, limit: size})
    },

    findById: function (model, id, fields, callback) {
        model.findById(id, fields || null, function (err, res) {
            if (err) {
                callback(err);
            } else {
                callback(null, res);
            }
        })
    },

    rx_findById: function (model, id, fields) {
        return Rx.Observable.create(function (observe) {
            _.findById(model, id, fields, function (err, res) {
                if (err) {
                    observe.onError(err);
                } else {
                    observe.onNext(res);
                    observe.onCompleted();
                }
            });
        });
    },

    findByIdAndRemove: function (model, id, callback) {
        model.findByIdAndRemove(id, function (err, res) {
            if (err) {
                callback(err);
            } else {
                callback(null, res);
            }
        })
    },

    rx_findByIdAndRemove: function (model, id) {
        return Rx.Observable.create(function (observe) {
            _.findOneAndRemove(model, id, function (err, res) {
                if (err) {
                    observe.onError(err);
                } else {
                    observe.onNext(res);
                    observe.onCompleted();
                }
            });
        });
    },


    findByIdAndUpdate: function (model, id, update, callback) {
        model.findByIdAndUpdate(id, update, function (err, res) {
            if (err) {
                callback(err);
            } else {
                callback(null, res);
            }
        })
    },

    rx_findByIdAndUpdate: function (model, id, update) {
        return Rx.Observable.create(function (observe) {
            _.findByIdAndUpdate(model, id, update, function (err, res) {
                if (err) {
                    observe.onError(err);
                } else {
                    observe.onNext(res);
                    observe.onCompleted();
                }
            });
        });
    },


    findOne: function (model, conditions, fields, options, callback) {
        model.findOne(conditions, fields || null, options || null, function (err, res) {
            if (err) {
                callback(err);
            } else {
                callback(null, res);
            }
        })
    },

    rx_s_findOne: function (model, conditions) {
        return Rx.Observable.create(function (observe) {
            _.findOne(model, conditions, null, null, function (err, res) {
                if (err) {
                    observe.onError(err);
                } else {
                    observe.onNext(res);
                    observe.onCompleted();
                }
            });
        });
    },

    rx_findOne: function (model, conditions, fields, options) {
        return Rx.Observable.create(function (observe) {
            _.findOne(model, conditions, fields, options, function (err, res) {
                if (err) {
                    observe.onError(err);
                } else {
                    observe.onNext(res);
                    observe.onCompleted();
                }
            });
        });
    },


    findOneAndRemove: function (model, conditions, callback) {
        model.findOneAndRemove(conditions, function (err, res) {
            if (err) {
                callback(err);
            } else {
                callback(null, res);
            }
        })
    },

    rx_findOneAndRemove: function (model, conditions) {
        return Rx.Observable.create(function (observe) {
            _.findOneAndRemove(model, conditions, function (err, res) {
                if (err) {
                    observe.onError(err);
                } else {
                    observe.onNext(res);
                    observe.onCompleted();
                }
            });
        });
    },

    findOneAndUpdate: function (model, conditions, update, callback) {
        model.findByIdAndUpdate(conditions, update, function (err, res) {
            if (err) {
                callback(err);
            } else {
                callback(null, res);
            }
        })
    },

    rx_findOneAndUpdate: function (model, conditions, update) {
        return Rx.Observable.create(function (observe) {
            _.findOneAndUpdate(model, conditions, update, function (err, res) {
                if (err) {
                    observe.onError(err);
                } else {
                    observe.onNext(res);
                    observe.onCompleted();
                }
            });
        });
    },


    // docs means array
    insertMany: function (model, docs, callback) {
        model.insertMany(docs, function (err, res) {
            if (err) {
                callback(err);
            } else {
                callback(null, res);
            }
        })
    },

    rx_insertMany: function (model, docs) {
        return Rx.Observable.create(function (observe) {
            _.insertMany(model, docs, function (err, res) {
                if (err) {
                    observe.onError(err);
                } else {
                    observe.onNext(res);
                    observe.onCompleted();
                }
            });
        });
    },


    remove: function (model, condition, callback) {
        model.remove(condition, function (err, res) {
            if (err) {
                callback(err);
            } else {
                callback(null, res);
            }
        });
    },

    rx_remove: function (model, condition) {
        return Rx.Observable.create(function (observe) {
            _.remove(model, condition, function (err, res) {
                if (err) {
                    observe.onError(err);
                } else {
                    observe.onNext(res);
                    observe.onCompleted();
                }
            });
        });
    },


    count: function (model, condition, callback) {
        model.count(condition, function (err, res) {
            if (err) {
                callback(err);
            } else {
                callback(null, res);
            }
        });
    },

    rx_count: function (model, condition) {
        return Rx.Observable.create(function (observe) {
            _.count(model, condition, function (err, res) {
                if (err) {
                    observe.onError(err);
                } else {
                    observe.onNext(res);
                    observe.onCompleted();
                }
            });
        });
    },

    save: function (model, data, callback) {
        var entity = new model(data);
        entity.save(function (err, res) {
            if (err) {
                if (callback) callback(err);
            } else {
                if (callback) callback(null, res);
            }
        });
    },

    rx_save: function (model, data) {
        return Rx.Observable.create(function (observe) {
            _.save(model, data, function (err, res) {
                if (err) {
                    observe.onError(err);
                } else {
                    observe.onNext(res);
                    observe.onCompleted();
                }
            });
        });
    },

    update: function (model, conditions, data, callback) {
        model.update(conditions, {$set: data}, {multi: true, upsert: true}, function (err, res) {
            if (err) {
                if (callback) callback(err);
            } else {
                if (callback) callback(null, res);
            }
        });
    },

    rx_update: function (model, conditions, data) {
        return Rx.Observable.create(function (observe) {
            _.update(model, conditions, data, function (err, res) {
                if (err) {
                    observe.onError(err);
                } else {
                    observe.onNext(res);
                    observe.onCompleted();
                }
            });
        });
    },

    distinct: function (model, conditions, fields, callback) {
        model.distinct(fields, conditions, function (err, res) {
            if (err) {
                if (callback) callback(err);
            } else {
                if (callback) callback(null, res);
            }
        });
    },

    rx_distinct: function (model, conditions, fields) {
        return Rx.Observable.create(function (observe) {
            _.distinct(model, conditions, fields, function (err, res) {
                if (err) {
                    observe.onError(err);
                } else {
                    observe.onNext(res);
                    observe.onCompleted();
                }
            });
        });
    },


    insert_or_update: function (model, condition, data, callback) {
        _.findOne(model, condition, null, null, function (err, res) {
            if (err) {
                callback(err);
            } else {
                if (res) {
                    _.update(model, {_id: res._id}, data, function (err_update, res_update) {
                        if (err_update) {
                            callback(err_update);
                        } else {
                            callback(null, res_update);
                        }
                    });
                }
                else {
                    _.save(model, data, function (err_save, res_save) {
                        if (err_save) {
                            callback(err_save);
                        } else {
                            callback(null, res_save);
                        }
                    });
                }
            }
        });
    },

    rx_insert_or_update: function (model, condition, data) {
        return Rx.Observable.create(function (observe) {
            _.insert_or_update(model, condition, data, function (err, res) {
                if (err) {
                    observe.onError(err);
                } else {
                    observe.onNext(res);
                    observe.onCompleted();
                }
            });
        });
    },

    split_page: function (pageSize, count, data) {
        var allPage = Math.ceil(count / pageSize);
        var ret = [];
        if (pageSize >= count) {
            ret.push(data?{start: 0, size: count, data: data}:{start: 0, size: count});
        } else {
            for (var i = 0; i < allPage - 1; i++) {
                ret.push(data?{start: i * pageSize, size: pageSize, data: data}:{start: i * pageSize, size: pageSize});
            }
            ret.push(data?{start: i * pageSize, size: count - i * pageSize, data: data}:{start: i * pageSize, size: count - i * pageSize});
        }
        return ret;
    }
}

module.exports = _;
