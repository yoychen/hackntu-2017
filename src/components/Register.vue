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
      <form @submit.prevent="register" class="form-horizontal">
        <fieldset>
          <legend>註冊</legend>
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
            <label for="inputHomeLocation" class="col-md-2 control-label">輸入住家位置</label>

            <div class="col-md-10">
              <input v-model="homeLocation" type="text" class="form-control" id="inputHomeLocation" placeholder="住家位置" required>
            </div>
          </div>
          <div class="form-group">
            <label for="inputCompanyLocation" class="col-md-2 control-label">輸入公司位置</label>

            <div class="col-md-10">
              <input v-model="companyLocation" type="text" class="form-control" id="inputCompanyLocation" placeholder="公司位置" required>
            </div>
          </div>
          <div class="form-group">
            <label for="inputImage" class="col-md-2 control-label">請上傳大頭貼</label>

            <div class="col-md-10">
              <h2>上傳</h2>
              <div v-if="!image">
                <input type="file" class="btn-raised btn btn-primary" @change="onFileChange">
              </div>
              <div v-else>
                <img :src="image" />
                <button @click="removeImage">移除圖片</button>
              </div>
            </div>
          </div>

          <div class="form-group">
            <div class="col-md-10 col-md-offset-2">
              <button type="submit" class="btn-raised btn btn-primary">Submit</button>
              <button type="button" class="btn btn-default">Cancel</button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'register',
  data() {
    return {
      email: '',
      password: '',
      homeLocation: '',
      companyLocation: '',
      image: '',
      imageName: '',
    };
  },
  mounted() {
    $.material.init();
  },
  methods: {
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.createImage(files[0]);
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.image = e.target.result;
      };
      vm.imageName = file.name;
      reader.readAsDataURL(file);
    },
    removeImage: function (e) {
      this.image = '';
    },
    register(e) {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
      .then(this.addUserInfo)
      .then(this.uploadImage)
      .catch(function(error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        alert(errorMessage);
      });
    },
    uploadImage: function() {
      const self = this;
      var metadata = {
        contentType: 'image/jpeg'
      };
      var storageRef = firebase.storage().ref(`avatar/${self.imageName}`);
      storageRef.putString(self.image, 'data_url').then(function(snapshot) {
        console.log('Uploaded a blob or file!');
      }).catch(function(e) {
        alert(e)
      });

    },
    addUserInfo: function () {
      const self = this;
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .then(function () {
        let loginUser = firebase.auth().currentUser;
        console.log("登入使用者為",loginUser);
        firebase.database().ref('users/' + loginUser.uid).set({
          homeLocation: self.homeLocation,
          companyLocation: self.companyLocation,
        }).catch(function(error){
          console.error("寫入使用者資訊錯誤",error);
        });
        alert('註冊成功');
      })
      .catch(function(error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        alert(errorMessage);
      });
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
 .hello {
   h1 {
     color: green;
   }
 }
img {
  width: 30%;
  display: block;
  margin-bottom: 10px;
}
</style>
