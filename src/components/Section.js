export default class Section {
  constructor({ containerSelector, renderer }) {
    this._containerElement = document.querySelector(containerSelector)
    this._renderer = renderer.bind(this)
  }

  renderInitialItems(items) {
    items.forEach(item => this._renderer(item))
  }

  addItem(item) {
    this._containerElement.prepend(item)
  }
}
