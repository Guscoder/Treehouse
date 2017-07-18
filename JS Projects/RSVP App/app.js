
/*jshint esversion: 6 */


const form = document.getElementById('registrar');
const input = form.querySelector('input');

const mainDiv = document.querySelector('.main');
const ul = document.getElementById('invitedList');

const div = document.createElement('div');
const filterLabel = document.createElement('label');
const filterCheckbox = document.createElement('input');

filterLabel.textContent = "Hide those who haven't responded";
filterCheckbox.type = 'checkbox';

div.appendChild(filterLabel);
div.appendChild(filterCheckbox);
mainDiv.insertBefore(div, ul);

filterCheckbox.addEventListener('change', (e) => {
  const isChecked = e.target.checked;
  const lis = ul.children;
  if (isChecked) {
    for (let i = 0; i < lis.length; i += 1) {
      let li = lis[i];
      if (li.className === 'responded') {
        li.style.display = '';
      } else {
        li.style.display = 'none';
      }
    }
  } else {
    for (let i = 0; i < lis.length; i += 1) {
      let li = lis[i];
      li.style.display = '';
    }
  }
});


function createLI(text) {
  function createElement(elementName, property, value){
    const element  = document.createElement(elementName);
    element[property] = value;    
    return element;
  }

  function appendToLI(elementName, property, value) {
    const element = createElement(elementName, property, value);
    li.appendChild(element);
    return element;
  }

  const li = document.createElement('li');

  appendToLI('span', 'textContent', text);
/*
  const label = appendToLI('label', 'textContent', 'Confirmed');
  const checkbox  = createELement('input', 'type', 'checkbox');
  label.appendChild(checkbox);
  refactored to below line #67
*/
  appendToLI('label', 'textContent', 'Confirmed').appendChild(createElement('input', 'type', 'checkbox'));
  appendToLI('button', 'textContent', 'edit');
  appendToLI('button', 'textContent', 'remove');
  return li;
}


form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value;

  if (input.value === '') {
    alert("You did not enter a name.");
  } else {
    input.value = '';
    const li = createLI(text);
    ul.appendChild(li);
  }
});


ul.addEventListener('change', (e) => {
  const checkbox = event.target;
  const checked = checkbox.checked;
  const listItem = checkbox.parentNode.parentNode;

  if (checked) {
    listItem.className = 'responded';
  } else {
    listItem.className = '';
  }
});

ul.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    const button = e.target;
    const li = button.parentNode;
    const ul = li.parentNode;

    const nameActions = {
      remove: () => {
        ul.removeChild(li);
      },
      edit: () => {
        const span = li.firstElementChild;
        const input = document.createElement('input');
        input.type = 'text';
        input.value = span.textContent;
        li.insertBefore(input, span);
        li.removeChild(span);
        button.textContent = 'save';
      },
      save: () => {
        const input  = li.firstElementChild;
        const span = document.createElement('span');
        span.textContent = input.value;
        li.insertBefore(span, input);
        li.removeChild(input);
        button.textContent = 'edit';
      }
    };

    const action = button.textContent;

    //select and run action in button's name
    nameActions[action]();

/*    if (action === 'Remove') {
      nameActions.remove();
    } else if (action === 'Edit') {
      nameActions.edit();
    } else if (action === 'save') {
      nameActions.save();
    }
    */
  }

/*
  ul.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    const button = e.target;
    const li = button.parentNode;
    const ul = li.parentNode;
    if (button.textContent === 'Remove') {
      ul.removeChild(li);
    } else if (button.textContent === 'Edit') {
        const span = li.firstElementChild;
        const input = document.createElement('input');
        input.type = 'text';
        input.value = span.textContent;
        li.insertBefore(input, span);
        li.removeChild(span);
        button.textContent = 'save';
    } else if (button.textContent === 'save') {
        const input  = li.firstElementChild;
        const span = document.createElement('span');
        span.textContent = input.value;
        li.insertBefore(span, input);
        li.removeChild(input);
        button.textContent = 'Edit';
    }
  }
*/
});