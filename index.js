import Settings from "./config";
import { Color } from "Vigilance";

import './diep/musicDisc'
import './diep/muteOwnSteps'
import './diep/rageOnDeath'
import './diep/fishingTimer'
import './diep/dynamicFOV'
import './diep/betterTab'
import './diep/luckyBlockFix'
import './diep/mineshaftParty'

register("command", () => Settings.openGUI()).setName("walter");

Settings.myColor = Color.RED;
console.log(Settings.musicDisc)
console.log(Settings.muteOwnSteps)
console.log(Settings.rageOnDeath)