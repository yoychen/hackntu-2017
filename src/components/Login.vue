<template>
  <div class="hello">
    <div class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-responsive-collapse">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="javascript:void(0)">Brand</a>
        </div>
        <div class="navbar-collapse collapse navbar-responsive-collapse">
          <ul class="nav navbar-nav navbar-right">
            <li><a href="javascript:void(0)">Link</a></li>
            <li class="dropdown">
              <a href="bootstrap-elements.html" data-target="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown
                <b class="caret"></b></a>
              <ul class="dropdown-menu">
                <li><a href="javascript:void(0)">Action</a></li>
                <li><a href="javascript:void(0)">Another action</a></li>
                <li><a href="javascript:void(0)">Something else here</a></li>
                <li class="divider"></li>
                <li><a href="javascript:void(0)">Separated link</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="container">
      <form @submit.prevent="login" class="form-horizontal">
        <fieldset>
          <legend>登入</legend>
          <div class="form-group">
            <label for="inputEmail" class="col-md-2 control-label">Email</label>

            <div class="col-md-10">
              <input v-model="email" type="email" class="form-control" id="inputEmail" placeholder="Email" required>
            </div>
          </div>
          <div class="form-group">
            <label for="inputPassword" class="col-md-2 control-label">Password</label>

            <div class="col-md-10">
              <input v-model="password" type="password" class="form-control" id="inputPassword" placeholder="Password" required>

              
            </div>
          </div>

          <div class="form-group">
            <div class="col-md-10 col-md-offset-2">
              <button type="submit" class="btn-raised btn btn-primary">登入</button>
              <button type="button" class="btn btn-default">回首頁</button>
            </div>
          </div>
          
        </fieldset>
      </form>
    </div>
    
  </div>
</template>

<script>
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
        alert('登入成功');
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
        alert(errorMessage);
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
<style scoped lang="scss">
</style>
