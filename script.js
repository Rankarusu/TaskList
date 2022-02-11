window.addEventListener('load', () => {
  const form = document.querySelector('#new-task-form');
  const input = document.querySelector('#task-input');

  form.addEventListener('submit', (e) => {
    e.preventDefault(); //prevents the page from refreshing
    const task = input.value;

    if (!task) {
      alert('Please fill out the task');
      return;
    }
    addTask(input, task);
  });
  //read tasks from localstorage
  let stuff = JSON.parse(localStorage['data']);
  stuff.forEach(e => addTask(input, e))

});

function addTask(input, task) {

  const list_el = document.querySelector('#tasks');
  const task_el = document.createElement('div');
  task_el.classList.add('task');

  const task_content_el = document.createElement('div');
  task_content_el.classList.add('content');

  task_el.appendChild(task_content_el);

  const task_input_el = document.createElement('input');
  task_input_el.type = 'text';
  task_input_el.classList.add('text');
  task_input_el.value = task;
  task_input_el.setAttribute('readonly', 'readonly');

  task_content_el.appendChild(task_input_el);


  const task_actions_el = document.createElement('div');
  task_actions_el.classList.add('actions');

  const task_edit_el = document.createElement('button');
  task_edit_el.classList.add('edit', 'material-icons', 'md-48');
  task_edit_el.innerHTML = 'edit';

  const task_delete_el = document.createElement('button');
  task_delete_el.classList.add('delete', 'material-icons', 'md-48');
  task_delete_el.innerHTML = 'delete';

  task_actions_el.appendChild(task_edit_el);
  task_actions_el.appendChild(task_delete_el);

  task_el.appendChild(task_actions_el);


  list_el.appendChild(task_el);

  input.value = "";

  task_edit_el.addEventListener('click', () => {
    if (task_edit_el.innerText == 'edit') {
      task_input_el.removeAttribute('readonly');
      task_input_el.focus();
      task_edit_el.innerText = 'save';
    }
    else {
      task_input_el.setAttribute('readonly', 'readonly');
      task_edit_el.innerText = "edit";
    }
  });

  task_delete_el.addEventListener('click', () => {
    list_el.removeChild(task_el);
  });
}

//write tasks to localstorage on leave
window.addEventListener('beforeunload', () => {
  const elements = Array.from(document.getElementsByClassName('text'));
  let tasks = [];
  elements.forEach(element => {
    tasks.push(element.value);
  });
  localStorage.setItem('data', JSON.stringify(tasks));
}, false);