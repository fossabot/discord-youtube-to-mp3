# Youtube-Downloader
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fnavaneethkm004%2Fdiscord-youtube-to-mp3.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fnavaneethkm004%2Fdiscord-youtube-to-mp3?ref=badge_shield)

A simple code used to download music by YouTube in mp3 format 🔥

Looking for a code to download your music ? This fully open source code is made for you!

- No advertising
- Simple and fast
- No API key required

### ⚡ Installation

Well, let's start by downloading the code.
Go to the folder `config` then the file `bot.json`.
For the bot to be able to start, please complete the file with your credentials as follows :

```js
{
    "token": "XXX",
    "prefix": "!"
}
```

Reminder :

- `token`, the token of the bot available on the [Discord developers](https://discordapp.com/developers/applications) section.
- `prefix`, the prefix that will be set to use the bot.

To install modules, go to the console and type this : `npm i`.

To start the bot :

```
#With Node
node main.js

#With pm2
pm2 start main.js --name "YoutubeDownloader"
```

If you see this : `I'm ready !`, it means that your robot has started up !

### 🎵 Commands

```
download, download music by name.
linkdownload, download music by YouTube link.
```

Examples (download) :

```
#YouTube name
<prefix>dl PETIT BISCUIT - Sunset Lover

#Spotify URL
<prefix>dl https://open.spotify.com/track/3WRQUvzRvBDr4AxMWhXc5E?si=iJP3hgxbRoqiqiOnnfBR7w
```

Example (linkdownload) :

```
#YouTube URL
<prefix>ldl https://youtu.be/wuCK-oiE3rM
```

I'm not responsible if a music doesn't want to download or if your IP is blacklisted on YouTube ⛔

This is used with [discord.js](https://www.npmjs.com/package/discord.js), [discord-ytdl-core](https://www.npmjs.com/package/discord-ytdl-core), [spotify-url-info](https://www.npmjs.com/package/spotify-url-info) and [scrape-yt](https://www.npmjs.com/package/scrape-yt).

If you have any questions/problems do not hesitate to open a issue !
Don't forget to add a star to the project or leave a little mark of this Github on your bot if you use the source code !


## License
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fnavaneethkm004%2Fdiscord-youtube-to-mp3.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fnavaneethkm004%2Fdiscord-youtube-to-mp3?ref=badge_large)