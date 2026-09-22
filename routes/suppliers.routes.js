const express = require('express');
const router = express.Router();

let suppliers = [
    {id: 1, companyName: "Techcorp", country: "USA"},
    {id: 2, companyName: "AnquiCorp", country: "Japan"}
];

router.get('/', (req, res) => {
    res.json(suppliers);
});

