import fs from'fs'
let { MessageType } = (await import('@adiwajshing/baileys')).default
let handler = async (m, { conn }) => {
let whmods = fs.readFileSync('./mp3/Bot.mp3') 
conn.sendFile(m.chat, whmods, '', '', m, true)
}

handler.customPrefix = /^(robot|p|tes|tes123|tes1|tes12|woy)$/i
handler.command = new RegExp

export default handler
