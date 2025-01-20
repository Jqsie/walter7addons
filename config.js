import { @Vigilant, @TextProperty, @ColorProperty, @ButtonProperty, @SwitchProperty, @SelectorProperty, @CheckboxProperty, @SliderProperty, Color } from 'Vigilance';

@Vigilant("walter7addons", "walter7addons")
class Settings {
    // RANDOM
    @SwitchProperty({
        name: "Music Disc",
        description: "play random music disc on world load",
        category: "Random",
        subcategory: "Music Disc",
        placeholder: 'Activate'
    })
    musicDisc = false;

    @ButtonProperty({
        name: "Stop Current Music Disc",
        description: "stops the current music disc (actually just cuts off every sound)",
        category: "Random",
        subcategory: "Music Disc",
        placeholder: "Activate"
    })
    musicDiscButton() {
        World.stopAllSounds()
    }

    // Quality of Life
    @SwitchProperty({
        name: "Mute Own Steps",
        description: "mutes your own footsteps",
        category: "Quality of Life",
        subcategory: "Mute Own Steps",
        placeholder: 'Activate'
    })
    muteOwnSteps = false;

    @SwitchProperty({
        name: "Better Tab",
        description: "removes header and footer on tab (requires lobby swap after disabling)",
        category: "Quality of Life",
        subcategory: "Better Tab",
        placeholder: 'Activate'
    })
    betterTab = false;

    @SwitchProperty({
        name: "Lucky Block Enhancements",
        description: "does a few things to make lucky block skywars more clean (will separate features later)",
        category: "Quality of Life",
        subcategory: "Lucky Block Enhancements",
        placeholder: 'Activate'
    })
    luckyBlockFix = false;

    @SwitchProperty({
        name: "Nick Generator",
        description: "lets you press a hotkey to generate a nick and put it in the chat so you can continue running around",
        category: "Quality of Life",
        subcategory: "Nick Generator",
        placeholder: 'Activate'
    })
    nickGenerator = false;

    @SwitchProperty({
        name: "Display Title",
        description: "displays a title with the nick so it's a bit easier to see",
        category: "Quality of Life",
        subcategory: "Nick Generator",
        placeholder: 'Activate'
    })
    displayTitle = false;

    @SwitchProperty({
        name: "Health Indicator",
        description: "displays the health of the current player you are fighting to right above the crosshair",
        category: "Quality of Life",
        subcategory: "Health Indicator",
        placeholder: 'Activate'
    })
    healthIndicator = false;

    @SelectorProperty({
        name: 'Health Indicator Size',
        description: 'change the size of the text on screen',
        category: 'Quality of Life',
        subcategory: 'Health Indicator',
        options: ['small', 'medium', 'large', 'much larger'],
    })
    healthIndicatorTextSize = 0;

    // Bedwars
    @SwitchProperty({
        name: "Out of Arrows Reminder",
        description: "plays a sound when you run out of arrows (not in skyblock)",
        category: "Bedwars",
        subcategory: "Out of Arrows Reminder",
        placeholder: 'Activate'
    })
    noArrows = false;

    @SwitchProperty({
        name: "Jump Boost Reminder",
        description: "plays a sound when you're about to run out of jump boost (bedwars)",
        category: "Bedwars",
        subcategory: "Jump Boost Reminder",
        placeholder: 'Activate'
    })
    jumpBoostReminder = false;

    @SwitchProperty({
        name: "Mining Fatigue Reminder",
        description: "plays a sound when you get and are about to run out of mining fatigue trap (bedwars)",
        category: "Bedwars",
        subcategory: "Mining Fatigue Reminder",
        placeholder: 'Activate'
    })
    miningFatigueReminder = false;

    @SwitchProperty({
        name: "Remove Particles",
        description: "removes certain particles from bedwars",
        category: "Bedwars",
        subcategory: "Remove Particles",
        placeholder: 'Activate'
    })
    removeParticles = false;

    @SwitchProperty({
        name: "Glyphs",
        description: "removes the glyphs from emerald and diamond generators",
        category: "Bedwars",
        subcategory: "Remove Particles",
        placeholder: 'Activate'
    })
    removeGlyphs = false;

    @SwitchProperty({
        name: "Sponge",
        description: "removes sponge particles",
        category: "Bedwars",
        subcategory: "Remove Particles",
        placeholder: 'Activate'
    })
    removeSponge = false;

    @SwitchProperty({
        name: "Emerald Timer",
        description: "shows the time until next emerald spawn and total emerald spawns in scoreboard",
        category: "Bedwars",
        subcategory: "Emerald Timer",
        placeholder: "Activate"
    })
    emeraldTimer = false;

    @SwitchProperty({
        name: "Invisible Shop",
        description: "reveals items after they are purchased during the invisible shop challenge (solos/doubles only right now)",
        category: "Bedwars",
        subcategory: "Invisible Shop",
        placeholder: "Activate"
    })
    invisibleShop = false;

