import Settings from '../config';

let inBedwarsGame = false
let entities = [];
let players = [];
const EntityArmorStand = Java.type("net.minecraft.entity.item.EntityArmorStand")

register("spawnParticle", (particle, type, event) => {
    if (Settings.removeParticles) {
        if(type.toString() != "REDSTONE" && type.toString() != "CLOUD") {
            return;
        }

        if (inBedwarsGame && type.toString() == "REDSTONE" && Settings.removeGlyphs) {
            for (i = 0; i < entities.length; i++) {  
                for (j = 0; j < players.length; j++) {
                    if (entities[i].distanceTo(particle) < 7 && players[j].distanceTo(particle) > 3) {
                        cancel(event);
                        return;
                    }                 
                }
            }
        }

        if (inBedwarsGame && type.toString() == "CLOUD" && Settings.removeSponge) {
            cancel(event);
            return;
        }
    }
})

register("chat", () => {
    title = Scoreboard.getTitle();
    title = title.replace(/[a-z0-9§]/g, "");
    if (title == "BED WARS") {
      inBedwarsGame = true;
    }
  }).setCriteria("Protect your bed and destroy the enemy beds." || "You will respawn because you still have a bed!").setContains();

register("chat", () => {
    entities = World.getAllEntities();
    console.log(entities)
}).setCriteria("hello!").setContains();

register("step", () => {
    entities = World.getAllEntitiesOfType(EntityArmorStand.class).filter(a => a?.getName() == "Armor Stand" && a.isInvisible())
    players = World.getAllPlayers();
}).setDelay(2);