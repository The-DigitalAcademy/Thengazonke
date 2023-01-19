const express = require('express');
const pg = require('pg');
const app = express();

const config = {
    user: 'your_username',
    database: 'your_database',
    password: 'your_password',
    host: 'your_host',
    port: 5432,
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

const pool = new pg.Pool(config);

app.get('/', (req, res) => {
    pool.connect((err, client, done) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ success: false, data: err });
        }
        client.query('SELECT NOW()', (err, result) => {
            done();
            if (err) {
                console.log(err);
                return res.status(500).json({ success: false, data: err });
            }
            return res.status(200).json({ success: true, data: result });
        });
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
