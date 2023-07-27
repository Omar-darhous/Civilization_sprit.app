const baseURL = 'http://localhost:5000'
// start Display data
const headers = {
    'Content-Type': 'application/json; charset=UTF-8',
    'authorization': `Hamada__${localStorage.getItem("token")}`
}
// let notes = []
function getData() {
    axios({
        method: 'get',
        url: `${baseURL}/note`,
        headers
    }).then(function (response) {
        const { message, notes } = response.data
        showData(notes)
    }).catch(function (error) {
        console.log(error);
    });
}


function showData(notes = []) {
    let cartonna = ``
    console.log({ notes });
    for (let index = 0; index < notes.length; index++) {
        if (notes[index].userId?.userName) {
            cartonna += `  <tr>
            <td>${notes[index].title}</td>
            <td>${notes[index].description}</td>
            <td>${notes[index].userId.userName}</td>
            <td>
            <button onclick='deleteItem("${notes[index]._id}")' class="btn btn-danger">Delete</button>
            <button onclick='updateItem("${notes[index]._id}")' class="btn btn-success">Update</button>
            </td>
        </tr>`
        }
    }
    document.getElementById('tbody').innerHTML = cartonna
}


getData()
// End Display data

//create note with 
$("#addNote").click(() => {
    const data = {
        title: $("#title").val(),
        description: $("#description").val()
    }
    console.log(data);

    axios({
        method: 'post',
        url: `${baseURL}/note`,
        data,
        headers
    }).then(function (response) {
        console.log({response});
        const { message } = response.data
        if (message == "Done") {
            alert("added success")
            getData()
        } else {
            alert("Fail to add your note")
        }
    }).catch(function (error) {
        console.log(error);
    });
})


//delete note with id
function deleteItem(id) {

    axios({
        method: 'delete',
        url: `${baseURL}/note/${id}`,
        headers
    }).then(function (response) {
        console.log(response.data);
        const { message } = response.data
        if (message == "Done") {
            alert("Deleted successfully")
            getData()
        } else {
            alert("Fail to Delete your note")
        }
    }).catch(function (error) {
        console.log(error);
    });
}
// redirect to update note page
function updateItem(id) {
    localStorage.setItem("noteID", id)
    window.location.href = 'update.html';

}
