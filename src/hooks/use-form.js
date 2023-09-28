import { reactive, isReadonly } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { useI18nService } from "@/services/i18n-service";
import { helpers } from "@vuelidate/validators";
export * from "@vuelidate/validators";

import {
  keys,
  without,
  intersection,
  clone,
  mergeDeepRight,
  is,
  evolve,
  identity,
  omit,
  concat,
} from "ramda";
import { sizeComputed } from "@/widgets/form/files/ext-helper";

/* custom validator */
export const phone = {
  $validator: helpers.regex(/^09\d{8}$/),
};

/**
 *
 * @param {Number} size byte
 * @returns
 */
export const maxSize = (size) => ({
  $validator(file) {
    if (file instanceof Array) {
      for (let unit of file) {
        if (unit?.size > size) return false;
        continue;
      }
    } else if (file instanceof File) {
      return file?.size < size;
    }
    return true;
  },
  $params: {
    size: sizeComputed(size),
  },
});

export const useForm = (initState, initOption = {}) => {
  const _origin = clone(initState);

  const form = new Proxy(
    {
      _value: reactive(initState),
      $reset(option = {}) {
        const { exclude = [], include = [] } = mergeDeepRight(
          initOption.reset || {},
          option,
        );
        let fields = keys(_origin);
        if (exclude.length > 0) {
          fields = without(exclude, fields);
        }
        if (include.length > 0) {
          fields = intersection(include, fields);
        }
        for (let key of fields) {
          if (!isReadonly(_origin[key])) {
            form._value[key] = _origin[key];
          }
        }
      },
      $apply(obj) {
        let fields = keys(obj);
        for (let key of fields) {
          if (!isReadonly(_origin[key])) {
            form._value[key] = obj[key];
          }
        }
      },
      $request(option = {}) {
        const { transfer = {}, rename = {} } = mergeDeepRight(
          initOption.request || {},
          option,
        );

        const omitFields = concat(
          initOption.request?.omit ?? [],
          option.omit || [],
        );

        let output = omit(omitFields, form._value);

        /** transfer */
        const compileObj = {};
        for (let key of keys(output)) {
          if (key in transfer) {
            compileObj[key] = transfer[key];
          } else {
            compileObj[key] = identity;
          }
        }
        output = evolve(compileObj, output);

        /** rename */
        let originKeys = keys(rename);
        for (let key of originKeys) {
          if (key in output) {
            output[rename[key]] = output[key];
          }
        }
        output = omit(originKeys, output);

        return output;
      },
      $valid() {
        validate.value.$touch();
        return validate.value.$invalid;
      },
      $unvalid() {
        validate.value.$reset();
      },
    },
    {
      set: (target, propKey, value) => {
        if (propKey in target._value) {
          target._value[propKey] = value;
        }
        return target;
      },
      get: (target, propKey) => {
        if (propKey in target) {
          return target[propKey];
        }
        return target._value[propKey];
      },
    },
  );

  const validate = ((option) => {
    const i18nService = useI18nService();
    const { rules: originRules, messages = {} } = option;
    if (originRules) {
      let rules = originRules;
      if (is(Function, rules)) {
        rules = rules(form);
      }

      for (const key in rules) {
        for (const rule in rules[key]) {
          const defaultMessage = ({ $params }) =>
            i18nService.t(`form.valid.${rule}`, $params);

          rules[key][rule] = helpers.withMessage(
            messages[key]?.[rule] ?? defaultMessage,
            rules[key][rule],
          );
        }
      }

      return useVuelidate(rules, form, {
        $lazy: true,
        $autoDirty: false,
        $scope: false,
      });
    }
  })(initOption.validate || {});

  return { form, validate };
};

export default useForm;
