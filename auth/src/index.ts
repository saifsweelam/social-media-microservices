import express from 'express';

const app = express();


app.use((req, res, next) => {






    res.send("Hello");
})

app.listen(4000)