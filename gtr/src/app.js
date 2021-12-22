const express = require("express");
const config = require("./config");
const loaders = require("./loaders");
const helmet = require("helmet")
const {UserRoutes, ProductRoutes,RestaurantRoutes,MealRoutes} = require("./routers")
const event = require("./scripts/events")
const fileUpload = require("express-fileupload")
const errorHandler = require("./middlewares/errorHandling")

config();
loaders();
event()

const app = express()
app.use(express.json())
app.use(helmet())
app.use(fileUpload());

app.listen(process.env.PORT,()=>{
    console.log(`SERVER RUNNIG ${process.env.PORT}`)
    app.use("/users",UserRoutes);
    app.use("/products",ProductRoutes)
    app.use("/restaurant",RestaurantRoutes)
    app.use("/meals",MealRoutes)

    app.use(errorHandler)
})
