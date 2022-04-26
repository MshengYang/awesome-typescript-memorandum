## typescript备忘录
## 一、前言
抛砖引玉，先搞个万能类型
```ts
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
  /** es2020 基本用不到 */
  ? typeof BigInt
  : never;
/**
 * 表示一个抽象类型
 */
 interface Abstract<T extends object = object> extends Function {
    /** 实例原型 */
    readonly prototype: T;
  }
  /**
  * 表示一个可构造类型
  */
   interface Constructable<T extends object = object> extends Abstract<T> {
    new (...args: any[]): T;
  }
  /**
  * 表示一个 class
  */
   type Class<T extends object = object> = Abstract<T> | Constructable<T>;
  /**
  * 
  * 表示一个类型
  */
   type Type<T = any> = T extends object ? Class<T> : Primitive<T>;
```
 为什会有这篇文章呢，本来摸鱼摸的好好的。但是之前技术分享会我啥都没分享，所以被迫给全面转向typescript团队过一遍typescript知识。好家伙连夜复习官方文档➕几年代码经验总算糊弄过去。
 于是这篇文章也就出来了，报告的markdown直接改的。有啥问题直接说，我瞅瞅改一下

 首先这没啥技术含量，也别指望这个分享看了就可以敲，不现实。但是应该包含typescript 类型本家大部分知识点了。全部用代码展示。知识点不会详细说明，知识点注释一下
 有些代码来自官网案例

### 1、typescript的核心是什么？是类型
社区的文章啥的，各种大佬的解析都很多。

我的理解类型的本质是==可执行操作的集合==，类型检查就是验证当前对象在集合里是否可以进行操作。

typescript本质就是在类型检查下，来避免出现源码中出现不正确的引用。既保证类型安全

### 2、我们为什么要使用typescript?

1、提示！提示！还是提示！ 重要的事情要说三遍。

2、让我能看的懂你写的代码，也能让你说:好家伙这么写的。简单来说就是可读性与拒绝💩山带来的难维护。

## 快速开始

*第一重要的一点就是抛弃掉typescript中文网，去官方文档网站 https://www.typescriptlang.org/

因为typescript 更新相当频繁，目前版本为4.6.3 百度能搜到的前几个网站版本大多在3.6～4.2 之间。所以为了更好的学习，请直接去官网

在现有项目引入typescript 是非常简单的

创建一个新的文件夹
```bash
/**执行以下命令*/

yarn init 
yarn add typescript
/** 然后生成配置文件 */
tsc -init
```
最基础的开发环境就完成了


可以查看到tsconfig.json 这个文件

初始化的配置文件提供了完善的注释说明，请按照自己的配置

着重说明的有以下几个


-- target 

-- noImplicitAny 为了不变成anyScript

-- strictNullChecks undefined 和 null 的赋值检查 

第一个是直接影响ts编译

而后面两个是通常会被大家忽略的严格类型检查 启用 “strict”: true 会同时打开他们

### 1、什么情况下你需要写类型？
typescript 存在类型推断机制，如果能推断出来正确的类型并且不是any，那么需要写,反之就不需要写了

### 2、提示，提示，提示

使用typescript 最重要的原因之一

基本上现在大多数主流库与框架都导出有类型文件。即使官方没有导出类型。你也可以导入社区的类型依赖，通常为@types/ + 包名

然后你就可以导入社区或者你自定义的类型，然后你就可以使用他们。
导入你需要的类型

```ts
/** import type 在typescript 3.8 以后版本得到支持，建议导入类型，用这种导入方式，通过babel插件的支持，只是type导入会被删除 */
import type { OverlayProps } from './type';

import  { OverlayProps } from './type';
```
也可以启用 importsNotUsedAsValues:'error' 配置来强行规定类型导入

<!-- 代码提示能避免拼写错误 -->

### 3、 基础类型

   重要的原则一定要知道，类型系统本质上是集合。一个标准就是子集可以赋值父集,反过来不行
