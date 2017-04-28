var express = require('express');
var router = express.Router();

/* GET webgl main page. */
router.get('/', function (req, res, next) {
    res.render('webgl/index', { title: 'blackpolygon - webgl' });
});

router.get('/:experiment', function (req, res, next) {
    console.log(req.params.experiment);

    if (req.params.experiment === "cube") {
        res.render('webgl/cube',
            {
                title: 'blackpolygon - cube',
                scriptPaths: ['../scripts/randomColor.js', '../scripts/webgl/cube.js']
            });
    }
    next();

});

module.exports = router;
