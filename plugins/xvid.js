let handler = async (m, { conn, usedPrefix, command }) => {
  conn.sendButton(m.chat, '```Ini Kak```\n\n*©By Tsan-BOTz ×፝֟͜×*', wm, pickRandom(xvid), [['Lanjut', `/xvid}`]],m)
}
handler.help = ['videoquotes', 'videogalau']
handler.tags = ['premium']
handler.command = /^(xvid|xvideos)$/i

handler.premium = true
handler.limit = true

handler.fail = null
handler.register = true

export default handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

const xvid = [

"https://telegra.ph/file/c83205eeeecceb9e4db87.mp4",
"https://telegra.ph/file/a001c30cafa587a3bef2c.mp4",
"https://telegra.ph/file/09cf5ac786cbfda551617.mp4",
"https://telegra.ph/file/e696afd2cfe29a199be11.mp4",
"https://telegra.ph/file/5be5e3696c03edff2772b.mp4",
"https://telegra.ph/file/b9b3dece43e557b4addc1.mp4",
"https://telegra.ph/file/a33e23d6736f8cb40b4fb.mp4",
"https://telegra.ph/file/3426da3a67bdc0238bd46.mp4",
"https://telegra.ph/file/394386e5dff94ccff2323.mp4",
"https://telegra.ph/file/1a1cf22235249f0a459e5.mp4",
"https://telegra.ph/file/a5578746d1abf176894ed.mp4",
"https://telegra.ph/file/99dcebf89c97f13f4f657.mp4",
"https://telegra.ph/file/6a808e89640f23ecfc936.mp4",
"https://telegra.ph/file/2e35480077a5eae3b2a1e.mp4",
"https://telegra.ph/file/6c5ba9ed473f188a963b2.mp4",

]
/*let handler = async(m, { conn }) => {
  await conn.sendFile(m.chat, pickRandom(asupan), 'asupan.mp4', `*${htki} Ini Kak ASUPANNYA :V ${htka}*` , m)
}
handler.help = ['asupan']
handler.tags = ['hentai','premium'']
handler.command = /^xvid$/i
handler.owner = false
handler.mods = false
handler.premium = true
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.register = true

export default handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

const asupan = [

"https://pomf2.lain.la/f/kgpcdpj5.mp4",
"https://pomf2.lain.la/f/c8qs3gdu.mp4",
"https://pomf2.lain.la/f/f9tth48c.mp4",
"https://pomf2.lain.la/f/zhz6gva.mp4",
"https://pomf2.lain.la/f/u0xein3q.mp4",
"https://pomf2.lain.la/f/t38pov5z.mp4",
"https://pomf2.lain.la/f/m9klf3yb.mp4",
"https://pomf2.lain.la/f/ssaqsp3s.mp4",
"https://pomf2.lain.la/f/kgpcdpj5.mp4",
"https://pomf2.lain.la/f/ub4isx6k.mp4"

]
