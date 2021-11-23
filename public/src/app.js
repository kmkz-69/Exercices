// {
//   let app = async (root) => {
//     const table = root.querySelector(".container");
//     const response = await fetch("root.dataset.url");
//     const data = await response.json();

//     console.log(data);
//   };

//   for (const root of document.querySelectorAll(".container[data-app]")) {
//     const table = document.createElement("table");

//     table.innerHTML = `
//       <td></td>
//       <td></td>
//       <td></td>
//       `;

//     console.log(root);
//     root.appendChild(table);
//   }
// }
// {
//   let url =
//     "http://localhost:3000/subscriptions";
//   let table = document.querySelector("table");

//   fetch(url)
//     .then((res) => res.json())
//     .then((data) => {
//       data.forEach((element) => {
//         table.innerHTML += `
//           <td>${element.current_status}</td>   
//             <td>${element.started_on}</td>
//             <td>${element.contract_references}</td>   
//             `;
//       });
//     })
//     .catch((err) => console.log(err));
// }

const apu_url = "http://localhost:3000/subscriptions";
async function getData() {
  const response = await fetch(apu_url);
  const data = await response.json();
  const { current_status, started_on, contract_references } = data;
  console.log(current_status);
  console.log(started_on);
  console.log(contract_references);
}
getData();