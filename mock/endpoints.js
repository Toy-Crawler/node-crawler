/**
 * Created by wminikumagmail.com on 2020/03/26
 * Blog : https://minikuma-laboratory.tistory.com/
 * Github : http://github.com/minikuma
 */

'use strict';

const fs = require('fs');
const router = require('express').Router();

router.get('/mock-mask', file('mock/data/mock.json'));


function file(filename) {
    return (request, response) => {
        response.writeHead(200, {'Content-Type':'application/json; charset=utf-8'});
        fs.createReadStream(filename).pipe(response);
    };
}

function created(request, response) {
    response.writeHead(201, 'Created');
    response.end();
}

module.exports = router;