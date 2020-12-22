//Modules
const ScrapeYt = require("scrape-yt");
const spotify = require("spotify-url-info")
const Discord = require("discord.js");
const YTDL = require("discord-ytdl-core");
const { createWriteStream } = require("fs");

//Config file
const Config = require('./config/bot.json');

//New discord.js client
const Client = new Discord.Client();

//Event ready
Client.on("ready", () => {
    //If the bot is ready it returns a message in the console
    console.log("I'm ready !");
});

Client.on("message", async message => {

    //Do not detect bots
    if (message.author.bot) return;

    //If '<prefix>download' is typed
    if (message.content.startsWith(Config.prefix + "dl")) {

        //Require args
        let args = message.content.split(' ').slice(1);

        //If no args is provided
        if (!args[0]) return message.channel.send(`⛔ | ${message.author}, Please enter the YouTube name of a song !`);

        //Regex to check if an url is a spotify song
        const isSpotifyURL = /https?:\/\/(?:embed\.|open\.)(?:spotify\.com\/)(?:track\/|\?uri=spotify:track:)((\w|-){22})/

        if (args[0].match(isSpotifyURL)) {
            const spotifyData = await spotify.getPreview(args[0]).catch(e => { })
            args = new Array(`${spotifyData.artist} - ${spotifyData.track}`)
        }

        //The bot searches the music provided on YouTube
        const url = await ScrapeYt.search(args.join(" "));

        //New match
        let match;

        try {
            //The bot is trying to find the music provided
            match = `https://www.youtube.com/watch?v=${url[0].id}`
        } catch (e) {
            //If the music is not found
            return message.channel.send(`⛔ | ${message.author}, i didn't find anything for : ${args.join(" ")} !`);
        }

        //Conversion of the stream
        let stream = YTDL(match, { encoderArgs: ['-af','dynaudnorm=f=200'], fmt: 'mp3', opusEncoded: false });

        try {
            //Confirmation message
            message.channel.send(`:notes: | ${message.author}, I'll try to send ${infos[0].title} when the download is finished...`);
            const channelID = message.channel.id;

            //Saving the file in the folder 'download'
            stream.pipe(createWriteStream(__dirname + `/download/${url[0].title}.mp3`))
                .on('finish', () => {
                    //Sending the mp3 file
                    try {
                        const file = new Discord.MessageAttachment(__dirname + `/download/${url[0].title}.mp3`, `${url[0].title}.mp3`)
                        Client.channels.cache.get(channelID).send(`🎵 | ${message.author}, music : ${url[0].title} in mp3.`, file)
                    } catch (e) {
                        return Client.channels.cache.get(channelID).send(`⛔ | ${message.author}, I didn't manage to send the music... maybe it's too heavy for Discord ? Or maybe I don't have the required permissions to upload this type of file on this server...`);
                    }
                })
fs.unlinkSync(__dirname + `/download/${url[0].title}.mp3`);
        } catch (e) {
            //If the music is not found
            return message.channel.send(`⛔ | ${message.author}, I didn't find anything for : ${args.join(" ")} ! Maybe it is impossible to retrieve this music...`);
        }
    }

});

Client.on("message", async message => {

    //Do not detect bots
    if (message.author.bot) return;

    //If '<prefix>linkdownload' is typed
    if (message.content.startsWith(Config.prefix + "ldl")) {

        //Require args
        let args = message.content.split(' ').slice(1);

        //If no args is provided
        if (!args[0]) return message.channel.send(`⛔ | ${message.author}, Please enter the YouTube URL of a song !`);

        //New infos & stream
        let infos;
        let stream;

        try {
            //The bot is trying to find the music provided
            stream = YTDL(args.join(" "), { encoderArgs: ['-af','dynaudnorm=f=200'], fmt: 'mp3', opusEncoded: false });
            infos = await ScrapeYt.search(args.join(" "));
        } catch (e) {
            //If the music is not found
            return message.channel.send(`⛔ | ${message.author}, I didn't find anything for : ${args.join(" ")} !`);
        }

        try {
            //Confirmation message
            message.channel.send(`:notes: | ${message.author},  I'll try to send ${infos[0].title} when the download is finished...`);

            //Saving the file in the folder 'download'
            stream.pipe(createWriteStream(__dirname + `/download/${infos[0].title}.mp3`)).on('finish', () => {

                //Sending the mp3 file
                try {
                    message.channel.send(`🎵 | ${message.author}, music : ${infos[0].title} in mp3.`, new Discord.MessageAttachment(__dirname + `/download/${infos[0].title}.mp3`, `${infos[0].title}.mp3`))
                } catch (e) {
                    return message.channel.send(`⛔ | ${message.author}, I didn't manage to send the music... maybe it's too heavy for Discord ? Or maybe I don't have the required permissions to upload this type of file on this server...`);
                }

            })
        } catch (e) {
            //If the music is not found
            return message.channel.send(`⛔ | ${message.author}, I didn't find anything for : ${args.join(" ")} ! Maybe it is impossible to retrieve this music...`);
        }
    }

});

//Client login
Client.login(Config.token);
