<template>
  <div @click="sideNavOpen = false">
    <div ref="Gmap" id="pairMap" class="pairMap">
    </div>

    <div @click.stop class="filter-sidebar" :class="{ open: sideNavOpen }">
      <h2>篩選條件</h2>
      <p>托育機構</p>
      <span 
        v-for="item in careInstitutions"
        @click="toggleCareInstitutionsFilter(item)"
        class="select-chip" 
        :class="{ select: careInstitutionsFilter.indexOf(item) > -1 }">{{ item }}</span>

      <p>最近距離</p>
      <div class="radio" @click="showNearestBetween">
        <label>
          <input v-model="pairMode" type="radio" name="sortingFun" value="1">
          兩點最近
        </label>
      </div>
      <div class="radio" @click="showNearestHome">
        <label>
          <input v-model="pairMode" type="radio" name="sortingFun" value="2">
          離家近
        </label>
      </div>
      <div class="radio" @click="showNearestFactory">
        <label>
          <input v-model="pairMode" type="radio" name="sortingFun" value="3">
          離工作場所近
        </label>
      </div>

      <p>需要托育時間</p>
      <input v-model="startDate" type="datetime-local" class="form-control" placeholder="開始時間">
      <input v-model="endDate" type="datetime-local" class="form-control" placeholder="結束時間">
    </div>

    <i @click.stop="sideNavOpen = !sideNavOpen" class="filter-btn material-icons"  :class="{ open: sideNavOpen }" style="text-shadow: 0 1px 2px rgba(255, 255, 255, 0.7);">{{ sideNavOpen ? 'close' : 'filter_list' }}</i>

    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div v-for="item, index in filteredBabyCenterData" :data-idx="index" class="swiper-slide">
          <div class="avatar" :style="{ 'background-image': `url(${item.avatar})` }" ></div>
          <div class="user-info">
            <h2>{{ item.name }} <span>{{ item.star }}<i class="material-icons">star_rate</i></span></h2>
            <p>{{ item.addr }}</p>
          </div>
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
    </div>

    <!--<div>Icons made by <a href="https://www.flaticon.com/authors/madebyoliver" title="Madebyoliver">Madebyoliver</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>-->
  </div>
</template>

<script>
import { setMap, addMarkers, getLanLongFromAddr, addDirection } from './pairMap.js';
import babyCenterData from './BabyCenterData.js';
import Vue from 'vue';

