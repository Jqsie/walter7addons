import Settings from "../config";

let corpsesDetected = true
let dontWarp = false
let lapis = 0
let vanguard = 0
let corpses = 0

function lapisMineshaft() {
    new Thread(() => {
        ChatLib.command(`pc !pt`)
        Thread.sleep(1000)
        ChatLib.command(`pc [W7] There are ${lapis} Lapis Corpses in my Mineshaft! Warping in 5s... (type !c to cancel)`);
        Thread.sleep(5000)
        if (!dontWarp) {
            ChatLib.command(`p warp`)
        } else if (dontWarp) {
            ChatLib.command(`pc [W7] Warp aborted.`)
        }
    }).start()
}

function vanguardMineshaft() {
    new Thread(() => {
        ChatLib.command(`pc !pt`)
        Thread.sleep(1000)
        ChatLib.command(`pc [W7] There is a Vanguard Corpse in my Mineshaft! Warping in 5s... (type !c to cancel)`)
        Thread.sleep(5000)
        if (!dontWarp) {
            ChatLib.command(`p warp`)
        } else if (dontwarp) {
            ChatLib.command(`pc [W7] Warp aborted.`)
        }
    }).start()
}

register("chat", (diep) => {
    dontWarp = true
    console.log("warping off")
}).setCriteria("!c").setContains();

register("chat", (diep) => {
    dontWarp = false
    corpsesDetected = false
    console.log("warping on")
}).setCriteria("WOW! You found a Glacite Mineshaft portal!").setContains();

register("renderWorld", () => {

    if (Settings.mineshaftParty && !corpsesDetected) {
        const tabList = TabList.getNames();
        // console.log(tabList)
        for(var i=0; i < tabList.length; i++) {
            if (tabList[i].includes("§r§9Lapis§r§f:")) {
                lapis++;
                corpses++
                console.log(`corpses:${corpses}`)
                console.log(`lapis:${lapis}`)
                corpsesDetected = true
            }
            else if (tabList[i].includes("Vanguard§r§f:")) {
                vanguard++;
                corpses++
                console.log(`corpses:${corpses}`)
                console.log(`vanguard:${vanguard}`)
                corpsesDetected = true
            }
            else if (tabList[i].includes("§r§c§lNOT LOOTED§r")) {
                corpses++
                console.log(`corpses:${corpses}`)
                corpsesDetected = true
            }
        }
    
    if (lapis == 2 || lapis == 4) {
        if (Settings.mineshaftPartySetting == 0 || Settings.mineshaftPartySetting == 2) {
            lapis = 0
            vanguard = 0
            corpses = 0
            corpsesDetected = true
            lapisMineshaft();
    }} else if (vanguard == 1 && Settings.mineshaftPartySetting == 1) {
            lapis = 0
            vanguard = 0
            corpses = 0
            corpsesDetected = true
            vanguardMineshaft();
    } else if (corpses == 0 && Settings.mineshaftParty == 1) {
            corpsesDetected = false
    } else {
        lapis = 0
        vanguard = 0
        corpses = 0
        corpsesDetected = true
    }

    }
})