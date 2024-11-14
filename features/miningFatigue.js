import Settings from "../config";

register("tick", () => {
  if (Settings.miningFatigueReminder) {
    let potions = Player.getActivePotionEffects();
    for (i = 0; i < potions.length; i++) {
      if (potions[i].getName() == "potion.digSlowDown") {
        let d = potions[i].getDuration();
        if (d == 198) {
          World.playSound("note.pling", 1.0, 2.0)
          Client.showTitle("§bMining Fatigue", "", 0, 20, 0)
        }
        else if (d == 2 || d == 6) {
          World.playSound("note.pling", 0.5, 1.3)
        }
      }
    }
  }

});