let express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
app.use(bodyParser.json());
require('./db/db.ts');
require('socket.io');
const authenticatemiddleware = require('./middlewares/authentication');
const signuprouter = require('./routes/singup');

const loginrouters = require('./routes/login');
const messagerouters = require('./routes/messages');

app.use('/register',signuprouter);
app.use('/login',[authenticatemiddleware],loginrouters);
app.use('/messages',[authenticatemiddleware],messagerouters);


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
    }
);

