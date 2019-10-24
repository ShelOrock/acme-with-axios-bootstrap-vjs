
const getData = url => axios
  .get(url).then(response => {
    return {
      data: response.data,
      extension: response.request.responseURL.split('api/')[1]
    }
  });

const products = getData('https://acme-users-api-rev.herokuapp.com/api/products')
const companies = getData('https://acme-users-api-rev.herokuapp.com/api/companies')

// console.log(window.location);

Promise.all([products, companies]).then(response => {
  const table = document.querySelector('#container');
  const mainNav = document.querySelector('#main-nav');

  renderNav(response, mainNav);

  mainNav.addEventListener('click', ev => {
    ev.preventDefault();
    if(ev.target.tagName === 'A') {
      ev.target.classList.add('active')
      console.log(ev.target.classList);
      renderTable(response[ev.target.id], table);
    }
  });

  renderTable(response[0], table);
});

const renderTable = (dataArr, container) => {
  //<table class='table table-striped'> </table>
  const html = `
        <h2>${dataArr.extension[0].toUpperCase() + dataArr.extension.slice(1)}</h2>
        ${`
        <thead>
            <tr>
                ${Object.keys(dataArr.data[0])
                  .map(
                    key =>
                      `<th scope='col'> ${key[0].toUpperCase() +
                        key.slice(1)} </th>`
                  )
                  .join('')}
            </tr>
        </thead>
        <tbody>
        ${dataArr.data
          .map(obj => {
            return `<tr>
                ${Object.values(obj)
                  .map(value => {
                    return `<td>${value}</td>`;
                  })
                  .join('')}
            </tr>`;
          })
          .join('')}
        </tbody>`
      }`
  container.innerHTML = html;
};

const renderNav = (dataArr, container) => {
  const html = dataArr
    .map((arr, idx) => {
      return `<li class="nav-item">
     <a id='${idx}' class="nav-link" href="#${arr.extension}">${arr.extension[0].toUpperCase() + arr.extension.slice(1)} (${arr.data.length})</a>
     </li>`;
    })
    .join('');
  container.innerHTML = html;
};
