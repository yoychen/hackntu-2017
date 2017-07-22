<template>
  <div>
    <div id="pairMap" class="pairMap">
    </div>
    <div class="bottom-control">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <div class="avatar-bg">
              <div>
              </div>
            </div>
            <!--<img src="/static/img/diploma.png" alt="">-->
            <div class="avatar" style="background-image: url('https://randomuser.me/api/portraits/women/52.jpg');" ></div>
            <table>
              <tr>
                <th>姓名</th>
                <td>TUTU</td>
              </tr>
              <tr>
                <th>聯絡電話</th>
                <td>0911445445</td>
              </tr>
              <tr>
                <th>住址</th>
                <td>台北市信義區仁愛路4段505號</td>
              </tr>
            </table>
          </div>
          <div class="swiper-slide">

          </div>
          <div class="swiper-slide">

          </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
      </div>
    </div>
    <!--<div>Icons made by <a href="https://www.flaticon.com/authors/madebyoliver" title="Madebyoliver">Madebyoliver</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>-->

    <!--<div>Icons made by <a href="https://www.flaticon.com/authors/madebyoliver" title="Madebyoliver">Madebyoliver</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>-->

    <!--<div>Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>-->

    <!--<div>Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>-->
  </div>
</template>

<script>
import { setMap } from './pairMap.js';

export default {
  name: 'pairMap',
  data() {
    return {
    };
  },
  mounted() {
    $.material.init();
    setMap();
    var mySwiper = new Swiper ('.swiper-container', {
      loop: true,
      // spaceBetween: 30,
      
      // 如果需要分页器
      pagination: '.swiper-pagination',
    })        
  },
  methods: {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #pairMap {
    width: 100%;
    height: 100vh;
  }
  .bottom-control {
    position: fixed;
    width: 100%;
    height: 290px;
    bottom: 0;
    /*background-color: rgba(253,253,253,0.75);*/
    background-color: rgba(243, 243, 243, 0.78);
    box-shadow: 0 -5px 10px -1px rgba(0, 0, 0, 0.05);
    .swiper-container {
      height: 180px;
      overflow: visible;
      .swiper-slide {
        width: 90% !important;
        margin: 13px 5% !important;
        background: white;
        border: 1px solid #f5f5f5;
        border-bottom: none;
        border-radius: 2px;
        overflow: hidden;
        transition: 0.3s all;
        transition-timing-function: ease-in-out;
        /*box-shadow: 0 2px 3px rgba(0, 0, 0, 0.08);*/
        /*box-shadow: 0 12px 9px -5px rgba(0, 0, 0, 0.23);*/
        box-shadow: rgba(0, 0, 0, 0.29) 0px 10px 9px -5px, rgba(28, 30, 31, 0.12) 0px 2px 3px;
        .avatar {
          position: relative;
          width: 60px;
          height: 60px;
          margin-top: 35px;
          margin-left: 16px;
          box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
          border-radius: 50%;
          background-size: cover;
          background-position: center;
        }
        .avatar-bg {
          position: absolute;
          top: 0;
          width: 100%;
          height: 80px;
          overflow: hidden;
          div {
            height: 103%;
            margin: -3px;
            background-image: url(https://unsplash.it/350/100/?random);
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            filter: blur(2px);
          }
        }
        table {
          margin-top: 5px;
          margin-left: 11px;
          th {
            font-weight: 400;
            color: gray;
          }
          td {
            color: black;
          }
          th, td {
            padding: 2px 8px;
          }
        }
      }
      .swiper-pagination {
        bottom: -45px;
      }
    }
  }

  .swiper-pagination-bullet-active {
    background: rgb(255, 130, 141);
  }
</style>
