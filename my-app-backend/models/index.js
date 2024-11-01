const sequelize = require("./configs/sequelize");
const User = require("./user.model")

sequelize
    .sync()
    .then(() => {
        console.log("Database & tables created!");
    })
    .catch((error) => {
        console.error("Unable to create tables:", error);
    });
