import requests
import json
import sys

def fetch_webmentions(token):
    try:
        response = requests.get(f"https://webmention.io/api/mentions.jf2?domain=jschall.net&token={token}")
        return response.json()
    except requests.exceptions.RequestException:
        return None
    
def save_json(token):
    webmentions_as_json = fetch_webmentions(token)
    if not webmentions_as_json == None:
        with open("data/webmentions.json", "w") as file:
            file.write(str(json.dumps(webmentions_as_json)))

if __name__ == "__main__":
    token = sys.argv[1]
    save_json(token)