const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");
dotenv.config({
  path: `${__dirname}/config.env`,
});

const DB = process.env.URL.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection was successful");
  });

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening to the port ${port}`));
