import os
import json
import urllib.request
import urllib.error
import urllib.parse
import sys

def parse_github_repo(url):
    if not url:
        return None
    try:
        parsed = urllib.parse.urlparse(url)
        if 'github.com' not in parsed.netloc:
            return None
        path_parts = [p for p in parsed.path.split('/') if p]
        if len(path_parts) >= 2:
            owner = path_parts[0]
            repo = path_parts[1]
            if repo.endswith('.git'):
                repo = repo[:-4]
            return f"{owner}/{repo}"
    except Exception:
        return None
    return None

def make_github_request(url):
    req = urllib.request.Request(url)
    req.add_header('User-Agent', 'space-to-pages-action')
    token = os.environ.get('GITHUB_TOKEN')
    if token:
        req.add_header('Authorization', f'Bearer {token}')
    
    try:
        with urllib.request.urlopen(req) as response:
            return json.loads(response.read().decode('utf-8'))
    except urllib.error.HTTPError as e:
        print(f"HTTP Error calling {url}: {e.code} {e.reason}")
        return None
    except Exception as e:
        print(f"Connection error calling {url}: {e}")
        return None

def fetch_releases_or_tags(repo_fullname):
    # 1. Fetch releases
    releases_url = f"https://api.github.com/repos/{repo_fullname}/releases"
    releases_data = make_github_request(releases_url)
    
    results = []
    if releases_data and isinstance(releases_data, list) and len(releases_data) > 0:
        for item in releases_data:
            tag = item.get("tag_name")
            if tag:
                results.append({
                    "tag_name": tag,
                    "tarball_url": f"https://github.com/{repo_fullname}/archive/refs/tags/{tag}.tar.gz"
                })
        return results

    # 2. If no releases, fallback to tags
    tags_url = f"https://api.github.com/repos/{repo_fullname}/tags"
    tags_data = make_github_request(tags_url)
    if tags_data and isinstance(tags_data, list):
        for item in tags_data:
            tag = item.get("name")
            if tag:
                results.append({
                    "tag_name": tag,
                    "tarball_url": f"https://github.com/{repo_fullname}/archive/refs/tags/{tag}.tar.gz"
                })
    return results

def update_crates_json(crates_json_path):
    if not os.path.exists(crates_json_path):
        print(f"File not found: {crates_json_path}")
        return
    
    with open(crates_json_path, 'r', encoding='utf-8') as f:
        try:
            crates = json.load(f)
        except Exception as e:
            print(f"Failed to parse JSON: {e}")
            return

    if not isinstance(crates, list):
        print("Expected list in crates JSON")
        return

    for crate in crates:
        url = crate.get("url")
        repo_fullname = parse_github_repo(url)
        if repo_fullname:
            print(f"Fetching releases/tags for {repo_fullname}...")
            releases = fetch_releases_or_tags(repo_fullname)
            if releases:
                crate["releases"] = releases

    with open(crates_json_path, 'w', encoding='utf-8') as f:
        json.dump(crates, f, indent=2, ensure_ascii=False)

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: python fetch_releases.py <path_to_project_crates.json>")
        sys.exit(1)
    update_crates_json(sys.argv[1])
