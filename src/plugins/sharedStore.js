// src/plugins/sharedStore.js
import { reactive } from 'vue'

const sharedStore = reactive({
  user: null,
  sessionContext: null,
  // Add other shared states here
})

export default sharedStore
