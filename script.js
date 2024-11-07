const apiBaseURL = "http://localhost:3002";

// Create a new item
async function createItem() {
    const name = document.getElementById('createName').value;
    const description = document.getElementById('createDescription').value;

    const response = await fetch(`${apiBaseURL}/item/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({name, description })
    });
    

    if (response.ok) {
        alert("Item created successfully");
        getItems(); // Refresh item list
    } else {
        alert("Failed to create item");
    }
}

// Get and display all items
 function getItems() {
    const response =   fetch(`${apiBaseURL}/item/get/`, { method: "GET" });
    response.then((res) => res.json()).then(function(res){
        const itemList = document.getElementById("itemList");
        const emptyList = document.getElementById("emptyList");
        emptyList.innerHTML = ""
        itemList.innerHTML = ""; // Clear the list
        let id =1
        if(res.data.length>0){
            res.data.forEach(item => {
                const listItem = document.createElement("li");
                listItem.textContent = `ID: ${id}, Name: ${item.name}, Description: ${item.description}`;
                id = id + 1
                itemList.appendChild(listItem);
                
            });
        }
        else{
            emptyList.innerHTML = 'No item to display.'
            }
        console.log(res.data.length)
    })
    .catch(error => console.log(`An error occured, ${error}`))
   
}

getItems()


// Update an existing item
async function updateItem() {
    const id = document.getElementById('updateId').value;
    const name = document.getElementById('updateName').value;
    const description = document.getElementById('updateDescription').value;

    const response = await fetch(`${apiBaseURL}/item/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({name, description })
    });

    if (response.ok) {
        alert(`Item${id} updated successfully`);
        getItems(); // Refresh item list
    } else {
        alert("Failed to update item");
    }
}

// Delete an item
async function deleteItem() {
    const id = document.getElementById('deleteId').value;

    const response = await fetch(`${apiBaseURL}/item/delete/${id}`, { method: "DELETE" });

    if (response.ok) {
        alert("Item deleted successfully");
        getItems(); // Refresh item list
    } else {
        alert("Failed to delete item");
    }
}
