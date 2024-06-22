const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    // Ensure only GET requests are processed
    if (req.method !== 'GET') {
        res.statusCode = 405; // Method Not Allowed
        res.end('Method Not Allowed');
        return;
    }

    // Check if a file path is provided as a command-line argument
    const filePath = process.argv[2];
    if (!filePath) {
        res.statusCode = 400; // Bad Request
        res.end('Error: File path not provided');
        return;
    }

    // Read the file asynchronously
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            res.statusCode = 500; // Internal Server Error
            res.end(`Error reading file: ${err.message}`);
        } else {
            res.setHeader('Content-Type', 'text/plain');
            res.end(data);
        }
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
