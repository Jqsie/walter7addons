import Settings from "./config";
import { Color } from "Vigilance";

import './features/musicDisc'
import './features/muteOwnSteps'
import './features/fishingTimer'
import './features/dynamicFOV'
import './features/betterTab'
import './features/luckyBlockFix'
import './features/mineshaftParty'
import './features/arrowExpire'
import './features/potionExpire'
import './features/miningFatigue'
import './features/slumberHotel'
import './features/removeParticles'
//import './features/blockHighlight'

register("command", () => Settings.openGUI()).setName("walter");

Settings.myColor = Color.RED;