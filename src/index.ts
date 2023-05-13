interface StringMap { [id: string]: number }

class DataStorage {
  data: {
    name: string,
    index: StringMap,
    items: Array<StringMap>
  };
  
  name: string;
  
  constructor(name: string) {
    this.name = name;
    this.data = this.load(name)
  }
  
  index() {
    return this.data.items;
  }
  
  show(id: string): StringMap {
    const index = this.data.index[id];
    
    if (index) {
      return this.data.items[index];
    } else {
      return {};
    }
  }
  
  add() {}
  
  first() {
    return this.data.items[0];
  }
  
  load(name: string) {
    const rawData: string = localStorage.getItem(name) || '[]';
    return JSON.parse(rawData);
  }
}

class BaseComponent {
  container: HTMLDivElement;
  
  constructor() {
    this.container = document.createElement('div');
  }
  
  render(): HTMLDivElement {
    return this.container;
  }
}

class Form extends BaseComponent {}
class Table extends BaseComponent{}

class ShowItem extends BaseComponent{
  data: StringMap
  
  constructor(item: StringMap) {
    super();
    this.data = item;
  }
  
  render(): HTMLDivElement {
    const url = this.data['url'];
    const title = this.data['title'];
    this.container.innerHTML  = `<span><a href="${url}">${title}</a></span>`;
    return this.container;
  }
}

class App {
  root: HTMLElement
  constructor(root: HTMLElement) {
    this.root = root
  }
  
  render(): void {
    const data = new DataStorage('bookmark');
    const item = (new ShowItem(data.first())).render();
    this.root.appendChild(item);
  }
}

const root = document.getElementById('root');
if (root)
  (new App(root)).render();
