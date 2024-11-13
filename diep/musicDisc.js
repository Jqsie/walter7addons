import Settings from "../config";

const records = ["records.11", "records.13", "records.blocks", "records.cat", 
    "records.chirp", "records.far", "records.mall", "records.mellohi", "records.stal",
    "records.strad", "records.wait", "records.ward"
  ]

register("worldLoad", () => {
    if (Settings.musicDisc) {
        // console.log('hello!')
        new Thread(() => {
            Thread.sleep(100);
            World.playRecord(records[Math.round(Math.random() * records.length)], Player.getX(), Player.getY(), Player.getZ());
        }).start()
    }
  })