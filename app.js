var firebaseConfig = {
    apiKey: "AIzaSyDBAAjD7sf8VOwA2ik6DkYW7z57qG3FFjc",
    authDomain: "e-commerce-516fc.firebaseapp.com",
    projectId: "e-commerce-516fc",
    storageBucket: "e-commerce-516fc.appspot.com",
    messagingSenderId: "934114100117",
    appId: "1:934114100117:web:644f1a656be47ca193ec9c"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


//create key: value
let contactInfo = firebase.database().ref('infos'); 
let message = firebase.database().ref('message');
let product = firebase.database().ref('product');
const auth = firebase.auth();

document.querySelector('.contact-form').addEventListener('submit', submitForm);
document.querySelector('.message').addEventListener('submit', addMessage);
// document.querySelector('.btn-buy').addEventListener('click', addProduct);


function signUp(){
    
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    
    const promise = auth.createUserWithEmailAndPassword(email.value, password.value);
    promise.catch(e => alert(e.message));
    
    alert("Signed Up");
}
   
   
   
function signIn(){    
    let userName = document.getElementById('userN');
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    
    const promise = auth.signInWithEmailAndPassword(email.value, password.value);
    promise.then(() => {
        window.location = 'home.html';
        alert('signed in')
    }).catch(e => {
        alert(e.message);
    })
    
}




function signOut(){    
    auth.signOut();
    window.location = 'login.html';
    alert("Signed Out");   
}

auth.onAuthStateChanged(function(user){   
    if(user){
        let email = user.email;
     alert("Active User " + email);
     //Take user to a different or home page
     //is signed in
    }else{
    alert("No Active User");
     //no user is signed in
    }
});


function submitForm(e) {
    e.preventDefault();

    let name = document.querySelector('.name').value;
    let phone = document.querySelector('.phone').value;
    let email = document.querySelector('.email').value;
    saveContactInfo(name, phone, email);
    const isSaved =  document.querySelector('.saved')
    isSaved.style.display = 'inline'
    setTimeout(() => {
        isSaved.style.display = 'none'
    },3000)

    document.querySelector('.contact-form').reset();

}


function addMessage(e){
    e.preventDefault();
    
    let newMessage = document.querySelector('.msg').value;
    
    const newMsg = message.push();
    newMsg.set({ newMessage });
    
    document.querySelector('.message').reset();

    alert('Message sent')
}

function addProduct(name){


    let newProduct = product.push();
    newProduct.set({ product : name })

    alert(`${name} saved in our database.`)
}


function saveContactInfo(name, phone, email){
    let newContactInfo = contactInfo.push();

    newContactInfo.set({
        name,
        phone,
        email
    });
}