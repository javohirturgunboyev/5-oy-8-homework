const field = document.querySelector('#field');
const button = document.getElementById('button');
const wrapper = document.querySelector('#todo-wrapper');
const btn = document.getElementById('save');

function creatItem(value, id){
    return `
          <div class="item">
                    <div class="left">
                         <input type="checkbox" name="" id="">
                         <p>${value}</p>
                    </div>

                    <div class="right">
                         <button>
                         
                              <span>Edit</span>
                         </button>

                         <button data-id = ${id} class="delete-item">
                              
                              <span>Delete</span>
                         </button>

                    </div>
               </div>
     `;
}

function validate(){
    const todo = field.value;
    if(todo.length < 5){
        alert("Eng kamida 6ta belgidan iborat bo`lishi shart")
        field.focus();
        field.style.outlineColor = "red"
        return false;
    }
    return true;
}
function saveItemLocalStorage(value){
     const todo = {
          name: value,
          status: 'active',
          id:Date.now()
     }
     let data = [];
     if(localStorage.getItem('todos')){
          data = JSON.parse(localStorage.getItem('todos'))
     }
     data.push(todo);
     localStorage.setItem('todos', JSON.stringify(data));

     const item = creatItem(field.value, todo.id);
     wrapper.innerHTML += item;

}

button && button.addEventListener('click', function(event){
    event.preventDefault();
    const todo = field.value;
    const isValid = validate();
    if(!isValid){
        return;
    }
    saveItemLocalStorage(field.value);
    field.value = '';
    field.focus();
})

document.addEventListener('DOMContentLoaded', function(){
     let data =[];
     if(localStorage.getItem('todos')){
          data = JSON.parse(localStorage.getItem('todos'))
     }
     if(data.length > 0){
          data.forEach(function(value) {
               const item = creatItem(value.name, value.id)
               wrapper.innerHTML += item;
          })
     }
     const deleteButtons = document.querySelectorAll('.delete-item')
     deleteButtons.length > 0 && deleteButtons.forEach(function(element){
          element.addEventListener('click', function(event){
               event.preventDefault();
               let isDelete = confirm("Rostdanam o`chirmoqchimisiz uylab kuring balkim qo'liz tegib ketgandir?");
               if(isDelete){
                let deleteId = this.getAttribute('data-id');
                    let copied = JSON.parse(JSON.stringify(data));
                    copied = copied.filter(function(del){
                    return del.id != deleteId
                    })

                    localStorage.setItem('todos', JSON.stringify(copied));
                    window.location.reload();
               }
          })
     })
})


