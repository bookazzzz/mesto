// export default class Section {
//   constructor ({ items, renderer }, containerSelector) {
//     this._items = items;
//     this._renderer = renderer;
//     this._container = document.querySelector(containerSelector);
//   }

//   renderInitialItems (renderedItems) {
//     renderedItems.forEach(item => {
//       this._renderer(item);
//     });
//   }

//   addItem (item) {
//     this._container.prepend(item);
//   }
// }
export default class Section {
  constructor({ containerSelector, renderer }) {
    // debugger
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
