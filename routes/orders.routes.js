const express = require('express');
const router = express.Router();

let orders = [
    { id: 1, customerName: "Alice Gou", status: "shipped", total: 999 },
    { id: 2, customerName: "Bob", status: "pending", total: 150 }
];

let nextId = 3;

router.get('/', (req, res) => {
    let result = orders;

    if (req.query.status) {
        result = orders.filter(order => order.status === req.query.status);
    }

    res.json({
        success: true,
        data: result
    });
});

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const order = orders.find(order => order.id === id);

    if (!order) {
        return res.status(404).json({
            success: false,
            message: "Order not found"
        });
    }

    res.json({
        success: true,
        data: order
    });
});

router.post('/', (req, res) => {
    const { customerName, status, total } = req.body;

    if (!customerName || !status || !total) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields"
        });
    }

    const newOrder = {
        id: nextId,
        customerName,
        status,
        total
    };

    orders.push(newOrder);
    nextId++;

    res.status(201).json({
        success: true,
        data: newOrder
    });
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const order = orders.find(order => order.id === id);

    if (!order) {
        return res.status(404).json({
            success: false,
            message: "Order not found"
        });
    }

    orders = orders.filter(order => order.id !== id);

    res.status(204).send();
});

module.exports = router;