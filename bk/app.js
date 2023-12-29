const express = require('express');
const path = require('path');
const sequelize = require('./util/database');
const userRoutes = require('./routes/user');
const port = 9000;

const app = express();

    
app.use(express.json());
app.use(express.static(path.join(__dirname,'views')));
app.use(userRoutes);

sequelize
    .sync()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on ${port}`);
        });
    })
    .catch(err => {
        console.log(err);
    });

