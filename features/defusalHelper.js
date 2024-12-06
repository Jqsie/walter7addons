import Settings from '../config';

let inCustomGui = false

const C0EPacketClickWindow = Java.type("net.minecraft.network.play.client.C0EPacketClickWindow");


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

register("guiMouseClick", (x, y, button, gui, event) => {
    if (Settings.defusalHelper && !Settings.defusalCustomGui) {
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

register(net.minecraftforge.client.event.GuiScreenEvent.DrawScreenEvent.Pre, event => {
    const inv = Player.getContainer();
    const windowSize = 54

    if (!inv) return;

    if (inv.name == "§cC4 (Click §4§lREDSTONE§c)" && Settings.defusalCustomGui) {
        inCustomGui = true
        clickTrigger.register();
        cancel(event);
        const screenWidth = Renderer.screen.getWidth();
        const screenHeight = Renderer.screen.getHeight();

        const width = 9 * 18 * 1.3
        const height = 9 * 18

        offsetX = screenWidth / 2 - width / 2
        offsetY = screenHeight / 2 - height / 2

        const title = "§cC4 (Click §4§lREDSTONE§c)"

        Tessellator.pushMatrix();
        Renderer.scale(1, 1);
        Renderer.drawRect(Renderer.color(0, 0, 0, 80), offsetX - 6, offsetY - 6, width + 10, height + 10);
        Renderer.scale(1, 1)
        Renderer.drawStringWithShadow(title, offsetX, offsetY);
        for (let i = 0; i < windowSize; ++i) {
            let currentOffsetX = i % 9 * 24 + offsetX - 3;
            let currentOffsetY = Math.floor(i / 9) * 24 + offsetY - 3;
            if (inv.getStackInSlot(i) == null) {
                let squareColor = Renderer.color(82, 255, 82, 220);
                Renderer.scale(1, 1);
                Renderer.drawRect(squareColor, currentOffsetX, currentOffsetY + 22, 22, 22);
            } else if (inv.getStackInSlot(i).getRegistryName() != "minecraft:redstone") {
                let squareColor = Renderer.color(0, 0, 0, 160);
                Renderer.scale(1, 1);
                Renderer.drawRect(squareColor, currentOffsetX, currentOffsetY + 22, 22, 22);
            } else if (inv.getStackInSlot(i).getRegistryName() == "minecraft:redstone") {
                let squareColor = Renderer.color(255, 82, 82, 220);
                Renderer.scale(1, 1);
                Renderer.drawRect(squareColor, currentOffsetX, currentOffsetY + 22, 22, 22);
            }
    }
        Tessellator.popMatrix();

        var checkCompletion = true
        for (let i = 0; i < windowSize; ++i) {
            if (inv.getStackInSlot(i) == null || inv.getStackInSlot(i).getRegistryName() != "minecraft:redstone") {
                continue
            } else if (inv.getStackInSlot(i) != null || inv.getStackInSlot(i).getRegistryName() == "minecraft:redstone") {
                checkCompletion = false
            }
        }

        if (checkCompletion) {
            clickTrigger.unregister();
            inCustomGui = false

        }

}
})

const clickTrigger = register("guiMouseClick", (x, y, button, gui, event) => {
    if (inCustomGui) {
        cancel(event)
        const inv = Player.getContainer();
        const windowId = inv.getWindowId();
        const screenWidth = Renderer.screen.getWidth();
        const screenHeight = Renderer.screen.getHeight();
        const windowSize = 54
    
        const width = 9 * 18 * 1.3
        const height = 9 * 18
    
        const offsetX = screenWidth / 2 - width / 2
        const offsetY = screenHeight / 2 - height / 2
    
        for (let i = 0; i < windowSize; ++i) {
            let currentOffsetX = i % 9 * 24 + offsetX - 3;
            let currentOffsetY = Math.floor(i / 9) * 24 + offsetY - 3;
            if (x >= currentOffsetX && x <= currentOffsetX + 22 && y >= currentOffsetY + 22 && y <= currentOffsetY + 44) {
                slotClicked = i
                if (inv.getStackInSlot(i) != null && inv.getStackInSlot(i).getRegistryName() == "minecraft:redstone") {
                    click(slotClicked, windowId)
                }
            }
        }
    } else {
        return
    }
}).unregister();

register("guiClosed", () => {
    if (inCustomGui) {
        inCustomGui = false
        clickTrigger.unregister();
    }
})

function click(slot, windowId) {
    Client.sendPacket(new C0EPacketClickWindow(windowId, slot, 2, 3, null, 0))
}
