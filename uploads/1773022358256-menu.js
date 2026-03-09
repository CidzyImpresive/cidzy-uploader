// handle/menu.js
import menuProxy, { loadMenuOnce } from "../database/menu.js";
import { convertToJid } from "../lib/utils.js";
import { getProfilePictureUrl } from "../lib/cache.js";
import config from "../config.js";
import { readFileAsBuffer } from "../lib/fileHelper.js";
import { reply, style, getCurrentDate, readMore } from "../lib/utils.js";
import { isOwner, isPremiumUser } from "../lib/users.js";
import fs from "fs/promises";
import path from "path";

// konstanta
const linkGroup = "https://www.whatsapp.com/channel/0029VaDSRuf05MUekJbazP1D";
const AUDIO_MENU = false;
const soundCidzy = "cidzy.opus"; // ./database/audio
const c1 = "https://raw.githubusercontent.com/CidzyImpresive/cidzy-uploader/main/uploads/1772915432434-image_1772915432417.jpg";
const c2 = "https://raw.githubusercontent.com/CidzyImpresive/cidzy-uploader/main/uploads/1772932813386-image_1772932813366.jpg";

function styleText(text) {
  if (typeof text !== 'string') return text;
  const map = {
    a:'ᴀ',b:'ʙ',c:'ᴄ',d:'ᴅ',e:'ᴇ',f:'ғ',g:'ɢ',h:'ʜ',i:'ɪ',j:'ᴊ',
    k:'ᴋ',l:'ʟ',m:'ᴍ',n:'ɴ',o:'ᴏ',p:'ᴘ',q:'ǫ',r:'ʀ',s:'s',
    t:'ᴛ',u:'ᴜ',v:'ᴠ',w:'ᴡ',x:'x',y:'ʏ',z:'ᴢ',
    A:'ᴀ',B:'ʙ',C:'ᴄ',D:'ᴅ',E:'ᴇ',F:'ғ',G:'ɢ',H:'ʜ',I:'ɪ',
    J:'ᴊ',K:'ᴋ',L:'ʟ',M:'ᴍ',N:'ɴ',O:'ᴏ',P:'ᴘ',Q:'ǫ',R:'ʀ',
    S:'s',T:'ᴛ',U:'ᴜ',V:'ᴠ',W:'ᴡ',X:'x',Y:'ʏ',Z:'ᴢ'
  };
  return text.split('').map(v => map[v] || v).join('');
}

async function getGreeting() {
  const now = new Date();
  const wibHours = (now.getUTCHours() + 7) % 24;

  let fileName;
  if (wibHours >= 5 && wibHours <= 10) fileName = soundCidzy;
  else if (wibHours >= 11 && wibHours < 15) fileName = soundCidzy;
  else if (wibHours >= 15 && wibHours <= 18) fileName = soundCidzy;
  else if (wibHours > 18 && wibHours <= 19) fileName = soundCidzy;
  else fileName = soundCidzy;

  try {
    return await fs.readFile(
      path.join(process.cwd(), "database", "audio", fileName)
    );
  } catch (err) {
    console.error("Error reading audio file:", err);
    return null;
  }
}

const formatMenu = (title, items, prefix) => {
  const formattedItems = items.map((item) => {
    if (typeof item === "string") return `┊┊ ׁ𔘓 ${item}`;
    if (typeof item === "object" && item.command && item.description)
      return `┊┊ ׁ𔘓 ${item.command} ${item.description}`;
    return "┊┊ ׁ𔘓 [Invalid item]";
  });

  return `╭╮━━━━━━━━━━━━━━━━━━━┓\n┆┊. 『 *${title.toUpperCase()}* 』\n┆┊\n${formattedItems.join(
    "\n"
  )}\n┆╰─── • ┈ ┈ ୨♡୧  ┈ ┈ • ───\n╰━━━━━━━━━━━━━━━━━━━━┛`

};

