const firebaseConfig = {
    apiKey: "AIzaSyALDsnqDBdKzTHF1CEj6kkWkhOSfG1fRA0",
    authDomain: "healthcare-a3837.firebaseapp.com",
    databaseURL: "https://healthcare-a3837-default-rtdb.firebaseio.com",
    projectId: "healthcare-a3837",
    storageBucket: "healthcare-a3837.firebasestorage.app",
    messagingSenderId: "202031784217",
    appId: "1:202031784217:web:13c3a3b0a3a9c68fd8e588",
    measurementId: "G-7TE4C65PPK"
  };
  //initilization of  Integrated Social Health Data
  firebase.initializeApp(firebaseConfig);
  //reference your database
  var ManishBhatiaHC = firebase.database().ref('ManishBhatiaHC');

  document.getElementById('ManishBhatiaHC').addEventListener("Register",ManishBhatiaHC);
  function Register(e){

  	e.preventDefault();
  	var regAddress = getElementVal("regAddress");
  	var  regMedicalConditions = getElementVal("regMedicalConditions");
  	var regPassword = getElementVal("regPassword");
  	var password = getElementVal("password");
  	var submit = getElementVal("submit");
  	console.log(regAddress,regMedicalConditions,regPassword,password,submit);
  }

  const getElementVal = (id) => {

  	return document.getElementById(id).value;

  };
