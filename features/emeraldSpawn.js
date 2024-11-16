import Settings from '../config';

let inBedwarsGame = false;
let timeSinceGameStart = 0;
let timeUntilEmerald = -1;
let spawnCount = 0;
let mode = ""
let stage = 1;



register("step", () => {
    if (Settings.emeraldTimer) {
        if (!inBedwarsGame) {
            return;
        }

        if (timeSinceGameStart == 1) {
            stage = 1;
            timeUntilEmerald = 30;
        }

        else if (timeSinceGameStart == 720) {
            stage = 2;
            timeUntilEmerald = 0;
        }

        else if (timeSinceGameStart == 1440) {
            stage = 3;
            timeUntilEmerald = 0;
        }

        if (timeUntilEmerald == 0) {
            spawnCount++;
            if (stage == 1) {
                if (mode == "doubles") {
                    timeUntilEmerald = 65;
                }
                else if (mode == "fours") {
                    timeUntilEmerald = 55;
                }
            }

            else if (stage == 2) {
                if (mode == "doubles") {
                    timeUntilEmerald = 50;
                }
                else if (mode == "fours") {
                    timeUntilEmerald = 40;
                }
            }

            else if (stage == 3) {
                if (mode == "doubles") {
                    timeUntilEmerald = 35;
                }
                else if (mode == "fours") {
                    timeUntilEmerald = 27;
                }
            }
        }

        updateScoreboard();
        timeUntilEmerald--;
        timeSinceGameStart++;
    }
}).setFps(1);


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
    spawnCount = 0;
});

function updateScoreboard() {
    Scoreboard.setLine(0, `§2Emeralds (${spawnCount}): ${timeUntilEmerald.toString()}`, true)
}

function bedwarsCheck () {
    title = Scoreboard.getTitle();
    title = ChatLib.removeFormatting(title)
    if (title == "BED WARS") {
      inBedwarsGame = true;
      timeSinceGameStart = 1; // 1 instead of 0 because of Thread.sleep(1000)
      if (findInScoreboard("Pink")) {
        mode = "doubles"
      } 
      else {
        mode = "fours"
      }
}}

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