<template>
  <div>
    <div class="toolbar">
      <i @click="$router.back()" class="material-icons left-btn">arrow_back</i>
      <!--<h1>Title</h1>-->
    </div>
    <div class="user-info">
      <div class="avatar" style="background-image: url('https://randomuser.me/api/portraits/women/52.jpg');" ></div>
      <h2>David</h2>
      <p>台北市信義區仁愛路4段505號</p>
    </div>
    <div class="user-content">
      <ul class="list-unstyled">
        <li>
          <i class="material-icons" style="color: #4CAF50;">assignment_turned_in</i>
          具有合法執照
        </li>
        <li>
          <i class="material-icons">attach_money</i>
          托育費用 500 NTD/HR
        </li>
        <li>
          <i class="material-icons">phone</i>
          0911455544
        </li>
      </ul>
    </div>
    <div class="user-action">
      <BounceLoader size="25px" color="rgb(255, 230, 14)"></BounceLoader>
      <span>David 目前時段 14：00-16：00 有空
      </span>

      <button type="submit" class="btn-block btn-raised btn btn-primary">前往媒合</button>
    </div>
  </div>
</template>

<script>
import RingLoader from 'vue-spinner/src/RingLoader.vue';
import BounceLoader from 'vue-spinner/src/BounceLoader.vue';
import swal from 'sweetalert2'

export default {
  name: 'nannyInfo',
  components: {
    'RingLoader': RingLoader,
    'BounceLoader': BounceLoader,
  },
  data() {
    return {
    };
  },
  mounted() {
    $.material.init();    
  },
  methods: {
    swal({
        title: '',
        text: '是否送出配對邀請',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false
      }).then(function () {
        firebase.database().ref('users/' + loginUser.uid).set({
          email: loginUser.email,
          name: name.value,
          age : age.value
        }).catch(function(error){
          console.error("寫入使用者資訊錯誤",error);
        });
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .btn-primary {
    background: #ff828d !important;
  }
  .toolbar {
    position: fixed;
    top: 0;
    width: 100%;
    height: 53px;
    overflow: hidden;
    line-height: 53px;
    i {
      font-size: 30px;
      margin: 0 13px;
    }
    .left-btn {
      float: left;
      line-height: 53px;
      
    }
    h1 {
      margin: 0 70px;
      text-align: center;
      line-height: 53px;
    }
  }
</style>

<style scoped lang="scss">
  .user-info {
    text-align: center;
    .avatar {
      width: 90px;
      height: 90px;
      margin: 50px auto 20px;
      box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
      border-radius: 50%;
      background-size: cover;
      background-position: center;
    }
    h2 {
      margin: 0 0 3px;
      font-size: 23px;
      font-weight: 400;
    }
    p {
      margin: 0;
      color: gray;
    }
  }
  .user-content {
    ul {
      max-width: 300px;
      margin: 3em auto;
      font-size: 16px;
      li {
        margin-bottom: 1em;
        i {
          vertical-align: sub;
        }
      }
    }
  }
  .user-action {
    padding: 14px 28px;
    bottom: 0;
    position: absolute;
    width: 100%;
    .v-spinner {
      float: left;
      transform: translateY(-4px);
      margin-right: 9px;
      margin-bottom: 12px;
    }
  }
</style>
