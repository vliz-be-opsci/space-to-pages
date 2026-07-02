import unittest
import json
import os
from unittest.mock import patch, MagicMock

try:
    from fetch_releases import parse_github_repo, fetch_releases_or_tags, update_crates_json
except ImportError:
    pass

class TestFetchReleases(unittest.TestCase):
    def test_parse_github_repo(self):
        self.assertEqual(parse_github_repo("https://github.com/owner/repo"), "owner/repo")
        self.assertEqual(parse_github_repo("https://github.com/owner/repo/"), "owner/repo")
        self.assertEqual(parse_github_repo("https://github.com/owner/repo.git"), "owner/repo")
        self.assertEqual(parse_github_repo("http://github.com/owner/repo"), "owner/repo")
        
        self.assertIsNone(parse_github_repo("https://google.com/owner/repo"))
        self.assertIsNone(parse_github_repo(""))
        self.assertIsNone(parse_github_repo(None))
        self.assertIsNone(parse_github_repo("https://github.com/owner"))

    @patch('urllib.request.urlopen')
    def test_fetch_releases_success(self, mock_urlopen):
        mock_response = MagicMock()
        mock_response.read.return_value = json.dumps([
            {"tag_name": "v1.0.0", "tarball_url": "https://api.github.com/repos/owner/repo/tarball/v1.0.0"}
        ]).encode('utf-8')
        mock_urlopen.return_value.__enter__.return_value = mock_response

        releases = fetch_releases_or_tags("owner/repo")
        self.assertEqual(len(releases), 1)
        self.assertEqual(releases[0]["tag_name"], "v1.0.0")
        self.assertEqual(releases[0]["tarball_url"], "https://github.com/owner/repo/archive/refs/tags/v1.0.0.tar.gz")

    @patch('urllib.request.urlopen')
    def test_fetch_releases_fallback_to_tags(self, mock_urlopen):
        import urllib.error
        # Mock releases failing with HTTPError, but tags succeeding
        mock_http_error = urllib.error.HTTPError(
            url="https://api.github.com/repos/owner/repo/releases",
            code=404,
            msg="Not Found",
            hdrs=None,
            fp=None
        )
        
        mock_tags_response = MagicMock()
        mock_tags_response.__enter__.return_value = mock_tags_response
        mock_tags_response.read.return_value = json.dumps([
            {"name": "v0.9.0-alpha"}
        ]).encode('utf-8')

        mock_urlopen.side_effect = [mock_http_error, mock_tags_response]

        releases = fetch_releases_or_tags("owner/repo")
        self.assertEqual(len(releases), 1)
        self.assertEqual(releases[0]["tag_name"], "v0.9.0-alpha")
        self.assertEqual(releases[0]["tarball_url"], "https://github.com/owner/repo/archive/refs/tags/v0.9.0-alpha.tar.gz")

    @patch('urllib.request.urlopen')
    def test_fetch_releases_api_error(self, mock_urlopen):
        import urllib.error
        # Mock both calls raising errors
        mock_http_error_1 = urllib.error.HTTPError(
            url="url", code=403, msg="Forbidden", hdrs=None, fp=None
        )
        mock_http_error_2 = urllib.error.HTTPError(
            url="url", code=403, msg="Forbidden", hdrs=None, fp=None
        )
        mock_urlopen.side_effect = [mock_http_error_1, mock_http_error_2]

        with self.assertRaises(Exception):
            fetch_releases_or_tags("owner/repo")

    @patch('fetch_releases.fetch_releases_or_tags')
    def test_update_crates_json(self, mock_fetch):
        mock_fetch.return_value = [
            {"tag_name": "v1.0", "tarball_url": "https://github.com/owner/repo/archive/refs/tags/v1.0.tar.gz"}
        ]

        test_crates = [
            {
                "name": "Observatory",
                "url": "https://github.com/owner/repo",
                "crateurl": "/observatory-crate/"
            },
            {
                "name": "Local Crate",
                "url": "http://www.google.com"
            }
        ]
        
        temp_file = "temp_crates.json"
        with open(temp_file, "w") as f:
            json.dump(test_crates, f)

        try:
            update_crates_json(temp_file)
            
            with open(temp_file, "r") as f:
                updated_data = json.load(f)
                
            self.assertEqual(len(updated_data), 2)
            self.assertEqual(updated_data[0]["releases"], [
                {"tag_name": "v1.0", "tarball_url": "https://github.com/owner/repo/archive/refs/tags/v1.0.tar.gz"}
            ])
            self.assertNotIn("releases", updated_data[1])
        finally:
            if os.path.exists(temp_file):
                os.remove(temp_file)

    def test_update_crates_json_missing_file(self):
        with self.assertRaises(FileNotFoundError):
            update_crates_json("non_existent_file.json")

    def test_update_crates_json_invalid_json(self):
        temp_file = "invalid_json.json"
        with open(temp_file, "w") as f:
            f.write("{invalid: json}")

        try:
            with self.assertRaises(json.JSONDecodeError):
                update_crates_json(temp_file)
        finally:
            if os.path.exists(temp_file):
                os.remove(temp_file)

    def test_update_crates_json_not_a_list(self):
        temp_file = "not_a_list.json"
        with open(temp_file, "w") as f:
            json.dump({"crate": "not list"}, f)

        try:
            with self.assertRaises(ValueError):
                update_crates_json(temp_file)
        finally:
            if os.path.exists(temp_file):
                os.remove(temp_file)

if __name__ == '__main__':
    unittest.main()
