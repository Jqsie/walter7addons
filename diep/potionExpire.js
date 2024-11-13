import Settings from "../config";

register("tick", () => {
  if (Settings.jumpBoostReminder) {
    let potions = Player.getActivePotionEffects();
    for (i = 0; i < potions.length; i++) {
      if (potions[i].getName() == "potion.jump") {
        let d = potions[i].getDuration();
        if (d == 12 || d == 22) {
          World.playSound("mob.rabbit.hurt", 1.0, 1.0)
        }
        else if (d == 2) {
          World.playSound("mob.rabbit.death", 1.0, 1.0)
        }
      }
    }
  }

});