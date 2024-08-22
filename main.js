const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const Database = require('better-sqlite3');
const fs = require('fs');

let db;
const userDataPath = "C:\Users\oscar_0qiqt8o\.vscode\ExpertConnect\ "; // Get the user data path
const dbName = 'db.sqlite';
const dbPath = path.join(userDataPath, dbName); // Use a writable directory for the database
// const dbPath = 'C:\Users\oscar_0qiqt8o\.vscode\ExpertConnect\db.sqlite'

function initDatabase() {
    console.log("Initializing database...");
    console.log("Database path:", dbPath);

    if (fs.existsSync(dbPath)) {
        console.log("Existing database found");
    } else {
        console.log("No existing database found");
    }

    try {
        db = new Database(dbName);
        console.log("Database connection established");

        const schemaPath = path.join(__dirname, 'schema.sql');
        console.log("Schema path:", schemaPath);

        if (fs.existsSync(schemaPath)) {
            const schema = fs.readFileSync(schemaPath, 'utf8');
            console.log("Schema file read successfully");
            db.exec(schema);
            console.log("Schema executed successfully");
        } else {
            console.error("Schema file not found!");
        }
    } catch (error) {
        console.error("Error initializing database:", error);
    }
}

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            enableRemoteModule: false
        }
    });

    mainWindow.loadFile('index.html');

    mainWindow.on('closed', function () {
        if (db) db.close();
    });
}

app.on('ready', () => {
    initDatabase();
    createWindow();
});

// Dummy data for testing
ipcMain.handle('fetch-experts', async (event, { network }) => {
    const dummyData = {
        network1: [
            { id: '1', name: 'John Doe', expertise: 'Finance', contact: 'john.doe@example.com', network: 'Network 1' },
            { id: '2', name: 'Jane Smith', expertise: 'Technology', contact: 'jane.smith@example.com', network: 'Network 1' }
        ],
        network2: [
            { id: '3', name: 'Alice Johnson', expertise: 'Healthcare', contact: 'alice.johnson@example.com', network: 'Network 2' },
            { id: '4', name: 'Bob Brown', expertise: 'Energy', contact: 'bob.brown@example.com', network: 'Network 2' }
        ]
    };
    return dummyData[network] || [];
});

// ipcMain.handle('fetch-experts', async (event, { network }) => {
//     try {
//         const query = 'SELECT * FROM aggregated_experts WHERE network = ?';
//         const experts = db.prepare(query).all(network);
//         return experts;
//     } catch (error) {
//         console.error('Error fetching experts:', error);
//         return [];
//     }
// });

ipcMain.on('update-interval', (event, { interval }) => {
    console.log(`Interval updated to ${interval / 3600000} hours`);
    event.sender.send('interval-updated', `Interval updated to ${interval / 3600000} hours`);
});