function getDetails() {
    let nutro_form = document.getElementById('submit');
    // console.log(login_value)
    nutro_form.addEventListener("click", async function (event) {
        event.preventDefault()
        let Serving_size = document.getElementById('Serving_size');
        let Calories = document.getElementById('Calories');
        let Calories_from_fat = document.getElementById('Calories_from_fat');
        let Total_fat = document.getElementById('Total_fat');
        let Saturated_fat = document.getElementById('Saturated_fat');
        let Trans_fat = document.getElementById('Trans_fat');
        let Cholesterol = document.getElementById('Cholesterol');
        let Protein = document.getElementById('Protein');
        let Carbohydrates = document.getElementById('Carbohydrates');
        let Sodium = document.getElementById('Sodium');
        let title = document.getElementById('title');
        let identity = document.getElementById('identity');

        let userObj = {
            Serving_size: Serving_size.value,
            Calories: Calories.value,
            Calories_from_fat: Calories_from_fat.value,
            Total_fat: Total_fat.value,
            Saturated_fat: Saturated_fat.value,
            Trans_fat: Trans_fat.value,
            Cholesterol: Cholesterol.value,
            Protein: Protein.value,
            Carbohydrates: Carbohydrates.value,
            Sodium: Sodium.value,
            title: title.value,
            identity: identity.value
        };
        // console.log()
        console.log(userObj);

        fetch('http://localhost:6969/nutros/create', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('AdminToken')
            },
            body: JSON.stringify(userObj),
        }).then((res) => {
            return res.json();
        }).then((data) => {
            alert(data.Message);
        }).catch((error) => {
            console.log({ 'error': error })
        })
    });
}
// =============================Fetch data===============================
async function Fetch_all_whole_data() {

    try {
        let fetch_data = await fetch(`http://localhost:6969/nutros`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('AdminToken')
            }
        })
        console.log(fetch_data)
        if (fetch_data.ok) {
            let main_data = await fetch_data.json();
            console.log(main_data)
            display_data(main_data)
        } else {
            alert(
                "Bad request! Maybe you are missing your access token."
            );
        }
    } catch (error) {
        alert("Something went wrong!! Please try again later.");

    }
}
Fetch_all_whole_data();

function display_data(data) {
    let below_div = document.querySelector('.containerr');
    below_div.innerHTML = '';
    let allData = data.map((item) => {
        return `<div class="one">
        <img src="../image/M1-BeefGrillerswDip-761x561.jpeg" alt="">
        <h1>${item.title}</h1>
        <div class="upper_div" onclick="open_nutro_pop()">
            <p>Nutrition info</p>
            <div class="putHere">
                <div class="lower_div">
                    <div>
                        <h1>Nutritions Info</h1>
                        <a href=""><i class="fa-solid fa-xmark"></i></a>
                    </div>
                    <div class="nutrition_pop_upper_div">
                        <div class="nutrition_pop_inner_div">
                            <h1>Serving size</h1>
                            <p>${item.Serving_size} oz</p>
                        </div>
                        <div class="nutrition_pop_inner_div">
                            <h1>Calories</h1>
                            <p>${item.Calories}</p>
                        </div>
                        <div class="nutrition_pop_inner_div">
                            <h1>Calories from fat</h1>
                            <p>${item.Calories_from_fat}</p>
                        </div>
                        <div class="nutrition_pop_inner_div">
                            <h1>Total fat</h1>
                            <p>${item.Total_fat}g</p>
                        </div>
                        <div class="nutrition_pop_inner_div">
                            <h1>Saturated fat</h1>
                            <p>${item.Saturated_fat}g</p>
                        </div>
                        <div class="nutrition_pop_inner_div">
                            <h1>Trans fat</h1>
                            <p>${item.Trans_fat}g</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`
    }).join('');
    console.log(allData);
    below_div.innerHTML = allData;

    let all_delete_btn = document.querySelectorAll("#delete");
    for (let btn of all_delete_btn) {
        btn.addEventListener("click", (event) => {
            // let data_id = event.target.dataset.id;
            let data_id = data._id;
            console.log(data_id);
            // console.log(btn.dataset.id);
            DeleteBtn(data_id);
            console.log(data_id);
        });
    }

    let all_edit_btn = document.querySelectorAll("#update");
    for (let btn of all_edit_btn) {
        btn.addEventListener("click", (event) => {
            console.log(event.path);
            let item_id = event.target.dataset.id;
            let input_tag = event.path[2].children[0].children[0];
            if (event.target.innerText === "Update") {
                event.target.innerText = "SAVE";
                input_tag.removeAttribute("readonly");
                input_tag.focus();
            } else {
                event.target.innerText = "Update";
                input_tag.readOnly = true;
                EditRequest(item_id, input_tag.value, "title");
            }
        });
    }
}



// ==============================================Updating the data===========================================

function EditRequest(id, new_status, key_name) {
    fetch(`http://localhost:6969/notes/update/${id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem('Token')
        },
        body: JSON.stringify({ [key_name]: new_status })
    }).then((res) => {
        return res.json();
    }).then((data) => {
        alert(data.Message);
        Fetch_all_whole_data();
    }).catch((error) => {
        console.log({ 'error': error })
    });
}


// ====================================deleting the notes via ID================================

function DeleteBtn(id) {
    fetch(`http://localhost:6969/notes/delete/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem('Token')
        },

    }).then((res) => {
        return res.json();
    }).then((data) => {
        // console.log(data);
        alert(data.Message);
        Fetch_all_whole_data();
    }).catch((error) => {
        console.log({ 'error': error })
    });
}
