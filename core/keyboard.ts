import { units, selectedUnits } from "./engine";

function onkeypress(e) {
  if (e.key === "1") {
    selectUnitType(1)
  }
}

function selectUnitType(type) {
  units.forEach(unit => {
    unit.selected(true)
    selectedUnits.push(unit)
  })
}

export default {
  init: () => {
    window.onkeypress = onkeypress
  }
}