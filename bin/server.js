const app = require("../app");
const mongoose = require("mongoose");

const { DB_HOST, PORT = 3000 } = process.env;

// const { Schema, model } = mongoose;

// const contactSchema = Schema({
//   name: String,
//   email: String,
//   phone: String,
// });

// const Contact = model("contact", contactSchema);
// const newContact = {
//   name: "sasha",
//   email: "sasha@gmail.com",
//   phone: "12345",
// };

mongoose
  .connect(DB_HOST, {
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
    // Contact.create(newContact, (error, data) => {
    //   console.log(error);
    //   console.log(data);
    // });
    // Contact.find({}, (error, data) => {
    //   console.log(error);
    //   console.log(data);
    // });
    // console.log("db is connect");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`Server running. Use our API on port: ${PORT}`);
// });
