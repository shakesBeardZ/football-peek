'use strict';

var config = require('../config');
var helper = require('../helper');
var items = require('../data/items');
var competitions = require('../data/competitions');
var express = require('express');
var router = express.Router();

// Route for item
router.route('/:item')
    .get((req, res) => {
        var currentItem = null;

        items.forEach(function (item) {
            if (req.params.item === item.code) {
                currentItem = item;
            }
        });

        currentItem = currentItem || items[0];
        currentItem.isActive = true;

        var data = {
            title: 'Dashboard Football - Quick access to ' + currentItem.name + ' results',
            items: items,
            currentItem: currentItem,
        };

        if (currentItem == competitions.championsLeague || currentItem == competitions.europaLeague) {
            res.render('competition', Object.assign(data, {
                scorersData: helper.readJsonFile(helper.stringFormat(config.paths.scorersData, currentItem.code, config.currentYear)),
                assistsData: helper.readJsonFile(helper.stringFormat(config.paths.assistsData, currentItem.code, config.currentYear))
            }));
        } else {
            res.render('league', Object.assign(data, {
                resultsData: helper.readJsonFile(helper.stringFormat(config.paths.resultsData, currentItem.code, config.currentYear)),
                tableData: helper.readJsonFile(helper.stringFormat(config.paths.tableData, currentItem.code, config.currentYear)),
                scorersData: helper.readJsonFile(helper.stringFormat(config.paths.scorersData, currentItem.code, config.currentYear)),
                assistsData: helper.readJsonFile(helper.stringFormat(config.paths.assistsData, currentItem.code, config.currentYear))
            }));
        }
    });

module.exports = router;