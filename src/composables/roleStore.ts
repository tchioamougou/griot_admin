import { defineStore } from 'pinia'

export const useRoleStore = defineStore('roleStore', {
  state: () => ({
    currentRole: null as null | { id: number; title: string; description: string }
  }),
  actions: {
    setRole(role: any) {
      this.currentRole = role
    },
    clearRole() {
      this.currentRole = null
    }
  }
})
