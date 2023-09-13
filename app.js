const orderForm = document.getElementById("order-form");
const priceInput = document.getElementById("price");
const dishInput = document.getElementById("dish");
const tableInput = document.getElementById("table");
const addBtn = document.getElementById("addBtn");
const ul1 = document.getElementById("table1-list");
const ul2 = document.getElementById("table2-list");
const ul3 = document.getElementById("table3-list");

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get("https://crudcrud.com/api/804fa17aac9f43cca2be79fd720469a1/resturant/")
    .then((res) => {
      for (let i = 0; i < res.data.length; i++) {
        displayOrder(res.data[i]);
      }
    })
    .catch((err) => {
      document.body.innerHTML = `<h4>Something went wrong!</h4>`;
      console.log(err);
    });
});

addBtn.addEventListener("click", function addToBill(e) {
  e.preventDefault();
  let price = priceInput.value;
  let dish = dishInput.value;
  let table = tableInput.value;
  if (price && dish && table) {
    const order = {
      price,
      dish,
      table,
    };
    axios
      .post(
        "https://crudcrud.com/api/804fa17aac9f43cca2be79fd720469a1/resturant/",
        order
      )
      .then((res) => {
        displayOrder(res.data);
      })
      .catch((err) => {
        document.body.innerHTML = `<h4>Something went wrong!</h4>`;
        console.log(err);
      });
  }
});

function displayOrder(response) {
  let li = document.createElement("li");
  li.id = response._id;
  li.innerHTML = `${response.price} - ${response.table} - ${response.dish} - <button id="deleteBtn" class="deleteBtn btn btn-danger" onclick="deleteOrder('${response._id}', '${response.table}')">Delete Order</button>`;
  if (response.table == "Table 1") {
    ul1.appendChild(li);
  } else if (response.table == "Table 2") {
    ul2.appendChild(li);
  } else if (response.table == "Table 3") {
    ul3.appendChild(li);
  }
  priceInput.value = "";
  dishInput.value = "";
  tableInput.value = "";
}

function deleteOrder(id, table) {
  let li = document.getElementById(id);
  axios
    .delete(
      `https://crudcrud.com/api/804fa17aac9f43cca2be79fd720469a1/resturant/${id}`
    )
    .then((res) => {
      if (table == "Table 1") {
        ul1.removeChild(li);
      } else if (table == "Table 2") {
        ul2.removeChild(li);
      } else if (table == "Table 3") {
        ul3.removeChild(li);
      }
    })
    .catch((err) => {
      document.body.innerHTML = `<h4>Something went wrong!</h4>`;
      console.log(err);
    });
}
