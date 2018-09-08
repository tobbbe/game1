import { game } from "./core/engine";
import { unitFactory } from "./game-objects/unit";

for (let i = 0; i < 20; i++) {
  game.addUnit(unitFactory.create());
}

game.start()