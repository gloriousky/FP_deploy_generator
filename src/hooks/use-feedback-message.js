import { useMessageService } from "@/services/message-service";
import { useI18nService } from "@/services/i18n-service";

export const useFeedbackMessage = () => {
  const messageService = useMessageService();
  const { scope } = useI18nService();
  const { t: feedbackMessages } = scope("feedback");
  const { t: errorMessages } = scope("error");

  const createSuccess = () => {
    return messageService.success(feedbackMessages("create.success"));
  };

  const createFailed = (errCode) => {
    return messageService.danger(
      feedbackMessages("create.failed.with.reason", {
        reason: errorMessages(errCode),
      }),
    );
  };

  const readSuccess = () => {
    return messageService.success(feedbackMessages("read.success"));
  };

  const readFailed = (errCode) => {
    return messageService.danger(
      feedbackMessages("read.failed.with.reason", {
        reason: errorMessages(errCode),
      }),
    );
  };

  const updateSuccess = () => {
    return messageService.success(feedbackMessages("update.success"));
  };

  const updateFailed = (errCode) => {
    return messageService.danger(
      feedbackMessages("update.failed.with.reason", {
        reason: errorMessages(errCode),
      }),
    );
  };

  const deleteSuccess = () => {
    return messageService.success(feedbackMessages("delete.success"));
  };

  const deleteFailed = (errCode) => {
    return messageService.danger(
      feedbackMessages("delete.failed.with.reason", {
        reason: errorMessages(errCode),
      }),
    );
  };

  const actionSuccess = () => {
    return messageService.success(feedbackMessages("action.success"));
  };

  const actionFailed = (errCode) => {
    return messageService.danger(
      feedbackMessages("action.failed.with.reason", {
        reason: errorMessages(errCode),
      }),
    );
  };

  return {
    createSuccess,
    createFailed,
    readSuccess,
    readFailed,
    updateSuccess,
    updateFailed,
    deleteSuccess,
    deleteFailed,
    actionSuccess,
    actionFailed,
  };
};

export default useFeedbackMessage;
