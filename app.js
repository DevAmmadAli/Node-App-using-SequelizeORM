const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const sequelize = require("./db.config");
const { userRouter } = require("./routes/user.route");
const port = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("", userRouter);

sequelize
    .authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
        sequelize.sync().then(() => {
            console.log("Tables created/ updated successfully");
        });
        app.listen(port, () => {
            console.log(`App is running on ${port} port`);
        });
    })
    .catch((error) => {
        console.error("Unable to connect to the database: ", error);
    });
