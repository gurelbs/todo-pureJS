const $ = x => document.querySelector(x)
const $1 = x => document.createElement(x)
const toDoApp = $('.to-do-app')

class Todo {
    constructor() {
        this.list = []
        this.id = 200
        this.isCompleted = false
    }
    addItem(taskName = '') {
        let div = $1('div')
        let btnWrap = $1('div')
        let cb = $1('input')
        let p = $1('textarea')
        let update = $1('button')
        let dlt = $1('button')
        dlt.textContent = 'DELETE'
        update.textContent = 'UPDATE'
        dlt.classList.add('delete-btn')
        update.classList.add('update-btn')
        cb.classList.add('todo-checkbox')
        p.value = taskName
        p.classList.add('todo-txt')
        p.setAttribute('id', this.id)
        p.setAttribute('data-isCompleted', this.isCompleted)
        cb.setAttribute('type', 'checkbox')
        div.classList.add('to-do-item')
        btnWrap.appendChild(dlt)
        btnWrap.appendChild(update)
        div.appendChild(cb)
        div.appendChild(p)
        div.appendChild(btnWrap)
        toDoApp.appendChild(div)
        this.list.push({
            id: this.id,
            taskName,
            isCompleted: this.isCompleted
        })
        this.id++
    }
    findItem(id) {
        this.list.forEach(todo => {
            if (todo.id === id) console.log(todo);
        })
    }
    deleteItem(id) {
        this.list.forEach(todo => {
            if (todo.id === parseInt(id)) {
                this.list.splice(this.list.indexOf(todo), 1)
            }
        })
    }
    markAsDone(id) {
        this.list.forEach(todo => {
            if (todo.id === parseInt(id)) {
                todo.isCompleted = true
            }
        })
    }
    unmarkAsDone(id) {
        this.list.forEach(todo => {
            if (todo.id === parseInt(id)) {
                todo.isCompleted = false
            }
        })
    }
    updateTxt(id, txt) {
        this.list.forEach(todo => {
            if (todo.id === parseInt(id)) {
                todo.taskName = txt
            }
        })
    }
    sortList() {
        return this.list.sort((a, b) => a.isCompleted - b.isCompleted)
    }
}

let toDo = new Todo()
const container = $('.container')
const addTodoBtn = $('.add-todo')
const addTodoInput = $('.what-to-do')


addTodoInput.classList.add('unvisible')

const handleInput = e => {
    let userInput = e.target.value
    if (e.key === 'Enter') {
        if (userInput.length > 0) {
            toDo.addItem(userInput)
            addTodoInput.value = ''
            addTodoInput.classList.add('unvisible')
            console.log(toDo.list);
        }
    }
}
const handleAddToDo = () => {
    addTodoInput.classList.remove('unvisible')
    addTodoInput.focus()
    addTodoInput.addEventListener('keydown', handleInput)
}
const handleClicks = e => {
    const handleMarkAsRead = e => {
        let target = e.target
        if (target.type === 'checkbox') {
            let toDoId = target.nextElementSibling.getAttribute('id')
            if (target.checked) {
                target.nextElementSibling.classList.add('mark-as-done')
                target.nextElementSibling.setAttribute('data-iscompleted', true)
                toDo.markAsDone(toDoId)
                console.log(toDo.list);

            } else {
                target.nextElementSibling.classList.remove('mark-as-done')
                target.nextElementSibling.setAttribute('data-iscompleted', false)
                toDo.unmarkAsDone(toDoId)
                console.log(toDo.list);

            }
        }
    }
    const hendleDelete = e => {
        if (e.target.classList.contains('delete-btn')) {
            let elId = e.target.parentElement.previousElementSibling.getAttribute('id')
            toDo.deleteItem(elId)
            e.target.parentElement.parentElement.remove()
            console.log(toDo.list);
        }
    }
    const updateText = e => {
        const handleTxtChange = e => {
            if (e.key === 'Enter') {
                toDo.updateTxt(e.target.getAttribute('id'), e.target.textContent)
                console.log(toDo.list);
                e.target.contentEditable = false
            }
        }
        if (e.target.classList.contains('todo-txt')) {
            e.target.contentEditable = true
            e.target.addEventListener('keypress', handleTxtChange)
        }
        if (e.target.classList.contains('update-btn')) {
            let txt = e.target.parentElement.previousElementSibling
            txt.contentEditable = true
            txt.focus()
            txt.setSelectionRange(txt.value.length, txt.value.length);

            console.log(txt.textContent);
        }
    }
    updateText(e)
    hendleDelete(e)
    handleMarkAsRead(e)
}
container.addEventListener('click', handleClicks)
addTodoBtn.addEventListener('click', handleAddToDo)