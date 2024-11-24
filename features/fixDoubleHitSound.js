import Settings from '../config';

register("soundPlay", (pos, name, vol, pitch, cat, event) => {
    if (Settings.fixDoubleHitSound) {
        let dist = distance(pos.x, pos.y, pos.z, Player.getX(), Player.getY(), Player.getZ())
        if (pitch == 1.0 && dist < 0.001) {
            cancel(event)
        }
    }
}).setCriteria("game.player.hurt")

function distance(x1, y1, z1, x2, y2, z2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) + Math.pow(z1 - z2, 2));
  }