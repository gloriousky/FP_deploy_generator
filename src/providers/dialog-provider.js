import { defineProvider } from "@/_app/defines/define-provider";
import { ElMessageBox } from "element-plus";
import { useVuelidate } from "@vuelidate/core";
import { helpers } from "@vuelidate/validators";

/** service */
import { useI18nService } from "@/services/i18n-service";

/** helper */
import { mapObjIndexed } from "ramda";
import $ from "jquery";

export const useDialogProvider = defineProvider("dialog-provider", () => {
  const i18nService = useI18nService();

  const shakeEffect = () => {
    $(".el-message-box").addClass(function () {
      const self = $(this);
      const aniClasses = "animate__animated animate__faster animate__shakeX";
      setTimeout(() => {
        self.removeClass(aniClasses);
      }, 500);
      return aniClasses;
    });
  };

  return {
    fire(options) {
      /** 阻擋第一次驗證 */
      let validateFlag = true;

      return new Promise((resolve) => {
        const showInput = !!options.input;
        if (showInput) {
          const { message, input, ...opts } = options;

          let inputValidator = null;
          switch (true) {
            case !!input.validator:
              inputValidator = (val) => {
                if (validateFlag) {
                  validateFlag = false;
                  return true;
                }
                const validateResult = input.validator(val);
                if (
                  validateResult === false ||
                  typeof validateResult === "string"
                ) {
                  shakeEffect();
                }
                return validateResult;
              };
              break;

            case !!input.validatRules:
              inputValidator = (val) => {
                if (validateFlag) {
                  validateFlag = false;
                  return true;
                }

                const validateResult = useVuelidate(
                  {
                    input: mapObjIndexed((val, rule) => {
                      const defaultMessage = ({ $params }) =>
                        i18nService.t(`form.valid.${rule}`, $params);

                      return helpers.withMessage(
                        input.validatMessages?.[rule] ?? defaultMessage,
                        val,
                      );
                    }, input.validatRules),
                  },
                  {
                    input: val,
                  },
                  {
                    $autoDirty: true,
                  },
                );
                validateResult.value.$touch();

                if (validateResult.value.$invalid) {
                  shakeEffect();
                  return validateResult.value.$errors[0]?.$message;
                }

                return true;
              };
              break;
          }

          ElMessageBox.prompt(message, {
            ...opts,
            inputPlaceholder: input.placeholder,
            inputType: input.type,
            inputValue: input.value,
            inputValidator,
          })
            .then(({ value }) =>
              resolve({
                isConfirmed: true,
                isDismissed: false,
                input: value,
              }),
            )
            .catch(() =>
              resolve({
                isConfirmed: false,
                isDismissed: true,
              }),
            );
        } else {
          ElMessageBox(options)
            .then(() =>
              resolve({
                isConfirmed: true,
                isDismissed: false,
              }),
            )
            .catch(() =>
              resolve({
                isConfirmed: false,
                isDismissed: true,
              }),
            );
        }
      });
    },
  };
});
