const mongoose = require('mongoose');

class Database {
  constructor() {
    this.connect();
  }

  connect() {
    mongoose
      .connect(
        'mongodb+srv://admin:Kia768768@twitterclone-database.fwvy6nm.mongodb.net/?retryWrites=true&w=majority&appName=TwitterClone-Database'
      )
      .then(() => {
        console.log('Database connection successful!');
      })
      .catch((err) => {
        console.log('Database connection error!');
        console.log(err);
      });
  }
}

module.exports = new Database();
