import Settings from "./config";
import { Color } from "Vigilance";

import './diep/musicDisc'
import './diep/muteOwnSteps'
import './diep/rageOnDeath'
import './diep/fishingTimer'

register("command", () => Settings.openGUI()).setName("walter");

Settings.myColor = Color.RED;
console.log(Settings.musicDisc)
console.log(Settings.muteOwnSteps)
console.log(Settings.rageOnDeath)