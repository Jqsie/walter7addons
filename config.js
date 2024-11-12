import { @Vigilant, @TextProperty, @ColorProperty, @ButtonProperty, @SwitchProperty, @SelectorProperty, @CheckboxProperty, Color } from 'Vigilance';

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
        description: "stops the current music disc (CRASHES YOUR GAME RN FIX LATER)",
        category: "Random",
        subcategory: "Music Disc",
        placeholder: "Activate"
    })
    musicDiscButton() {
        stopMusicDisc();
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
        name: "Fishing Timer",
        description: "moves the fishing timer from above the bobber to the middle of your screen",
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
    fishingTimerSize = 0; // Stores index of option

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