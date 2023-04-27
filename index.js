const express = require("express");
const app = express();
const port = 3000;

const notesRouter = require("./routes/notes");
const userRouter = require("./routes/user");

app.use(express.json());

app.use("/api/notes", notesRouter);
app.use("/api/user", userRouter);

app.listen(port, () => {
  console.log("Server started at port " + port);
});
