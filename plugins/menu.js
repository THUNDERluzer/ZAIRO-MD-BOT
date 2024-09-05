const config = require('../config')
const {cmd, commands} = require('../command')
const os = require("os")
const {runtime} = require('../lib/functions')

cmd({
    pattern: "menu",
    alias: ["panel","penal","list","allmenu"],
    react: "🫰",
    desc: "Check menu all",
    category: "main",
    filename: __filename
}, async (conn, mek, m, {from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
    try {
        // RAM usage
        const totalRAM = Math.round(require('os').totalmem() / 1024 / 1024); // Total RAM in MB
        const usedRAM = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2); // Used RAM in MB
        const freeRAM = (totalRAM - parseFloat(usedRAM)).toFixed(2); // Free RAM in MB

        let status = `*✸𝕎𝔼𝕃ℂ𝕆𝕄𝔼 𝕋𝕆 𝕄𝔻 𝔹𝕆𝕋✸*

> *Uptime:* ${runtime(process.uptime())}

> *Used*: ${usedRAM} MB

> *Free*: ${freeRAM} MB

> *Total*: ${totalRAM} MB

> *Owner:* 𝚅𝙸𝙼𝙰𝙼𝙾𝙳𝚂


*OWNERMENU⤵*
_.getsession_
_.deletesession_
_.join_
_.shutdown_
_.restart_
_.autoreadmsg_
_.autoreadcmd_
_.autotyping_
_.autorecording_
_.autobio_
_.autostatusview_
_.autostatussave_
_.mode_
_.block_
_.unblock_
_.ban_
_.unban_
_.backup_
_.addowner_
_.delowner_
_.ping_
_.system_

*GROUPMENU⤵*
_.closetime_
_.opentime_
_.kick_
_.add_
_.promote_
_.demote_
_.setdesc_
_.setppgc_
_.tagall_
_.hidetag_
_.totag_
_.admintag_
_.group_
_.grouplink_
_.antilink_
_.antibot_
_.antiword_
_.antispam_
_.antidelete_
_.antiviewone_

*CONTACTMENU⤵*
_.stickers_
_.smeme_
_.take_
_.toimage_
_.tovideo_
_.toaudio_
_.tomp3_
_.imgtolink_

*DOWNLOADMENU⤵*
_.play_
_.song_
_.video_
_.fb_
_.tiktok_
_.insta_
_.modeapk_
_.googledrive_

*AIMENU⤵*
_.ai_
_.gemini_
_.gpt3_

*✸ 𝕄𝔻 𝔹𝕆𝕋✸*`

        // URL of the image you want to include
        const imageUrl = 'https://ibb.co/L86DZLX'; // Replace with your actual image URL

        // Send the image with the status as the caption
        await conn.sendMessage(from, {
            image: { url: imageUrl },
            caption: status
        }, { quoted: mek || null });
        
    } catch (e) {
        console.log(e)
        reply(`Error: ${e}`)
    }
})
