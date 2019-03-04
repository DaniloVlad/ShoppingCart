const Categories = require('../models/categories');
const Site = require('../models/site');

const getCategories = (req, res, next) => {
    if(!req.params || !req.params.catname || req.params.catname.length === 0 || req.params.catname.length > 45)
        return next('Invalid Category');
        
    else {
        Categories.getSubCategoriesByCategory(req.params.catname)
        .then(results => res.json({results}))
        .catch(err => next('Invalid category!'));
    }
}

const getMenu = (req, res, next) => {

    Categories.getMenu()
    .then((results) => {
        Site()
        .then(results2 => res.json({menu: results, settings: results2[0], cart: req.session.cart}))
        .catch(err=>next('Couldn\'t load site data!'));
    })
    .catch(err => next('Couldn\'t load menu!'))
}

module.exports = { getCategories, getMenu };