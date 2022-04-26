/** 此文件分享文件控制流语法 */

/** 类型判断 */
/** typeof  for primitives */
function add(a: any, b: any) {
  if (typeof a === "string" || typeof b === "number") {
    return a.toString() + b.toString();
  }
  return a + b;
}

/** instanceof for class */

class Sub {
  a = "1";
  sub(a: number, b: number) {
    return a + b;
  }
}

const inputValue = new Sub();

if (inputValue instanceof Sub) {
  console.log("same", typeof inputValue);
}

/** in */
if ("a" in inputValue) {
  console.log("in"); /** ok */
}

/** 联合类型 */
let unionType: string | number;

unionType = 1;
unionType = "";

let unionType1!: { code: "1"; data: string } | { code: "2"; to: string };

switch (unionType1.code) {
  case "1":
    console.log(unionType1.data);
    break;
  case "2":
    console.log(unionType1.to);
    break;
}

/** 合并类型 */
/** 两个基元无法合并 */
let intersectionType1: string & number;

let intersectionType2: { a: string } & { b: number };

// intersectionType2.a = "1";

/** 类型断言 as or <> 以及类型转换 */

/** 双重断言，非重叠类型 */
let num: number | string;
/** 又叫指🦌为马 */
num = [] as unknown as number;

let count1: number;

count1 = num as number;
count1 = <number>num;

/** 类型重置 */
num; /** 此时类型为 number  */

/** as const 静态转换 */

const value1 = {
  info: "1",
};


const value2 = {
  info: "1",
} as const;

/** 类型判断转换 */
if (typeof num === "string") {
  num;
}

/** 类型守卫 */

function sub1(e: Error): e is Error {
  return e instanceof Error;
}

/** 类型三目运算 */
type isString<T> = T extends String ? String : never;

let isstring: isString<number>;

/** 类型参数，也叫范型 */
interface Res<T> {
  [key:string]: T;
}

let ResSpon: Res<string> = { '1': 'saf','asfgl':'asghja'  };

/** 类型参数可以解构 */
interface Res1<T = object> {
  key: T;
}
let ResSpon1: Res1<string> = {key:'1'};
// let ResSpon1: Res1 = {key:'1'}; /** error */

/** 也可以继承 */
interface Res2<T extends object> {
    key: T;
}
/**  */
let ResSpon2: Res2<string> = {key:'1'}; /** error */

/** 非空断言 */
let value3!:number;