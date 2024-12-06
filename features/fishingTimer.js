import Settings from '../config';


const EntityArmorStandClass = Java.type(
  'net.minecraft.entity.item.EntityArmorStand'
).class;


const fishingTimerRegex = /^\d\.\d$/;

const display = new Display();
display.setOrder("down");
display.setRenderLoc((Renderer.screen.getWidth() - display.getWidth())/ 2.0, Renderer.screen.getHeight() / 2.0 - 15);

let textSize = (Settings.fishingTimerSize + 1);

register('step', () => {
  let heldItem = Player.getHeldItem();
  if (Settings.fishingTimer && heldItem.getRegistryName() == "minecraft:fishing_rod") {
    fishingTimer.register();
  } else {
    fishingTimer.unregister();
  }
}).setFps(1)

const fishingTimer = register('renderWorld', () => {
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
    } else if (name === '!!!') {
      let line = new DisplayLine("!!!");
  armorStands.setPosition(0, -100, 0);
      display.setTextColor(Renderer.RED)
      line.setShadow(true);
      line.setScale(textSize);
      display.setLine(0, line);
      display.setRenderLoc((Renderer.screen.getWidth() - display.getWidth())/ 2.0, Renderer.screen.getHeight() / 2.0 - 15);
    } else {
      display.setLine(0, '');
    }
  });
}).unregister();