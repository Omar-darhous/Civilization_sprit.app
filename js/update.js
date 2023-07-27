const baseURL = 'http://localhost:5000'

const headers = {
    'Content-Type': 'application/json; charset=UTF-8',
    'authorization': `Hamada__${localStorage.getItem("token")}`
}

const noteID = localStorage.getItem('noteID')

function getNote() {
    axios({
        method: 'get',
        url: `${baseURL}/note/${noteID}`,
        headers
    }).then(function (response) {
        const { message, note } = response.data
        console.log(response);
        if (message == "Done") {
            $('#title').val(note.title);
            $('#description').val(note.description); 
        }else{
            alert("Fail")
        }
      
    }).catch(function (error) {
        console.log(error);
    });
}

getNote()

$("#updateNote").click(() => {
    const data = {
        title: $('#title').val(),
        description: $('#description').val()
    }
    axios({
        method: "put",
        url: `${baseURL}/note/${noteID}`,
        data,
        headers
    }).then((response) => {
        const { message } = response.data;
        console.log({rr:response.data});
        if (message == 'Done') {
            window.location.href = 'index.html';
        } else {
            alert("In-valid data")
        }
    }).catch((err) => {
        console.log({ message: "Catch error", err });
    })
})