async function handle(sock, messageInfo) {
  const { m, remoteJid, pushName,prefix, sender, content, command, message } =
    messageInfo;

  const roleUser = isOwner(sender)
    ? "Owner"
    : isPremiumUser(sender)
    ? "Premium"
    : "user";

  const date = getCurrentDate();
  const category = (content || "").toLowerCase();

  // --- pastikan menu sudah ter-load ---
  const menuData = await loadMenuOnce();

  let response;
  let result;

  if (category && menuData[category]) {
    response = formatMenu(category.toUpperCase(), menuData[category]);
    result = await reply(m, style(response) || "Failed to apply style.");
      
      } else if (command === "menu") {

const buffer = await readFileAsBuffer("@assets/autoresbot.jpg");
          
const senderJid = await convertToJid(sock, sender)
const number = senderJid.split("@")[0]

// ambil foto profil
let profilePic = "";
    try {
        profilePic = await sock.profilePictureUrl(sender, 'image');
    } catch {
        profilePic = "https://telegra.ph/file/9d8373b6d6614b39c2c43.jpg";
    }
          
const fq = {
  key: {
    remoteJid: "status@broadcast",
    fromMe: false,
    id: "FAKE_STATUS",
    participant: sender
  },
  message: {
    contactMessage: {
      displayName: pushName,
      jpegThumbnail: profilePic,
      vcard: `BEGIN:VCARD
VERSION:3.0
FN:${pushName}
TEL;type=CELL;waid=${number}:${number}
END:VCARD`
    }
  }
};

response = `
\*ʜᴇʟʟᴏ ${pushName} 🫪\*
\*ɪ ᴀᴍ ᴄɪᴅᴢʏ-ʙᴏᴛ, ʀᴇᴀᴅʏ ᴛᴏ ʀᴜɴ ᴡʜᴀᴛ ʏᴏᴜ ᴄᴏᴍᴍᴀɴᴅ, ʙᴏᴛ ᴠᴇʀꜱɪᴏɴ 5.1.0, ᴏᴡɴᴇʀ ᴀʟꜱᴏ ꜱᴇʟʟꜱ ʀᴇɴᴛᴀʟ ʙᴏᴛ ᴏʀ ᴘʀᴇᴍɪᴜᴍ ᴀᴘᴘʟɪᴄᴀᴛɪᴏɴꜱ.\*

\*porto :\* https://myporto-cityo.vercel.app
\*library :\* @elrayyxml/baileys
`;
    const buttons = [
      {
        buttonId: "action",
        buttonText: { displayText: styleText("ᴍᴀɪɴ ᴄᴏᴜʀsᴇ") },
        type: 4,
        nativeFlowInfo: {
          name: "single_select",
          paramsJson: JSON.stringify({
            title: styleText("ᴛᴀᴘ ʜᴇʀᴇ"),
            sections: [
              {
                title: styleText("ᴍᴀɪɴ ᴄᴏᴜʀsᴇ"),
                rows: [{ title: styleText("sʜᴏᴡ ᴀʟʟᴍᴇɴᴜ"), id: `${prefix}allmenu` }]
              },
              {
                title: styleText("ᴍᴇɴᴜ ᴋᴀᴛᴇɢᴏʀɪ"),
                rows: Object.keys(menuData).map(key => ({
                  title: styleText(key.toUpperCase()),
                  description: styleText(`ᴍᴇɴᴜ ${key}`),
                  id: `${prefix}menu ${key}`
                }))
              }
            ]
          })
        }
      },
    ];
          
    await sock.sendMessage(
      remoteJid,
      {
         document: buffer,
  mimetype: "image/jpeg",
  fileName: "ᴄɪᴅ-ᴍᴇɴᴜ.ʙᴏᴛ </>",
  fileLength: 109951162777600,
  pageCount: 1,
  jpegThumbnail: buffer,
        caption: response,
        footer: "cidzy bot",
        buttons,
        headerType: 4,
        contextInfo: {
          mentionedJid: [sender],
          externalAdReply: {
            title: `Cidzy 5.1.0`,
            body: "Whatsapp Automation",
            sourceUrl: linkGroup,
            thumbnailUrl: c2,
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      },
      { quoted : fq }
    );                 
      
  } else if (command === "allmenu") {
    response = `
╭╮━━━━━━━━━━━━━━━━━━━┓
┆┊.   ︶꒷꒦︶ ๋࣭ ⭑ ꒰ᐢ. .ᐢ꒱ ⭑. ๋ ︶꒷꒦︶ 
┆┊.             𝐀𝐋𝐋 𝐌𝐄𝐍𝐔
┆┊          ︶︶︶  ୨୧  ︶︶︶ 
┆┆៶៲៸ ֹ   *${pushName || "Unknown"}*
┆┆៶៲៸ ֹ   *${roleUser}*
┆┆៶៲៸ ֹ   *${date}*
┆┆.   ︶꒷꒦︶ ๋࣭ ⭑ ꒰ᐢ. .ᐢ꒱ ⭑. ๋ ︶꒷꒦︶
┆╰─── • ┈ ┈ ୨♡୧  ┈ ┈ • ───
╰━━━━━━━━━━━━━━━━━━━━┛
${readMore()}
${Object.keys(menuData)
  .map((key) => formatMenu(key.toUpperCase(), menuData[key]))
  .join("\n\n")}`;

    const buffer = await readFileAsBuffer("@assets/allmenu.jpeg");

    result = await sock.sendMessage(
      remoteJid,
      {
        text: style(response),
        contextInfo: {
          externalAdReply: {
            showAdAttribution: false,
            title: `Halo ${pushName}`,
            body: `Cidzy ${global.version}`,
            thumbnail: buffer,
            jpegThumbnail: buffer,
            thumbnailUrl: linkGroup,
            sourceUrl: linkGroup,
            mediaType: 1,
            renderLargerThumbnail: true,
          },
        },
      },
      { quoted: message }
    );
  }

  // Kirim audio jika allmenu atau menu tanpa kategori
  if (command === "allmenu" || (command === "menu" && !category)) {
    if (AUDIO_MENU) {
      const audioBuffer = await getGreeting();
      if (audioBuffer) {
        await sock.sendMessage(
          remoteJid,
          { audio: audioBuffer, mimetype: "audio/mp4", ptt: true, },
          { quoted: result }
        );
      }
    }
  }
}

export default {
  Commands: ["menu", "allmenu"],
  OnlyPremium: false,
  OnlyOwner: false,
  handle,
};
