/**
 * Created by wminikumagmail.com on 2020/04/01
 * Blog : https://minikuma-laboratory.tistory.com/
 * Github : http://github.com/minikuma
 * Comments: Crawler Server index.js
 */

'use strict';

import axios from 'axios';
import cheerio from 'cheerio';
import iconv from 'iconv-lite';
import express from 'express';
import { constants } from './welkeeps/property';

const app = express();

app.get("/mask", function (req, res) {

    const messages = [];
    const result = [];

    const keyWord = req.query.requestWebsite;

    // parameter
    if (!constants.hasOwnProperty(keyWord)) {
        res.status(404).json({
            code: 404,
            status: "Unknown Parameter",
            data: [],
        });
    }

    // data parsing
    getHtml().then(html => {
        const conv_html = iconv.decode(html.data, 'euc-kr');
        const $ = cheerio.load(conv_html);
        const bodyLists = $("ul.info");

        bodyLists.each(function (idx, element) {
            messages.push(
                result[idx] = {
                    "product": $(this).find("li.dsc").text().trim(),
                    "description": $(this).find("li.subname").text().trim(),
                    "stock": $(this).find("li.stock").text().trim(),
                    "soldout": $(this).find("li.soldout").text().trim(),
                    "price": $(this).find("li.price").text().trim(),
                    "link": constants.웰킵스,
                });
        });

        // response object
        const jsonData = {
            code: 200,
            status: "OK",
            data: messages,
        };
        res.json(jsonData);
    });
});

app.listen(3000, function () {
    console.log('Starting Crawling!!!');
});

// crawling
async function getHtml() {
    try {
        return await axios.request({
            url: constants.웰킵스,
            method: "GET",
            responseType: "arraybuffer",
            responseEncoding: "binary",
        });
    } catch (e) {
        console.error(e);
    }
}