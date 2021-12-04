//YOUR FIREBASE LINKS
var firebaseConfig = {
      apiKey: "AIzaSyBcDE007kq5nuda4ZReW-vS5Utog8r-Sgs",
      authDomain: "kwitter-app-5714f.firebaseapp.com",
      databaseURL: "https://kwitter-app-5714f-default-rtdb.firebaseio.com",
      projectId: "kwitter-app-5714f",
      storageBucket: "kwitter-app-5714f.appspot.com",
      messagingSenderId: "899277298770",
      appId: "1:899277298770:web:6c58ce4e72c5ffd4e3538b"
};
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");

room_name = localStorage.getItem("room_name")

function send() {
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name1: user_name,
            message: msg,
            like: 0
      })

      document.getElementById("msg").value = "";
}

function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  childData = childSnapshot.val();
                  if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        //Start code
                        console.log(firebase_message_id);
                        console.log(message_data);
                        name1 = message_data['name']
                        message = message_data['message'];
                        like = message_data['like'];
                        name_with_tag = "<h4>" + name1 + "<img class='user_tick' src='tick.png'> </h4>"
                        message_with_tag = "<h4 class='message_h4'>" + message + "</h4>"
                        like_button = "<button class='btn btn-warning' id=" + firebase_message_id + "value=" + like + "onclick='updateLike(this.id)'>"
                        span_with_tag = "<span class='glypgicon glyphicon-thumbs-up' Like:"+like+"</span></button><hr>"

                        row = name_with_tag + message_with_tag + like_button + span_with_tag;
                        document.getElementById("output").innerHTML += row;
                        //End code
                  }
            });
      });
}
getData();

function updateLike(message_id)
{
      console.log("clicked on like button"+ message_id);
      button_id = message_id
      likes = document.getElementById(button_id).value
      updated_likes = Number(likes) + 1
      console.log(updated_likes)
      firebase.database().ref(room_name).child(message_id).update({
            likes = updated_likes
      });
}

function logout() {
      localStorage.removeItem("room_name")
      localStorage.removeItem("user_name")
      window.location = "index.html";

}