import os
import shutil

# Path to the D: drive
drive_path = "D:\\"

# List of MP3 file names you want to check for
target_mp3_names = [
    "CARTITAPE.mp3",
    "CLB.mp3",
    "H&V.mp3",
    "MORELIFE.mp3",
    "TEC.mp3",
    "UTOPIA.mp3",
    "WW.mp3"
]

# Dictionary mapping MP3 names to the associated text file paths
mp3_text_file_mapping = {
    "CARTITAPE.mp3": "C:\\Users\\Priyanshu Bhowmik\\Desktop\\electronCDAPP\\CDMusicPlayer\\Albums\\CARTITAPE\\Album.jpg",
    "WW.mp3": "C:\\Users\\Priyanshu Bhowmik\\Desktop\\electronCDAPP\\CDMusicPlayer\\Albums\\WW\\Album.jpg",
    "UTOPIA.mp3": "C:\\Users\\Priyanshu Bhowmik\\Desktop\\electronCDAPP\\CDMusicPlayer\\Albums\\UTOPIA\\Album.jpg",
    "TEC.mp3": "C:\\Users\\Priyanshu Bhowmik\\Desktop\\electronCDAPP\\CDMusicPlayer\\Albums\\TEC\\Album.jpg",
    "MORELIFE.mp3": "C:\\Users\\Priyanshu Bhowmik\\Desktop\\electronCDAPP\\CDMusicPlayer\\Albums\\MORELIFE\\Album.jpg",
    "H&V.mp3": "C:\\Users\\Priyanshu Bhowmik\\Desktop\\electronCDAPP\\CDMusicPlayer\\Albums\\H&V\\Album.jpg",
    "CLB.mp3": "C:\\Users\\Priyanshu Bhowmik\\Desktop\\electronCDAPP\\CDMusicPlayer\\Albums\\CLB\\Album.jpg"
}

# Path to the directory where you want to move the specific text files
move_dir = "C:\\Users\\Priyanshu Bhowmik\\Desktop\\electronCDAPP\\CDMusicPlayer\\MainParts"

def find_and_copy_specific_files():
    # Get a list of files in the D: drive
    files = os.listdir(drive_path)
    
    # Look for the first MP3 file
    for file in files:
        if file.endswith(".mp3"):
            mp3_path = os.path.join(drive_path, file)
            if file in target_mp3_names:
                # Get the corresponding text file to copy
                text_file_to_copy = mp3_text_file_mapping[file]
                # Copy the text file to the specified directory
                shutil.copy(text_file_to_copy, move_dir)
                print(f"Text file {text_file_to_copy} copied successfully.")
                return
    print("No MP3 file with a matching name found.")

# Run the function
find_and_copy_specific_files()
