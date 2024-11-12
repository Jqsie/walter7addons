let registers = [];
/**
 * Adds a trigger to the registers array to be reset on updateRegisters() 
 * Credit: BloomCore
 * @param {Trigger} trigger 
 * @param {CallableFunction} dependency 
 */
export function registerWhen(trigger, dependency) {
    registers.push([trigger.unregister(), dependency, false]);
}

/**
 * Registers and unregisters triggers.
 */
export function updateRegisters() {
    registers.forEach(trigger => {
        if (trigger[1]() && !trigger[2])
        {
            trigger[0].register();
            trigger[2] = true;
        }
        else if (!trigger[1]() && trigger[2])
        {
            trigger[0].unregister();
            trigger[2] = false;
        }
    });
  }