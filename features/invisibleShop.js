import Settings from '../config';

let inBedwarsGame = false;

let unknownSlots = [
    19, 20, 21, 22, 23, 24, 25,
    28, 29, 30, 31, 32, 33, 34,
    37, 38, 39, 40, 41, 42, 43,
]
let foundItemsPage1 = Array(21).fill("dye")
let foundItemsPage2 = Array(14).fill("dye")
let slotsPage1 = unknownSlots;
let slotsPage2 = slotsPage1.slice(0, 14);

let slotToReplace = 19; // there is no item in this slot
let indexOfSlotInList = -1;
let currentPage = 0;


register("guiMouseClick", (x, y, button, gui, event) => {
    if (Settings.invisibleShop && inBedwarsGame) {
        let container = Player.getContainer();
        if (container && container.getName() == "Invisible Item Shop") {
            new Thread(() => {
                Thread.sleep(20);
                if (container.getName() != "Invisible Item Shop") { // make sure the shop is still open
                    return
                }

                if (currentPage == 1) {
                    for (let k = 0; k < slotsPage1.length; k++) {
                        if (typeof slotsPage1[k] != 'undefined' && (!container.getStackInSlot(slotsPage1[k]))) {
                            slotToReplace = slotsPage1[k];
                            indexOfSlotInList = k;
                            break;
                        }
                    }
                }
                else if (currentPage == 2) {
                    for (let l = 0; l < slotsPage2.length; l++) {
                        if (typeof slotsPage2[l] != 'undefined' && (!container.getStackInSlot(slotsPage2[l]))) {
                            slotToReplace = slotsPage2[l];
                            indexOfSlotInList = l;
                            break;
                        }
                    }
                }
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
                if (currentPage == 1 && (foundItemsPage1[indexOfSlotInList] == "dye")) {
                    foundItemsPage1[indexOfSlotInList] = mcItemName;
                }
                else if (currentPage == 2 && (foundItemsPage2[indexOfSlotInList] == "dye")) {
                    foundItemsPage2[indexOfSlotInList] = mcItemName;
                }
            }
        }).start()
    }
    
}).setCriteria("You purchased ${item}")


register("chat", (resource, amountNeeded) => {
    //slotToReplace = 19;
    //indexOfSlotInList = -1;
    if (Settings.invisibleShop && inBedwarsGame && currentPage != 0) {
        new Thread(() => {
            Thread.sleep(50)
            let inv = Player.getInventory()
            let items = inv.getItems();
            let iron = 0;
            let gold = 0;
            let emeralds = 0;
            items.forEach(item => {
                if (item) {
                    if (item.getName() == "Iron Ingot") {
                        iron += item.getStackSize()
                    }
                    else if (item.getName() == "Gold Ingot") {
                        gold += item.getStackSize()
                    }
                    else if (item.getName() == "Emerald") {
                        emeralds += item.getStackSize()
                    }
                }
            });

            switch (resource) {
                case "Iron":
                    let ironItemPrice = parseInt(iron) + parseInt(amountNeeded)
                    print(ironItemPrice)
                    switch (ironItemPrice) {
                        case 40:
                            if (currentPage == 1) foundItemsPage1[indexOfSlotInList] = "minecraft:fire_charge"
                            if (currentPage == 2) foundItemsPage2[indexOfSlotInList] = "minecraft:fire_charge"
                            break;
                        case 120:
                            print("IRON GULEM")
                            if (currentPage == 1) foundItemsPage1[indexOfSlotInList] = "minecraft:spawn_egg"
                            if (currentPage == 2) foundItemsPage2[indexOfSlotInList] = "minecraft:spawn_egg"
                            break;
                        case 20:
                            if (currentPage == 1) foundItemsPage1[indexOfSlotInList] = "minecraft:shears"
                            if (currentPage == 2) foundItemsPage2[indexOfSlotInList] = "minecraft:shears"
                            break;
                    }
                    break;
                case "Gold":
                    let goldItemPrice = parseInt(gold) + parseInt(amountNeeded)
                    switch (goldItemPrice) {
                        case 3:
                            if (currentPage == 1) foundItemsPage1[indexOfSlotInList] = "minecraft:golden_apple"
                            if (currentPage == 2) foundItemsPage2[indexOfSlotInList] = "minecraft:golden_apple"
                            break;
                        case 5:
                            if (currentPage == 1) foundItemsPage1[indexOfSlotInList] = "minecraft:stick"
                            if (currentPage == 2) foundItemsPage2[indexOfSlotInList] = "minecraft:stick"
                            break;
                        
                        case 7:
                            if (currentPage == 1) foundItemsPage1[indexOfSlotInList] = "minecraft:iron_sword"
                            if (currentPage == 2) foundItemsPage2[indexOfSlotInList] = "minecraft:iron_sword"
                            break;
                        case 20:
                            if (currentPage == 1) foundItemsPage1[indexOfSlotInList] = "minecraft:bow"
                            if (currentPage == 2) foundItemsPage2[indexOfSlotInList] = "minecraft:bow"
                            break;
                        
                    }
                    break;
                case "Emerald":
                case "Emeralds":
                    let emeraldItemPrice = parseInt(emeralds) + parseInt(amountNeeded)
                    switch (emeraldItemPrice) {
                        case 2:
                            if (currentPage == 1) foundItemsPage1[indexOfSlotInList] = "minecraft:potion"
                            if (currentPage == 2) foundItemsPage2[indexOfSlotInList] = "minecraft:potion"
                            break;
                    }
                    break;
            }

            slotToReplace = 19;
            indexOfSlotInList = -1;
        }).start()
    }
}).setCriteria("You don't have enough ${resource}! Need ${amountNeeded} more!");

