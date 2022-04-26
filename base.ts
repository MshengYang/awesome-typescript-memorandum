/**
 *  2、基础类型
 *  重要的原则一定要知道，类型系统本质上是集合。一个标准就是子集可以赋值父集,反过来不行
 * @example  基础类型集合
 *  */

/**
* 基础类型的表示，也叫基元
  string Number Boolean Symbol Never 
*/
type Primitive<T = any> = T extends string
  ? typeof String
  : T extends number
  ? typeof Number
  : T extends boolean
  ? typeof Boolean
  : T extends symbol
  ? typeof Symbol
  : T extends BigInt
  /** es2020 自持用不到 */
  ? typeof BigInt
  : never;



/** 枚举 */
enum Direction {
  NORTH,
  SOUTH,
  EAST,
  WEST,
}
/** 字面量 */
type With = "small" | "large";

/** any,any 为顶级类型，任意类型都是any类型的子集。慎用。使用any后ts的保护机制将会丧失。任意合乎语法的操作在any上都会执行 */
let anyElement: any;

/** unknown,同为顶级类型，替代any加入。存在保护机制 */
let valueUnknown: unknown;

valueUnknown = 1;

/** 出错 */
//  count = valueUnknown

/** void,undefined 和 null 的父集 */

let voidValue: void;

voidValue = undefined; /** OK */
voidValue = null; /** OK */

/** null and undefined 是所有类型的子类型，可以赋值给任意类型 */
let u: undefined = undefined;
let n: null = null;
let count = 1;
u = n; /** ok */

n = u; /** oK */

count = u; /** OK */
// u=count /** 不行 */
/** never 表示永不存在的值 */

let neverValue: never;

// neverValue = anyElement /** 错误 */

/** 对象类型,通常不用，因为和any没啥区别 */
type obj<T> = object | Array<T> | T[] | Function | [string, boolean];

/** 以下为一些常用的构建，可以当作基础类型使用 */
type list<T,V> = Date | Map<T,V>| Promise<T>| Set<T>;

/** 以上为常见类型集合，机会所有类型都是由这些类型通过集合运算构成 */


