import axios from 'axios'

// Configuration pour Docker - utilise l'URL de l'environnement ou une valeur par défaut
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

console.log('API Base URL:', API_BASE_URL)

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000
})

// Intercepteur pour logger les requêtes
api.interceptors.request.use(
  (config) => {
    console.log(`🔄 API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`)
    return config
  },
  (error) => {
    console.error('❌ API Request Error:', error)
    return Promise.reject(error)
  }
)

// Intercepteur pour logger les réponses
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`)
    return response
  },
  (error) => {
    console.error('❌ API Response Error:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)

export const smartphoneAPI = {
  // Récupérer tous les smartphones
  getAll: (params = {}) => api.get('/smartphones', { params }),
  
  // Récupérer un smartphone par ID
  getById: (id) => api.get(`/smartphones/${id}`),
  
  // Créer un nouveau smartphone
  create: (smartphoneData) => api.post('/smartphones', smartphoneData),
  
  // Mettre à jour un smartphone
  update: (id, smartphoneData) => api.put(`/smartphones/${id}`, smartphoneData),
  
  // Supprimer un smartphone
  delete: (id) => api.delete(`/smartphones/${id}`),
  
  // Rechercher des smartphones
  search: (term) => api.get(`/smartphones/search/${term}`),
  
  // Peupler la base de données
  seed: () => api.post('/smartphones/seed/demo')
}

export default api