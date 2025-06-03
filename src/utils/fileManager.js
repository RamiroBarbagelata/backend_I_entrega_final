const fs = require("fs").promises;

const readJSON = async (path) => {
    try {
        const data = await fs.readFile(path, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

const writeJSON = async (path, data) => {
    try {
        await fs.writeFile(path, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error("Error escribiendo archivo:", error);
    }
};

module.exports = { readJSON, writeJSON };

