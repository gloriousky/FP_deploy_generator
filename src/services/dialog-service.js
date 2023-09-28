import { useDialogProvider } from "@/providers/dialog-provider";
import { defineService } from "@/_app/defines/define-service";

export const useDialogService = defineService("dialog-service", {
  async alertInfo(opts = {}) {
    const provider = useDialogProvider();
    return provider.fire({
      type: "info",
      title: opts.title,
      message: opts.message,
      autofocus: true,
      showClose: false /**右上角關閉按鈕顯示 */,
      closeOnClickModal: false /** 通過點擊遮罩層關閉alert*/,
      showCancelButton: false,
      confirmButtonText: opts.confirmButtonText,
      closeOnPressEscape: false /** 禁用 esc 關閉 */,
      input: opts.input,
    });
  },

  async alertSuccess(opts = {}) {
    const provider = useDialogProvider();
    return provider.fire({
      type: "success",
      title: opts.title,
      message: opts.message,
      autofocus: true,
      showClose: false,
      closeOnClickModal: false,
      showCancelButton: false,
      confirmButtonText: opts.confirmButtonText,
      closeOnPressEscape: false,
      confirmButtonClass: "el-button--success",
      input: opts.input,
    });
  },

  async alertWarning(opts = {}) {
    const provider = useDialogProvider();
    return provider.fire({
      type: "warning",
      title: opts.title,
      message: opts.message,
      autofocus: true,
      showClose: false,
      closeOnClickModal: false,
      showCancelButton: false,
      confirmButtonText: opts.confirmButtonText,
      closeOnPressEscape: false,
      confirmButtonClass: "el-button--warning",
      input: opts.input,
    });
  },

  async alertDanger(opts = {}) {
    const provider = useDialogProvider();
    return provider.fire({
      type: "error",
      title: opts.title,
      message: opts.message,
      autofocus: true,
      showClose: false,
      closeOnClickModal: false,
      showCancelButton: false,
      confirmButtonText: opts.confirmButtonText,
      closeOnPressEscape: false,
      confirmButtonClass: "el-button--danger",
      input: opts.input,
    });
  },

  async confirmInfo(opts = {}) {
    const provider = useDialogProvider();
    return provider.fire({
      type: "info",
      title: opts.title,
      message: opts.message,
      autofocus: true,
      showClose: false,
      closeOnClickModal: false,
      showCancelButton: true,
      confirmButtonText: opts.confirmButtonText,
      cancelButtonText: opts.cancelButtonText,
      closeOnPressEscape: false,
      cancelButtonClass: "el-button--default",
      input: opts.input,
    });
  },

  async confirmSuccess(opts = {}) {
    const provider = useDialogProvider();
    return provider.fire({
      type: "success",
      title: opts.title,
      message: opts.message,
      autofocus: true,
      showClose: false,
      closeOnClickModal: false,
      showCancelButton: true,
      confirmButtonText: opts.confirmButtonText,
      cancelButtonText: opts.cancelButtonText,
      closeOnPressEscape: false,
      confirmButtonClass: "el-button--success",
      cancelButtonClass: "el-button--default",
      input: opts.input,
    });
  },

  async confirmWarning(opts = {}) {
    const provider = useDialogProvider();
    return provider.fire({
      type: "warning",
      title: opts.title,
      message: opts.message,
      autofocus: true,
      showClose: false,
      closeOnClickModal: false,
      showCancelButton: true,
      confirmButtonText: opts.confirmButtonText,
      cancelButtonText: opts.cancelButtonText,
      closeOnPressEscape: false,
      confirmButtonClass: "el-button--warning",
      cancelButtonClass: "el-button--default",
      input: opts.input,
    });
  },

  async confirmDanger(opts = {}) {
    const provider = useDialogProvider();
    return provider.fire({
      type: "error",
      title: opts.title,
      message: opts.message,
      autofocus: true,
      showClose: false,
      closeOnClickModal: false,
      showCancelButton: true,
      confirmButtonText: opts.confirmButtonText,
      cancelButtonText: opts.cancelButtonText,
      closeOnPressEscape: false,
      confirmButtonClass: "el-button--danger",
      cancelButtonClass: "el-button--default",
      input: opts.input,
    });
  },
});
