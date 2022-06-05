import { validateNull } from "./utils";

/**
 * 获取localStorage
 */

interface getType {
  name: string;
  debug?: boolean;
}

export const getStore = (params: getType) => {
  const { name, debug } = params;
  let obj: any;
  let content;
  obj = window.sessionStorage.getItem(name);
  if (validateNull(obj)) obj = window.localStorage.getItem(name);
  if (validateNull(obj)) return;
  try {
    obj = JSON.parse(obj);
  } catch (e) {
    return obj;
  }
  if (debug) {
    return obj;
  }
  if (obj.dataType === "string") {
    content = obj.content;
  } else if (obj.dataType === "number") {
    content = Number(obj.content);
  } else if (obj.dataType === "boolean") {
    content = eval(obj.content);
  } else if (obj.dataType === "object") {
    content = obj.content;
  }
  return content;
};

/**
 * 存储localStorage
 */
interface setType {
  name: string;
  content: any;
  type: boolean | number | string;
}
export const setStore = (params: setType) => {
  const { name, content, type } = params;
  const obj = {
    dataType: typeof content,
    content: content,
    type: type,
    datetime: new Date().getTime()
  };

  if (type) {
    window.sessionStorage.setItem(name, JSON.stringify(obj));
  } else {
    window.localStorage.setItem(name, JSON.stringify(obj));
  }
};
