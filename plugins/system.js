const config = require('../config');
const { cmd, commands } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');
const speedTest = require('speedtest-net'); 

cmd({
    pattern: "system",
    alias: ["status", "botinfo", "runtime", "uptime","ping"],
    desc: "Check uptime, RAM usage, network speed, and more",
    category: "main",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Calculate ping with delay
        const start = Date.now();
        await new Promise(resolve => setTimeout(resolve, 100)); // 100ms delay
        const end = Date.now();
        const ping = end - start;

        // RAM usage
        const totalRAM = Math.round(require('os').totalmem() / 1024 / 1024); // Total RAM in MB
        const usedRAM = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2); // Used RAM in MB
        const freeRAM = (totalRAM - parseFloat(usedRAM)).toFixed(2); // Free RAM in MB

        // Network speed test
        const speed = await speedTest({ acceptLicense: true });
        const downloadSpeed = (speed.download.bandwidth / 125000).toFixed(2); // Convert from bits/sec to MB/sec
        const uploadSpeed = (speed.upload.bandwidth / 125000).toFixed(2); // Convert from bits/sec to MB/sec

        let status = `*🕒 Uptime:* ${runtime(process.uptime())}
*📶 Ping:* ${ping} ms
*💾 RAM Usage:* 
- *Used*: ${usedRAM} MB
- *Free*: ${freeRAM} MB
- *Total*: ${totalRAM} MB
*🌐 Network Speed:*
- *Download*: ${downloadSpeed} MB/sec
- *Upload*: ${uploadSpeed} MB/sec
*🏠 HostName:* Ubuntu VPS
*👤 Owner:* Hashan 🫰😏
`;

        // URL of the image you want to include
        const imageUrl = 'https://telegra.ph/file/c8b2e77d86e36ca9414e8.jpg'; // Replace with your actual image URL

        // Send the image with the status as the caption
        await conn.sendMessage(from, {
            image: { url: imageUrl },
            caption: status
        }, { quoted: mek || null });

    } catch (e) {
        console.log(e);
        reply(`Error: ${e}`);
    }
});
