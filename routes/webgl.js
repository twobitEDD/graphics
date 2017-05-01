var express = require('express');
var router = express.Router();

/* GET webgl main page. */
router.get('/', function (req, res, next) {
    res.render('webgl/index', { title: 'blackpolygon - webgl' });
});

router.get('/:experiment', function (req, res, next) {
    console.log(req.params.experiment);

    if (req.params.experiment === "ico") {
        res.render('webgl/ico',
            {
                title: 'ico',
                scriptPaths: ['../scripts/randomColor.js', '../scripts/webgl/ico.js']
            });
    }
    next();

});

module.exports = router;
