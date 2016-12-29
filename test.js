/**
 * Created by tuyou on 16/12/12.
 */
const Rx = require('rx');

// var source = Rx.Observable.return(42)
//     .selectMany(Rx.Observable.throw(new Error('error!')));

var source = Rx.Observable.return(42).flatMap(function (i) {
    return Rx.Observable.throw(new Error('error!'));
});

var subscription = source.subscribe(
    function (x) { console.log('Next: ' + x); },
    function (err) { console.log('Error: ' + err); },
    function () { console.log('Completed'); });
