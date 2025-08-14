import requests
import json

url = "https://nbts.health.gov.lk/wp-admin/admin-ajax.php?action=get_blood_banks"

response = requests.get(url)
response.raise_for_status()

data = response.json()

# Save raw JSON
with open("blood_banks_raw.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

# Save only formatted text info
with open("blood_banks_list.txt", "w", encoding="utf-8") as f:
    for bb in data:
        f.write(f"Name: {bb['name']}\n")
        f.write(f"Address: {bb['address']}\n")
        f.write(f"District: {bb['district']}\n")
        f.write(f"Phone: {bb['phone']}\n")
        f.write(f"Email: {bb['email']}\n")
        f.write(f"Hours: {bb.get('opening_hours', 'N/A')}\n")
        f.write(f"Latitude: {bb['latitude']}, Longitude: {bb['longitude']}\n")
        f.write("\n")
print("✅ Data saved to blood_banks_raw.json and blood_banks_list.txt")
