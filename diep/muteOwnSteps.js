import Settings from "../config";

register("soundPlay", (pos, name, vol, pitch, cat, event) => {

    if (Settings.muteOwnSteps) {

        function distance(x1, y1, z1, x2, y2, z2) {
            return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) + Math.pow(z1 - z2, 2));
          }
    
          // console.log('hello!')
    
        if (!name.search("step")) {
          let dist = distance(pos.x, pos.y, pos.z, Player.getX(), Player.getY(), Player.getZ())
          if (dist < 0.001) {
            cancel(event);
          }
    }}
  })