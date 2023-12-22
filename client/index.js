const get = async () => {
    let list = document.getElementById('list');

    try {
        const response = await fetch('http://localhost:5003/todo');

        if (!response.ok) {
            throw Error("Error");
        }

        const data = await response.json();
        console.log(data);

        document.getElementById('list').innerHTML = '';

        data.forEach(items => {
            const listitems = document.createElement('li');
            listitems.innerHTML = `<h3>${items.title} : ${items.description}</h3>`;
            list.append(listitems);

            const ebtn = document.createElement('button');
            ebtn.id = "edit";
            ebtn.textContent = 'Edit';


            ebtn.onclick = () => {
                Edit(items);
            };

            const dbtn = document.createElement('button');
            dbtn.id = "delete";
            dbtn.textContent = "Delete";

            dbtn.onclick = async () => {
                console.log("Item to be deleted:", items);
                const id = items._id
                await Delete(id);
            };

            listitems.appendChild(ebtn);
            listitems.appendChild(dbtn);
        });
    } catch (error) {
        console.log(error);
    }
};

get();

const Todo = async () => {
    try {
        const Todotitle = document.getElementById('box1').value;
        const Tododes = document.getElementById('box2').value;

        const data = {
            title: Todotitle,
            description: Tododes
        };

        const response = await fetch('http://localhost:5003/todo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw Error(`HTTP error! Status: ${response.status}`);
        } else {
            const res = await response.json();
            console.log(res, 'success');
            get();
            document.getElementById('box1').value = '';
            document.getElementById('box2').value = '';
            
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
};

const Edit = async (items) => {
    try {
        const id = items._id;
        console.log(id, "hi")

        const sbtn = document.getElementById('btn');
        sbtn.innerHTML = 'update';

        const tit = document.getElementById('box1');
        tit.value = items.title;

        const des = document.getElementById('box2');
        des.value = items.description;

        sbtn.onclick = async () => {
            try {
                const Todotitle = document.getElementById('box1').value;
                const Tododes = document.getElementById('box2').value;

                const data = { title: Todotitle, description: Tododes };

                const response = await fetch(`http://localhost:5003/todo/${id}`, {
                    method: "PUT",
                    headers: {
                        'content-type': "application/json"
                    },
                    body: JSON.stringify(data)
                });

                if (!response.ok) {
                    throw Error(`HTTP error! Status: ${response.status}`);
                }

                const res = await response.json();
                console.log(res);
                get();

                sbtn.innerHTML = "Save";

                tit.value = " ";
                des.value = " ";
            } catch (error) {
                console.log(error);
            }
        };
    } catch (error) {
        console.log(error);
    }
};

async function Delete(id) {
    
    let res = await fetch(`http://localhost:5003/todo/${id}`, {
        method: "DELETE",
    }).then((res) => {
        console.log(res, "res")
        get()

    })

}