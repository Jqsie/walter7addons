import Settings from "../config";

const Mouse = Java.type("org.lwjgl.input.Mouse");
MouseX = 0;
MouseY = 0;
var hasMouseBeenSet = 0;

register("tick", () => {
    const guiName = Player.getContainer().getName();
    if (guiName == "Item Submission" && hasMouseBeenSet == 0) {
        Mouse.setCursorPosition(800, 720);
		hasMouseBeenSet = 1;
    } else if (guiName == "container" && hasMouseBeenSet == 1) {
        hasMouseBeenSet = 0;
    }
	
	if (guiName == "Slumber Locations" && hasMouseBeenSet == 0) {
        Mouse.setCursorPosition(1100, 720);
		hasMouseBeenSet = 1;
    } else if (guiName == "container" && hasMouseBeenSet == 1) {
        hasMouseBeenSet = 0;
    }
	
	if (guiName == "Ticket Machine" && hasMouseBeenSet == 0) {
		Mouse.setCursorPosition(950, 750);
		hasMouseBeenSet = 1;
    } else if (guiName == "container" && hasMouseBeenSet === 1) {
        hasMouseBeenSet = 0;
    }
});