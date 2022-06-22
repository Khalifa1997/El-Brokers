//@ts-nocheck
export const filterObject = (args: {
  obj: { [key: string]: unknown };
  keys: {
    field: string;
    staticVal?: unknown;
    newField?: string;
    operation?: (value: unknown, object?: { [key: string]: unknown }) => any;
  }[];
}) => {
  return args.keys.reduce((prev, curr) => {
    return {
      ...prev,
      [`${curr.newField ?? curr.field.split(".").reverse()[0]}`]:
        curr.staticVal ??
        (curr.operation
          // eslint-disable-next-line
          ? curr.operation(eval(`args.obj.${curr.field}`), args.obj)
          // eslint-disable-next-line
          : eval(`args.obj.${curr.field}`)),
    };
  }, {});
};

/**
 * @function constructObj helps you to construct given/empty object to desired string arr of keys
 * @param nestedObj
 * @param value
 * @returns object
 * @description to change from   {a:{b:{c:5}}} if you have only a.b.c and value result is
 * @example
 * let obj = { a:{b:1}};
 * let temp = constructObj( obj,'a.c','new val' ); // output obj={a:{b:1,c:'new val'}}
 */
export const constructObj = (
  obj: { [key: string]: any },
  nestedObj: string[],
  value: any
) => {
  let tempObj = { ...obj };

  let s = `tempObj={...tempObj,${nestedObj.reduce(
    (prev: string, curr: string) => {
      return typeof tempObj[prev] === "object"
        ? `${prev}:{...tempObj.${prev},${curr}:${
            typeof value === "string" ? '"' : "\0"
          }${value}${typeof value === "string" ? '"' : "\0"}}`
        : `${prev}:${value} ${Array(nestedObj.length - 1)}`;
    }
  )}}`;
  // eslint-disable-next-line
  eval(s);
  return tempObj;
};
