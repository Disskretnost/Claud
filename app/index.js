require('dotenv').config();
const express = require('express');
const sequelize = require('./db'); 
const PORT = process.env.PORT || 8080;
const models = require('./models/models.js');
const cors  = require('cors');
const router = require('./routes/mainRouter.js');
//const errorHandler = require('./middleware/ErrorHandlingMiddleware.js')
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());
app.use(express.json());
app.use('/api', router);

//app.use(errorHandler);

const start = async () => {
    try {
        await sequelize.authenticate(); // Проверка подключения к базе данных
        await sequelize.sync();        // Синхронизация моделей с базой данных
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (e) {
        console.log(`Couldn't connect to server: ${e.message}`);
    }
};


start();