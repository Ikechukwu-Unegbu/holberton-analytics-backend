import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res, next) => {
  
 res.json({ message: "from index api" });

});


app.listen(8080, () => {

  console.log(`Server is running`);

  

});