register("chat", () => {
    slotToReplace = 19;
    indexOfSlotInList = -1;
}).setCriteria("You've already purchased this item!");


register("guiRender", (x, y, gui) => {
    if (Settings.invisibleShop && inBedwarsGame && Player.getContainer()) {
        let container = Player.getContainer()
        if (container.getName() == "Invisible Item Shop") {
            if (container.getStackInSlot(53)) {
                currentPage = 1
            }
            else if (container.getStackInSlot(45)) {
                currentPage = 2
            }
            else {
                currentPage = 0
            }
            setKnownItems();
        }
    }
})


function highlightItem(x, y, highlightColor) {
    Renderer.translate(0, 0, 0)
    Renderer.drawRect(highlightColor, x, y, 16, 16)
  }

register('renderItemIntoGui', (item, x, y, event) => {
    const inv = Player.getContainer();
    if (Settings.invisibleShop && inv.name == 'Invisible Item Shop') {
        let mainLore = item.getLore()[5]
        let toolLore = item.getLore()[3]

        if (!mainLore) return;
        if (!toolLore) return;

        if (mainLore == "§5§o§eClick to purchase!") {
            highlightItem(x, y, Renderer.GREEN)
        }
        else if (toolLore == "§5§o§eClick to purchase!") {
            highlightItem(x, y, Renderer.color(50, 150, 50, 255))
        }
        else if (toolLore.includes("You don't have enough")) {
            highlightItem(x, y, Renderer.RED)
        }
    }
})





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
    inBedwarsGame = true; // CHANGE BACK TO FALSE!
    foundItemsPage1 = Array(21).fill("dye")
    foundItemsPage2 = Array(14).fill("dye")
    slotsPage1 = unknownSlots;
    slotsPage2 = slotsPage1.slice(0, 14);
    indexOfSlotInList = -1;
    currentPage = 0;
    arrowIndex = -1;
    arrowPage = -1;
});

function setKnownItems() {
    if (currentPage == 1)
        for (let i = 0; i < foundItemsPage1.length; i++) {
            if (foundItemsPage1[i] != "dye" && typeof foundItemsPage1[i] != 'undefined') {
                Player.getContainer().getContainer().func_75141_a(slotsPage1[i], new Item(foundItemsPage1[i]).itemStack);
            }
        }
    else if (currentPage == 2) {
        for (let i = 0; i < foundItemsPage2.length; i++) {
            if (foundItemsPage2[i] != "dye" && typeof foundItemsPage2[i] != 'undefined') {
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
    switch(x) {
        case "Wool":
            return "minecraft:wool"
        case "Hardened Clay":
            return "minecraft:hardened_clay"
        case "Blast-Proof Glass":
            return "minecraft:glass"
        case "End Stone":
            return "minecraft:end_stone"
        case "Ladder":
            return "minecraft:ladder"
        case "Oak Wood Planks":
            return "minecraft:planks"
        case "Obsidian":
            return "minecraft:obsidian"
        case "Stone Sword":
            return "minecraft:stone_sword"
        case "Iron Sword":
            return "minecraft:iron_sword"
        case "Diamond Sword":
            return "minecraft:diamond_sword"
        case "Stick (Knockback I)":
            return "minecraft:stick"
        case "Permanent Chainmail Armor":
            return "minecraft:chainmail_boots"
        case "Permanent Iron Armor":
            return "minecraft:iron_boots"
        case "Permanent Diamond Armor":
            return "minecraft:diamond_boots"
        case "Permanent Shears":
            return "minecraft:shears"
        case "Wooden Pickaxe (Efficiency I)":
            return "minecraft:iron_pickaxe"
        case "Iron Pickaxe (Efficiency II)":
            return "minecraft:golden_pickaxe"
        case "Gold Pickaxe (Efficiency III, Sharpness II)":
            return "minecraft:diamond_pickaxe"
        case "Diamond Pickaxe (Efficiency III)":
            return "minecraft:diamond_pickaxe"
        case "Wooden Axe (Efficiency I)":
            return "minecraft:stone_axe"
        case "Stone Axe (Efficiency I)":
            return "minecraft:iron_axe"
        case "Iron Axe (Efficiency II)":
            return "minecraft:diamond_axe"
        case "Diamond Axe (Efficiency III)":
            return "minecraft:diamond_axe"
        case "Arrow":
            return "minecraft:arrow"
        case "Bow":
            return "minecraft:bow"
        case "Bow (Power I)":
            return "minecraft:bow"
        case "Bow (Power I, Punch I)":
            return "minecraft:bow"
        case "Speed II Potion (45 seconds)":
            return "minecraft:potion"
        case "Jump V Potion (45 seconds)":
            return "minecraft:potion"
        case "Invisibility Potion (30 seconds)":
            return "minecraft:potion"
        case "Golden Apple":
            return "minecraft:golden_apple"
        case "Bedbug":
            return "minecraft:snowball"
        case "Dream Defender":
            return "minecraft:spawn_egg"
        case "Fireball":
            return "minecraft:fire_charge"
        case "TNT":
            return "minecraft:tnt"
        case "Ender Pearl":
            return "minecraft:ender_pearl"
        case "Water Bucket":
            return "minecraft:water_bucket"
        case "Bridge Egg":
            return "minecraft:egg"
        case "Magic Milk":
            return "minecraft:milk_bucket"
        case "Sponge":
            return "minecraft:sponge"
        case "Compact Pop-up Tower":
            return "minecraft:chest"
    }
}