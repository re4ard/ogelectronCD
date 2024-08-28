import winreg

# Open the SYSTEM\CurrentControlSet\Control\DeviceClasses key in the registry
with winreg.OpenKey(winreg.HKEY_LOCAL_MACHINE, r"SYSTEM\CurrentControlSet\Control\DeviceClasses") as key:
    # Query the GUID for the volume device interface class
    subkey = winreg.OpenKey(key, "{53f5630d-b6bf-11d0-94f2-00a0c91efb8b}")
    guid_bytes = winreg.QueryValueEx(subkey, "Name")[0]

# Convert the bytes to a string representation of the GUID
guid_str = "".join("{:02x}".format(b) for b in guid_bytes)
# Insert dashes at the appropriate positions to format the GUID
formatted_guid_str = '{' + '-'.join((guid_str[:8], guid_str[8:12], guid_str[12:16], guid_str[16:20], guid_str[20:])) + '}'

print("GUID_DEVINTERFACE_VOLUME:", formatted_guid_str)
