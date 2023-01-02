const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    "mongodb+srv://kobik:" +
      "FeUm36Qw2LKFhFu"+
      "@cluster0.u03oiht.mongodb.net/App"
  );
  console.log("mongo");
}
