document.addEventListener("DOMContentLoaded", () => {
  //   const leaderBoard = {
  //     1: 0,
  //     2: 0,
  //     3: 0,
  //     4: 0,
  //     5: 0,
  //     6: 0,
  //     7: 0,
  //     8: 0,
  //     9: 0,
  //     10: 0,
  //   };

  getTheLastData = localStorage.getItem("formData");
  console.log(getTheLastData + "getTheLastData");

  const leaderBoard = {
    1: getTheLastData,
    2: getTheLastData,
    3: getTheLastData,
    4: getTheLastData,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
  };
  console.log(leaderBoard);
});

// let theFlag;
// console.log(theFlag);

// document.addEventListener("DOMContentLoaded", function () {
//   const signupLink = document.getElementById("signupLink");

//   signupLink.addEventListener("click", function (event) {
//     event.preventDefault(); // Prevent the default link behavior

//     const firstName = document.getElementById("his__name").value;
//     const lastName = document.getElementById("his__surname").value;
//     const email = document.getElementById("his__mail").value;
//     const password = document.getElementById("his__pass").value;

//     // Create an object to store the form data
//     const formData = {
//       firstName: firstName,
//       lastName: lastName,
//       email: email,
//       password: password,
//     };

//     // Convert the form data object to a JSON string
//     const formDataJSON = JSON.stringify(formData);
//     // console.log(formDataJSON);

//     // Store the JSON string in local storage
//     localStorage.setItem("formData", formDataJSON);

//     // Redirect to another page or perform other actions as needed
//     // For example, you can use window.location.href to navigate to a new page
//     // window.location.href = 'success.html';

//     getTheData = localStorage.getItem("formData");
//     console.log(getTheData);
//   });
// });
