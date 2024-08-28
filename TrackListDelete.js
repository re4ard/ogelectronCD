const fs = require('fs');

const filePathToDelete = 'C:\\Users\\Priyanshu Bhowmik\\Desktop\\electronCDAPP\\CDMusicPlayer\\MainParts\\tracks.json'; // Replace this with the path to the file you want to delete

// Check if the file exists
fs.access(filePathToDelete, fs.constants.F_OK, (err) => {
    if (err) {
        console.error('File does not exist:', err);
        return;
    }

    // File exists, proceed with deletion
    fs.unlink(filePathToDelete, (err) => {
        if (err) {
            console.error('Error deleting file:', err);
            return;
        }
        console.log('File deleted successfully');
    });
});
