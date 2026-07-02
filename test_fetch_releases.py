import unittest
import json
import os
from unittest.mock import patch, MagicMock

# We import the functions to test. They don't exist yet, so running this test will fail/error.
try:
    from fetch_releases import parse_github_repo, fetch_releases_or_tags, update_crates_json
except ImportError:
    # We will define placeholders or let it fail as a compile/import error.
    # Since fetch_releases.py doesn't exist yet, this will raise ImportError.
    # That is a valid failing test step!
    pass

class TestFetchReleases(unittest.TestCase):
    def test_parse_github_repo(self):
        # Valid GitHub URLs
        self.assertEqual(parse_github_repo("https://github.com/owner/repo"), "owner/repo")
        self.assertEqual(parse_github_repo("https://github.com/owner/repo/"), "owner/repo")
        self.assertEqual(parse_github_repo("https://github.com/owner/repo.git"), "owner/repo")
        self.assertEqual(parse_github_repo("http://github.com/owner/repo"), "owner/repo")
        
        # Invalid / non-GitHub URLs
        self.assertIsNone(parse_github_repo("https://google.com/owner/repo"))
        self.assertIsNone(parse_github_repo(""))
        self.assertIsNone(parse_github_repo(None))
        self.assertIsNone(parse_github_repo("https://github.com/owner"))

    @patch('urllib.request.urlopen')
    def test_fetch_releases_success(self, mock_urlopen):
        # Mock release response
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
        # Mock first call (releases) returning empty list, second call (tags) returning tag list
        mock_releases_response = MagicMock()
        mock_releases_response.read.return_value = b"[]"

        mock_tags_response = MagicMock()
        mock_tags_response.read.return_value = json.dumps([
            {"name": "v0.9.0-alpha"}
        ]).encode('utf-8')

        # Mock the __enter__ returns for urlopen
        mock_urlopen.return_value.__enter__.side_effect = [mock_releases_response, mock_tags_response]

        releases = fetch_releases_or_tags("owner/repo")
        self.assertEqual(len(releases), 1)
        self.assertEqual(releases[0]["tag_name"], "v0.9.0-alpha")
        self.assertEqual(releases[0]["tarball_url"], "https://github.com/owner/repo/archive/refs/tags/v0.9.0-alpha.tar.gz")

    @patch('fetch_releases.fetch_releases_or_tags')
    def test_update_crates_json(self, mock_fetch):
        # Setup mock fetch response
        mock_fetch.return_value = [
            {"tag_name": "v1.0", "tarball_url": "https://github.com/owner/repo/archive/refs/tags/v1.0.tar.gz"}
        ]

        # Setup mock json file
        test_crates = [
            {
                "name": "Observatory",
                "url": "https://github.com/owner/repo",
                "crateurl": "/observatory-crate/"
            },
            {
                "name": "Local Crate",
                "url": "http://www.google.com" # No github repo
            }
        ]
        
        temp_file = "temp_crates.json"
        with open(temp_file, "w") as f:
            json.dump(test_crates, f)

        try:
            update_crates_json(temp_file)
            
            # Read updated file
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

if __name__ == '__main__':
    unittest.main()
