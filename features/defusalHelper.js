import Settings from '../config';

//const C0EPacketClickWindow = Java.type("net.minecraft.network.play.client.C0EPacketClickWindow");

function highlightItem(x, y, highlightColor) {
    Renderer.translate(0, 0, 0)
    Renderer.drawRect(highlightColor, x, y, 16, 16)
  }

register('renderItemIntoGui', (item, x, y) => {
    const inv = Player.getContainer();
    if (Settings.defusalHelper && item.getRegistryName() == "minecraft:redstone" && inv.name == '§cC4 (Click §4§lREDSTONE§c)') {
        highlightItem(x, y, Renderer.RED)
    }
})

// STILL WORKING ON THIS ONE HERE, GOING TO HAVE IT QUEUE CLICKS, MIGHT BAN
//register("guiMouseClick", (x, y, button, gui, event) => {
//    const inv = Player.getContainer();
//    const slot = Client.currentGui.getSlotUnderMouse();
//    if (slot != null) {
//        const item = slot.getItem();
//        const index = slot.getIndex();
//        const windowId = inv.getWindowId()
//        cancel(event);
//            if (item != null && item.getRegistryName() == "minecraft:redstone") {
//                Client.sendPacket(new C0EPacketClickWindow(windowId, index, button, 0, null, 0))
//            }
//    }   
//});

register("guiMouseClick", (x, y, button, gui, event) => {
    if (Settings.defusalHelper) {
        const inv = Player.getContainer();
        const slot = Client.currentGui.getSlotUnderMouse();
        if (slot != null) {
            const item = slot.getItem();
            if (item != null && item.getRegistryName() != "minecraft:redstone" && inv.name === '§cC4 (Click §4§lREDSTONE§c)' && Settings.defusalBlockClicks) {
                cancel(event)
            } else if (item != null && item.getRegistryName() === "minecraft:redstone" && inv.name === '§cC4 (Click §4§lREDSTONE§c)') {
                cancel(event)
                if (Settings.defusalMiddleClick) inv.click(slot.getIndex(), false, "MIDDLE")
            }
        }
    }
})