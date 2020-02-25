const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());

let nextId = 1;
let purchases = [
    { id: nextId++, price: 1232, category: 'auto',description:'purchases 1'  },
    { id: nextId++, price: 2432, category: 'moto',description:'purchases 2'  },
    { id: nextId++, price: 6833, category: 'sport',description:'purchases 3'  },
    { id: nextId++, price: 8544, category: 'tech',description:'purchases 4' },
];

server.get('/api/purchases', (req, res) => {
    setTimeout(() => {
        if (Math.random() > 0.5) {
            res.send(purchases);
        } else {
            res.statusCode = 500;
            res.send();
        }
    }, 1000);
});

server.get('/api/purchases/:id', (req, res) => {
    setTimeout(() => {
 
           const id = parseInt(req.params.id, 10);
        const  description = purchases.filter(o => o.id === id).map(o=>o.description);
            res.send(description);
            return;
    }, 1000);
});

server.post('/api/purchases', (req, res) => {
    setTimeout(() => {
        if (Math.random() > 0.5) {
            const purchase = req.body;

            if (purchase.id === 0) {
                purchases = [{...purchase, id: nextId++}, ...purchases];
                res.send();
                return;
            }

            if (purchases.find(o => purchase.id === o.id) === undefined) {
                res.statusCode = 404;
                res.send();
                return;
            }

            purchases = purchases.map(o => purchase.id === o.id ? purchase : o);
            res.send();

        } else {
            res.statusCode = 500;
            res.send();
        }
    }, 5000);
});

server.delete('/api/purchases/:id', (req, res) => {
    setTimeout(() => {
        if (Math.random() > 0.5) {
            const id = parseInt(req.params.id, 10);

            if (isNaN(id)) {
                res.statusCode = 400;
                res.send();
                return;
            }

            const purchaseToRemove = purchases.find(o => o.id === id);
            if (purchaseToRemove === undefined) {
                res.statusCode = 404;
                res.send();
            }

            purchases = purchases.filter(o => o.id !== id);  
            res.statusCode = 204;  
            res.send();
        } else {
            res.statusCode = 500;
            res.send();
        }
    }, 1000);


});

server.listen(9999);