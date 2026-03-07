export const API_ROUTES = {
    AUTH: {
        ADMIN_LOGIN: '/auth/admin/login',
        ADMIN_LOGOUT: '/auth/admin/logout',
        GET_ME: '/auth/admin/me'
    },
    USERS: {
        GET_STATS: '/admin/stats',
        GET_ALL_USERS: '/admin/users'
    },
    IPOS: {
        GET_ALL: (filter: string) => `/ipos/getAll/${filter}`,
        GET_BY_ID: (id: string) => `/ipos/${id}`,
        CREATE: '/admin/add',
        UPDATE: (id: string) => `/admin/update/${id}`,
        DELETE: (id: string) => `/admin/delete/${id}`
    }
}