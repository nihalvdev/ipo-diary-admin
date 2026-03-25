import api from "./apiMiddleware"
import { API_ROUTES } from "./apiRoutes"

export const apiService = {
  // Auth
  getProfile: () => api.get(API_ROUTES.AUTH.GET_ME),

  // Users
  getUserStats: () => api.get(API_ROUTES.USERS.GET_STATS),
  getAllUsers: (params: { page: number; limit: number }) =>
    api.get(API_ROUTES.USERS.GET_ALL_USERS, {
      params: {
        page: params.page,
        limit: params.limit
      }
    }),

  //Feedback
  getFeedback: () => api.get(API_ROUTES.AUTH.FEEDBACK),

  // IPOs
  getAllIpos: (params: { page: number; limit: number; filter: string }) =>
    api.get(API_ROUTES.IPOS.GET_ALL(params.filter), {
      params: {
        page: params.page,
        limit: params.limit
      }
    }),
  getIpoById: (id: string) => api.get(API_ROUTES.IPOS.GET_BY_ID(id)),
  createIpo: (data: FormData) => api.post(API_ROUTES.IPOS.CREATE, data),
  updateIpo: (id: string, data: any) => api.put(API_ROUTES.IPOS.UPDATE(id), data),
  deleteIpo: (id: string) => api.delete(API_ROUTES.IPOS.DELETE(id))
}