import Settings from '../config';
import { drawCoolWaypoint, trace } from '../util/renderUtil'

const EntityArmorStandClass = Java.type('net.minecraft.entity.item.EntityArmorStand').class;
let iceDetected = false
let iceX = 0
let iceY = 0
let iceZ = 0

register("step", () => {
    if (Settings.glacialCave) {
        entities = World.getAllEntitiesOfType(EntityArmorStandClass)
        let j = 0
        for (i = 0; i < entities.length; i++) {
                let bootName = new EntityLivingBase(entities[i].getEntity()).getItemInSlot(4)?.getRegistryName()
                if (bootName != null) {
                    let bootNBTName = new EntityLivingBase(entities[i].getEntity()).getItemInSlot(4)?.getItemNBT()?.getCompoundTag("tag")?.getCompoundTag("ExtraAttributes").getString("id")
                    if (bootNBTName == "ENCHANTED_PACKED_ICE" && !iceDetected) {
                        j = 100000
                        iceX = Math.floor(entities[i].getX())
                        iceY = Math.floor(entities[i].getY()) + 2
                        iceZ = Math.floor(entities[i].getZ())
                    } else if (bootNBTName != "ENCHANTED_PACKED_ICE") {
                        j = j+1
                    } else if (bootNBTName == "ENCHANTED_PACKED_ICE" && iceDetected) {
                        j = -10000
                        iceX = Math.floor(entities[i].getX())
                        iceY = Math.floor(entities[i].getY()) + 2
                        iceZ = Math.floor(entities[i].getZ())
        
                    }
                }
        }
        if (j < 0) {
            iceDetected = true
        } else if (j > 0 && j < 100000) {
            iceDetected = false
        } else if (j >= 100000) {
            iceDetected = true
            Client.showTitle("§bIce Detected", "", 0, 60, 0)
            new Thread(() => {
                World.playSound("note.pling", 1.0, 1.0)
                Thread.sleep(200)
                World.playSound("note.pling", 1.0, 1.0)
                Thread.sleep(200)
                World.playSound("note.pling", 1.0, 1.0)
            }).start()
        }
    }
}).setFps(1)

register("renderWorld", () => {
    if (iceDetected) {
        drawCoolWaypoint(iceX, iceY, iceZ, 0, 255, 0, { name: "ICE", phase: true })
        trace(iceX + 0.5, iceY + 0.5, iceZ + 0.5, 0, 1, 0, 1, 1)
    }
})
