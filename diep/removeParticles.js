import Settings from '../config';

let inBedwarsGame = false

register("spawnParticle", (particle, type, event) => {
    if (Settings.removeParticles) {
        if(type.toString() == "SMOKE") {
            return;
        }
    
        if (inBedwarsGame) {
            cancel(event);
        }
    }
})

register("chat", () => {
    title = Scoreboard.getTitle();
    title = title.replace(/[a-z0-9§]/g, "");
    if (title == "BED WARS") {
      inBedwarsGame = true;
    }
  }).setCriteria("Protect your bed and destroy the enemy beds.").setContains();