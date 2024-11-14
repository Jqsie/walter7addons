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
    if (title == "BED WARS" && findInScoreboard("Red:")) {
      inBedwarsGame = true;
    }
  }).setCriteria("Protect your bed and destroy the enemy beds.").setContains();

function findInScoreboard(str) {
    let found = false;
    let lines = Scoreboard.getLines();
    for (let i = 0; i < lines.length; i++) {
      if (lines[i]) {
        if ((ChatLib.removeFormatting(lines[i].toString()).search(str) != -1)) {
          found = true;
          return found;
        }
      }
    }
    return found;
  }