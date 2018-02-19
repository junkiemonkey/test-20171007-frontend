window.onload = () => {

  const doc = document;
  const form = doc.forms.vin_form;
  const input = doc.getElementById('jsVincodeInput');
  const checkBtn = doc.getElementById('jsCheckBtn');
  const offline = doc.querySelector('.offline');

  setInterval(checkIfBrowserOnline, 2000);
  input.focus();
  input.addEventListener('input', handleInput);
  checkBtn.addEventListener('click', handleSubmit);

  /**
   * Input Handler
   */
  function handleInput(e) {
    const { target: { value } } = e;
    const err = form.querySelector('.error');
    if (validate(value)) {
      checkBtn.removeAttribute('disabled');
      if (err) err.remove();
    } else {
      checkBtn.setAttribute('disabled', 'disabled');
      if (!err) {
        form.insertAdjacentHTML('beforeEnd', '<span class="error">Not valid VIN !</span>');
      }
    }
  }

  /**
   * Submit Handler
   */
  function handleSubmit() {
    const vin = input.value;
    const { onLine } = navigator;
    const cache = localStorage.getItem(vin);
    const table = new createResultTable();

    if (!onLine) {
      checkIfBrowserOnline();
      if (cache) {
        table.initTable(JSON.parse(cache));
      } else alert(`VIN: ${vin} not cached!`);
      return null;
    }

    if (cache) {
      table.initTable(JSON.parse(cache));
    } else {
      request(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vin}?format=json`)
        .then(data => {
          const { Results } = JSON.parse(data);
          localStorage.setItem(vin, JSON.stringify(Results));
          table.initTable(Results);
        })
        .catch(e => alert(`Request error: ${e}`));
    }
  }

  /**
   * Online validator
   */
  function checkIfBrowserOnline() {
    const { onLine } = navigator;
    if (!onLine) {
      offline.style.display = 'block';
    } else {
      offline.style.display = 'none';
    }
  }
}

