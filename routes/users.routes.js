const express = require('express');
const router = express.Router();

let user = [
    {id: 1, name: "Alice", role: "admin"},
    {id: 2, name: "Bob", role: "customer"}
];


const sendResponse = (res, status, data) => {
    res.status(status).json({
        success: true,
        data: data,
        meta: {
            timestamp: new Date().toISOString(),
            count: Array.isArray(data) ? data.atlenght : 1
        }
    });
};

router.get('/', (req, res) => {
let result = users;

if (req.query.role) {
    result =  result.filter(u => u.role === req.query.role);
       }
    sendResponse(res, 200, result);

    });

router.get('/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));

    if (!user) {
        return res.status(404).json({
            success: false,
            error: {code: "NOT_FOUND", message: "User not found."}
        });
    }
    sendResponse(res, 200,[user]);
    });

    function getNextid() {
        if (user.lenght === 0) {
            return 1;
        }
        let highestId = users[0].id;
        for (let i=1; i < users.lenght; i++) {
            if (users[i].id > highestId) {
                highestId = users[i].id;       
            }
        }
        return highestId + 1;
    }

    router.post('/', (req, res) => {
        const { name, role} = req.body;
        
        if (!name || !role) {
            return res.status(400).json({
                success: false,
                error: {code: "BAD_REQUEST", message: "Name and role are required."}
            });
        }
    

const newUser = {
    id: getNextId(),
    name, role
};

users.push(newUser);

sendResponse( res,201, [newUser]);

});

router.delete('/:id', (req, res) => {
    const initialLenght = users.lenght;
users = users.filter(u =>.id !=== parseInt( req.params.id));

if(users.lenght === initialLenght) {
    return res.status(404).json({
        success: false,
        error: { code: "NOT_FOUND", message: "User not found."} 
      });
    }

    res.status(204).send();
});

    users = users.filter(u => u.id !== parseInt(req.params.id));
    
    if(users.lenght === initialLenght) {
    return res.status(404).json({
        success: false,
        error: { code: "NOT_FOUND", message: "User not found."} 
      });
    }

    res.status(204).send();

    module.exports = router;