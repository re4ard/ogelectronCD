import win32gui
import win32con
import time
import struct

# Define GUIDs for device classes
GUID_DEVINTERFACE_VOLUME = "{53f5630d-b6bf-11d0-94f2-00a0c91efb8b}"

# Define a callback function to handle device notifications
def device_notify_handler(hwnd, msg, wparam, lparam):
    if msg == win32con.WM_DEVICECHANGE:
        if wparam == win32con.DBT_DEVICEARRIVAL:
            dev_info = win32gui.PDEV_BROADCAST_HDR(lparam)
            if dev_info.dbch_devicetype == win32con.DBT_DEVTYP_VOLUME:
                print("A volume device was inserted. Probably a CD.")
                # Additional code to handle the CD insertion

# Register for device notifications
filter = struct.pack('LHHLLL', 32, win32con.DBT_DEVTYP_VOLUME, 0, 0, 0, 0)
hwnd = win32gui.CreateWindowEx(
    0, "Static", "hidden window", 0, 0, 0, 0, 0,
    0, 0, win32gui.GetModuleHandle(None), None
)
win32gui.RegisterDeviceNotification(
    hwnd, filter, win32con.DEVICE_NOTIFY_WINDOW_HANDLE
)

# Set the window's message loop to process messages
while True:
    time.sleep(1)
    win32gui.PumpWaitingMessages()
