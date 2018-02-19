class createResultTable {
  constructor() {
    this.container = document.getElementById('table-container');
    this.initAll = this.initAll.bind(this);
    this.initTbody = this.initTbody.bind(this);
    this.initSort = this.initSort.bind(this);
    this.initFilter = this.initFilter.bind(this);
  }

  initTable(array) {
    this.data = array.filter(el => el.Value);
    const {
      container,
      data,
      initAll,
    } = this;
    const readyTable = container.querySelector('.table');
    if (readyTable) {
      initAll(data, readyTable);
      return null;
    }
    const tableBody = `
      <thead>
        <tr>
          <th>Variable</th>
          <th>Value</th>
        </tr>
        <tr>
          <th><input type="text" name="Variable"></th>  
          <th><input type="text" name="Value"></th>                
        </tr>      
      </thead>
      <tbody></tbody>
    `;

    container.innerHTML = `<table class="table">${tableBody}</table>`;
    const table = container.querySelector('.table');
    initAll(data, table);
  }

  initAll(data, table) {
    const {
      initTbody,
      initSort,
      initFilter
    } = this;
    initTbody(data, table);
    initSort(data, table);
    initFilter(data, table);
  }


  initTbody(data, table) {
    const tbody = table.getElementsByTagName('tbody')[0];
    let tr = '';
    const length = data.length;
    for (let i = 0; i < length; i++) {
      tr += `<tr><td>${data[i].Variable}</td><td>${data[i].Value}</td></tr>`;
    }
    tbody.innerHTML = tr;
  }

  initSort(data, table) {
    const thead = table.getElementsByTagName('thead')[0];
    const handler = e => {
      const key = e.target.innerHTML;
      if (key === 'Variable' || key === 'Value') {
        const sort = data.sort((a, b) =>  (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0));
        this.initTbody(sort, table);
      }
    }
    thead.removeEventListener('click', handler);
    thead.addEventListener('click', handler);
  }

  initFilter(data, table) {
    const inputs = table.querySelectorAll('input');
    inputs.forEach(input => input.addEventListener('input', e => {
      const { name, value } = e.target;
      if (!value) {
        this.initTbody(data, table);
        return null;
      }
      const filtered = data.filter(el => el[name].toLowerCase().indexOf(value.toLowerCase()) + 1);
      this.initTbody(filtered, table);
    }));
  }
}

