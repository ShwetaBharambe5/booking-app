const myForm = document.querySelector('#my-form');
const userName = document.querySelector('#username');
const contactInput = document.querySelector('#phNumber');
const emailId = document.querySelector('#email');
const userList = document.getElementById('users');

myForm.addEventListener('submit', onSubmit);

window.addEventListener("DOMContentLoaded", async () => {

  try {
    const response = await axios.get("http://localhost:9000/get-users");
    console.log('Received Users:', response);
    showUsersOnScreen(response.data);
  }
  catch (err) {
    console.log(err);
  }
});

async function onSubmit(e) {
  e.preventDefault();


  const userDetails = {
    userName: userName.value,
    contact: contactInput.value,
    email: emailId.value,
  };
  try {
    const response = await axios.post("http://localhost:9000/add-user", userDetails);
    console.log('user created successfully:', response.data);
    const responseData = response.data;

    const updatedUsersResponse = await axios.get("http://localhost:9000/get-users")
    console.log('updated users:', updatedUsersResponse.data);
    showUsersOnScreen(updatedUsersResponse.data);
    clearInputs();

  } catch (err) {
    console.log('Error creating item:', err);
  }

}


function showUsersOnScreen(users) {
  userList.innerHTML = '';

  if (Array.isArray(users)) {

    users.forEach((user) => {
      const userElement = document.createElement('li');

      userElement.textContent =
        user.username + ', ' +
        user.contact + ',' +
        user.email;

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = "Delete";
      userElement.appendChild(deleteBtn);
      userList.appendChild(userElement);
      deleteBtn.addEventListener('click', () => deleteUser(user.id, userElement)); // Pass user.id to deleteUser
    });
  }
  clearInputs();
}

async function deleteUser(id, listItem) {
  await axios.delete(`http://localhost:9000/delete-user/${id}`);
  console.log(`Product Deleted Successfully.`);

  // Remove the element from the screen
  if (listItem) {
      listItem.remove();
  } else {
      console.error(`Error: Element with ID ${id} not found.`);
  }
}

function clearInputs() {
  userName.value = '';
  contactInput.value = '';
  emailId.value = '';
}

