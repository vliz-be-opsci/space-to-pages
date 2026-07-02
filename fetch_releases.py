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
        raise RuntimeError(f"HTTP Error calling {url}: {e.code} {e.reason}")
    except Exception as e:
        raise RuntimeError(f"Connection error calling {url}: {e}")

def fetch_releases_or_tags(repo_fullname):
    # Try releases first
    releases_url = f"https://api.github.com/repos/{repo_fullname}/releases"
    releases_data = None
    try:
        releases_data = make_github_request(releases_url)
        if isinstance(releases_data, list) and len(releases_data) > 0:
            results = []
            for item in releases_data:
                tag = item.get("tag_name")
                if tag:
                    results.append({
                        "tag_name": tag,
                        "tarball_url": f"https://github.com/{repo_fullname}/archive/refs/tags/{tag}.tar.gz"
                    })
            return results
    except Exception as e:
        # Fallback to tags even if releases call failed
        pass

    # Try tags as fallback
    tags_url = f"https://api.github.com/repos/{repo_fullname}/tags"
    try:
        tags_data = make_github_request(tags_url)
    except Exception as e:
        raise RuntimeError(f"GitHub API error fetching tags/releases for {repo_fullname}: {e}")

    results = []
    if isinstance(tags_data, list):
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
        raise FileNotFoundError(f"File not found: {crates_json_path}")
    
    with open(crates_json_path, 'r', encoding='utf-8') as f:
        crates = json.load(f)

    if not isinstance(crates, list):
        raise ValueError("Expected list in crates JSON")

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
    try:
        update_crates_json(sys.argv[1])
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)
