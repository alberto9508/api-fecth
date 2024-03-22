console.log("Accediste al Api");
const button = document.getElementById('btn');
button.addEventListener("click", solicitudFetch);
let data = document.getElementById("content");
const localStorageTimeLimit_s = 60;

function solicitudFetch() {
const users = JSON.parse(localStorage.getItem("users"));
data.innerHTML = "";
console.log(users);
console.log(typeof users);

    if (users && users.time > Date.now()) {
    fetchData(users.data);
    }
    else {
        data.innerHTML = `
        <tr>
            <td class="col-md-1 text-center">
                <div class="d-flex justify-content-center">
                    <div class="spinner-border text-info" role="status">
                    </div>
                </div>
            </td>

            <td class=" col-md-3 text-center">
                <div class="d-flex justify-content-center">
                    <div class="spinner-border text-info" role="status">
                    </div>
                </div>
            </td>

            <td class="col-md-3 text-center">
                <div class="d-flex justify-content-center">
                    <div class="spinner-border text-info" role="status">
                    </div>
                </div>
            </td>

            <td class="col-md-3 text-center">
                <div class="d-flex justify-content-center">
                    <div class="spinner-border text-info" role="status">
                    </div>
                </div>
            </td>

            <td class="col-md-2 text-center">
                <div class="d-flex justify-content-center">
                    <div class="spinner-border text-info" role="status">
                    </div>
                </div>
            </td>
        </tr>
    `;

    fetch("https://reqres.in/api/users?delay=3")
        .then ((msje) => {
            if (msje.status == 200) {
                console.log("Estado de la peticion: Realizada");
                return msje.json();
            }
        })
        .then((users) => {
            const usersData = {
                data: users.data,
                time: Date.now() + 60000,
            };
            data.innerHTML = "";

            localStorage.setItem("users", JSON.stringify(usersData));
            fetchData(users.data)

        })
        .catch ( err => {
            console.log("Error en la peticion:", err);
            console.warn("Estado de la peticion:", err.status);
    });

    }
}


function fetchData(user) {
    for (let i = 0; i <user.length; i++) {
        data.innerHTML += `
            <tr class="users container-sm text-center" >
                <td id="user-id" class="col-md-1 table-primary"> ${user[i].id}</td>
                <td id="user-name" class="col-md-3 table-primary"> ${user[i].first_name}</td>
                <td id="user-lastname" class="col-md-3 table-primary"> ${user[i].last_name}</td>
                <td id="user-email" class="col-md-2 table-primary"> ${user[i].email}</td>
                <td id="user-avatar" class="col-md-3 table-primary"><img src="${user[i].avatar}" alt="${user[i].first_name}" class="rounded-circle " style="width: 65px"/></td>
            </tr>`;
    };
}