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
    } else if (req.params.experiment === "squares") {
        res.render('webgl/ico',
            {
                title: 'rotatingshapes',
                scriptPaths: ['../scripts/randomColor.js', '../scripts/tinycolor.js', '../scripts/webgl/squares.js']
            });
    } 
    else if (req.params.experiment === "pyramid") {
        res.render('webgl/ico',
            {
                title: 'rotatingshapes',
                scriptPaths: ['../scripts/randomColor.js', '../scripts/tinycolor.js', '../scripts/webgl/pyramid.js']
            });
    } 

    else if (req.params.experiment === "blades") {
        res.render('webgl/ico',
            {
                title: 'rotatingshapes',
                scriptPaths: ['../scripts/randomColor.js', '../scripts/tinycolor.js', '../scripts/webgl/blades.js']
            });
    } 

    else if (req.params.experiment === "light") {
        res.render('webgl/ico',
            {
                title: 'rotatingshapes',
                scriptPaths: ['../scripts/TrackballControls.js', '../scripts/randomColor.js', '../scripts/tinycolor.js', '../scripts/webgl/light1.js']
            });
    } 
    
    else if (req.params.experiment === "rotatingshapes") {
        res.render('webgl/ico',
            {
                title: 'rotatingshapes',
                scriptPaths: ['../scripts/TrackballControls.js','../scripts/jquery-2.1.3.min.js',
                '../scripts/randomColor.js','../scripts/tinycolor.js','../scripts/webgl/rotatingshapes.js']
            });
    }
    next();

});

module.exports = router;
