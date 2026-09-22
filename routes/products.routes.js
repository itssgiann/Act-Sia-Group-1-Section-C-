const express = require ('express');
const router = express.Router();

let products = [
    {id:1, name: "Laptop", category: "electronics", price:899},
    {id:2, name: "Desk Chair ", category: "furniture", price:200}
];  

router.get('/', (req, res) => {
    let result = products;

    if(req.query.category) {
        result = products.filter(p => p.category === req.query.categort);
    }

    res.json({
        success:true,
        data:result
    });
});

router.get('/', (req, res) => {
    let product = products.find (p => p.id == req.params.id);

    if (!product) {
        return res.status(404).json({
            success:false,
            message:"Product not Found."
        });
    }
    
    res.json({
        success:true,
        data: product
    });
});

router.post ('/', (req, res) => {
    const{name,category,price} = req.body;

    if (!name || !category || !price) {
        return res.status(400).json ({
            success:false,
            message:"Missing required fields."
        });
    }
    
    const product = {
        id:products.length + 1,
        name:name,
        category : category,
        price : price
    };

    products.push(product);

    res.status (201),json ({
        success:true,
        data: product
    });
});

router.delete ('/', (req, res) => {
    const oldLength = products.length;

    products = products.filter(p => p.id != req.params.id);

    if(products.lenght === oldLength) {
        return res.status(404).json ({
            success: false,
            message: "Product not Found."
        });
    }

    res.status(204).send();
});

module.exports = router;