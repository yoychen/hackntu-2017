<template>
  <div class="hello">
    <div class="container my-card">
      <form @submit.prevent="login" class="form-horizontal">
        <fieldset>
          <legend id="card-title">登入</legend>
          <div class="form-group">
            <div class="col-md-10 col-md-offset-1">
              <input v-model="email" type="email" class="form-control my-input" id="inputEmail" placeholder="Email" required>
            </div>
          </div>
          <div class="form-group">
            <div class="col-md-10 col-md-offset-1">
              <input v-model="password" type="password" class="form-control my-input" id="inputPassword" placeholder="Password" required>
            </div>
          </div>

          <div class="form-group">
            <div class="my-btn-group">
              <button type="submit" class="btn-raised btn btn-primary">Submit</button>
              <button type="button" class="btn btn-default">回首頁</button>
            </div>
          </div>

        </fieldset>
      </form>
    </div>

  </div>
</template>

<script>
import swal from 'sweetalert2'

export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  mounted() {
    $.material.init();
  },
  methods: {
    login(e) {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .then(function (authData) {
        let loginUser = firebase.auth().currentUser;
        console.log("登入使用者為",loginUser);
        if (this.email === 'admin@admin.admin') {
          this.$router.push('/managerPair');
        } else {
          this.$router.push('/pairMap');
        }
      }.bind(this))
      .then(this.saveLocalStorage)
      .catch(function(error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        swal(
          errorMessage,
          '',
          'error'
        );
      });
    },
    saveLocalStorage: function() {
			var userId = firebase.auth().currentUser.uid;
			var ref = firebase.database().ref('/users/' + userId);
      let userDetail = {};

			ref.on("value", function(snapshot) {
        userDetail.email = snapshot.val().email;
        userDetail.username = snapshot.val().username;
        userDetail.phone = snapshot.val().phone;
        userDetail.homeLocation = snapshot.val().homeLocation;
        userDetail.companyLocation = snapshot.val().companyLocation;
        userDetail.imageName = snapshot.val().imageName;
				saveImage();
			}, function (error) {
				 console.log("Error: " + error.code);
			});
			var saveImage = function() {
				var imgStorageRef = firebase.storage().ref();
				imgStorageRef.child(`avatar/${userDetail.imageName}`).getDownloadURL().then(function(url) {
					userDetail.image = url;
					localStorage.setItem("userDetail", JSON.stringify(userDetail));
				});
			}
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss">
input::-webkit-input-placeholder { /* WebKit, Blink, Edge */
  color: #000;
}
input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
  color: #000;
  opacity:  1;
}
input::-moz-placeholder { /* Mozilla Firefox 19+ */
  color: #000;
  opacity:  1;
}
input:-ms-input-placeholder { /* Internet Explorer 10-11 */
  color: #000;
}
input::-ms-input-placeholder { /* Microsoft Edge */
  color: #000;
}

.my-card {
  max-width: 450px;
  margin: auto;
}

.container {
  padding: 20px;
  margin-top: 10%;
  background-color: rgba(211, 211, 211, 0.93);;
}

legend#card-title {
  text-align: center;
}

.my-btn-group {
  text-align: center;
}

.form-group.is-empty {
  font-size: 50px;
}

legend#card-title {
  padding-top: 20px;
}

body {
  background-image: url(
    "https://images.unsplash.com/photo-1499237302743-ba2c2740f824?dpr=1&auto=format&fit=crop&w=1199&h=800&q=80&cs=tinysrgb&crop=");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
}

</style>
