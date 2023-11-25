const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./src/routes');
const errorHandler = require('./src/middlewares/errorHandler.middleware')
const Limit = require('./src/middlewares/rateLimit.middleware')
const swaggerUi = require('swagger-ui-express');
const specs = require('./swaggerOptions');

const app = express()
const PORT = process.env.PORT
const MONGODB_URI = 'mongodb://localhost:27017/salaam'

app.use(Limit)

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Mongoose Connected')
})

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(express.json())
app.use('/v1', userRoutes);

app.get("/", (req, res) => {
    res.send("hello there");
});

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})
