export default class Selection {

  private _startX = 0
  private _startY = 0
  private _x = 0
  private _y = 0

  set startX(val) {
    this._startX = val;
  }
  get startX() {
    return Math.min(this._startX, this._x);
  }

  set startY(val) {
    this._startY = val;
  }
  get startY() {
    return Math.min(this._startY, this._y);
  }

  set x(val) {
    this._x = val;
  }
  get x() {
    return Math.max(this._startX, this._x);
  }

  set y(val) {
    this._y = val;
  }
  get y() {
    return Math.max(this._startY, this._y);
  }

  set(pos) {
    this.startX = pos.startX;
    this.x = pos.x || pos.startX;
    this.startY = pos.startY;
    this.y = pos.y || pos.startY;
  }

  reset() {
    this.x = 0;
    this.y = 0;
    this.startX = 0;
    this.startY = 0;
  }
}