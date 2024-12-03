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
        playerZ = Player.getZ(); // get coords of the player
        healthChat.register(); // register the trigger to check for the "<username> is on x HP!"
    }
})

const healthChat = register("chat", (username, health, event) => {
    originalMessage = ChatLib.getChatMessage(event, true) // get the original message to append the distance to
    cancel(event)
    const players = World.getAllPlayers() // hopefully this gets everyone, if not then this module might not be possible
    for (let i = 0; i < players.length; i++) { // loops through all the players
        if (players[i].getName() != username) { // if the username in the message isnt the same as the player
            continue
        } else if (players[i].getName() == username) { // if the username matches
            enemyX = players[i].getX();
            enemyY = players[i].getY();
            enemyZ = players[i].getZ(); // get coords of the enemy
            arrowDistance = distance(playerX, playerY, playerZ, enemyX, enemyY, enemyZ) // calc distance between where u shot from and where they are
            arrowDistance = Math.round(arrowDistance * 10) / 10 // rounds to 1 decimal place, looks the nicest tbh
            ChatLib.chat(`${originalMessage} &8(${arrowDistance} blocks)`) // writes original message, then appends the distance to the end (Jqsie is on 18 HP! (43 blocks))
            healthChat.unregister();
        }
    }
}).setChatCriteria("${username} is on ${health} HP!").unregister()

function distance(x1, y1, z1, x2, y2, z2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) + Math.pow(z1 - z2, 2));
  }