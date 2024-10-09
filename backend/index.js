const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

const mainRouter = require("./routes/index");

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow custom headers like Authorization
    credentials: true // Allow credentials like cookies or authorization headers if needed
}));

app.options('*', cors()); // Important to handle the OPTIONS method


app.use(express.json());
app.use("/api/v1", mainRouter);

app.get("/", (req, res) => { //http://localhost:3000/
    res.json({
        msg: "Hello World"
    });
});

app.listen(PORT, (err) => {
    if(err) {
        console.log(err);
    } else {
    console.log(`Port is running on ${PORT}`);
    }
});