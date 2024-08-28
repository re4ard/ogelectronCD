import subprocess
import time
import os
import sys

def check_cd():
    try:
        # Use appropriate command to check for CD presence on D drive
        result = subprocess.run(['wmic', 'logicaldisk', 'where', 'DriveType=5', 'get', 'DeviceID'], stdout=subprocess.PIPE, check=True)
        cd_info = result.stdout.decode('utf-8')
        
        # If 'D:' drive is found, check if it contains any files
        if 'D:' in cd_info:
            try:
                # Check if there are any files in the D drive
                if os.listdir('D:\\'):
                    print("CD Detected with files", flush=True)
                    sys.stdout.flush()  # Flush stdout buffer
                    return True  # CD and files detected
                else:
                    print("CD Detected but no files", flush=True)
                    sys.stdout.flush()  # Flush stdout buffer
                    return False  # CD detected but no files
            except PermissionError as e:
                print("Permission error: D drive not ready or accessible", flush=True)
                sys.stdout.flush()  # Flush stdout buffer
                return False  # CD detected but D drive not ready
        else:
            print("No CD Detected", flush=True)
            sys.stdout.flush()  # Flush stdout buffer
            return False  # No CD detected
    except FileNotFoundError:
        print("wmic command not found. Ensure it is available in your PATH.", flush=True)
        sys.stdout.flush()
        return False
    except subprocess.CalledProcessError as e:
        print(f"Command 'wmic' failed with error: {e}", flush=True)
        sys.stdout.flush()
        return False

if __name__ == "__main__":
    while True:
        if check_cd():
            time.sleep(3)  # Check every 3 seconds
        else:
            time.sleep(3)  # Check every 3 seconds
