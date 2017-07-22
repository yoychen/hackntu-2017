import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import Register from '@/components/Register';
import Login from '@/components/Login';
import PairMap from '@/components/PairMap';
import NannyInfo from '@/components/NannyInfo';
import ManagerPair from '@/components/ManagerPair';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
      redirect: '/login',
    },
    {
      path: '/register', component: Register,
    },
    {
      path: '/login', component: Login,
    },
    {
      path: '/pairMap', component: PairMap,
    },
    {
      path: '/managerPair', component: ManagerPair,
    },
    {
      path: '/nannyInfo', component: NannyInfo,
    },
  ],
});
