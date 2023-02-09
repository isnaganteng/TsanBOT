#!/usr/bin/env node
const readline = require('readline')
const minimist = require('minimist')
const ytmp = require('.')

const argv = minimist(process.argv.slice(2), {
	boolean: [
		"help",
		"play", "radio", "mix",
		"search",
		"audio", "video",
		"quiet", "verbose",
	],
	string: [
		"id",
		"player",
	],
	alias: {
		"help": "h",
		"play": "x", "radio": "r", "mix": "m",
		"id": "url", "search": "s", "id": "i", "url": "u",
		"audio": "a", "video": "v",
		"player": "p",
		"quiet": "q", "verbose": "v",
	},
})

if (argv.help) {
	console.error(`Usage:
    ${process.argv[1]} --help
    ${process.argv[1]} [ options ] [ [--play] [--mix] [--radio] ] [--] string
    ${process.argv[1]} [ options ] --search [--] string...
    ${process.argv[1]} [ options ] --id=id | --id [--] id
    ${process.argv[1]} [ options ] --url=url | --url [--] url

Behaviour control:
    -x, --play      Play the selected playlist and/or video
                    Used in playlists to exit after playling all the songs.
    -m, --mix       After the playlist or video is over start a
                    non-personalized YouTube Mix
    -r, --radio     At the end, don't exit but start an endless radio instead

    The default behaviour is dependent on the song selection

Song selection:
    -s, --search    Use the positional argument(s) to perform a search and use
                    the first result as the video or playlist
    -i, --id id     Use the given ID or URL (either video, playlist or channel)
                    The value can also be supplied either as positional, after
                    the double-dash
    -u, --url url   And alias for --id. Behaviour may change.
    
    By default if the supplied positional argument(s) is a valid playlist or
    video ID or URL then used so, else a search is performed.

Format options:
    -a, --audio     Audio-only, never ever show video
    -v, --video     Optimize for video.
    -av             Select formats with video but optimize for audio

Developer options:
    -p, --player p Use a custom audio and video player executable. "mpv" by
                   default. A recommended alternative is mplayer or ffplay.
                   Should be able to play http streams.
    --saveinfo [f] Save latest video info, optionally to the given file
    --quiet        Don't log to stdout
    -v, --verbose  Log to stderr
`)
} else {
	const string = argv.id || argv._.join(" ")
	if (!string) {
		const rl = readline.createInterface({
			input: process.stdin,
			output: process.stderr,
		})
		rl.question("Which video to play? ", string => {
			rl.close()
			main(string)
		})
	} else main(string)

	function main(string) {
		ytmp(string, argv).then(
			(info) => info ? console.error("Done. Last video: %s", info.title) : console.error("Done."),
			(e) => console.error("Whoops main() exited: %O", e)
		)
	}
}
