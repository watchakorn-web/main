
let alert_e = document.querySelector('#alert_e');
alert_e.style.display = 'none';
function validateForm() {
    var x = document.forms["contact-form"]["email"].value;
    var atpos = x.indexOf("@");
    var dotpos = x.lastIndexOf(".");
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) {
        alert_e.style.display = 'block';
        return false;}
    else{
        alert_e.style.display = 'none';
    }
    
}
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyBkrgLwTp46xFsrRLJ1nh2Rpmduh4syyDU",
    authDomain: "form-website-watchakorn.firebaseapp.com",
    databaseURL: "https://form-website-watchakorn.firebaseio.com",
    projectId: "form-website-watchakorn",
    storageBucket: "form-website-watchakorn.appspot.com",
    messagingSenderId: "376205869847",
    appId: "1:376205869847:web:0fcf08dd043b675315ad52",
    measurementId: "G-03L2LZ1TYG"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  // Refrence contact colletions
let contactInfo = firebase.database().ref("infos")

///listen for sub mit
document.querySelector(".contact-form").addEventListener("submit", submitForm);

function submitForm(e){
    e.preventDefault();
    
    // Get input
    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const subject = document.querySelector("#subject").value;
    const content = document.querySelector("#content").value;
    console.log(name,email,subject,content);
    saveConfaceInfo(name,email,subject,content);
    document.querySelector(".contact-form").reset();

    sendEmail(name,email,subject,content);
}

// Save infos to firebase
function saveConfaceInfo(name,email,subject,content) {
    let newContactInfo = contactInfo.push();

    newContactInfo.set({
        name: name,
        email: email,
        subject: subject,
        content: content
    })
}

// Send Email infos
function sendEmail(name,email,subject,content){
    Email.send({
        Host: "smtp.gmail.com",
        Username: 'porton2559@gmail.com',
        Password: "uoteizliwhddfbvu",
        To: 'porton555@gmail.com',
        From: email,
        Subject:`${name} ส่งข้อความหาท่าน`,
        Body: `ชื่อ: ${name} </br> อีเมล: ${email} <br/> หัวข้อ: ${subject} <br/>ข้อความ: ${content}`
    }).then((content) => alert("ส่งข้อความสำเร็จ"))
    sendemailToUser(name,email,subject,content);
}
function sendemailToUser(name,email,subject,content){
    Email.send({
        Host: "smtp.gmail.com",
        Username: 'porton2559@gmail.com',
        Password: "uoteizliwhddfbvu",
        To: email,
        From: 'watchakorn@WCK.com',
        Subject:`ขอบคุณท่าน ${name} ที่ติดต่อเรา `,
        Body: `เราจะนำความคิดเห็นของท่าน ${name} เรื่อง ${subject} เพื่อไว้ปรับปรุงในการทำเว็บไซต์ต่อไป`
    })
}

