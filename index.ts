import { game } from "./core/engine";
import { unitFactory } from "./game-objects/unit";

for (let i = 0; i < 10; i++) {
  game.addUnit(unitFactory.create('tank'));
}

for (let i = 0; i < 10; i++) {
  game.addUnit(unitFactory.create('healer'));
}

for (let i = 0; i < 10; i++) {
  game.addUnit(unitFactory.create('range'));
}

for (let i = 0; i < 10; i++) {
  game.addUnit(unitFactory.create('melee'));
}

game.start()