```ts
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

/** 对象类型,通常不用Object因为和any没啥区别 */
type obj<T> = object | Array<T> | T[] | Function | [string, boolean];

/** 以下为一些常用的构建，可以当作基础类型使用 */
type list<T,V> = Date | Map<T,V>| Promise<T>| Set<T>;

/** 以上为常见类型集合，机会所有类型都是由这些类型通过集合运算构成 */

```
### 4、操作流

本质上类型就是集合，所以基本上所有集合的操作类型基本都是可以做到的
``` ts
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
/** 随意组合也是Ok的 */
interface Res3<T extends object = object> {
    key: T;
}
/**  */
let ResSpon2: Res2<string> = {key:'1'}; /** error */

/** 非空断言 */
let value3!:number;
```

### 5、接口
 接口和类型别名对比，接口只能用于对象，接口可以继承

 但是接口存在合并现象。所以推荐所有类型定义都统一用类型别名type

```ts
/** get set 接口支持 */
interface Response {
  get size(): number;
  set size(value: number);
}
 /** 泛型也是Ok的 */
interface JSonResponse<T> {
  version: number;
  /** 可选？，直接写成 outIfStock: T | undefined */
  outIfStock?: T;
  /** readonly 修饰的成员为只读属性*/
  readonly data: string;

  /** 函数类型有两种写法 */
  update: (args: string) => void;
  update1(args: string): void;
 
  (): JSonResponse;
  new (): JSonResponse;

/** 任意键为string的对象都可以满足需求 */
  [key: string]: any;
}

/**
 * 借口可以继承
 */
interface Result extends Response, JSonResponse {}

// type ad= {} 

/**
 * 接口合并
 * 重要的问题，接口可以合并，所以很多时候推荐使用type 字面量，因为不会合并
 *  */
interface Result {
  error: Error;
}

let result!: Result;
result.error; /** Ok */
result.data; /** Ok */


/** 接口实现  */
class ResultClass implements Result {
 ...
}

/** 函数类型可以进行重载 */
interface fun {
  (args: string): number;
  (args: number): number;
}

/** 泛型在接口上也是适用的 */

```

### 6、class

```ts
/** typescript 一个强大的地方就是对面向对象的支持，使开发大型应用更加丝滑 */
abstract class UserInfo {
    abstract getName():string;

    getSex(){
        return '1'
    }
}
class HumanAction {
   run(){
   }
   call(){}
}
class User<T> extends HumanAction implements UserInfo {
   /** implements抽象类的方法必须实现 */
   public getName(): string {
       return 'user'
   }

   public getSex(): string {
       return '1'
   }

   readonly age = 16
   /** 私有成员 */
   private id?: number;
   /** name */
   public name!: string;
    /** 静态成员 */
   static role = 'mate';
   /** 获取用户id */
   get useId(){
       return this.id
   }
   /** 构造起 */
   constructor(){
       super();
   }

   /** set方法 */
   set useId(args:number){
       this.id = args
   }
   /** 函数重载 */
   add(a: string, b: number): string;
   add(a: number, b: string): string;

   add(a: any, b: any) {
     if (typeof a === "string" || typeof b === "string") {
       return a.toString() + b.toString();
     }
     return a + b;
   }

   protected request = ()=>{
       return '111';
   }

}  


const data: User<string> = new User() 

User.role

console.log(data)

```
### 7、装饰器

不写大型应用大型库的话，应该不会用到这个。使用前需要打开支持装饰器的配置，通常是关闭的.具体找那些大佬的解析，该功能：
"experimentalDecorators": true,  
```ts 
function StyleTheme(constructor:{ new (...args: any[]): {} }):any{
    return class  extends constructor {
        Theme = 'dark';
    }
}
function require(){
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log(propertyKey)
      };
}

function params(target: Object, propertyKey: string | symbol, parameterIndex: number){
    console.log(parameterIndex)
}
/** 方法装饰器 */
@StyleTheme
class Info{

    private age = 16
    /** 函数装饰器 */
    @require()
    save(){
        return 111;
    } 
    /** 参数装饰器 */
    off(@params args:string){
        return args
    }
}

const newInfo  = new Info()


newInfo.off('1asfas')

console.log((newInfo as any).Theme)


newInfo.save()

```

以上，感谢阅读。judge!



