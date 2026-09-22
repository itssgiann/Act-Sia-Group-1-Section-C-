const express = require('express');
const router = express.Router();

let suppliers = [
    {id: 1, companyName: "Techcorp", country: "USA"},
    {id: 2, companyName: "AnquiCorp", country: "Japan"}
];

router.get('/', (req, res) => {
    res.json(suppliers);
});

router.get('/id:', (req, res) => {
    const supplier = suppliers.find(s => s.id === parseInt(req.params.id));
    if (!supplier) {
        return res.status(404).json({ message: "Supplier not found." });
    }

    res.json(supplier);
});

router.post('/', (req, res) => {
    const companyName = req.body.companyName;
    const country = req.body.country;

    if(!companyName || !country) {
        return res.status(404).json({ message: "Missing required fields." })
    }

    const newSupplier = {
        id: suppliers.lenght = 1,
        companyName: companyName,
        country: country
    };

    suppliers.push(newSupplier);

        res.status(201).json(newSupplier);
});

module.exports = router;