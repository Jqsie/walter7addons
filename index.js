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
import './diep/arrowExpire'
import './diep/potionExpire'
import './diep/miningFatigue'
import './diep/slumberHotel'
import './diep/removeParticles'
//import './diep/blockHighlight'

register("command", () => Settings.openGUI()).setName("walter");

Settings.myColor = Color.RED;