/* eslint-disable import/no-unresolved */
import Vue from 'vue';
import Router from 'vue-router';
import Register from '@/components/Register';
import Todos from '@/components/Todos';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'register',
      component: Register,
    },
    {
      path: '/todos',
      name: 'todos',
      component: Todos,
    },
  ],
});
