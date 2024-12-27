import Settings from '../config';
import request from "../../requestV2"

let nick = "Max_Epic"
const regex = /\bmax_[a-z]+\b/i;

const bind = new KeyBind("Generate Nick", Keyboard.KEY_RETURN, "walter7addons")

bind.registerKeyPress(() => {
    if (Settings.nickGenerator) {
        ChatLib.command("nick help setrandom")
        bookListener.register();
    }
})

const bookListener = register("guiOpened", () => {
    new Thread(() => {
        Thread.sleep(1);
        openedGui = Client.currentGui.getClassName();
        if (!openedGui) return;
        let pages = Client.currentGui.get().field_146483_y;
        if (!pages) return;
        pages = JSON.parse(pages.func_150307_f(0)).filter((i) => i.length > 1);
        const nick = ChatLib.removeFormatting(pages[1]);
        Client.currentGui.close();

        if (Settings.displayTitle) {
            if (nick.match(regex)) {
                Client.showTitle(`&d${nick}`, "", 0, 100, 0)
                new Thread(() => {
                    World.playSound("note.pling", 1.0, 1.0)
                    Thread.sleep(200)
                    World.playSound("note.pling", 1.0, 1.0)
                    Thread.sleep(200)
                    World.playSound("note.pling", 1.0, 1.0)
                }).start()
            } else { Client.showTitle(`&b${nick}`, "", 0, 100, 0) }
            
        }
        
        new Message([
            new TextComponent(`&8Found: &b&l${nick}&r `),
            new TextComponent(`&a&l[ACCEPT] `)
                .setHoverValue(`&aChange your nick to &r&b${nick}&r&a.`)
                .setClick("run_command", `/nick actuallyset ${nick} respawn`),
            new TextComponent(`&d&l[CHECK CAPE]`)
                .setHoverValue(`&aChecks to see if &r&b${nick}&r&a has a cape. Don't use this too often.`)
                .setClick("run_command", `/findcape ${nick}`)
        ]).chat();
    }).start();

    bookListener.unregister();

}).unregister();

register("command", (username) => {
    if (username == undefined) { ChatLib.chat(`&8Requires a username!`); return }
    request({
        url: `https://api.mojang.com/users/profiles/minecraft/${username}`,
        json: true
    })
    .then(() => {
        request({
            url: `https://api.capes.dev/load/${username}/optifine`,
            json: true
        })
        .then((capeRes) => {
            if (!capeRes["exists"]) { ChatLib.chat(`&b${username} &r&8likely has no cape.`) }
            if (capeRes["exists"]) { ChatLib.chat(`&b${username} &r&8has an &r&dOptifine &r&8cape!`) }
        })
        .catch(err => {
            ChatLib.chat(`&b${username} &r&8likely has no cape.`)
        })
    })
    .catch(err => {
        ChatLib.chat(`&b${username} &r&8 does not exist!`)
    })
}).setName("findcape")

register("chat", (event) => {
    cancel(event)
}).setChatCriteria("Generating a unique random name. Please wait...")