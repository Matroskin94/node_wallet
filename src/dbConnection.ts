import { connect } from "mongoose";

const dbUser = process.env.DB_USER;
const userPass = process.env.DB_PASS;
const dbName = process.env.DB_NAME;

const dbConfig = {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName
};

const connectToMongo = () => {
  connect(
    `mongodb+srv://${dbUser}:${userPass}@cluster0.bazwy.mongodb.net/${dbName}?retryWrites=true&w=majority`,
    dbConfig
  )
    .then(() => {
      console.log('DATABASE CONNECTED');
    })
    .catch((err) => {
      console.log(`mongodb+srv://${dbUser}:${userPass}@cluster0.bazwy.mongodb.net/${dbName}?retryWrites=true&w=majority`);
      console.log('DATABASE CONNECTION ERROR', err);
    });
}

export default connectToMongo;