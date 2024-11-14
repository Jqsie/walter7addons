import Settings from '../config';

var t = 0.0;
let movingFOV = false;

register("step", (diep) => {
    if (Settings.dynamicFOV) {
        t += 1.0/60.0;
        Client.settings.setFOV(Math.abs(Math.sin(t) * 110.0) + 1.0);
        movingFOV = true;
    }
  }).setFps(60);

register("step", (diep) => {
    if (movingFOV && !Settings.dynamicFOV) {
        Client.settings.setFOV(Settings.previousFOV)
        movingFOV = false
    }
})