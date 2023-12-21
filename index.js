const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors")

const userRoutes = require("./routes/userRoutes")


dotenv.config();

//express app
const app = express();

//middleware
app.use(express.json());
app.use(cors())


app.use((req, res, next) => {
    //   console.log(req.path, req.method);
    next();
});

app.use("/api/user/", userRoutes)


//connect to DB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Connected to DB & Server started at port", process.env.PORT);
    });
  })
  .catch(() => {
    console.log(error)
  });


