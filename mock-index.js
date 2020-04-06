/**
 * Created by wminikumagmail.com on 2020/03/26
 * Blog : https://minikuma-laboratory.tistory.com/
 * Github : http://github.com/minikuma
 */

'use strict';

const express = require('express'),
    router = require('./mock/endpoints');

server(process.argv[2]);

function server(port = 8080) {
    express()
        .use(router)
        .listen(port);
}