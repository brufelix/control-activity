import Mongoose from "mongoose";

Mongoose.Promise = global.Promise;
Mongoose.set("useCreateIndex", true);

let database: Mongoose.Connection;

function connection() {
  const uri = "mongodb://localhost/controlactivity";

  Mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })

  database = Mongoose.connection;

  database.once("open",
    () => console.log("Connected to Database..."));

  database.on("error",
    () => console.log("Error with connection to database"));
};

function disconnect() {
  if (!database) {
    return;
  };

  Mongoose.disconnect();
};

export { connection, disconnect };
