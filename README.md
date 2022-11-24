## Vue 3

---

> Alerts
Использваоние: 
```vue
<script setup lang="ts">
import { useAlerts } from "@/composables/useAlerts"

const activeAlert = useAlerts().getActiveAlert
const err = (): void => {
  const { onOk } = useAlerts().error("a")
  onOk(() => alert("СУПЕР"))
}
</script>

<template>
 <Modal
    v-if="activeAlert"
    v-model="activeAlert.isShow"
  >
    <div>type: {{ activeAlert.type }}</div>
    <div>msg: {{ activeAlert.msg }}</div>
    <div>isConfirm: {{ activeAlert.isConfirm }}</div>
    <button @click="activeAlert?.onOkFunc">
      Ok
    </button>
  </Modal>
</template>
```