    @SwitchProperty({
        name: "Defusal Helper",
        description: "highlights the correct items to click during the defusal challenge",
        category: "Bedwars",
        subcategory: "Defusal Helper",
        placeholder: "Activate"
    })
    defusalHelper = false;

    @SwitchProperty({
        name: "Defusal Middle Clicks",
        description: "replaces left clicks with middles clicks in the gui (registers better for high ping)",
        category: "Bedwars",
        subcategory: "Defusal Helper",
        placeholder: "Activate"
    })
    defusalMiddleClick = false;

    @SwitchProperty({
        name: "Defusal Custom GUI",
        description: "uses a custom gui for the defusal challenge (use at your own risk)",
        category: "Bedwars",
        subcategory: "Defusal Helper",
        placeholder: "Activate"
    })
    defusalCustomGui = false;

    @SwitchProperty({
        name: "Block Incorrect Defusal Clicks",
        description: "blocks incorrect clicks (most of the time, use at your own risk)",
        category: "Bedwars",
        subcategory: "Defusal Helper",
        placeholder: "Activate"
    })
    defusalBlockClicks = false;

    @SwitchProperty({
        name: "Block Item Dropping",
        description: "blocks you from dropping certain items",
        category: "Bedwars",
        subcategory: "Block Item Dropping",
        placeholder: "Activate"
    })
    blockDropping = false;

    @SwitchProperty({
        name: "Swords",
        category: "Bedwars",
        subcategory: "Block Item Dropping",
        placeholder: "Activate"
    })
    blockSwords = false;

    @SwitchProperty({
        name: "Bows",
        category: "Bedwars",
        subcategory: "Block Item Dropping",
        placeholder: "Activate"
    })
    blockBows = false;

    @SwitchProperty({
        name: "Show Distance Shot",
        description: "shows the distance you shot your opponent from (currently doesn't give the distance on kill)",
        category: "Bedwars",
        subcategory: "Show Distance Shot",
        placeholder: "Activate"
    })
    arrowDistance = false;

    // Random
    @SwitchProperty({
        name: "Dynamic FOV",
        description: "makes your fov zoom in and out heaps (might give u a headache)",
        category: "Random",
        subcategory: "Dynamic FOV",
        placeholder: 'Activate'
    })
    dynamicFOV = false;

    @SliderProperty({
        name: "Normal FOV",
        description: "set this to ur usual FOV (should detect it on first install)",
        category: "Random",
        subcategory: "Dynamic FOV",
        min: 30,
        max: 120
    })
    previousFOV = Client.settings.getFOV();

    // Skyblock
    @SwitchProperty({
        name: "Fishing Timer",
        description: "moves the fishing timer from above the bobber to the middle of your screen (MIGHT BE REALLY LAGGY, TRYING TO FIX)",
        category: "Skyblock",
        subcategory: "Fishing Timer",
        placeholder: 'Activate'
    })
    fishingTimer = false;

    @SelectorProperty({
        name: 'Fishing Timer Size',
        description: 'change the size of the text on screen',
        category: 'Skyblock',
        subcategory: 'Fishing Timer',
        options: ['small', 'medium', 'large', 'much larger'],
    })
    fishingTimerSize = 0;

    @SwitchProperty({
        name: "Mineshaft Party",
        description: "detects the corpses in your mineshaft, and then warps your party if theres 3+ lapis or vanguard",
        category: "Skyblock",
        subcategory: "Mineshaft Party",
        placeholder: 'Activate'
    })
    mineshaftParty = false;

    @SelectorProperty({
        name: 'Warp Settings',
        description: 'which mineshafts you want to warp others in for',
        category: 'Skyblock',
        subcategory: 'Mineshaft Party',
        options: ['lapis', 'vanguard', 'lapis + vanguard'],
    })
    mineshaftPartySetting = 0;

    @SwitchProperty({
        name: "Glacial Cave EP Ice Finder",
        description: "detects if theres enchanted packed ice in the glacial cave walls, and draws a waypoint to it",
        category: "Skyblock",
        subcategory: "Glacial Cave",
        placeholder: 'Activate'
    })
    glacialCave = false;

    constructor() {
        this.initialize(this);
        this.addDependency("Fishing Timer Size", "Fishing Timer")
        this.addDependency("Health Indicator Size", "Health Indicator")
        this.addDependency("Glyphs", "Remove Particles")
        this.addDependency("Sponge", "Remove Particles")
        this.addDependency("Block Incorrect Defusal Clicks", "Defusal Helper")
        this.addDependency("Defusal Middle Clicks", "Defusal Helper")
        this.addDependency("Defusal Custom GUI", "Defusal Helper")
        this.addDependency("Display Title", "Nick Generator")
        this.setCategoryDescription('QoL', 'quality of life stuff, some of this is probably useful');
        this.setCategoryDescription('Random', 'just some random funny stuff u probably dont want on all the time');
        this.setCategoryDescription('Skyblock', 'cool skyblock stuff u might want');
    }
}

export default new Settings();