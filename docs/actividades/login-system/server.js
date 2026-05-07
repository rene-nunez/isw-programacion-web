const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "public")));

const router = require('./routes/router.js');
app.use('/api', router);

app.listen(PORT, () => console.log('Server running on port ' + PORT));