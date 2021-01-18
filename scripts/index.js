(function () {
	const input          = document.querySelector('#itnew');
	const form           = document.querySelector('#formitnew');
	const selectList     = document.querySelector("#slist");
	const listsContainer = document.querySelector("#lists");

	let todos = [];
	let lists = [
	{id: uuidv4(), text: 'Amigos', count: 0},
	{id: uuidv4(), text: 'Casa', count: 0},
	{id: uuidv4(), text: 'Trabajo', count: 0}
	];

	document.addEventListener('DOMContentLoaded', e =>{
		refreshUI();
		lists.forEach( list =>{
			selectList.innerHTML += `<option value="${list.id}">${list.text}</option>`;
		});
	});

	function Todo(id, text, list, completed){
		return {id: id, text: text, list:list, completed:completed};
	}

	// To add a task
	form.addEventListener('submit', e => {
		e.preventDefault();
		const text = input.value.trim();
		const listId = selectList.value;

		if(text === '') return false;

		const newTodo = new Todo(uuidv4(), text, listId, false);

		todos.push(newTodo);
		input.value = '';

		refreshUI();
	});

	function refreshUI(){
		renderTodos();
		renderLists();
	};

	function renderTodos(){
		
		// To display the task list
		const todosContainer = document.querySelector('#todos');
		todosContainer.innerHTML = '';

		todos.forEach(todo => {
			todosContainer.innerHTML += renderTodo(todo);
		});

		// To change the task status
		document.querySelectorAll('.todo label input').forEach(item => {
			item.addEventListener('click', e => {
				const id = e.target.parentNode.parentNode.getAttribute('data-id');
				const index = todos.findIndex(todo => todo.id === id);

				todos[index].completed = !todos[index].completed;
			});
		});

		// To delete a task
		document.querySelectorAll('.todo button').forEach(item => {
			item.addEventListener('click', e => {
				const id = e.target.parentNode.getAttribute('data-id');
				const obj = getItemAndIndex(todos, {id: id});

				todos.splice(obj.index, 1);

				refreshUI();
			});
		});
	}

	// To get the item and index of a task
	function getItemAndIndex(arr, obj){
		let i = 0;
		const key = Object.keys(obj);
		const value = obj[key];

		for(i = 0; i < arr.length; i++){
			if(arr[i][key] === value){
				return {index: i, item: arr[i]};
			};
		};
	};

	// To display the task
	function renderTodo(todo){
		return `
		<div class="todo" data-id="${todo.id}">
			<label class="checkbox-container">${todo.text}
				<input type="checkbox" ${(todo.completed)? 'checked="checked"': ''} />
				<span class="checkmark"></span>
			</label>
			<button></button>
		</div>
		`;
	}

	// To display the list
	function renderLists(){
		lists.forEach(list => {
			list.count = 0;
		});

		todos.forEach(todo => {
			lists.forEach(list => {
				if(todo.list === list.id){
					list.count++;
				}
			});
		});

		listsContainer.innerHTML = '';
		lists.forEach(list => {
			listsContainer.innerHTML += renderListsItem(list);
		});
	};

	function renderListsItem(list) {
		return `
			<div class="list">
				<h3>${list.text}</h3>
				${list.count} tareas
			</div>
		`;
	}

	// to generate random ID for list
	function uuidv4(){
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	}

})();