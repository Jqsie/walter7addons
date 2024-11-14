import Settings from '../config';


const EntityArmorStandClass = Java.type(
  'net.minecraft.entity.item.EntityArmorStand'
).class;


const fishingTimerRegex = /^\d\.\d$/;

const display = new Display();
display.setOrder("down");
display.setRenderLoc((Renderer.screen.getWidth() - display.getWidth())/ 2.0, Renderer.screen.getHeight() / 2.0 - 15);

var textSize = (Settings.fishingTimerSize + 1);

register('renderWorld', () => {
  if (Settings.fishingTimer) {
    let found = false;
    var textSize = (Settings.fishingTimerSize + 1);
    World.getAllEntitiesOfType(EntityArmorStandClass).forEach((armorStands) => {
      const name = armorStands.getName().removeFormatting();
      if (name.match(fishingTimerRegex)) {
        armorStands.setPosition(0, -100, 0);
        display.setTextColor(Renderer.YELLOW)
        let line = new DisplayLine(name);
        line.setShadow(true);
        line.setScale(textSize);
        display.setLine(0, line);
        display.setRenderLoc((Renderer.screen.getWidth() - display.getWidth())/ 2.0, Renderer.screen.getHeight() / 2.0 - 15);
        found = true;
      } else if (name === '!!!') {
        let line = new DisplayLine("!!!");
    armorStands.setPosition(0, -100, 0);
        display.setTextColor(Renderer.RED)
        line.setShadow(true);
        line.setScale(textSize);
        display.setLine(0, line);
        display.setRenderLoc((Renderer.screen.getWidth() - display.getWidth())/ 2.0, Renderer.screen.getHeight() / 2.0 - 15);
        found = true;
      } else {
        display.setLine(0, '');
      }
    });
}});

export const openFishingTimer = () => {
  a = 5;
};
