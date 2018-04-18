// select add form values and button
var fullName = document.getElementById('fullName')
var mobileNo = document.getElementById('mobileNo')
var homeNo = document.getElementById('homeNo')
var email = document.getElementById('email')
// Select form add button
var addBtn = document.getElementById('addBtn')

// Select cancel button
var cancelBtn = document.getElementById('cancelBtn')

// Select quickAddBtn
var quickAddBtn = document.getElementById('quickAddBtn')

// select addContactDiv
var addContactDiv = document.getElementById('addContactDiv')

// select address display div
var addressDiv = document.getElementById('address-lists');

// Array that holds address data
var addressBook = []

function show (element) {
  element.style.display = 'block'
};

function hide (element) {
  element.style.display = 'none'
};

quickAddBtn.addEventListener('click', function () {
  show(addContactDiv)
})

cancelBtn.addEventListener('click', function () {
  hide(addContactDiv)
})

function DataConstructor (fullName, mobileNo, homeNo, email) {
  this.fullName = fullName
  this.mobileNo = mobileNo
  this.homeNo = homeNo
  this.email = email
};

function addNewContact () {
  var checkInput = fullName.value !== '' && mobileNo.value !== '' && homeNo.value !== '' && email.value !== ''
  if (checkInput) {
    var data = new DataConstructor(fullName.value, mobileNo.value, homeNo.value, email.value)
    addressBook.push(data)
    localStorage['addBook'] = JSON.stringify(addressBook)
  }
};

addBtn.addEventListener('click', function () {
  addNewContact()
  alert('contact added')
});

// display address book
function displayAddressBook () {
  if (localStorage['addBook'] === undefined) {
    localStorage['addBook'] = '[]'
  } else {
    addressBook = JSON.parse(localStorage['addBook'])
    addressDiv.innerHTML = ''
    for (var i in addressBook) {
      var htm = '<ul> <li>' + addressBook[i].fullName;
      htm += '<table> <tbody> <tr>';
      htm += '<td class="mobileNo"> <small> Mobile: </small> ' + addressBook[i].mobileNo + '</td>';
      htm += '<td class="homeNo"> <small> Home: </small>  ' + addressBook[i].homeNo + '</td>';
      htm += '<td class="email"> <small> Email: </small> ' + addressBook[i].email + '</td>';
      htm += '<td> <a href="#"> <i class="edit fas fa-pencil-alt" data-id=" '+ i + '"></i>  </a> </td>';
      htm += '<td> <a href="#"> <i class="delete fas fa-trash-alt" data-id=" '+ i + '"></i>  </a> </td>';
      htm += '</tr> </table> </li> </ul>';

      addressDiv.innerHTML += htm;
    }
  }
}

addressDiv.addEventListener('click', update);

// Delete Contact
function update(e){
  if (e.target.classList.contains("delete")) {
    alert('deleted');
    var id = e.target.getAttribute('data-id');
    // delete address with id from the json array
    addressBook = JSON.parse(localStorage['addBook']);
    addressBook.splice(id, 1);
    localStorage['addBook'] = JSON.stringify(addressBook);

    displayAddressBook();

  }
}

displayAddressBook();
