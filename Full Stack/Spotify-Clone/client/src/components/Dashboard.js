import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import SpotifyWebApi from "spotify-web-api-node";
import Track from "./Track";
import Player from "./Player";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.REACT_APP_CLIENT_ID,
});

function Dashboard({ code }) {
  const accessToken = useAuth(code);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const [playing, setPlaying] = useState();
  const [lyrics, setLyrics] = useState("");

  useEffect(() => {
    if (!playing) return;
    fetch("http://localhost:5000/lyrics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        track: playing.title,
        artist: playing.artist,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setLyrics(data.lyrics);
      });
  }, [playing]);

  useEffect(() => {
    if (!accessToken) {
      return;
    }
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) {
      return setSearchResult([]);
    }
    if (!accessToken) return;
    let cancel = false;
    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
      setSearchResult(
        res.body.tracks.items.map((track) => {
          const smallestImage = track.album.images.reduce((smallest, image) => {
            if (image.height < smallest.height) return image;
            return smallest;
          }, track.album.images[0]);

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            image: smallestImage.url,
          };
        })
      );
    });
    return () => (cancel = true);
  }, [accessToken, search]);

  const showSearch = () => {
    setIsSearchOpen((preState) => !preState);
  };

  return (
    <div>
      <div className="home">
        <div className="first">
          <ul>
            <li>
              <h3>Spotify Clone</h3>
            </li>
            <li>
              <button onClick={showSearch}>
                {isSearchOpen ? "Close Search" : "Open Search"}
              </button>
            </li>
          </ul>
        </div>
        <div className="second">
          <header>
            {isSearchOpen ? (
              <input
                type="text"
                placeholder="Search songs or artists..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            ) : null}
          </header>
          <main>
            {searchResult.length === 0 ? (
              <div
                className="text-center song-list"
                style={{ whiteSpace: "pre" }}
              >
                {lyrics}
              </div>
            ) : (
              <ul className="song-list">
                {searchResult.map((track) => (
                  <Track
                    track={track}
                    key={track.uri}
                    chooseTrack={() => {
                      setPlaying(track);
                      setSearch("");
                    }}
                  />
                ))}
              </ul>
            )}
          </main>
        </div>
      </div>
      <div className="footer">
        <Player token={accessToken} trackUri={playing?.uri} />
      </div>
    </div>
  );
}

export default Dashboard;
