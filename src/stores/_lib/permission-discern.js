import {
  pipe,
  includes,
  slice,
  init,
  is,
  map,
  take,
  drop,
  indexOf,
  assoc,
  remove,
  trim,
  split,
} from "ramda";

const OPERATOR = {
  DIVISION: " ",
  GROUP: ["(", ")"],
  AND: "+",
  OR: "|",
  NOT: "!",
};

const deOperator = (strToArr) => {
  let result = [];
  let groupStarIdxs = [];

  for (let idx in strToArr) {
    const val = strToArr[idx];
    switch (val) {
      case OPERATOR.GROUP[0]:
        groupStarIdxs = [...groupStarIdxs, +idx];
        break;
      case OPERATOR.GROUP[1]:
        if (groupStarIdxs.length === 0) throw Error("括號沒對齊");
        if (groupStarIdxs.length === 1) {
          result = [...result, slice(groupStarIdxs[0] + 1, +idx, strToArr)];
        }
        groupStarIdxs = init(groupStarIdxs);
        break;
      case OPERATOR.AND:
      case OPERATOR.OR:
      case OPERATOR.NOT:
        if (groupStarIdxs.length === 0) {
          result = [...result, val];
        }
        break;
      default:
        if (groupStarIdxs.length === 0) result = [...result, val];
        break;
    }
  }
  if (groupStarIdxs.length > 0) throw Error("括號沒對齊");
  return result;
};

export const toPerms = (str) => {
  // empty or null
  if (!str) return [];

  const spliter = pipe(trim, split(OPERATOR.DIVISION))(str);

  let result = [];
  for (let perm of deOperator(spliter)) {
    if (is(Array, perm)) {
      result = [...result, deOperator(perm)];
    } else {
      result = [...result, perm];
    }
  }
  return result;
};

const evalBoolen = (boolArr) => {
  let transferResult = boolArr;
  const notIndex = indexOf(OPERATOR.NOT, boolArr);
  if (notIndex > -1) {
    if (notIndex === boolArr.length) throw Error("格式錯誤");
    const transferTargetIdx = notIndex + 1;
    if (boolArr[transferTargetIdx] === OPERATOR.NOT) throw Error("格式錯誤");
    transferResult = pipe(
      assoc(transferTargetIdx, !boolArr[transferTargetIdx]),
      remove(notIndex, 1),
    )(boolArr);
  }

  if (transferResult.length === 0) return true;
  if (transferResult.length === 1) return transferResult[0];
  if (transferResult.length === 3) return eval(transferResult.join(" "));
  return evalBoolen([
    evalBoolen(take(3, transferResult)),
    ...drop(3, transferResult),
  ]);
};

export const definePerms = (PERMS) => {
  const validPerms = (arr) => {
    return evalBoolen(
      map((perms) => {
        if (is(Array, perms)) return validPerms(perms);
        if (perms === OPERATOR.AND) return "&&";
        if (perms === OPERATOR.OR) return "||";
        if (perms === OPERATOR.NOT) return "!";
        return includes(perms, PERMS);
      }, arr),
    );
  };
  return validPerms;
};
