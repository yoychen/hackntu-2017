let mapTheme = [
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#6195a0"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2f2f2"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#e6f3d6"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#f4d2c5"
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text",
        "stylers": [
            {
                "color": "#4e4e4e"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#f4f4f4"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#787878"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#eaf6f8"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#eaf6f8"
            }
        ]
    }
];

export function setMyLocation () {
  $('#pairMap').tinyMap({
    styles: mapTheme,
    disableDefaultUI: true,
    center: '臺北市大安區羅斯福路四段一號',
    zoom: 13,
    loading: '',
    direction: [
      {
        from: '臺北市大安區羅斯福路四段一號',
        to: '臺北市北平西路三號',
        travel: 'driving',
        // 自訂路徑顏色
        polylineOptions: {
          strokeColor: '#FFC107',
          strokeOpacity: 1,
        },
        waypoint: [
          '台北市信義區仁愛路4段505號',
        ],
        icon: {
          from: '/static/img/industry.png',
          to: '/static/img/house.png',
          waypoint: '/static/img/baby.png',
        },
        event: {
          directions_changed: {
            func: function () {
                $('#alert').addClass('alert-success').text('路徑規劃已完成。');
            }
          }
        }
      }
    ]
  });
}

export function getLanLongFromAddr(addr) {
  return new Promise((resolve, reject) => {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({
      'address': addr
    }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        resolve([
          results[0].geometry.location.lat(),
          results[0].geometry.location.lng()
        ]);
      } else {
        reject();
      }
    });
  });
}

export function addDirection (waypoint) {
  $('#pairMap').tinyMap('clear', 'direction');
  $('#pairMap').tinyMap('modify', {
    direction: [
      {
        from: [25.07979,121.5678709],
        to: [25.0516539,121.51374910000004],
        travel: 'driving',
        // 自訂路徑顏色
        polylineOptions: {
          strokeColor: '#FFC107',
          strokeOpacity: 1,
        },
        waypoint: [
          waypoint,
        ],
        icon: {
          from: '/static/img/industry.png',
          to: '/static/img/house.png',
          waypoint: '/static/img/baby.png',
        },
        event: {
          directions_changed: {
            func: function () {
                // $('#alert').addClass('alert-success').text('路徑規劃已完成。');
            }
          }
        }
      }
    ]
  });
}

export function addMarkers (data, icon, sliderScrollTo) {
    data.forEach(function(e, i) {
        let nowLocation = e;
        let nowIdx = i;
        $('#pairMap').tinyMap('modify', {
            'marker': [{
                'addr': e.lanLong ? e.lanLong : e.addr,
                'animation': 'none',
                'text': '<strong>' + e.addr + '</strong>',
                'icon': {
                    url: '/static/img/' + icon + '.png',
                },
                'event': {
                    'click': function (e) {
                      sliderScrollTo(nowIdx);
                      addDirection(nowLocation.lanLong);
                    }.bind(this),
                }
            }]
        });
        
    }, this);
}

let first = true;
export function setMap (cb, center) {
  $('#pairMap').tinyMap({
    styles: mapTheme,
    disableDefaultUI: true,
    autoLocation: center ? false : true,
    center: center ? center : undefined,
    zoom: 12,
    loading: '',
    event: {
        idle: function () {
          if (first) {
            cb();
            first = false;
          }
        },
    }
    // direction: [
    //   {
    //     from: '臺北市大安區羅斯福路四段一號',
    //     to: '臺北市北平西路三號',
    //     travel: 'driving',
    //     // 自訂路徑顏色
    //     polylineOptions: {
    //       strokeColor: '#FFC107',
    //       strokeOpacity: 1,
    //     },
    //     waypoint: [
    //       '台北市信義區仁愛路4段505號',
    //     ],
    //     icon: {
    //       from: '/static/img/industry.png',
    //       to: '/static/img/house.png',
    //       waypoint: '/static/img/baby.png',
    //     },
    //     event: {
    //       directions_changed: {
    //         func: function () {
    //             $('#alert').addClass('alert-success').text('路徑規劃已完成。');
    //         }
    //       }
    //     }
    //   }
    // ]
  });
}