export default {
  name: 'pairMap',
  data() {
    let userData = {} || JSON.parse(localStorage.userDetail);
    return {
      sideNavOpen: false,
      careInstitutions: ['托兒所', '安親班', '保姆'],
      careInstitutionsFilter: ['托兒所', '安親班', '保姆'],
      pairMode: 1,
      startDate: null,
      endDate: null,
      babyCenterData,
      userData,
      mySwiper: null,
      factory: [25.07979,121.5678709],
      home: [25.0516539,121.51374910000004],
    };
  },
  computed: {
    filteredBabyCenterData: function () {
      let result = this.babyCenterData.filter(function (e) {
        let show = true;
        if (this.careInstitutionsFilter.indexOf(e.type) === -1) {
          show = false;
        }
        if (this.startDate) {
          let time = new Date(this.startDate);
          if (time.toLocaleTimeString().indexOf('上午') > -1 && e.availableTime !== 1) {
            show = false;
          }
          if (time.toLocaleTimeString().indexOf('上午') < -1 && e.availableTime !== 0) {
            show = false;
          }
        }
        return show;
        
      }, this);
      localStorage.filteredBabyCenterData = JSON.stringify(result);
      return result;
    },
  },
  watch: {
    filteredBabyCenterData: function () {

      $(this.$refs.Gmap).tinyMap('clear', 'marker,polyline,circle,direction');
      Vue.nextTick(function () {
        addMarkers([{
          addr: '台北市內湖區瑞光路581號及581之1號',
        }], 'industry');
        addMarkers([{
          addr: '台北市大同區長安西路',
        }], 'house');
        addMarkers(this.filteredBabyCenterData, 'baby', this.sliderScrollTo);
        $('.swiper-slide').off('click', this.handleSliderClick);
        this.mySwiper.destroy();
        this.mySwiper = new Swiper ('.swiper-container', {
          loop: true,
          onSlideChangeStart: function(swiper){
            let center = this.filteredBabyCenterData[swiper.activeIndex - 1]
            if (center) {
              $('#pairMap').tinyMap('panTo', center.lanLong);
            }
          }.bind(this),
          
          // 如果需要分页器
          pagination: '.swiper-pagination',
        });
        $('.swiper-slide').on('click', this.handleSliderClick);
      }.bind(this));
    }
  },
  mounted() {
    $.material.init();
    setMap(function () {
      // getLanLongFromAddr('台北市內湖區瑞光路581號及581之1號').then((lanLong) => {
      // this.home = lanLong;
      // });
      // getLanLongFromAddr('台北市大同區長安西路').then((lanLong) => {
      //   this.factory = lanLong;
      // });

      addMarkers([{
        addr: '台北市內湖區瑞光路581號及581之1號',
      }], 'industry');
      addMarkers([{
        addr: '台北市大同區長安西路',
      }], 'house');
      addMarkers(this.filteredBabyCenterData, 'baby', this.sliderScrollTo);
      this.showNearestBetween();
    }.bind(this), '台北市大同區長安西路');

    this.mySwiper = new Swiper ('.swiper-container', {
      loop: true,
      onSlideChangeStart: function(swiper){
        let center = this.filteredBabyCenterData[swiper.activeIndex - 1]
        if (center) {
          $('#pairMap').tinyMap('panTo', center.lanLong);
        }
      }.bind(this),
      
      // 如果需要分页器
      pagination: '.swiper-pagination',
    });      

    $('.swiper-slide').on('click', this.handleSliderClick);

  },
  methods: {
    sliderScrollTo: function (idx) {
      this.mySwiper.slideTo(idx+1, 1000, false);
    },
    handleSliderClick(e) {
      var idx = $(e.currentTarget).data('idx');
      this.$router.push(`/nannyInfo/${idx}`)
    },
    toggleCareInstitutionsFilter(item) {
      if (this.careInstitutionsFilter.indexOf(item) > -1) {
        this.careInstitutionsFilter.splice(this.careInstitutionsFilter.indexOf(item), 1);
      } else {
        this.careInstitutionsFilter.push(item);
      }
    },
    showNearestHome() {
      let minDis = null;
      let minIdx = null;
      this.filteredBabyCenterData.forEach((e, i) => {
        if (minDis === null) {
          minDis = parseFloat(distance(e.lanLong[0], e.lanLong[1], this.home[0], this.home[1]));
          minIdx = i;
        } else {
          let d = parseFloat(distance(e.lanLong[0], e.lanLong[1], this.home[0], this.home[1]));
          if (d < minDis) {
            minDis = parseFloat(distance(e.lanLong[0], e.lanLong[1], this.home[0], this.home[1]));
            minIdx = i;
          }
        }
      });
      if (minIdx !== null) {
        addDirection(this.filteredBabyCenterData[minIdx].lanLong);
        this.sliderScrollTo(minIdx);
        this.sideNavOpen = false
      }
    },
    showNearestFactory() {
      let minDis = null;
      let minIdx = null;
      this.filteredBabyCenterData.forEach((e, i) => {
        if (minDis === null) {
          minDis = parseFloat(distance(e.lanLong[0], e.lanLong[1], this.factory[0], this.factory[1]));
          minIdx = i;
        } else {
          let d = parseFloat(distance(e.lanLong[0], e.lanLong[1], this.factory[0], this.factory[1]));
          if (d < minDis) {
            minDis = parseFloat(distance(e.lanLong[0], e.lanLong[1], this.factory[0], this.factory[1]));
            minIdx = i;
          }
        }
      });
      if (minIdx !== null) {
        addDirection(this.filteredBabyCenterData[minIdx].lanLong);
        this.sliderScrollTo(minIdx);
        this.sideNavOpen = false
      }
    },
    showNearestBetween() {
      let minDis = null;
      let minIdx = null;
      let avglan = (this.factory[0] + this.home[0]) / 2;
      let avglong = (this.factory[1] + this.home[1]) / 2;
      this.filteredBabyCenterData.forEach((e, i) => {
        if (minDis === null) {
          minDis = parseFloat(distance(e.lanLong[0], e.lanLong[1], avglan, avglong));
          minIdx = i;
        } else {
          let d = parseFloat(distance(e.lanLong[0], e.lanLong[1], avglan, avglong));
          if (d < minDis) {
            minDis = parseFloat(distance(e.lanLong[0], e.lanLong[1], avglan, avglong));
            minIdx = i;
          }
        }
      });
      if (minIdx !== null) {
        addDirection(this.filteredBabyCenterData[minIdx].lanLong);
        this.sliderScrollTo(minIdx);
        this.sideNavOpen = false
      }
    },
  }
};

