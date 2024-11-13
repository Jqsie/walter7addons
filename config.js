import { @Vigilant, @TextProperty, @ColorProperty, @ButtonProperty, @SwitchProperty, @SelectorProperty, @CheckboxProperty, @SliderProperty, Color } from 'Vigilance';

@Vigilant("walter7addons", "walter7addons")
class Settings {
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

    @SwitchProperty({
        name: "Mute Own Steps",
        description: "mutes your own footsteps",
        category: "QoL",
        subcategory: "Mute Own Steps",
        placeholder: 'Activate'
    })
    muteOwnSteps = false;

    @SwitchProperty({
        name: "Better Tab",
        description: "removes header and footer on tab (requires lobby swap after disabling)",
        category: "QoL",
        subcategory: "Better Tab",
        placeholder: 'Activate'
    })
    betterTab = false;

    @SwitchProperty({
        name: "Lucky Block Enhancements",
        description: "does a few things to make lucky block skywars more clean (will separate features later)",
        category: "QoL",
        subcategory: "Lucky Block Enhancements",
        placeholder: 'Activate'
    })
    luckyBlockFix = false;

    @SwitchProperty({
        name: "Out of Arrows Reminder",
        description: "plays a sound when you run out of arrows (not in skyblock)",
        category: "QoL",
        subcategory: "Out of Arrows Reminder",
        placeholder: 'Activate'
    })
    noArrows = false;

    @SwitchProperty({
        name: "Jump Boost Reminder",
        description: "plays a sound when you're about to run out of jump boost (bedwars)",
        category: "QoL",
        subcategory: "Jump Boost Reminder",
        placeholder: 'Activate'
    })
    jumpBoostReminder = false;

    @SwitchProperty({
        name: "Rage on Death",
        description: "ragin at diep screamin whoiy mei",
        category: "Random",
        subcategory: "Rage on Death",
        placeholder: 'Activate'
    })
    rageOnDeath = false;

    @SwitchProperty({
        name: "Rage in Dungeons",
        description: "like noice this guy is just throwing my s+",
        category: "Random",
        subcategory: "Rage on Death",
        placeholder: 'Activate'
    })
    rageInDungeons = false;

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
        description: "set this to ur usual FOV (should detect it on first install?)",
        category: "Random",
        subcategory: "Dynamic FOV",
        min: 30,
        max: 120
    })
    previousFOV = Client.settings.getFOV();

    @SwitchProperty({
        name: "Fishing Timer",
        description: "moves the fishing timer from above the bobber to the middle of your screen",
        category: "Skyblock",
        subcategory: "Fishing Timer",
        placeholder: 'Activate'
    })
    fishingTimer = false;

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

    @SelectorProperty({
        name: 'Fishing Timer Size',
        description: 'change the size of the text on screen',
        category: 'Skyblock',
        subcategory: 'Fishing Timer',
        options: ['small', 'medium', 'large', 'much larger'],
    })
    fishingTimerSize = 0;

    constructor() {
        this.initialize(this);
        this.addDependency("Rage in Dungeons", "Rage on Death")
        this.addDependency("Fishing Timer Size", "Fishing Timer")
        this.setCategoryDescription('QoL', 'quality of life stuff, some of this is probably useful');
        this.setCategoryDescription('Random', 'just some random funny stuff u probably dont want on all the time');
        this.setCategoryDescription('Skyblock', 'cool skyblock stuff u might want');
    }
}

export default new Settings();