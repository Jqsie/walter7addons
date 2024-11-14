import Settings from '../config';

var inLuckyGame = false;

register("spawnParticle", (particle, type, event) => {
  if (Settings.luckyBlockFix) {
    if(type.toString() != "SPELL_WITCH" && type.toString() != "NOTE") {
      return;
    }

    if (inLuckyGame) {
        cancel(event);
    }
  }
  });
  
  register("renderTitle", (title, subtitle, event) => {
    if (Settings.luckyBlockFix) {
      let x = ChatLib.removeFormatting(title);
      if (x == "SkyWars Laboratory" || x == "Lucky Rule" || x == "Ninja mode!") {
        cancel(event);
      }
    }
  });

  register("worldLoad", () => {
    inLuckyGame = false;
  });

  register("chat", () => {
    if (findInScoreboard("Lab: Luc")) {
      inLuckyGame = true;
      ChatLib.chat(inLuckyGame);
    }
  }).setCriteria("Cages opened! FIGHT!")

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