import Settings from '../config';

register("spawnParticle", (particle, type, event) => {
  
    if(type.toString() != "SPELL_WITCH" && type.toString() != "NOTE") {
      return;
    }
  
    var luckyBlock = false;
    var lines = Scoreboard.getLines();
    if (Settings.luckyBlockFix) {
        for (let i = 0; i < lines.length; i++) {
            if (lines[i]) {
              if ((ChatLib.removeFormatting(lines[i].toString()).search("Lab: Luc") != -1)) {
                luckyBlock = true;
                break
        
              }
            }
        }
    }
    if (luckyBlock) {
        cancel(event);
    }
  });
  
  
  register("soundPlay", (pos, name, vol, pitch, cat, event) => {
  
    if (cat) {
      if (cat.toString() != "RECORDS") {
        return
      }
    }
  
    var luckyBlock = false;
    var lines = Scoreboard.getLines();
    if (Settings.luckyBlockFix) {
        for (let i = 0; i < lines.length; i++) {
            if (lines[i]) {
                if ((ChatLib.removeFormatting(lines[i].toString()).search("Lab: Luc") != -1)) {
                luckyBlock = true;
                break
                }
            }
        }
    }
  
    if (cat) {
      if (luckyBlock) {
        if (Math.abs(pos.x - Player.getX()) <= 1.0 && Math.abs(pos.y - Player.getY()) <= 1.0 && Math.abs(pos.z - Player.getZ()) <= 1.0) {
          print(`Pos: ${pos.toString()} Name: ${name.toString()} Vol: ${vol.toString()} Pitch: ${pitch.toString()}`);
          cancel(event);
        }
        
      }
    }
     
    
  });
  
  register("renderTitle", (title, subtitle, event) => {
    if (Settings.luckyBlockFix) {
    var x = ChatLib.removeFormatting(title);
    if (x == "SkyWars Laboratory" || x == "SkyWars" || x == "Lucky Rule" || x == "Ninja Mode") {
      cancel(event);
    } else {
      if (!titleList.includes(x)) {
        print(x);
        titleList.push(x);
      }
      
    }
    }
  });