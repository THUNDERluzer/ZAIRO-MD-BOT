const { cmd } = require('../command');
const fg = require('api-dylux');
const yts = require('yt-search');

// Helper function to format views
const formatViews = (views) => {
    if (views >= 1_000_000_000) {
        return `${(views / 1_000_000_000).toFixed(1)}B`;
    } else if (views >= 1_000_000) {
        return `${(views / 1_000_000).toFixed(1)}M`;
    } else if (views >= 1_000) {
        return `${(views / 1_000).toFixed(1)}K`;
    } else {
        return views.toString();
    }
};

// Voice recording URL
const voiceUrl = 'https://drive.google.com/uc?export=download&id=1_Pd4yQVfofr14xPMIOvebVGwoXh1rohu';

//========= Audio Download Command =========//

cmd({
    pattern: "song",
    react:"🎧",
    desc: "Download songs",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) {
            await conn.sendMessage(from, { audio: { url: voiceUrl }, mimetype: 'audio/mp4', ptt: true }, { quoted: mek });
            return;
        }

        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;

        let desc = `
 ~*𝙕𝘼𝙄𝙍𝙊 𝙈𝘿 𝘼𝙐𝘿𝙄𝙊 𝘿𝙊𝙒𝙉𝙇𝙊𝘼𝘿⤵⤵ 🎧*~

> 🎶 *𝗧𝗶𝘁𝗹𝗲*: _${data.title}_

> 👤 *𝗖𝗵𝗮𝗻𝗻𝗲𝗹*: _${data.author.name}_

> 📝 *𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻*: _${data.description}_

> ⏳ *𝗧𝗶𝗺𝗲*: _${data.timestamp}_

> ⏱️ *𝗔𝗴𝗼*: _${data.ago}_

> 👁️‍🗨️ *𝗩𝗶𝗲𝘄𝘀*: _${formatViews(data.views)}_

> 🔗 *𝗟𝗶𝗻𝗸*: ${url}

🎼𝘿𝙀𝙑𝙀𝙇𝙊𝙋𝙀𝙍 𝘽𝙔 𝙑𝙄𝙈𝘼𝙈𝙊𝘿𝙎`;

        // Send video details with thumbnail
        await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });

        // Add buttons for the user to confirm or cancel the download
        const buttons = [
            { buttonId: 'confirmDownload', buttonText: { displayText: 'Yes' }, type: 1 },
            { buttonId: 'cancelDownload', buttonText: { displayText: 'No' }, type: 1 }
        ];

        const buttonMessage = {
            contentText: 'Do you want to download the audio?',
            footerText: 'Confirm Download',
            buttons: buttons,
            headerType: 1
        };

        await conn.sendMessage(from, buttonMessage, { quoted: mek });

        // Wait for button response to download audio
        conn.ev.on('messages.upsert', async (message) => {
            try {
                const msg = message.messages[0];

                if (msg.message && msg.message.buttonsResponseMessage) {
                    const buttonId = msg.message.buttonsResponseMessage.selectedButtonId;

                    if (buttonId === 'confirmDownload') {
                        let down = await fg.yta(url);
                        let downloadUrl = down.dl_url;
                        await conn.sendMessage(from, { audio: { url: downloadUrl }, mimetype: "audio/mpeg" }, { quoted: mek });
                        await conn.sendMessage(from, { document: { url: downloadUrl }, mimetype: "audio/mpeg", fileName: `${data.title}.mp3`, caption: "𝘿𝙀𝙑𝙀𝙇𝙊𝙋𝙀𝙍 𝘽𝙔 𝙑𝙄𝙈𝘼𝙈𝙊𝘿𝙎" }, { quoted: mek });
                    } else if (buttonId === 'cancelDownload') {
                        reply("Download cancelled.");
                    }
                }
            } catch (error) {
                console.error("Error in message handling: ", error.message);
            }
        });

    } catch (e) {
        console.log(e);
        reply(`Error: ${e.message}`);
    }
});