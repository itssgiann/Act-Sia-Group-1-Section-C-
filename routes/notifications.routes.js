const express = require ('express');
const router = express.Router();

let notification = [
    {id: 1, type: "alert", message: "System Maintenance"},
    {id: 2, type: "info", message: "New user registered"}
];

router.get('/', (req, res) => {
    let result = notifications;

    if (req.query.type) {
        result = notifications.filter(n => n.type === req.query.type);
    }
    res.status(200).json ({
        success: true,
        data: result,
        count: result.length
    });
});

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const notification = notifications.find(n => n.id === id);

    if (!notification) {
        return res.status(404).json({
            success: false,
            message: "Notification not found"
        });
    }

    res.status(200).json({
        success: true,
        data: notification
    });
})

router.post('/', (req, res) => {
    const type = req.body.type;
    const message = req.body.message;

    if (!type || !message) {
        return res.status(400).json ({
            success: false,
            message: "Missing type or message"
        });
    }

    let newId = 1;
    for (let i = 0; i < notification.length; i++) {
        if (notifications[i].id >= newId) {
            newId = notifications[i].id + 1;
        }
    }

    const newNotification = {
        id: newId,
        type: type,
        message: message,
    }

    notification.push(newNotification);

    res.status(201).json({
        success: true,
        data: newNotification
    });
});

router.delete('/', (req, res) => {
    const id = parseInt(req.params.id);
    const notifFound = notifications.find(n => n.id === id);
    
    if (!notifFound) {
        return res.status(404).json ({
            success: false,
            message: "Notification not found"
        });
    }

    notifications = notications.filter(n => n.id !== id);
    res.status(204).send();
});
module.exports = router;