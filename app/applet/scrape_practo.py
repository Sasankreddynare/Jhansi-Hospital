import urllib.request
import re
import json

def scrape_practo():
    url = "https://www.practo.com/pileru/doctor/dr-m-dinesh-kumar-reddy-physiotherapist"
    req = urllib.request.Request(
        url, 
        headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'}
    )
    try:
        with urllib.request.urlopen(req) as response:
            html = response.read().decode('utf-8', errors='ignore')
            # Look for image URLs
            urls = re.findall(r'https?://[^\s"\'>]+?\.(?:jpg|jpeg|png)', html)
            # Display unique URLs on practo
            filtered = [u for u in set(urls) if 'practo' in u or 'doctor' in u or 'profile' in u]
            print(json.dumps(filtered, indent=2))
    except Exception as e:
        print("Error:", e)

if __name__ == "__main__":
    scrape_practo()
