const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_LINK);

mongoose.connection.on("connected", () => console.log("MongoDB connected"));
mongoose.connection.on("error", () => console.log("Failed to connect MongoDB"));
