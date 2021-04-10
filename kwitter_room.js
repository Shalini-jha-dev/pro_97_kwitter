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
document.getElementById("user_name").innerHTML = "Welcome " + user_name + " !";

function add_room() {
      room_name = document.getElementById("room_name").value;
      firebase.database().ref("/").child(room_name).update({
            purpose: "adding room name"
      });
      localStorage.setItem("room_name", room_name);
      window.location = "kwitter_page.html";
}

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_name = childKey;
                  console.log("room name :" + Room_name);
                  row = "<div class='room_name' id=" + Room_name + " onclick = 'redirectToRoomName(this.id)'>#" + Room_name + "</div><hr>"
                  document.getElementById("output").innerHTML += row;
            });
      });
}
getData();

function redirectToRoomName(name) {
      console.log(name);
      localStorage.setItem("room_name", name);
      window.location = "kwitter_page.html";
}

function logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}