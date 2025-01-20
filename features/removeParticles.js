import Settings from '../config';

let inBedwarsGame = false
let players = [];

register("spawnParticle", (particle, type, event) => {
    if (Settings.removeParticles) {
        if(type.toString() != "REDSTONE" && type.toString() != "CLOUD") {
            return;
        }

        if (inBedwarsGame && type.toString() == "REDSTONE" && Settings.removeGlyphs) {
            for (j = 0; j < players.length; j++) {
                if (players[j].distanceTo(particle) < 3) {
                    return;
                }                 
            }
            cancel(event);
        }

        if (inBedwarsGame && type.toString() == "CLOUD" && Settings.removeSponge) {
            cancel(event);
            return;
        }
    }
})

register("chat", () => {
    new Thread(() => {
        Thread.sleep(1000);
        bedwarsCheck();
    }).start()
    }
  ).setCriteria("Protect your bed").setContains();

  register("chat", () => {
    new Thread(() => {
        Thread.sleep(1000);
        bedwarsCheck();
    }).start()
  }).setCriteria("You will respawn because you still have a bed!").setContains();

register("worldLoad", () => {
    inBedwarsGame = false;
})

register("step", () => {
    players = World.getAllPlayers();
}).setDelay(2);

function bedwarsCheck () {
    title = Scoreboard.getTitle();
    title = ChatLib.removeFormatting(title)
    if (title == "BED WARS") {
      inBedwarsGame = true;
}}