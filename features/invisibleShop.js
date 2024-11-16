import Settings from '../config';

let inBedwarsGame = false;
let slotToReplace = -1;

let unknownSlots = [
    19, 20, 21, 22, 23, 24, 25,
    28, 29, 30, 31, 32, 33, 34,
    37, 38, 39, 40, 41, 42, 43,
]

let foundItemsPage1 = Array(21).fill("dye")
let foundItemsPage2 = Array(14).fill("dye")
let slotsPage1 = unknownSlots;
let slotsPage2 = slotsPage1.slice(0, 14);
let indexOfSlotInList = -1;
let currentPage = 0;

register("guiMouseClick", (x, y, button, gui, event) => {
    if (Settings.invisibleShop && inBedwarsGame) {
        let container = Player.getContainer();
        
        if (container.getName() == "Invisible Item Shop") {
            new Thread(() => {
                Thread.sleep(20);
                
                for (i = 0; i < unknownSlots.length; i++) {
                    if (!container.getStackInSlot(unknownSlots[i])) {
                        slotToReplace = unknownSlots[i];
                        indexOfSlotInList = i;
                        break;
                    }
                }
                Thread.sleep(250);
                setKnownItems();
            }).start()
        }
    }
})

register("chat", (item) => {
    if (Settings.invisibleShop && inBedwarsGame && currentPage != 0) {
        new Thread(() => {
            Thread.sleep(50);
            let container = Player.getContainer();
            let hiddenItem = container.getStackInSlot(slotToReplace);
            if (hiddenItem) {
                let mcItemName = convertItemName(item);
                if (currentPage == 1) {
                    foundItemsPage1[indexOfSlotInList] = mcItemName;
                    print(mcItemName);
                }
                else if (currentPage == 2) {
                    foundItemsPage2[indexOfSlotInList] = mcItemName;
                }
            }
            
            //container.getContainer(func_70299_a(slotToReplace, new Item("wool")));
            
        }).start()
    }
    
}).setCriteria("You purchased ${item}")

register("guiOpened", () => {
    new Thread(() => {
        Thread.sleep(50);
        if (Player.getContainer().getName() == "Invisible Item Shop") {
            let arrowIndex = Player.getContainer().indexOf(262);
            if (arrowIndex == 53) {
                currentPage = 1
            }
            else if (arrowIndex == 45) {
                currentPage = 2
            }
            setKnownItems();
        }
    }).start()
    
});

register("chat", () => {
    new Thread(() => {
        Thread.sleep(1000);
        bedwarsCheck();
    }).start()
    }
  ).setCriteria("Protect your bed").setContains();

  register("chat", () => {
    new Thread(() => {
        Thread.sleep(1000);
        bedwarsCheck();
    }).start()
  }).setCriteria("You will respawn because you still have a bed!").setContains();

register("worldLoad", () => {
    inBedwarsGame = false;
    foundItemsPage1 = Array(21).fill("dye")
    foundItemsPage2 = Array(14).fill("dye")
    slotsPage1 = unknownSlots;
    slotsPage2 = slotsPage1.slice(0, 14);
    indexOfSlotInList = -1;
    currentPage = 0;
});

function setKnownItems() {
    if (currentPage == 1)
        for (i = 0; i < foundItemsPage1.length; i++) {
            if (foundItemsPage1[i] != "dye") {
                Player.getContainer().getContainer().func_75141_a(slotsPage1[i], new Item(foundItemsPage1[i]).itemStack);
            }
        }
    else if (currentPage == 2) {
        for (i = 0; i < foundItemsPage2.length; i++) {
            if (foundItemsPage2[i] != "dye") {
                Player.getContainer().getContainer().func_75141_a(slotsPage2[i], new Item(foundItemsPage2[i]).itemStack);
            }
        }
    }
}

function bedwarsCheck () {
    title = Scoreboard.getTitle();
    title = ChatLib.removeFormatting(title)
    if (title == "BED WARS") {
      inBedwarsGame = true;
}}

function convertItemName(x) {
    let y = "minecraft:";
    switch(x) {
        case "Wool":
            y += "wool"
            break;
        case "Hardened Clay":
            y += "hardened_clay"
            break;
        case "Blast-Proof Glass":
            y += "glass"
            break;
        case "End Stone":
            y += "end_stone"
            break;
        case "Ladder":
            y += "ladder"
            break;
        case "Oak Wood Planks":
            y += "planks"
            break;
        case "Obsidian":
            y += "obsidian"
        case "Stone Sword":
            y += "stone_sword"
            break;
        case "Iron Sword":
            y += "iron_sword"
            break;
        case "Diamond Sword":
            y += "diamond_sword"
            break;
        case "Stick (Knockback I)":
            y += "stick"
            break;
        case "Permanent Chainmail Armor":
            y += "chainmail_boots"
            break;
        case "Permanent Iron Armor":
            y += "iron_boots"
            break;
        case "Permanent Diamond Armor":
            y += "diamond_boots"
            break;
        case "Permanent Shears":
            y += "shears"
            break;
        case "Wooden Pickaxe (Efficiency I)":
            y += "iron_pickaxe"
            break;
        case "Iron Pickaxe (Efficiency II)":
            y += "golden_pickaxe"
            break;
        case "Gold Pickaxe (Efficiency III, Sharpness II)":
            y += "diamond_pickaxe"
            break;
        case "Diamond Pickaxe (Efficiency III)":
            y += "diamond_pickaxe"
            break;
        case "Wooden Axe (Efficiency I)":
            y += "stone_axe"
            break;
        case "Stone Axe (Efficiency I)":
            y += "iron_axe"
            break;
        case "Iron Axe (Efficiency II)":
            y += "diamond_axe"
            break;
        case "Diamond Axe (Efficiency III)":
            y += "diamond_axe"
            break;
        case "Arrow":
            y += "arrow"
            break;
        case "Bow":
            y += "bow"
            break;
        case "Bow (Power I)":
            y += "bow"
            break;
        case "Bow (Power I, Punch I)":
            y += "bow"
            break;
        case "Speed II Potion (45 seconds)":
            y += "potion"
            break;
        case "Jump V Potion (45 seconds)":
            y += "potion"
            break;
        case "Invisibility Potion (30 seconds)":
            y += "potion"
            break;
        case "Golden Apple":
            y += "golden_apple"
            break;
        case "Bedbug":
            y += "snowball"
            break;
        case "Dream Defender":
            y += "spawn_egg"
            break;
        case "Fireball":
            y += "fire_charge"
            break;
        case "TNT":
            y += "tnt"
            break;
        case "Ender Pearl":
            y += "ender_pearl"
            break;
        case "Water Bucket":
            y += "water_bucket"
            break;
        case "Bridge Egg":
            y += "egg"
            break;
        case "Magic Milk":
            y += "milk_bucket"
            break;
        case "Sponge":
            y += "sponge"
            break;
        case "Compact Pop-up Tower":
            y += "chest"
            break;
    
    }
    return y;
}