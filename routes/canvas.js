var express = require('express');
var router = express.Router();
var _ = require('underscore');

/* GET webgl main page. */
router.get('/', function (req, res, next) {
    res.render('canvas/index', { title: 'blackpolygon - canvas' });
});

router.get('/:experiment', function (req, res, next) {
    console.log(req.params.experiment);

    var page = req.params.experiment;
    var allowed = ["circles", "circles2", "falling", "fractalSubdivision", "lines", "magenta",
        "pendulum", "permutations", "pursuitCurves", "pursuitCurves2", "recursive", "rotatingshapes", "spiro", "spiroAnim", "triangles"];

    
    if (_.contains(allowed, page)) {
        //Render experiment
        res.render('canvas/legacy', { page: page });

    } else {
        //Render sneaky page
        res.render('sneaky.pug');

    }

    next();

});

module.exports = router;
