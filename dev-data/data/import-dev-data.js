const mongoose = require("mongoose");
const fs = require("fs");
const dotenv = require("dotenv");
const Scholorship = require(`./../../models/scholorshipModel`);
dotenv.config({
  path: `${__dirname}/../../config.env`,
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

const scholorships = JSON.parse(
  fs.readFileSync(`${__dirname}/scholorships.json`, "utf-8")
);

//Import data to DB

const importData = async () => {
  try {
    await Scholorship.create(scholorships);
    console.log("Data was successfully loaded");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

//Delete the data present in the DB

const deleteData = async () => {
  try {
    await Scholorship.deleteMany();
    console.log("Data successfully deleted");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

console.log(process.argv);

if (process.argv[2] === "--import") importData();
else if (process.argv[2] === "--delete") deleteData();
