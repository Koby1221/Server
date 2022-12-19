const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    "mongodb+srv://kobik:" +
      process.env.PASS +
      "@cluster0.u03oiht.mongodb.net/App"
  );
  console.log("mongo");
}
