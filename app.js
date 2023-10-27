const express = require('express')
const app = express();
const bodyParser = require('body-parser')
require('dotenv').config();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
const cors = require('cors');

app.use(cors());


//routes for auth apis
const auth = require('./routes/auth.route');
app.use('/api', auth);

const task = require('./routes/task.route');
app.use('/api', task);

// home route
app.use('/', (req, res) => {
   res.status(200).json({
       message: "Working"
   })
})

// local server port
const port = process.env.PORT || 3052;
app.listen(port, () => {
   console.log(`Listening on: http://localhost:${port}`);
});


const db = require("./models/index");



// db.sequelize.sync({
//   alter:true,
// });