function distance(lat1,lon1,lat2,lon2) {
  var R = 6371; // km (change this constant to get miles)
  var dLat = (lat2-lat1) * Math.PI / 180;
  var dLon = (lon2-lon1) * Math.PI / 180;
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180 ) * Math.cos(lat2 * Math.PI / 180 ) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c;
  //if (d>1) return Math.round(d)+"km";
  //else if (d<=1) return Math.round(d*1000)+"m";
  return d;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  * {
    user-select: none;
  }

  .filter-btn {
    position: fixed;
    top: 13px;
    left: 18px;
    font-size: 28px;
    transition: 0.3s all;
    &.open {
      left: 250px;
    }
  }

  .filter-sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: -100%;
    width: 240px;
    padding: 6px 13px;
    background: rgba(255,255,255,0.9);
    box-shadow: 2px 0 2px rgba(0,0,0,0.05);
    transition: 0.3s all;
    z-index: 10;

    > * {
      transform: translateX(-2em);
      transition: 0.4s 0.1s all;
      transition-timing-function: ease-in-out;
    }

    &.open {
      left: 0;
      > * {
        transform: translateX(0);
      }
    }

    p {
      color: gray;
      font-size: 16px;
      margin: 32px 0 16px;
    }

    .select-chip {
      border: 1px solid #ff828d;
      margin: 0 2px 2px;
      padding: 5px 9px;
      border-radius: 15px;
      color: #4e4e4e;
      transition: 0.2s all;
      cursor: pointer;
      &.select {
        background: #ff828d;
        color: white;
      }
    }

    .radio {
      margin-bottom: 16px;
    }
  }

  #pairMap {
    width: 100%;
    height: 100vh;
  }
  .swiper-container {
    position: fixed;
    width: 100%;
    bottom: 0;
    /*height: 180px;*/
    overflow: visible;
    .swiper-slide {
      width: 92% !important;
      margin: 13px 4% 0 !important;
      overflow: hidden;
      transition: 0.3s all;
      transition-timing-function: ease-in-out;
      background: white;
      border: 1px solid #f5f5f5;
      border-bottom: none;
      border-radius: 2px;
      /*box-shadow: 0 2px 3px rgba(0, 0, 0, 0.08);*/
      /*box-shadow: 0 12px 9px -5px rgba(0, 0, 0, 0.23);*/
      box-shadow: rgba(0, 0, 0, 0.29) 0px 10px 9px -5px, rgba(28, 30, 31, 0.12) 0px 2px 3px;
      transition: 0.3s all;
      &.fullscreen {
        height: 100vh;
        width: 100% !important;
        margin: 0 !important;
      }
      .avatar {
        float: left;
        width: 60px;
        height: 60px;
        margin-top: 8px;
        margin-bottom: 20px;
        margin-left: 16px;
        box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
        border-radius: 50%;
        background-size: cover;
        background-position: center;
      }
      .user-info {
        margin-left: 88px;
        margin-top: 18px;
        h2 {
          margin: 0 0 3px;
          font-size: 18px;
          font-weight: 400;
          span {
            margin-left: 3px;
            font-size: 15px;
            i {
              font-size: 14px;
              vertical-align: text-top;
              transform: translateY(1px);
            }
          }
        }
        p {
          margin: 0;
          color: gray;
        }
      }
    }
    .swiper-pagination {
      bottom: 6px;
    }
  }

  .swiper-pagination-bullet-active {
    background: rgb(255, 130, 141);
  }

  .radio input[type=radio]:checked ~ .circle, label.radio-inline input[type=radio]:checked ~ .circle {
    border-color: #ff828d;
  }

  .radio input[type=radio]:checked ~ .check, label.radio-inline input[type=radio]:checked ~ .check {
    background-color: #ff828d;
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

</style>
