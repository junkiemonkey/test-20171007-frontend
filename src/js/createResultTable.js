function createResultTable(data) {
  const doc = document;
  const container = doc.getElementById('table-container');
  const cleanedData = data.filter(el => el.Value);
  initTable(cleanedData);


  /**
   * Helpers
   */

  function initTable(array) {
    const readyTable = container.querySelector('.table');
    if (readyTable) {
      initTbody(array, readyTable);
      initSort(array, readyTable);
      initFilter(array, readyTable);
    } else {
      const tbody = '<thead>' +
          '<tr>' +
            '<th>Variable</th>' +
            '<th>Value</th>' +
          '</tr>' +
          '<tr>' +
            '<th><input type="text" name="Variable"></th>' +
            '<th><input type="text" name="Value"></th>' +
          '</tr>' +
        '</thead>' +
        '<tbody></tbody>';

      container.innerHTML = `<table class="table">${tbody}</table>`;
      const table = container.querySelector('.table')
      initTbody(array, table);
      initSort(array, table);
      initFilter(array, table);
    }
  }

  function initTbody(array, table) {
    const tbody = table.getElementsByTagName('tbody')[0];
    let tr = '';
    const length = array.length;
    for (let i = 0; i < length; i++) {
      tr += `<tr><td>${array[i].Variable}</td><td>${array[i].Value}</td></tr>`;
    }
    tbody.innerHTML = tr;
  }

  function initSort(array, table) {
    const thead = table.getElementsByTagName('thead')[0];
    const handler = e => {
      const key = e.target.innerHTML;
      if (key === 'Variable' || key === 'Value') {
        const sort = array.sort((a, b) =>  (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0));
        initTbody(sort, table);
      }
    }

    thead.removeEventListener('click', handler);
    thead.addEventListener('click', handler);
  }

  function initFilter(array, table) {
    const inputs = table.querySelectorAll('input');
    const cached = [...array];
    inputs.forEach(input => input.addEventListener('input', e => {
      const { name, value } = e.target;
      if (!value) {
        initTbody(array, table);
        return null;
      }
      const filtered = array.filter(el => el[name].toLowerCase().indexOf(value.toLowerCase()) + 1);
      initTbody(filtered, table);
    }));
  }
}




