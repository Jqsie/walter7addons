import Settings from '../config';

const C07PacketPlayerDigging = Java.type("net.minecraft.network.play.client.C07PacketPlayerDigging")

register("packetSent", (packet, event) => {
    if (Settings.blockDropping) {
        const item = Player.getHeldItem();
        if (item != null) {
            var itemName = item.getRegistryName()
        }
        const status = packet.func_180762_c() // getStatus
        if (Settings.blockDropping && status == "DROP_ITEM" && item != null) {
            if (Settings.blockSwords && item.getRegistryName().includes("sword")) {
                cancel(event)
            } else if (Settings.blockBows && itemName == "minecraft:bow") {
                cancel(event)
            } else return
        }
    }

}).setFilteredClass(C07PacketPlayerDigging)

