import Settings from '../config';

var arrows = false;
var playArrowSound = 0;

register("tick", () => {
  if (Settings.noArrows) {
    let container = Player.getContainer();
    if (container.contains(262) && container.getName() == "container") {
      arrows = true
    } 
  
    else if (arrows == true && !container.contains(262) && container.getName() == "container") {
      arrows = false
      playArrowSound = 3;
    }
  
    if (playArrowSound > 0) {
      World.playSound("random.bow", 1.0, 1.0);
      playArrowSound -= 1;
    }
  }

});
