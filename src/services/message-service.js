import { defineService } from "@/_app/defines/define-service";
import { ElMessage } from "element-plus";

export const useMessageService = defineService("message-service", {
  info(message) {
    ElMessage({
      showClose: true,
      message,
    });
  },

  success(message) {
    ElMessage({
      showClose: true,
      type: "success",
      message,
    });
  },

  warning(message) {
    ElMessage({
      showClose: true,
      type: "warning",
      message,
    });
  },

  danger(message) {
    ElMessage({
      showClose: true,
      type: "error",
      message,
    });
  },
});
