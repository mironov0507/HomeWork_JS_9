let toDoList = function(){
    let works = [],
        status = document.createElement('h3'),
        superThis = this;

   status.innerHTML = 'Список задач пуст';

    this.form = document.createElement('div');
    this.form.classList.add('container');
    this.form.innerHTML = `<div class="title">Список задач</div>
        <div class="work_text">
        <form method="POST">
            <input type="text" name="work" id="" placeholder="Введите новую задачу...">
        </form>
        </div>`
        document.body.appendChild(this.form);

        document.querySelector('form').addEventListener('submit', function(event){
            event.preventDefault();
            superThis.add();
        })

    let create = function(text){
        let work = text;

        return work
    }

    this.start = function(){
        this.form.appendChild(status);
    }

    this.add = function(){

        this.inputs = document.querySelector('input')

        let workInfo = create(this.inputs.value);

        works.push(workInfo);

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
            elementLi.innerHTML = `<div class="work">${works[i]}<button class="delete">X</button></div>`

            elementUl.appendChild(elementLi);
        }

        this.deletes = document.querySelectorAll('.delete')

        this.deletes.forEach(function(element){
            element.addEventListener('click',function(){
                let deleteId = element.parentElement.parentElement.getAttribute('id')

               superThis.delete(deleteId);
            })
        })

    }

}

let list = new toDoList();

list.start();

