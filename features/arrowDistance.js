import Settings from '../config';

const ArrowShoot = Java.type("net.minecraftforge.event.entity.player.ArrowLooseEvent");
let playerX = 0
let playerY = 0
let playerZ = 0
let enemyX = 0
let enemyY = 0
let enemyZ = 0
let arrowDistance = 0

register(ArrowShoot, () => {
    if (Settings.arrowDistance) {
        playerX = Player.getX();
        playerY = Player.getY();
        playerZ = Player.getZ();
        healthChat.register();
    }
})

const healthChat = register("chat", (username, health, event) => {
    originalMessage = ChatLib.getChatMessage(event, true)
    cancel(event)
    const players = World.getAllPlayers()
    for (let i = 0; i < players.length; i++) {
        if (players[i].getName() != username) {
            continue
        } else if (players[i].getName() == username) {
            enemyX = players[i].getX();
            enemyY = players[i].getY();
            enemyZ = players[i].getZ();
            arrowDistance = distance(playerX, playerY, playerZ, enemyX, enemyY, enemyZ)
            arrowDistance = Math.round(arrowDistance * 10) / 10
            ChatLib.chat(`${originalMessage} &8(${arrowDistance} blocks)`)
            healthChat.unregister();
        }
    }
}).setChatCriteria("${username} is on ${health} HP!").unregister()

function distance(x1, y1, z1, x2, y2, z2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) + Math.pow(z1 - z2, 2));
  }