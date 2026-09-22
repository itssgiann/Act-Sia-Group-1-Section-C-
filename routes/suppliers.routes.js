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
