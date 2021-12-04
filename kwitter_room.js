//ADD YOUR FIREBASE LINKS HERE
var firebaseConfig = {
      apiKey: "AIzaSyBcDE007kq5nuda4ZReW-vS5Utog8r-Sgs",
      authDomain: "kwitter-app-5714f.firebaseapp.com",
      databaseURL: "https://kwitter-app-5714f-default-rtdb.firebaseio.com",
      projectId: "kwitter-app-5714f",
      storageBucket: "kwitter-app-5714f.appspot.com",
      messagingSenderId: "899277298770",
      appId: "1:899277298770:web:6c58ce4e72c5ffd4e3538b"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");

document.getElementById("user_name").innerHTML = "welcome " + user_name + "!!!"

function addRoom() {
      room_name = document.getElementById("room_name").value;

      firebase.database().ref("/").child(room_name).update({
            purpose: "adding room name"
      })
      window.location = "kwitter_page.html"
}

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  //Start code
                  console.log("Room name - " + Room_names)
                  row = "<div class ='room_name' id= " + Room_names + "onclick ='redirectToRoomName(this.id)'> #" + Room_names + "</div><hr>"
                  document.getElementById("output").innerHTML += row
                  //End code
            });
      });
}
getData();

function redirectToRoomName(name) {
      console.log(name)
      localStorage.setItem("room_name", name)
      window.location = "kwitter_page.html"
}

function logout() {
      localStorage.removeItem("room_name")
      localStorage.removeItem("user_name")
      window.location = "index.html"
}