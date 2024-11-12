import Settings from "../config";

var rages = [
    "0.ogg", "1.ogg", "2.ogg", "3.ogg", "4.ogg", "5.ogg", "6.ogg", "7.ogg", "8.ogg", "9.ogg", "10.ogg", "11.ogg",
    "12.ogg", "13.ogg", "14.ogg", "15.ogg", "16.ogg", "17.ogg",
    "18.ogg", "19.ogg", "20.ogg", "21.ogg", "22.ogg", "23.ogg", "24.ogg", "25.ogg", "26.ogg", "27.ogg", "28.ogg",
    "29.ogg", "30.ogg", "31.ogg", "32.ogg", "33.ogg", "34.ogg",
    "35.ogg", "36.ogg", "37.ogg", "38.ogg", "39.ogg", "40.ogg", "41.ogg", "42.ogg"
    ]

function whoiyMEI() {
    if (Settings.rageOnDeath) {
        // print("RAGE1")
        var rageFile = rages[Math.floor(Math.random() * rages.length)]
        // print(rageFile);
        var newRage = new Sound({source: rageFile});
        // print("RAGE2");
        newRage.stop();
        // print("RAGE STOPPED");
        newRage.play();
        // print("RAGE STARTED");
    }
    
    }

register("chat", (diep) => {
    whoiyMEI();
}).setCriteria("You have been eliminated!");

register("chat", (diep) => {
    whoiyMEI();
}).setCriteria("You died! Want to play again? Click here! ");

register("chat", (diep) => {
    whoiyMEI();
}).setCriteria("YOU DIED! ").setContains();

register("chat", (diep) => {
    whoiyMEI();
}).setCriteria("Queued! Use the bed to cancel!").setContains();

register("chat", (diep) => {
    if (Settings.rageInDungeons) {
        whoiyMEI();
    }
}).setCriteria("☠").setContains();
