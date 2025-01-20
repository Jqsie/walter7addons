import Settings from '../config';

var packetAction = ""
var targetEntityField = ""
var entity = {}
var x = 0

const display = new Display();
display.setOrder("down");
display.setRenderLoc((Renderer.screen.getWidth() - display.getWidth())/ 2.0, Renderer.screen.getHeight() / 2.0 - 15);

let textSize = (Settings.healthIndicatorTextSize + 1);

const C02PacketUseEntity = Java.type("net.minecraft.network.play.client.C02PacketUseEntity");

register("packetSent", (packet, event) => {
    if (!Settings.healthIndicator) { return }
    var packetAction = packet.func_149565_c()
    if (packetAction != "ATTACK") { return }
    var targetEntityField = packet.class.getDeclaredField("field_149567_a") // entityId
    targetEntityField.setAccessible(true)
    var targetEntity = targetEntityField.get(packet)
    console.log(packetAction)
    console.log(targetEntity)
    entity = World.getWorld().func_73045_a(targetEntity)
    x = 0
    healthCheck.register();
}).setFilteredClass(C02PacketUseEntity)

const healthCheck = register("tick", () => {
    targetHealth = new EntityLivingBase(entity).getHP()
    targetAbsorption = new EntityLivingBase(entity).getAbsorption()
    targetHealth = Math.round((targetHealth + targetAbsorption) * 10) / 10
    if (targetHealth > 20) {
        display.setTextColor(Renderer.DARK_GREEN)
    } else if (targetHealth > 15) {
        display.setTextColor(Renderer.GREEN)
    } else if (targetHealth > 10) {
        display.setTextColor(Renderer.YELLOW)
    } else if (targetHealth > 5) {
        display.setTextColor(Renderer.RED)
    } else if (targetHealth < 6) {
        display.setTextColor(Renderer.DARK_RED)
    }
    let textSize = (Settings.healthIndicatorTextSize + 1);
    let line = new DisplayLine(targetHealth);
    line.setShadow(true);
    line.setScale(textSize);
    display.setLine(0, line);
    display.setRenderLoc((Renderer.screen.getWidth() - display.getWidth())/ 2.0, Renderer.screen.getHeight() / 2.0 - 15);
    if (x == 60 || targetHealth == 0) {
        display.setLine(0, '');
        x = 0;
        healthCheck.unregister();
    } 
}).unregister()