import { createWebHistory, createRouter } from 'vue-router';
import AppDashboard from '@/components/AppDashboard.vue';
import ChatRoom from '@/components/ChatRoom.vue';

const routes = [
    {path: '/', name: 'AppDashboard', component:AppDashboard},
    {path: '/chat', name: 'ChatRoom', component:ChatRoom},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;