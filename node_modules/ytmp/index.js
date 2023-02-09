const fs = require('fs')
const {spawn} = require('child_process')

const ytdl = require('ytdl-core')
const ytsr = require('ytsr')
const ytpl = require('ytpl')

async function main(str, options = {}) {
	const {play: single = false, radio = false, mix = false, search = false, id = false} = options
	const def = !single && !radio && !mix
	
	if (!search) {

		if (ytpl.validateURL(str)) {
			let info = play(str, options)
			if (mix) info = playMix(info, options)
			if (radio) info = playRadio(info, options)
			return info
		}

		if (ytdl.validateURL(str) || ytdl.validateID(str)) {
			let info = play(str, options)
			if (mix) info = playMix(info, options)
			if (radio || def) info = playRadio(info, options)
			return info
		}

		if (typeof id === false) throw new Error(JSON.stringify(id) + " is neither a valid ID or URL")
	}

	if (typeof id !== false) {

		const results = await ytsr(str)

		if (!results.items.length) throw new Error("Search returned no results")

		const link = results.items[0].link
		// todo interactive selection

		if (ytpl.validateURL(link)) {
			let info = play(link, options)
			if (mix) info = playMix(info, options)
			if (radio || def) info = playRadio(info, options)
			return info
		}

		if (ytdl.validateURL(link)) {
			let info = play(link, options)
			if (mix || def) info = playMix(info, options)
			if (radio || def) info = playRadio(info, options)
			return info
		}

		throw new Error(JSON.stringify(link) + " is neither a valid video or playlist URL")
	}

	throw new Error("Nothing to do.")
}
module.exports = main

async function play(id, options = {}) {
	const {audio = false, video = false, player = 'mpv',
		saveinfo = false, quiet = false, verbose = false} = options

	if (typeof id === 'string' && ytpl.validateURL(id)) {
		const playlist = await ytpl(id)

		if (verbose) console.error("Playing playlist: %s", playlist.title)

		let info
		for (let item of playlist.items) {
			info = await play(item.id)
		}

		if (verbose) console.error("End of playlist")

		return info
	} else {
		const info = typeof id === 'string'
			? await ytdl.getInfo(id)
			: await id

		if (saveinfo !== false) {
			fs.writeFileSync(typeof saveinfo === 'boolean' ? __dirname + "/info.json"
				: String(saveinfo) || "info.json", JSON.stringify(info, null, 4))
		}
		
		const format = ytdl.chooseFormat(info.formats, {
			quality: video ? 'highestvideo' : 'highestaudio',
			filter: video ? 'audioandvideo' : audio && 'audioonly' || 'audio',
		})
		if (!format) throw new Error("Could not get an appropriate format")

		const url = format.url

		if (!quiet) console.log(info.title)

		return new Promise((resolve, reject) => {
			const playerProcess = spawn(player, [url], {stdio: 'inherit'})
				.on('error', reject)
				.on('exit', code => code
					? reject(new Error("Player exited with status " + code))
					: resolve(info))
		})
	}
}
module.exports.play = play

async function playRadio(id, options = {}) {
	const {verbose = false} = options

	let info
	if (typeof id === 'string') {
		info = await play(id, options)
	} else {
		info = await id
	}

	if (verbose) console.error("Playing radio for %s", info.title)

	return playRadioRecursive(info)
}
module.exports.playRadio = playRadio

async function playRadioRecursive(info, options = {}) {
	for (let i of info['related_videos']
		.map(i => {
			let {view_count} = i
			view_count = view_count.replace(/,/, '')
			const postfix = /(Mrd|[KMG])$/.exec(view_count)
			view_count = parseFloat(view_count)
			switch (postfix) {
				case "K": view_count *= 1000; break
				case "M": view_count *= 1000000; break
				case "Mrd": view_count *= 1000000000; break
			}
			return {...i, view_count}
		})
		.sort((a, b) => {
			if (a.view_count < b.view_count) return 1
			if (a.view_count > b.view_count) return -1
			return 0
		})
	) {
		try {
			info = play(i.id, options)
			info = await playRadioRecursive(info)
		} catch (e) {
			continue
		}
	}

	return info
}

async function playMix(id, options = {}) {
	const {verbose = false} = options

	let info
	if (typeof id === 'string') {
		info = await play(id, options)
	} else {
		info = await id
	}

	if (verbose) console.error("Playing YouTube Mix of: " + info.title)

	for (let i of info.related_videos) {
		info = await play(i.id)
	}

	if (verbose) console.error("Mix is over")

	return info
}
module.exports.playMix = playMix
