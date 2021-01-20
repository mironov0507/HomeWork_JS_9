let toDoList = function(){
    let works = [],
        status = document.createElement('h3'),
        superThis = this;

   status.innerHTML = 'Список задач пуст';

    this.form = document.createElement('div');
    this.form.classList.add('container');
    this.form.innerHTML = `<div class="title">Список задач<button class="B_delete">Очистить список</button></div>
        <div class="work_text">
        <form method="POST">
            <input type="text" name="work" id="" placeholder="Введите новую задачу..." autofocus>
        </form>
        </div>`
        document.body.appendChild(this.form);

        document.querySelector('form').addEventListener('submit', function(event){
            event.preventDefault();
            superThis.add();
        })

    let create = function(text){
        let work = {
            text:text,
            checkB:0
            }

        return work
    }


    this.start = function(){
        this.form.appendChild(status);
    }


    this.add = function(){

        this.inputs = document.querySelector('input')

        let workInfo = create(this.inputs.value);

        if(workInfo.text != ''){
            works.push(workInfo);
        }

        if(document.querySelector('h3')){
            document.querySelector('h3').remove();
        }

        this.inputs.value = '';

        this.show();
        
    }


    this.delete = function(id){
        
        if(works[id] ==undefined) return;
        works.splice(id,1);
        if(works.length != 0){
            this.show();
            return;
        }

        this.form.appendChild(status);
        this.show();

    }


    this.show = function(){
        let elementUl = document.querySelector('.work-list')

        if(!elementUl){
            elementUl = document.createElement('ul')

            elementUl.classList.add('work-list')
            this.form.appendChild(elementUl);
        }
        
        elementUl.innerHTML = '';

        for(let i = 0; i < works.length; i++){
            let elementLi = document.createElement('li');
            elementLi.id = i;

            if(works[i].checkB == 0){
                elementLi.innerHTML = `<div class="work"><div class="line"></div><input type="checkbox" class="checkbox">${works[i].text}<button class="delete">X</button><button class="edit">Изменить</button></div>`
            }else {
                elementLi.innerHTML = `<div class="work hover1"><div class="line hover2"></div><input type="checkbox" class="checkbox" checked>${works[i].text}<button class="delete">X</button><button class="edit">Изменить</button></div>`
            }
            elementUl.appendChild(elementLi);

        }

        
        this.checkboxes = document.querySelectorAll('.checkbox')

        this.checkboxes.forEach(function(element){
            element.addEventListener('click',function(){
                let checkedId = element.parentElement.parentElement.getAttribute('id')

               superThis.checked(checkedId);
            })
        })
        

        this.edits = document.querySelectorAll('.edit')

        this.edits.forEach(function(element){
            element.addEventListener('click',function(){
                let editsId = element.parentElement.parentElement.getAttribute('id')

                superThis.edit(editsId);
            })
        })        


        this.deletes = document.querySelectorAll('.delete')

        this.deletes.forEach(function(element){
            element.addEventListener('click',function(){
                let deleteId = element.parentElement.parentElement.getAttribute('id')

               superThis.delete(deleteId);
            })
        })

    }


    this.checked = function(id){

        document.getElementById(id).querySelector('.work').classList.toggle('hover1');
        document.getElementById(id).querySelector('.line').classList.toggle('hover2');

        (works[id].checkB == 0) ? works[id].checkB = 1 : works[id].checkB = 0;

    }


    this.edit = function(id){
        let inputEdit = document.createElement('div')
            inputEdit.innerHTML =`<div class="edit_text">
            <form method="POST">
                <input type="text" name="edit" value="${works[id].text}">
            </form>
            </div>`

            document.body.appendChild(inputEdit);

            inputEdit.querySelector('form').addEventListener('submit', function(event){
                event.preventDefault();

                works[id].text = inputEdit.querySelector('input').value;
                inputEdit.remove();
                superThis.show();
            })
    }

    
    document.querySelector('.B_delete').addEventListener('click', function(){
        document.location.reload();
    })

}


let list = new toDoList();

list.start();

