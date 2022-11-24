import { computed, reactive, Ref } from "vue"

type AlertResult = {
  onOk: (func: Function) => void
  onYes: (func: Function) => void
  onNo: (func: Function) => void
}
type AlertType = "error" | "warn" | "info" | "success"
type AlertAction = (msg: string, isConfirm?: boolean) => AlertResult
type AlertCreate = (type: AlertType) => AlertAction

type Alert = {
  isShow: boolean

  type: AlertType
  msg: string
  isConfirm: boolean

  onOkFunc: Function
  onYesFunc: Function
  onNoFunc: Function
}

type AlertCallback = (func?: Function) => void
type AlertCallbackType = "onOk" | "onYes" | "onNo"

type UseAlerts = () => (Record<AlertType, AlertAction> & {
  getActiveAlert: Ref<Alert | undefined>
})

const alerts = reactive<Alert[]>([])

export const useAlerts: UseAlerts = () => {
  const createAlert: AlertCreate = (type) => {
    const alertCreate: AlertAction = (msg, isConfirm) => {
      const alert: Alert = {
        isShow: true,

        type,
        msg,
        isConfirm: isConfirm ?? false,
        onOkFunc: () => {
        },
        onYesFunc: () => {
        },
        onNoFunc: () => {
        },
      }

      const callbacks: Record<AlertCallbackType, AlertCallback> = {
        onOk: (func) => {
          if (typeof func === "function") alert.onOkFunc = func
        },
        onYes: (func) => {
          if (typeof func === "function") alert.onYesFunc = func
        },
        onNo: (func) => {
          if (typeof func === "function") alert.onNoFunc = func
        },
      }

      alerts.push(alert)

      return { ...callbacks }
    }
    return alertCreate
  }

  return {
    getActiveAlert: computed(() => alerts.slice(-1)?.[0]),
    error: createAlert("error"),
    warn: createAlert("warn"),
    info: createAlert("info"),
    success: createAlert("success"),
  }
}
