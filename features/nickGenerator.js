import Settings from '../config';

let nick = "Max_Epic"

const bind = new KeyBind("Generate Nick", Keyboard.KEY_RETURN, "walter7addons")

bind.registerKeyPress(() => {
    ChatLib.command("nick help setrandom")

    bookListener.register();
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

        new Message([
            new TextComponent(`&aFound: &b&l${nick}&r&a: &r`),
            new TextComponent(`&a&l[ACCEPT]`)
                .setClick("run_command", `/nick actuallyset ${nick} respawn`)
        ]).chat();
    }).start();

    bookListener.unregister();

}).unregister();