var firebaseConfig = {
      apiKey: "AIzaSyCCieyZBh3jf5MvI5ngyzAHXyCWsPWmpKE",
      authDomain: "kwitter-6c203.firebaseapp.com",
      databaseURL: "https://kwitter-6c203-default-rtdb.firebaseio.com",
      projectId: "kwitter-6c203",
      storageBucket: "kwitter-6c203.appspot.com",
      messagingSenderId: "949534492973",
      appId: "1:949534492973:web:533a6675ac99d307c82ba4"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  childData = childSnapshot.val();
                  if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        console.log(firebase_message_id);
                        console.log(message_data);
                        uname = message_data['uname'];
                        message = message_data['message'];
                        like = message_data['like'];
                        name_with_tag = "<h4>" + uname + "<img class='user_tick' src='tick.png'></h4>";
                        message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
                        like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value = " + like + " onclick='update_likes(this.id)'>";
                        span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>like:" + like + "</span></button><hr>";
                        row = name_with_tag + message_with_tag + like_button + span_with_tag;
                        document.getElementById("output").innerHTML += row;

                  }
            });
      });
}
getData();

function update_likes(message_id) {
      console.log("clicked on like button - " + message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updated_likes = Number(likes) + 1;
      console.log(updated_likes);
      firebase.database().ref(room_name).child(message_id).update({
            like: updated_likes
      });
}

function logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location.replace("index.html");
}

function send() {
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            uname: user_name,
            message: msg,
            like: 0
      });
      document.getElementById("msg").value = "";
}