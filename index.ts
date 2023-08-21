let express = require('express');
const app = express();
const port = 3000;
require('./db/db.ts');
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
    }
);

