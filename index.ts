let express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
app.use(bodyParser.json());
require('./db/db.ts');
const signuprouter = require('./routes/singup');

app.use('/register',signuprouter);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
    }
);

