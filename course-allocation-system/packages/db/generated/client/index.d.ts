
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Student
 * 
 */
export type Student = $Result.DefaultSelection<Prisma.$StudentPayload>
/**
 * Model Course
 * 
 */
export type Course = $Result.DefaultSelection<Prisma.$CoursePayload>
/**
 * Model Preference
 * 
 */
export type Preference = $Result.DefaultSelection<Prisma.$PreferencePayload>
/**
 * Model Allocation
 * 
 */
export type Allocation = $Result.DefaultSelection<Prisma.$AllocationPayload>
/**
 * Model AISession
 * 
 */
export type AISession = $Result.DefaultSelection<Prisma.$AISessionPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Category: {
  GENERAL: 'GENERAL',
  OBC: 'OBC',
  SC: 'SC',
  ST: 'ST'
};

export type Category = (typeof Category)[keyof typeof Category]


export const PreferenceStatus: {
  PENDING: 'PENDING',
  ALLOCATED: 'ALLOCATED',
  REJECTED: 'REJECTED'
};

export type PreferenceStatus = (typeof PreferenceStatus)[keyof typeof PreferenceStatus]


export const StudentStatus: {
  PENDING: 'PENDING',
  ALLOCATED: 'ALLOCATED',
  UNALLOCATED: 'UNALLOCATED'
};

export type StudentStatus = (typeof StudentStatus)[keyof typeof StudentStatus]


export const UserRole: {
  ADMIN: 'ADMIN',
  STUDENT: 'STUDENT'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]

}

export type Category = $Enums.Category

export const Category: typeof $Enums.Category

export type PreferenceStatus = $Enums.PreferenceStatus

export const PreferenceStatus: typeof $Enums.PreferenceStatus

export type StudentStatus = $Enums.StudentStatus

export const StudentStatus: typeof $Enums.StudentStatus

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.student`: Exposes CRUD operations for the **Student** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Students
    * const students = await prisma.student.findMany()
    * ```
    */
  get student(): Prisma.StudentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.course`: Exposes CRUD operations for the **Course** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Courses
    * const courses = await prisma.course.findMany()
    * ```
    */
  get course(): Prisma.CourseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.preference`: Exposes CRUD operations for the **Preference** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Preferences
    * const preferences = await prisma.preference.findMany()
    * ```
    */
  get preference(): Prisma.PreferenceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.allocation`: Exposes CRUD operations for the **Allocation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Allocations
    * const allocations = await prisma.allocation.findMany()
    * ```
    */
  get allocation(): Prisma.AllocationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.aISession`: Exposes CRUD operations for the **AISession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AISessions
    * const aISessions = await prisma.aISession.findMany()
    * ```
    */
  get aISession(): Prisma.AISessionDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Student: 'Student',
    Course: 'Course',
    Preference: 'Preference',
    Allocation: 'Allocation',
    AISession: 'AISession'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "student" | "course" | "preference" | "allocation" | "aISession"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Student: {
        payload: Prisma.$StudentPayload<ExtArgs>
        fields: Prisma.StudentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StudentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StudentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          findFirst: {
            args: Prisma.StudentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StudentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          findMany: {
            args: Prisma.StudentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>[]
          }
          create: {
            args: Prisma.StudentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          createMany: {
            args: Prisma.StudentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StudentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>[]
          }
          delete: {
            args: Prisma.StudentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          update: {
            args: Prisma.StudentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          deleteMany: {
            args: Prisma.StudentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StudentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StudentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>[]
          }
          upsert: {
            args: Prisma.StudentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          aggregate: {
            args: Prisma.StudentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStudent>
          }
          groupBy: {
            args: Prisma.StudentGroupByArgs<ExtArgs>
            result: $Utils.Optional<StudentGroupByOutputType>[]
          }
          count: {
            args: Prisma.StudentCountArgs<ExtArgs>
            result: $Utils.Optional<StudentCountAggregateOutputType> | number
          }
        }
      }
      Course: {
        payload: Prisma.$CoursePayload<ExtArgs>
        fields: Prisma.CourseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CourseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CourseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          findFirst: {
            args: Prisma.CourseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CourseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          findMany: {
            args: Prisma.CourseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>[]
          }
          create: {
            args: Prisma.CourseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          createMany: {
            args: Prisma.CourseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CourseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>[]
          }
          delete: {
            args: Prisma.CourseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          update: {
            args: Prisma.CourseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          deleteMany: {
            args: Prisma.CourseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CourseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CourseUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>[]
          }
          upsert: {
            args: Prisma.CourseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          aggregate: {
            args: Prisma.CourseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCourse>
          }
          groupBy: {
            args: Prisma.CourseGroupByArgs<ExtArgs>
            result: $Utils.Optional<CourseGroupByOutputType>[]
          }
          count: {
            args: Prisma.CourseCountArgs<ExtArgs>
            result: $Utils.Optional<CourseCountAggregateOutputType> | number
          }
        }
      }
      Preference: {
        payload: Prisma.$PreferencePayload<ExtArgs>
        fields: Prisma.PreferenceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PreferenceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreferencePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PreferenceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreferencePayload>
          }
          findFirst: {
            args: Prisma.PreferenceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreferencePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PreferenceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreferencePayload>
          }
          findMany: {
            args: Prisma.PreferenceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreferencePayload>[]
          }
          create: {
            args: Prisma.PreferenceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreferencePayload>
          }
          createMany: {
            args: Prisma.PreferenceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PreferenceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreferencePayload>[]
          }
          delete: {
            args: Prisma.PreferenceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreferencePayload>
          }
          update: {
            args: Prisma.PreferenceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreferencePayload>
          }
          deleteMany: {
            args: Prisma.PreferenceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PreferenceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PreferenceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreferencePayload>[]
          }
          upsert: {
            args: Prisma.PreferenceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreferencePayload>
          }
          aggregate: {
            args: Prisma.PreferenceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePreference>
          }
          groupBy: {
            args: Prisma.PreferenceGroupByArgs<ExtArgs>
            result: $Utils.Optional<PreferenceGroupByOutputType>[]
          }
          count: {
            args: Prisma.PreferenceCountArgs<ExtArgs>
            result: $Utils.Optional<PreferenceCountAggregateOutputType> | number
          }
        }
      }
      Allocation: {
        payload: Prisma.$AllocationPayload<ExtArgs>
        fields: Prisma.AllocationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AllocationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AllocationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AllocationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AllocationPayload>
          }
          findFirst: {
            args: Prisma.AllocationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AllocationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AllocationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AllocationPayload>
          }
          findMany: {
            args: Prisma.AllocationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AllocationPayload>[]
          }
          create: {
            args: Prisma.AllocationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AllocationPayload>
          }
          createMany: {
            args: Prisma.AllocationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AllocationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AllocationPayload>[]
          }
          delete: {
            args: Prisma.AllocationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AllocationPayload>
          }
          update: {
            args: Prisma.AllocationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AllocationPayload>
          }
          deleteMany: {
            args: Prisma.AllocationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AllocationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AllocationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AllocationPayload>[]
          }
          upsert: {
            args: Prisma.AllocationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AllocationPayload>
          }
          aggregate: {
            args: Prisma.AllocationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAllocation>
          }
          groupBy: {
            args: Prisma.AllocationGroupByArgs<ExtArgs>
            result: $Utils.Optional<AllocationGroupByOutputType>[]
          }
          count: {
            args: Prisma.AllocationCountArgs<ExtArgs>
            result: $Utils.Optional<AllocationCountAggregateOutputType> | number
          }
        }
      }
      AISession: {
        payload: Prisma.$AISessionPayload<ExtArgs>
        fields: Prisma.AISessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AISessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AISessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AISessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AISessionPayload>
          }
          findFirst: {
            args: Prisma.AISessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AISessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AISessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AISessionPayload>
          }
          findMany: {
            args: Prisma.AISessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AISessionPayload>[]
          }
          create: {
            args: Prisma.AISessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AISessionPayload>
          }
          createMany: {
            args: Prisma.AISessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AISessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AISessionPayload>[]
          }
          delete: {
            args: Prisma.AISessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AISessionPayload>
          }
          update: {
            args: Prisma.AISessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AISessionPayload>
          }
          deleteMany: {
            args: Prisma.AISessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AISessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AISessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AISessionPayload>[]
          }
          upsert: {
            args: Prisma.AISessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AISessionPayload>
          }
          aggregate: {
            args: Prisma.AISessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAISession>
          }
          groupBy: {
            args: Prisma.AISessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<AISessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.AISessionCountArgs<ExtArgs>
            result: $Utils.Optional<AISessionCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    student?: StudentOmit
    course?: CourseOmit
    preference?: PreferenceOmit
    allocation?: AllocationOmit
    aISession?: AISessionOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type StudentCountOutputType
   */

  export type StudentCountOutputType = {
    preferences: number
  }

  export type StudentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    preferences?: boolean | StudentCountOutputTypeCountPreferencesArgs
  }

  // Custom InputTypes
  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentCountOutputType
     */
    select?: StudentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeCountPreferencesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PreferenceWhereInput
  }


  /**
   * Count Type CourseCountOutputType
   */

  export type CourseCountOutputType = {
    preferences: number
    allocations: number
  }

  export type CourseCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    preferences?: boolean | CourseCountOutputTypeCountPreferencesArgs
    allocations?: boolean | CourseCountOutputTypeCountAllocationsArgs
  }

  // Custom InputTypes
  /**
   * CourseCountOutputType without action
   */
  export type CourseCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseCountOutputType
     */
    select?: CourseCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CourseCountOutputType without action
   */
  export type CourseCountOutputTypeCountPreferencesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PreferenceWhereInput
  }

  /**
   * CourseCountOutputType without action
   */
  export type CourseCountOutputTypeCountAllocationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AllocationWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    role: $Enums.UserRole | null
    studentId: string | null
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    role: $Enums.UserRole | null
    studentId: string | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    passwordHash: number
    role: number
    studentId: number
    createdAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    role?: true
    studentId?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    role?: true
    studentId?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    role?: true
    studentId?: true
    createdAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    studentId: string | null
    createdAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    studentId?: boolean
    createdAt?: boolean
    student?: boolean | User$studentArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    studentId?: boolean
    createdAt?: boolean
    student?: boolean | User$studentArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    studentId?: boolean
    createdAt?: boolean
    student?: boolean | User$studentArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    studentId?: boolean
    createdAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "passwordHash" | "role" | "studentId" | "createdAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | User$studentArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | User$studentArgs<ExtArgs>
  }
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | User$studentArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      student: Prisma.$StudentPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      passwordHash: string
      role: $Enums.UserRole
      studentId: string | null
      createdAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    student<T extends User$studentArgs<ExtArgs> = {}>(args?: Subset<T, User$studentArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'UserRole'>
    readonly studentId: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.student
   */
  export type User$studentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    where?: StudentWhereInput
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Student
   */

  export type AggregateStudent = {
    _count: StudentCountAggregateOutputType | null
    _avg: StudentAvgAggregateOutputType | null
    _sum: StudentSumAggregateOutputType | null
    _min: StudentMinAggregateOutputType | null
    _max: StudentMaxAggregateOutputType | null
  }

  export type StudentAvgAggregateOutputType = {
    marks: number | null
  }

  export type StudentSumAggregateOutputType = {
    marks: number | null
  }

  export type StudentMinAggregateOutputType = {
    id: string | null
    name: string | null
    marks: number | null
    category: $Enums.Category | null
    applicationDate: Date | null
    status: $Enums.StudentStatus | null
  }

  export type StudentMaxAggregateOutputType = {
    id: string | null
    name: string | null
    marks: number | null
    category: $Enums.Category | null
    applicationDate: Date | null
    status: $Enums.StudentStatus | null
  }

  export type StudentCountAggregateOutputType = {
    id: number
    name: number
    marks: number
    category: number
    applicationDate: number
    status: number
    _all: number
  }


  export type StudentAvgAggregateInputType = {
    marks?: true
  }

  export type StudentSumAggregateInputType = {
    marks?: true
  }

  export type StudentMinAggregateInputType = {
    id?: true
    name?: true
    marks?: true
    category?: true
    applicationDate?: true
    status?: true
  }

  export type StudentMaxAggregateInputType = {
    id?: true
    name?: true
    marks?: true
    category?: true
    applicationDate?: true
    status?: true
  }

  export type StudentCountAggregateInputType = {
    id?: true
    name?: true
    marks?: true
    category?: true
    applicationDate?: true
    status?: true
    _all?: true
  }

  export type StudentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Student to aggregate.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Students
    **/
    _count?: true | StudentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StudentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StudentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StudentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StudentMaxAggregateInputType
  }

  export type GetStudentAggregateType<T extends StudentAggregateArgs> = {
        [P in keyof T & keyof AggregateStudent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStudent[P]>
      : GetScalarType<T[P], AggregateStudent[P]>
  }




  export type StudentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudentWhereInput
    orderBy?: StudentOrderByWithAggregationInput | StudentOrderByWithAggregationInput[]
    by: StudentScalarFieldEnum[] | StudentScalarFieldEnum
    having?: StudentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StudentCountAggregateInputType | true
    _avg?: StudentAvgAggregateInputType
    _sum?: StudentSumAggregateInputType
    _min?: StudentMinAggregateInputType
    _max?: StudentMaxAggregateInputType
  }

  export type StudentGroupByOutputType = {
    id: string
    name: string
    marks: number
    category: $Enums.Category
    applicationDate: Date
    status: $Enums.StudentStatus
    _count: StudentCountAggregateOutputType | null
    _avg: StudentAvgAggregateOutputType | null
    _sum: StudentSumAggregateOutputType | null
    _min: StudentMinAggregateOutputType | null
    _max: StudentMaxAggregateOutputType | null
  }

  type GetStudentGroupByPayload<T extends StudentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StudentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StudentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StudentGroupByOutputType[P]>
            : GetScalarType<T[P], StudentGroupByOutputType[P]>
        }
      >
    >


  export type StudentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    marks?: boolean
    category?: boolean
    applicationDate?: boolean
    status?: boolean
    preferences?: boolean | Student$preferencesArgs<ExtArgs>
    allocation?: boolean | Student$allocationArgs<ExtArgs>
    user?: boolean | Student$userArgs<ExtArgs>
    _count?: boolean | StudentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["student"]>

  export type StudentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    marks?: boolean
    category?: boolean
    applicationDate?: boolean
    status?: boolean
  }, ExtArgs["result"]["student"]>

  export type StudentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    marks?: boolean
    category?: boolean
    applicationDate?: boolean
    status?: boolean
  }, ExtArgs["result"]["student"]>

  export type StudentSelectScalar = {
    id?: boolean
    name?: boolean
    marks?: boolean
    category?: boolean
    applicationDate?: boolean
    status?: boolean
  }

  export type StudentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "marks" | "category" | "applicationDate" | "status", ExtArgs["result"]["student"]>
  export type StudentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    preferences?: boolean | Student$preferencesArgs<ExtArgs>
    allocation?: boolean | Student$allocationArgs<ExtArgs>
    user?: boolean | Student$userArgs<ExtArgs>
    _count?: boolean | StudentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type StudentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type StudentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $StudentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Student"
    objects: {
      preferences: Prisma.$PreferencePayload<ExtArgs>[]
      allocation: Prisma.$AllocationPayload<ExtArgs> | null
      user: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      marks: number
      category: $Enums.Category
      applicationDate: Date
      status: $Enums.StudentStatus
    }, ExtArgs["result"]["student"]>
    composites: {}
  }

  type StudentGetPayload<S extends boolean | null | undefined | StudentDefaultArgs> = $Result.GetResult<Prisma.$StudentPayload, S>

  type StudentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StudentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StudentCountAggregateInputType | true
    }

  export interface StudentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Student'], meta: { name: 'Student' } }
    /**
     * Find zero or one Student that matches the filter.
     * @param {StudentFindUniqueArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StudentFindUniqueArgs>(args: SelectSubset<T, StudentFindUniqueArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Student that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StudentFindUniqueOrThrowArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StudentFindUniqueOrThrowArgs>(args: SelectSubset<T, StudentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Student that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindFirstArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StudentFindFirstArgs>(args?: SelectSubset<T, StudentFindFirstArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Student that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindFirstOrThrowArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StudentFindFirstOrThrowArgs>(args?: SelectSubset<T, StudentFindFirstOrThrowArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Students that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Students
     * const students = await prisma.student.findMany()
     * 
     * // Get first 10 Students
     * const students = await prisma.student.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const studentWithIdOnly = await prisma.student.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StudentFindManyArgs>(args?: SelectSubset<T, StudentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Student.
     * @param {StudentCreateArgs} args - Arguments to create a Student.
     * @example
     * // Create one Student
     * const Student = await prisma.student.create({
     *   data: {
     *     // ... data to create a Student
     *   }
     * })
     * 
     */
    create<T extends StudentCreateArgs>(args: SelectSubset<T, StudentCreateArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Students.
     * @param {StudentCreateManyArgs} args - Arguments to create many Students.
     * @example
     * // Create many Students
     * const student = await prisma.student.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StudentCreateManyArgs>(args?: SelectSubset<T, StudentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Students and returns the data saved in the database.
     * @param {StudentCreateManyAndReturnArgs} args - Arguments to create many Students.
     * @example
     * // Create many Students
     * const student = await prisma.student.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Students and only return the `id`
     * const studentWithIdOnly = await prisma.student.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StudentCreateManyAndReturnArgs>(args?: SelectSubset<T, StudentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Student.
     * @param {StudentDeleteArgs} args - Arguments to delete one Student.
     * @example
     * // Delete one Student
     * const Student = await prisma.student.delete({
     *   where: {
     *     // ... filter to delete one Student
     *   }
     * })
     * 
     */
    delete<T extends StudentDeleteArgs>(args: SelectSubset<T, StudentDeleteArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Student.
     * @param {StudentUpdateArgs} args - Arguments to update one Student.
     * @example
     * // Update one Student
     * const student = await prisma.student.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StudentUpdateArgs>(args: SelectSubset<T, StudentUpdateArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Students.
     * @param {StudentDeleteManyArgs} args - Arguments to filter Students to delete.
     * @example
     * // Delete a few Students
     * const { count } = await prisma.student.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StudentDeleteManyArgs>(args?: SelectSubset<T, StudentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Students.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Students
     * const student = await prisma.student.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StudentUpdateManyArgs>(args: SelectSubset<T, StudentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Students and returns the data updated in the database.
     * @param {StudentUpdateManyAndReturnArgs} args - Arguments to update many Students.
     * @example
     * // Update many Students
     * const student = await prisma.student.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Students and only return the `id`
     * const studentWithIdOnly = await prisma.student.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StudentUpdateManyAndReturnArgs>(args: SelectSubset<T, StudentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Student.
     * @param {StudentUpsertArgs} args - Arguments to update or create a Student.
     * @example
     * // Update or create a Student
     * const student = await prisma.student.upsert({
     *   create: {
     *     // ... data to create a Student
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Student we want to update
     *   }
     * })
     */
    upsert<T extends StudentUpsertArgs>(args: SelectSubset<T, StudentUpsertArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Students.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentCountArgs} args - Arguments to filter Students to count.
     * @example
     * // Count the number of Students
     * const count = await prisma.student.count({
     *   where: {
     *     // ... the filter for the Students we want to count
     *   }
     * })
    **/
    count<T extends StudentCountArgs>(
      args?: Subset<T, StudentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StudentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Student.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StudentAggregateArgs>(args: Subset<T, StudentAggregateArgs>): Prisma.PrismaPromise<GetStudentAggregateType<T>>

    /**
     * Group by Student.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StudentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StudentGroupByArgs['orderBy'] }
        : { orderBy?: StudentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StudentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStudentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Student model
   */
  readonly fields: StudentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Student.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StudentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    preferences<T extends Student$preferencesArgs<ExtArgs> = {}>(args?: Subset<T, Student$preferencesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PreferencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    allocation<T extends Student$allocationArgs<ExtArgs> = {}>(args?: Subset<T, Student$allocationArgs<ExtArgs>>): Prisma__AllocationClient<$Result.GetResult<Prisma.$AllocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    user<T extends Student$userArgs<ExtArgs> = {}>(args?: Subset<T, Student$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Student model
   */
  interface StudentFieldRefs {
    readonly id: FieldRef<"Student", 'String'>
    readonly name: FieldRef<"Student", 'String'>
    readonly marks: FieldRef<"Student", 'Float'>
    readonly category: FieldRef<"Student", 'Category'>
    readonly applicationDate: FieldRef<"Student", 'DateTime'>
    readonly status: FieldRef<"Student", 'StudentStatus'>
  }
    

  // Custom InputTypes
  /**
   * Student findUnique
   */
  export type StudentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student findUniqueOrThrow
   */
  export type StudentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student findFirst
   */
  export type StudentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Students.
     */
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student findFirstOrThrow
   */
  export type StudentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Students.
     */
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student findMany
   */
  export type StudentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Students to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Students.
     */
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student create
   */
  export type StudentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The data needed to create a Student.
     */
    data: XOR<StudentCreateInput, StudentUncheckedCreateInput>
  }

  /**
   * Student createMany
   */
  export type StudentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Students.
     */
    data: StudentCreateManyInput | StudentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Student createManyAndReturn
   */
  export type StudentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * The data used to create many Students.
     */
    data: StudentCreateManyInput | StudentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Student update
   */
  export type StudentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The data needed to update a Student.
     */
    data: XOR<StudentUpdateInput, StudentUncheckedUpdateInput>
    /**
     * Choose, which Student to update.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student updateMany
   */
  export type StudentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Students.
     */
    data: XOR<StudentUpdateManyMutationInput, StudentUncheckedUpdateManyInput>
    /**
     * Filter which Students to update
     */
    where?: StudentWhereInput
    /**
     * Limit how many Students to update.
     */
    limit?: number
  }

  /**
   * Student updateManyAndReturn
   */
  export type StudentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * The data used to update Students.
     */
    data: XOR<StudentUpdateManyMutationInput, StudentUncheckedUpdateManyInput>
    /**
     * Filter which Students to update
     */
    where?: StudentWhereInput
    /**
     * Limit how many Students to update.
     */
    limit?: number
  }

  /**
   * Student upsert
   */
  export type StudentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The filter to search for the Student to update in case it exists.
     */
    where: StudentWhereUniqueInput
    /**
     * In case the Student found by the `where` argument doesn't exist, create a new Student with this data.
     */
    create: XOR<StudentCreateInput, StudentUncheckedCreateInput>
    /**
     * In case the Student was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StudentUpdateInput, StudentUncheckedUpdateInput>
  }

  /**
   * Student delete
   */
  export type StudentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter which Student to delete.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student deleteMany
   */
  export type StudentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Students to delete
     */
    where?: StudentWhereInput
    /**
     * Limit how many Students to delete.
     */
    limit?: number
  }

  /**
   * Student.preferences
   */
  export type Student$preferencesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preference
     */
    select?: PreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Preference
     */
    omit?: PreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreferenceInclude<ExtArgs> | null
    where?: PreferenceWhereInput
    orderBy?: PreferenceOrderByWithRelationInput | PreferenceOrderByWithRelationInput[]
    cursor?: PreferenceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PreferenceScalarFieldEnum | PreferenceScalarFieldEnum[]
  }

  /**
   * Student.allocation
   */
  export type Student$allocationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Allocation
     */
    select?: AllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Allocation
     */
    omit?: AllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AllocationInclude<ExtArgs> | null
    where?: AllocationWhereInput
  }

  /**
   * Student.user
   */
  export type Student$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Student without action
   */
  export type StudentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
  }


  /**
   * Model Course
   */

  export type AggregateCourse = {
    _count: CourseCountAggregateOutputType | null
    _avg: CourseAvgAggregateOutputType | null
    _sum: CourseSumAggregateOutputType | null
    _min: CourseMinAggregateOutputType | null
    _max: CourseMaxAggregateOutputType | null
  }

  export type CourseAvgAggregateOutputType = {
    totalSeats: number | null
    generalSeats: number | null
    obcSeats: number | null
    scSeats: number | null
    stSeats: number | null
  }

  export type CourseSumAggregateOutputType = {
    totalSeats: number | null
    generalSeats: number | null
    obcSeats: number | null
    scSeats: number | null
    stSeats: number | null
  }

  export type CourseMinAggregateOutputType = {
    id: string | null
    name: string | null
    totalSeats: number | null
    generalSeats: number | null
    obcSeats: number | null
    scSeats: number | null
    stSeats: number | null
  }

  export type CourseMaxAggregateOutputType = {
    id: string | null
    name: string | null
    totalSeats: number | null
    generalSeats: number | null
    obcSeats: number | null
    scSeats: number | null
    stSeats: number | null
  }

  export type CourseCountAggregateOutputType = {
    id: number
    name: number
    totalSeats: number
    generalSeats: number
    obcSeats: number
    scSeats: number
    stSeats: number
    _all: number
  }


  export type CourseAvgAggregateInputType = {
    totalSeats?: true
    generalSeats?: true
    obcSeats?: true
    scSeats?: true
    stSeats?: true
  }

  export type CourseSumAggregateInputType = {
    totalSeats?: true
    generalSeats?: true
    obcSeats?: true
    scSeats?: true
    stSeats?: true
  }

  export type CourseMinAggregateInputType = {
    id?: true
    name?: true
    totalSeats?: true
    generalSeats?: true
    obcSeats?: true
    scSeats?: true
    stSeats?: true
  }

  export type CourseMaxAggregateInputType = {
    id?: true
    name?: true
    totalSeats?: true
    generalSeats?: true
    obcSeats?: true
    scSeats?: true
    stSeats?: true
  }

  export type CourseCountAggregateInputType = {
    id?: true
    name?: true
    totalSeats?: true
    generalSeats?: true
    obcSeats?: true
    scSeats?: true
    stSeats?: true
    _all?: true
  }

  export type CourseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Course to aggregate.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Courses
    **/
    _count?: true | CourseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CourseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CourseSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CourseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CourseMaxAggregateInputType
  }

  export type GetCourseAggregateType<T extends CourseAggregateArgs> = {
        [P in keyof T & keyof AggregateCourse]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCourse[P]>
      : GetScalarType<T[P], AggregateCourse[P]>
  }




  export type CourseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CourseWhereInput
    orderBy?: CourseOrderByWithAggregationInput | CourseOrderByWithAggregationInput[]
    by: CourseScalarFieldEnum[] | CourseScalarFieldEnum
    having?: CourseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CourseCountAggregateInputType | true
    _avg?: CourseAvgAggregateInputType
    _sum?: CourseSumAggregateInputType
    _min?: CourseMinAggregateInputType
    _max?: CourseMaxAggregateInputType
  }

  export type CourseGroupByOutputType = {
    id: string
    name: string
    totalSeats: number
    generalSeats: number
    obcSeats: number
    scSeats: number
    stSeats: number
    _count: CourseCountAggregateOutputType | null
    _avg: CourseAvgAggregateOutputType | null
    _sum: CourseSumAggregateOutputType | null
    _min: CourseMinAggregateOutputType | null
    _max: CourseMaxAggregateOutputType | null
  }

  type GetCourseGroupByPayload<T extends CourseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CourseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CourseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CourseGroupByOutputType[P]>
            : GetScalarType<T[P], CourseGroupByOutputType[P]>
        }
      >
    >


  export type CourseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    totalSeats?: boolean
    generalSeats?: boolean
    obcSeats?: boolean
    scSeats?: boolean
    stSeats?: boolean
    preferences?: boolean | Course$preferencesArgs<ExtArgs>
    allocations?: boolean | Course$allocationsArgs<ExtArgs>
    _count?: boolean | CourseCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["course"]>

  export type CourseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    totalSeats?: boolean
    generalSeats?: boolean
    obcSeats?: boolean
    scSeats?: boolean
    stSeats?: boolean
  }, ExtArgs["result"]["course"]>

  export type CourseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    totalSeats?: boolean
    generalSeats?: boolean
    obcSeats?: boolean
    scSeats?: boolean
    stSeats?: boolean
  }, ExtArgs["result"]["course"]>

  export type CourseSelectScalar = {
    id?: boolean
    name?: boolean
    totalSeats?: boolean
    generalSeats?: boolean
    obcSeats?: boolean
    scSeats?: boolean
    stSeats?: boolean
  }

  export type CourseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "totalSeats" | "generalSeats" | "obcSeats" | "scSeats" | "stSeats", ExtArgs["result"]["course"]>
  export type CourseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    preferences?: boolean | Course$preferencesArgs<ExtArgs>
    allocations?: boolean | Course$allocationsArgs<ExtArgs>
    _count?: boolean | CourseCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CourseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CourseIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CoursePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Course"
    objects: {
      preferences: Prisma.$PreferencePayload<ExtArgs>[]
      allocations: Prisma.$AllocationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      totalSeats: number
      generalSeats: number
      obcSeats: number
      scSeats: number
      stSeats: number
    }, ExtArgs["result"]["course"]>
    composites: {}
  }

  type CourseGetPayload<S extends boolean | null | undefined | CourseDefaultArgs> = $Result.GetResult<Prisma.$CoursePayload, S>

  type CourseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CourseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CourseCountAggregateInputType | true
    }

  export interface CourseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Course'], meta: { name: 'Course' } }
    /**
     * Find zero or one Course that matches the filter.
     * @param {CourseFindUniqueArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CourseFindUniqueArgs>(args: SelectSubset<T, CourseFindUniqueArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Course that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CourseFindUniqueOrThrowArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CourseFindUniqueOrThrowArgs>(args: SelectSubset<T, CourseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Course that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseFindFirstArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CourseFindFirstArgs>(args?: SelectSubset<T, CourseFindFirstArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Course that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseFindFirstOrThrowArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CourseFindFirstOrThrowArgs>(args?: SelectSubset<T, CourseFindFirstOrThrowArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Courses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Courses
     * const courses = await prisma.course.findMany()
     * 
     * // Get first 10 Courses
     * const courses = await prisma.course.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const courseWithIdOnly = await prisma.course.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CourseFindManyArgs>(args?: SelectSubset<T, CourseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Course.
     * @param {CourseCreateArgs} args - Arguments to create a Course.
     * @example
     * // Create one Course
     * const Course = await prisma.course.create({
     *   data: {
     *     // ... data to create a Course
     *   }
     * })
     * 
     */
    create<T extends CourseCreateArgs>(args: SelectSubset<T, CourseCreateArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Courses.
     * @param {CourseCreateManyArgs} args - Arguments to create many Courses.
     * @example
     * // Create many Courses
     * const course = await prisma.course.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CourseCreateManyArgs>(args?: SelectSubset<T, CourseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Courses and returns the data saved in the database.
     * @param {CourseCreateManyAndReturnArgs} args - Arguments to create many Courses.
     * @example
     * // Create many Courses
     * const course = await prisma.course.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Courses and only return the `id`
     * const courseWithIdOnly = await prisma.course.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CourseCreateManyAndReturnArgs>(args?: SelectSubset<T, CourseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Course.
     * @param {CourseDeleteArgs} args - Arguments to delete one Course.
     * @example
     * // Delete one Course
     * const Course = await prisma.course.delete({
     *   where: {
     *     // ... filter to delete one Course
     *   }
     * })
     * 
     */
    delete<T extends CourseDeleteArgs>(args: SelectSubset<T, CourseDeleteArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Course.
     * @param {CourseUpdateArgs} args - Arguments to update one Course.
     * @example
     * // Update one Course
     * const course = await prisma.course.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CourseUpdateArgs>(args: SelectSubset<T, CourseUpdateArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Courses.
     * @param {CourseDeleteManyArgs} args - Arguments to filter Courses to delete.
     * @example
     * // Delete a few Courses
     * const { count } = await prisma.course.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CourseDeleteManyArgs>(args?: SelectSubset<T, CourseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Courses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Courses
     * const course = await prisma.course.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CourseUpdateManyArgs>(args: SelectSubset<T, CourseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Courses and returns the data updated in the database.
     * @param {CourseUpdateManyAndReturnArgs} args - Arguments to update many Courses.
     * @example
     * // Update many Courses
     * const course = await prisma.course.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Courses and only return the `id`
     * const courseWithIdOnly = await prisma.course.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CourseUpdateManyAndReturnArgs>(args: SelectSubset<T, CourseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Course.
     * @param {CourseUpsertArgs} args - Arguments to update or create a Course.
     * @example
     * // Update or create a Course
     * const course = await prisma.course.upsert({
     *   create: {
     *     // ... data to create a Course
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Course we want to update
     *   }
     * })
     */
    upsert<T extends CourseUpsertArgs>(args: SelectSubset<T, CourseUpsertArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Courses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseCountArgs} args - Arguments to filter Courses to count.
     * @example
     * // Count the number of Courses
     * const count = await prisma.course.count({
     *   where: {
     *     // ... the filter for the Courses we want to count
     *   }
     * })
    **/
    count<T extends CourseCountArgs>(
      args?: Subset<T, CourseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CourseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Course.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CourseAggregateArgs>(args: Subset<T, CourseAggregateArgs>): Prisma.PrismaPromise<GetCourseAggregateType<T>>

    /**
     * Group by Course.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CourseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CourseGroupByArgs['orderBy'] }
        : { orderBy?: CourseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CourseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCourseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Course model
   */
  readonly fields: CourseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Course.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CourseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    preferences<T extends Course$preferencesArgs<ExtArgs> = {}>(args?: Subset<T, Course$preferencesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PreferencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    allocations<T extends Course$allocationsArgs<ExtArgs> = {}>(args?: Subset<T, Course$allocationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AllocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Course model
   */
  interface CourseFieldRefs {
    readonly id: FieldRef<"Course", 'String'>
    readonly name: FieldRef<"Course", 'String'>
    readonly totalSeats: FieldRef<"Course", 'Int'>
    readonly generalSeats: FieldRef<"Course", 'Int'>
    readonly obcSeats: FieldRef<"Course", 'Int'>
    readonly scSeats: FieldRef<"Course", 'Int'>
    readonly stSeats: FieldRef<"Course", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Course findUnique
   */
  export type CourseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course findUniqueOrThrow
   */
  export type CourseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course findFirst
   */
  export type CourseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Courses.
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Courses.
     */
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * Course findFirstOrThrow
   */
  export type CourseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Courses.
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Courses.
     */
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * Course findMany
   */
  export type CourseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Courses to fetch.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Courses.
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Courses.
     */
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * Course create
   */
  export type CourseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * The data needed to create a Course.
     */
    data: XOR<CourseCreateInput, CourseUncheckedCreateInput>
  }

  /**
   * Course createMany
   */
  export type CourseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Courses.
     */
    data: CourseCreateManyInput | CourseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Course createManyAndReturn
   */
  export type CourseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * The data used to create many Courses.
     */
    data: CourseCreateManyInput | CourseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Course update
   */
  export type CourseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * The data needed to update a Course.
     */
    data: XOR<CourseUpdateInput, CourseUncheckedUpdateInput>
    /**
     * Choose, which Course to update.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course updateMany
   */
  export type CourseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Courses.
     */
    data: XOR<CourseUpdateManyMutationInput, CourseUncheckedUpdateManyInput>
    /**
     * Filter which Courses to update
     */
    where?: CourseWhereInput
    /**
     * Limit how many Courses to update.
     */
    limit?: number
  }

  /**
   * Course updateManyAndReturn
   */
  export type CourseUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * The data used to update Courses.
     */
    data: XOR<CourseUpdateManyMutationInput, CourseUncheckedUpdateManyInput>
    /**
     * Filter which Courses to update
     */
    where?: CourseWhereInput
    /**
     * Limit how many Courses to update.
     */
    limit?: number
  }

  /**
   * Course upsert
   */
  export type CourseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * The filter to search for the Course to update in case it exists.
     */
    where: CourseWhereUniqueInput
    /**
     * In case the Course found by the `where` argument doesn't exist, create a new Course with this data.
     */
    create: XOR<CourseCreateInput, CourseUncheckedCreateInput>
    /**
     * In case the Course was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CourseUpdateInput, CourseUncheckedUpdateInput>
  }

  /**
   * Course delete
   */
  export type CourseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter which Course to delete.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course deleteMany
   */
  export type CourseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Courses to delete
     */
    where?: CourseWhereInput
    /**
     * Limit how many Courses to delete.
     */
    limit?: number
  }

  /**
   * Course.preferences
   */
  export type Course$preferencesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preference
     */
    select?: PreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Preference
     */
    omit?: PreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreferenceInclude<ExtArgs> | null
    where?: PreferenceWhereInput
    orderBy?: PreferenceOrderByWithRelationInput | PreferenceOrderByWithRelationInput[]
    cursor?: PreferenceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PreferenceScalarFieldEnum | PreferenceScalarFieldEnum[]
  }

  /**
   * Course.allocations
   */
  export type Course$allocationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Allocation
     */
    select?: AllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Allocation
     */
    omit?: AllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AllocationInclude<ExtArgs> | null
    where?: AllocationWhereInput
    orderBy?: AllocationOrderByWithRelationInput | AllocationOrderByWithRelationInput[]
    cursor?: AllocationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AllocationScalarFieldEnum | AllocationScalarFieldEnum[]
  }

  /**
   * Course without action
   */
  export type CourseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
  }


  /**
   * Model Preference
   */

  export type AggregatePreference = {
    _count: PreferenceCountAggregateOutputType | null
    _avg: PreferenceAvgAggregateOutputType | null
    _sum: PreferenceSumAggregateOutputType | null
    _min: PreferenceMinAggregateOutputType | null
    _max: PreferenceMaxAggregateOutputType | null
  }

  export type PreferenceAvgAggregateOutputType = {
    priority: number | null
  }

  export type PreferenceSumAggregateOutputType = {
    priority: number | null
  }

  export type PreferenceMinAggregateOutputType = {
    id: string | null
    studentId: string | null
    courseId: string | null
    priority: number | null
    status: $Enums.PreferenceStatus | null
  }

  export type PreferenceMaxAggregateOutputType = {
    id: string | null
    studentId: string | null
    courseId: string | null
    priority: number | null
    status: $Enums.PreferenceStatus | null
  }

  export type PreferenceCountAggregateOutputType = {
    id: number
    studentId: number
    courseId: number
    priority: number
    status: number
    _all: number
  }


  export type PreferenceAvgAggregateInputType = {
    priority?: true
  }

  export type PreferenceSumAggregateInputType = {
    priority?: true
  }

  export type PreferenceMinAggregateInputType = {
    id?: true
    studentId?: true
    courseId?: true
    priority?: true
    status?: true
  }

  export type PreferenceMaxAggregateInputType = {
    id?: true
    studentId?: true
    courseId?: true
    priority?: true
    status?: true
  }

  export type PreferenceCountAggregateInputType = {
    id?: true
    studentId?: true
    courseId?: true
    priority?: true
    status?: true
    _all?: true
  }

  export type PreferenceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Preference to aggregate.
     */
    where?: PreferenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Preferences to fetch.
     */
    orderBy?: PreferenceOrderByWithRelationInput | PreferenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PreferenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Preferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Preferences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Preferences
    **/
    _count?: true | PreferenceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PreferenceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PreferenceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PreferenceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PreferenceMaxAggregateInputType
  }

  export type GetPreferenceAggregateType<T extends PreferenceAggregateArgs> = {
        [P in keyof T & keyof AggregatePreference]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePreference[P]>
      : GetScalarType<T[P], AggregatePreference[P]>
  }




  export type PreferenceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PreferenceWhereInput
    orderBy?: PreferenceOrderByWithAggregationInput | PreferenceOrderByWithAggregationInput[]
    by: PreferenceScalarFieldEnum[] | PreferenceScalarFieldEnum
    having?: PreferenceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PreferenceCountAggregateInputType | true
    _avg?: PreferenceAvgAggregateInputType
    _sum?: PreferenceSumAggregateInputType
    _min?: PreferenceMinAggregateInputType
    _max?: PreferenceMaxAggregateInputType
  }

  export type PreferenceGroupByOutputType = {
    id: string
    studentId: string
    courseId: string
    priority: number
    status: $Enums.PreferenceStatus
    _count: PreferenceCountAggregateOutputType | null
    _avg: PreferenceAvgAggregateOutputType | null
    _sum: PreferenceSumAggregateOutputType | null
    _min: PreferenceMinAggregateOutputType | null
    _max: PreferenceMaxAggregateOutputType | null
  }

  type GetPreferenceGroupByPayload<T extends PreferenceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PreferenceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PreferenceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PreferenceGroupByOutputType[P]>
            : GetScalarType<T[P], PreferenceGroupByOutputType[P]>
        }
      >
    >


  export type PreferenceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    courseId?: boolean
    priority?: boolean
    status?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
    course?: boolean | CourseDefaultArgs<ExtArgs>
    allocation?: boolean | Preference$allocationArgs<ExtArgs>
  }, ExtArgs["result"]["preference"]>

  export type PreferenceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    courseId?: boolean
    priority?: boolean
    status?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["preference"]>

  export type PreferenceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    courseId?: boolean
    priority?: boolean
    status?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["preference"]>

  export type PreferenceSelectScalar = {
    id?: boolean
    studentId?: boolean
    courseId?: boolean
    priority?: boolean
    status?: boolean
  }

  export type PreferenceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "studentId" | "courseId" | "priority" | "status", ExtArgs["result"]["preference"]>
  export type PreferenceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
    course?: boolean | CourseDefaultArgs<ExtArgs>
    allocation?: boolean | Preference$allocationArgs<ExtArgs>
  }
  export type PreferenceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }
  export type PreferenceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
    course?: boolean | CourseDefaultArgs<ExtArgs>
  }

  export type $PreferencePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Preference"
    objects: {
      student: Prisma.$StudentPayload<ExtArgs>
      course: Prisma.$CoursePayload<ExtArgs>
      allocation: Prisma.$AllocationPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      studentId: string
      courseId: string
      priority: number
      status: $Enums.PreferenceStatus
    }, ExtArgs["result"]["preference"]>
    composites: {}
  }

  type PreferenceGetPayload<S extends boolean | null | undefined | PreferenceDefaultArgs> = $Result.GetResult<Prisma.$PreferencePayload, S>

  type PreferenceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PreferenceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PreferenceCountAggregateInputType | true
    }

  export interface PreferenceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Preference'], meta: { name: 'Preference' } }
    /**
     * Find zero or one Preference that matches the filter.
     * @param {PreferenceFindUniqueArgs} args - Arguments to find a Preference
     * @example
     * // Get one Preference
     * const preference = await prisma.preference.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PreferenceFindUniqueArgs>(args: SelectSubset<T, PreferenceFindUniqueArgs<ExtArgs>>): Prisma__PreferenceClient<$Result.GetResult<Prisma.$PreferencePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Preference that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PreferenceFindUniqueOrThrowArgs} args - Arguments to find a Preference
     * @example
     * // Get one Preference
     * const preference = await prisma.preference.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PreferenceFindUniqueOrThrowArgs>(args: SelectSubset<T, PreferenceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PreferenceClient<$Result.GetResult<Prisma.$PreferencePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Preference that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreferenceFindFirstArgs} args - Arguments to find a Preference
     * @example
     * // Get one Preference
     * const preference = await prisma.preference.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PreferenceFindFirstArgs>(args?: SelectSubset<T, PreferenceFindFirstArgs<ExtArgs>>): Prisma__PreferenceClient<$Result.GetResult<Prisma.$PreferencePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Preference that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreferenceFindFirstOrThrowArgs} args - Arguments to find a Preference
     * @example
     * // Get one Preference
     * const preference = await prisma.preference.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PreferenceFindFirstOrThrowArgs>(args?: SelectSubset<T, PreferenceFindFirstOrThrowArgs<ExtArgs>>): Prisma__PreferenceClient<$Result.GetResult<Prisma.$PreferencePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Preferences that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreferenceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Preferences
     * const preferences = await prisma.preference.findMany()
     * 
     * // Get first 10 Preferences
     * const preferences = await prisma.preference.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const preferenceWithIdOnly = await prisma.preference.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PreferenceFindManyArgs>(args?: SelectSubset<T, PreferenceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PreferencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Preference.
     * @param {PreferenceCreateArgs} args - Arguments to create a Preference.
     * @example
     * // Create one Preference
     * const Preference = await prisma.preference.create({
     *   data: {
     *     // ... data to create a Preference
     *   }
     * })
     * 
     */
    create<T extends PreferenceCreateArgs>(args: SelectSubset<T, PreferenceCreateArgs<ExtArgs>>): Prisma__PreferenceClient<$Result.GetResult<Prisma.$PreferencePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Preferences.
     * @param {PreferenceCreateManyArgs} args - Arguments to create many Preferences.
     * @example
     * // Create many Preferences
     * const preference = await prisma.preference.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PreferenceCreateManyArgs>(args?: SelectSubset<T, PreferenceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Preferences and returns the data saved in the database.
     * @param {PreferenceCreateManyAndReturnArgs} args - Arguments to create many Preferences.
     * @example
     * // Create many Preferences
     * const preference = await prisma.preference.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Preferences and only return the `id`
     * const preferenceWithIdOnly = await prisma.preference.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PreferenceCreateManyAndReturnArgs>(args?: SelectSubset<T, PreferenceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PreferencePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Preference.
     * @param {PreferenceDeleteArgs} args - Arguments to delete one Preference.
     * @example
     * // Delete one Preference
     * const Preference = await prisma.preference.delete({
     *   where: {
     *     // ... filter to delete one Preference
     *   }
     * })
     * 
     */
    delete<T extends PreferenceDeleteArgs>(args: SelectSubset<T, PreferenceDeleteArgs<ExtArgs>>): Prisma__PreferenceClient<$Result.GetResult<Prisma.$PreferencePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Preference.
     * @param {PreferenceUpdateArgs} args - Arguments to update one Preference.
     * @example
     * // Update one Preference
     * const preference = await prisma.preference.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PreferenceUpdateArgs>(args: SelectSubset<T, PreferenceUpdateArgs<ExtArgs>>): Prisma__PreferenceClient<$Result.GetResult<Prisma.$PreferencePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Preferences.
     * @param {PreferenceDeleteManyArgs} args - Arguments to filter Preferences to delete.
     * @example
     * // Delete a few Preferences
     * const { count } = await prisma.preference.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PreferenceDeleteManyArgs>(args?: SelectSubset<T, PreferenceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Preferences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreferenceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Preferences
     * const preference = await prisma.preference.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PreferenceUpdateManyArgs>(args: SelectSubset<T, PreferenceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Preferences and returns the data updated in the database.
     * @param {PreferenceUpdateManyAndReturnArgs} args - Arguments to update many Preferences.
     * @example
     * // Update many Preferences
     * const preference = await prisma.preference.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Preferences and only return the `id`
     * const preferenceWithIdOnly = await prisma.preference.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PreferenceUpdateManyAndReturnArgs>(args: SelectSubset<T, PreferenceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PreferencePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Preference.
     * @param {PreferenceUpsertArgs} args - Arguments to update or create a Preference.
     * @example
     * // Update or create a Preference
     * const preference = await prisma.preference.upsert({
     *   create: {
     *     // ... data to create a Preference
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Preference we want to update
     *   }
     * })
     */
    upsert<T extends PreferenceUpsertArgs>(args: SelectSubset<T, PreferenceUpsertArgs<ExtArgs>>): Prisma__PreferenceClient<$Result.GetResult<Prisma.$PreferencePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Preferences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreferenceCountArgs} args - Arguments to filter Preferences to count.
     * @example
     * // Count the number of Preferences
     * const count = await prisma.preference.count({
     *   where: {
     *     // ... the filter for the Preferences we want to count
     *   }
     * })
    **/
    count<T extends PreferenceCountArgs>(
      args?: Subset<T, PreferenceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PreferenceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Preference.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreferenceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PreferenceAggregateArgs>(args: Subset<T, PreferenceAggregateArgs>): Prisma.PrismaPromise<GetPreferenceAggregateType<T>>

    /**
     * Group by Preference.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreferenceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PreferenceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PreferenceGroupByArgs['orderBy'] }
        : { orderBy?: PreferenceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PreferenceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPreferenceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Preference model
   */
  readonly fields: PreferenceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Preference.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PreferenceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    student<T extends StudentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StudentDefaultArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    course<T extends CourseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CourseDefaultArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    allocation<T extends Preference$allocationArgs<ExtArgs> = {}>(args?: Subset<T, Preference$allocationArgs<ExtArgs>>): Prisma__AllocationClient<$Result.GetResult<Prisma.$AllocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Preference model
   */
  interface PreferenceFieldRefs {
    readonly id: FieldRef<"Preference", 'String'>
    readonly studentId: FieldRef<"Preference", 'String'>
    readonly courseId: FieldRef<"Preference", 'String'>
    readonly priority: FieldRef<"Preference", 'Int'>
    readonly status: FieldRef<"Preference", 'PreferenceStatus'>
  }
    

  // Custom InputTypes
  /**
   * Preference findUnique
   */
  export type PreferenceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preference
     */
    select?: PreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Preference
     */
    omit?: PreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreferenceInclude<ExtArgs> | null
    /**
     * Filter, which Preference to fetch.
     */
    where: PreferenceWhereUniqueInput
  }

  /**
   * Preference findUniqueOrThrow
   */
  export type PreferenceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preference
     */
    select?: PreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Preference
     */
    omit?: PreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreferenceInclude<ExtArgs> | null
    /**
     * Filter, which Preference to fetch.
     */
    where: PreferenceWhereUniqueInput
  }

  /**
   * Preference findFirst
   */
  export type PreferenceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preference
     */
    select?: PreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Preference
     */
    omit?: PreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreferenceInclude<ExtArgs> | null
    /**
     * Filter, which Preference to fetch.
     */
    where?: PreferenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Preferences to fetch.
     */
    orderBy?: PreferenceOrderByWithRelationInput | PreferenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Preferences.
     */
    cursor?: PreferenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Preferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Preferences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Preferences.
     */
    distinct?: PreferenceScalarFieldEnum | PreferenceScalarFieldEnum[]
  }

  /**
   * Preference findFirstOrThrow
   */
  export type PreferenceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preference
     */
    select?: PreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Preference
     */
    omit?: PreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreferenceInclude<ExtArgs> | null
    /**
     * Filter, which Preference to fetch.
     */
    where?: PreferenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Preferences to fetch.
     */
    orderBy?: PreferenceOrderByWithRelationInput | PreferenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Preferences.
     */
    cursor?: PreferenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Preferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Preferences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Preferences.
     */
    distinct?: PreferenceScalarFieldEnum | PreferenceScalarFieldEnum[]
  }

  /**
   * Preference findMany
   */
  export type PreferenceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preference
     */
    select?: PreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Preference
     */
    omit?: PreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreferenceInclude<ExtArgs> | null
    /**
     * Filter, which Preferences to fetch.
     */
    where?: PreferenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Preferences to fetch.
     */
    orderBy?: PreferenceOrderByWithRelationInput | PreferenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Preferences.
     */
    cursor?: PreferenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Preferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Preferences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Preferences.
     */
    distinct?: PreferenceScalarFieldEnum | PreferenceScalarFieldEnum[]
  }

  /**
   * Preference create
   */
  export type PreferenceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preference
     */
    select?: PreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Preference
     */
    omit?: PreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreferenceInclude<ExtArgs> | null
    /**
     * The data needed to create a Preference.
     */
    data: XOR<PreferenceCreateInput, PreferenceUncheckedCreateInput>
  }

  /**
   * Preference createMany
   */
  export type PreferenceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Preferences.
     */
    data: PreferenceCreateManyInput | PreferenceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Preference createManyAndReturn
   */
  export type PreferenceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preference
     */
    select?: PreferenceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Preference
     */
    omit?: PreferenceOmit<ExtArgs> | null
    /**
     * The data used to create many Preferences.
     */
    data: PreferenceCreateManyInput | PreferenceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreferenceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Preference update
   */
  export type PreferenceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preference
     */
    select?: PreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Preference
     */
    omit?: PreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreferenceInclude<ExtArgs> | null
    /**
     * The data needed to update a Preference.
     */
    data: XOR<PreferenceUpdateInput, PreferenceUncheckedUpdateInput>
    /**
     * Choose, which Preference to update.
     */
    where: PreferenceWhereUniqueInput
  }

  /**
   * Preference updateMany
   */
  export type PreferenceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Preferences.
     */
    data: XOR<PreferenceUpdateManyMutationInput, PreferenceUncheckedUpdateManyInput>
    /**
     * Filter which Preferences to update
     */
    where?: PreferenceWhereInput
    /**
     * Limit how many Preferences to update.
     */
    limit?: number
  }

  /**
   * Preference updateManyAndReturn
   */
  export type PreferenceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preference
     */
    select?: PreferenceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Preference
     */
    omit?: PreferenceOmit<ExtArgs> | null
    /**
     * The data used to update Preferences.
     */
    data: XOR<PreferenceUpdateManyMutationInput, PreferenceUncheckedUpdateManyInput>
    /**
     * Filter which Preferences to update
     */
    where?: PreferenceWhereInput
    /**
     * Limit how many Preferences to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreferenceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Preference upsert
   */
  export type PreferenceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preference
     */
    select?: PreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Preference
     */
    omit?: PreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreferenceInclude<ExtArgs> | null
    /**
     * The filter to search for the Preference to update in case it exists.
     */
    where: PreferenceWhereUniqueInput
    /**
     * In case the Preference found by the `where` argument doesn't exist, create a new Preference with this data.
     */
    create: XOR<PreferenceCreateInput, PreferenceUncheckedCreateInput>
    /**
     * In case the Preference was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PreferenceUpdateInput, PreferenceUncheckedUpdateInput>
  }

  /**
   * Preference delete
   */
  export type PreferenceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preference
     */
    select?: PreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Preference
     */
    omit?: PreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreferenceInclude<ExtArgs> | null
    /**
     * Filter which Preference to delete.
     */
    where: PreferenceWhereUniqueInput
  }

  /**
   * Preference deleteMany
   */
  export type PreferenceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Preferences to delete
     */
    where?: PreferenceWhereInput
    /**
     * Limit how many Preferences to delete.
     */
    limit?: number
  }

  /**
   * Preference.allocation
   */
  export type Preference$allocationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Allocation
     */
    select?: AllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Allocation
     */
    omit?: AllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AllocationInclude<ExtArgs> | null
    where?: AllocationWhereInput
  }

  /**
   * Preference without action
   */
  export type PreferenceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preference
     */
    select?: PreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Preference
     */
    omit?: PreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreferenceInclude<ExtArgs> | null
  }


  /**
   * Model Allocation
   */

  export type AggregateAllocation = {
    _count: AllocationCountAggregateOutputType | null
    _min: AllocationMinAggregateOutputType | null
    _max: AllocationMaxAggregateOutputType | null
  }

  export type AllocationMinAggregateOutputType = {
    id: string | null
    studentId: string | null
    courseId: string | null
    preferenceId: string | null
    allocatedCategory: $Enums.Category | null
    allocationDate: Date | null
  }

  export type AllocationMaxAggregateOutputType = {
    id: string | null
    studentId: string | null
    courseId: string | null
    preferenceId: string | null
    allocatedCategory: $Enums.Category | null
    allocationDate: Date | null
  }

  export type AllocationCountAggregateOutputType = {
    id: number
    studentId: number
    courseId: number
    preferenceId: number
    allocatedCategory: number
    allocationDate: number
    _all: number
  }


  export type AllocationMinAggregateInputType = {
    id?: true
    studentId?: true
    courseId?: true
    preferenceId?: true
    allocatedCategory?: true
    allocationDate?: true
  }

  export type AllocationMaxAggregateInputType = {
    id?: true
    studentId?: true
    courseId?: true
    preferenceId?: true
    allocatedCategory?: true
    allocationDate?: true
  }

  export type AllocationCountAggregateInputType = {
    id?: true
    studentId?: true
    courseId?: true
    preferenceId?: true
    allocatedCategory?: true
    allocationDate?: true
    _all?: true
  }

  export type AllocationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Allocation to aggregate.
     */
    where?: AllocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Allocations to fetch.
     */
    orderBy?: AllocationOrderByWithRelationInput | AllocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AllocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Allocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Allocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Allocations
    **/
    _count?: true | AllocationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AllocationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AllocationMaxAggregateInputType
  }

  export type GetAllocationAggregateType<T extends AllocationAggregateArgs> = {
        [P in keyof T & keyof AggregateAllocation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAllocation[P]>
      : GetScalarType<T[P], AggregateAllocation[P]>
  }




  export type AllocationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AllocationWhereInput
    orderBy?: AllocationOrderByWithAggregationInput | AllocationOrderByWithAggregationInput[]
    by: AllocationScalarFieldEnum[] | AllocationScalarFieldEnum
    having?: AllocationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AllocationCountAggregateInputType | true
    _min?: AllocationMinAggregateInputType
    _max?: AllocationMaxAggregateInputType
  }

  export type AllocationGroupByOutputType = {
    id: string
    studentId: string
    courseId: string
    preferenceId: string
    allocatedCategory: $Enums.Category
    allocationDate: Date
    _count: AllocationCountAggregateOutputType | null
    _min: AllocationMinAggregateOutputType | null
    _max: AllocationMaxAggregateOutputType | null
  }

  type GetAllocationGroupByPayload<T extends AllocationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AllocationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AllocationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AllocationGroupByOutputType[P]>
            : GetScalarType<T[P], AllocationGroupByOutputType[P]>
        }
      >
    >


  export type AllocationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    courseId?: boolean
    preferenceId?: boolean
    allocatedCategory?: boolean
    allocationDate?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
    course?: boolean | CourseDefaultArgs<ExtArgs>
    preference?: boolean | PreferenceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["allocation"]>

  export type AllocationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    courseId?: boolean
    preferenceId?: boolean
    allocatedCategory?: boolean
    allocationDate?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
    course?: boolean | CourseDefaultArgs<ExtArgs>
    preference?: boolean | PreferenceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["allocation"]>

  export type AllocationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    courseId?: boolean
    preferenceId?: boolean
    allocatedCategory?: boolean
    allocationDate?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
    course?: boolean | CourseDefaultArgs<ExtArgs>
    preference?: boolean | PreferenceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["allocation"]>

  export type AllocationSelectScalar = {
    id?: boolean
    studentId?: boolean
    courseId?: boolean
    preferenceId?: boolean
    allocatedCategory?: boolean
    allocationDate?: boolean
  }

  export type AllocationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "studentId" | "courseId" | "preferenceId" | "allocatedCategory" | "allocationDate", ExtArgs["result"]["allocation"]>
  export type AllocationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
    course?: boolean | CourseDefaultArgs<ExtArgs>
    preference?: boolean | PreferenceDefaultArgs<ExtArgs>
  }
  export type AllocationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
    course?: boolean | CourseDefaultArgs<ExtArgs>
    preference?: boolean | PreferenceDefaultArgs<ExtArgs>
  }
  export type AllocationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
    course?: boolean | CourseDefaultArgs<ExtArgs>
    preference?: boolean | PreferenceDefaultArgs<ExtArgs>
  }

  export type $AllocationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Allocation"
    objects: {
      student: Prisma.$StudentPayload<ExtArgs>
      course: Prisma.$CoursePayload<ExtArgs>
      preference: Prisma.$PreferencePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      studentId: string
      courseId: string
      preferenceId: string
      allocatedCategory: $Enums.Category
      allocationDate: Date
    }, ExtArgs["result"]["allocation"]>
    composites: {}
  }

  type AllocationGetPayload<S extends boolean | null | undefined | AllocationDefaultArgs> = $Result.GetResult<Prisma.$AllocationPayload, S>

  type AllocationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AllocationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AllocationCountAggregateInputType | true
    }

  export interface AllocationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Allocation'], meta: { name: 'Allocation' } }
    /**
     * Find zero or one Allocation that matches the filter.
     * @param {AllocationFindUniqueArgs} args - Arguments to find a Allocation
     * @example
     * // Get one Allocation
     * const allocation = await prisma.allocation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AllocationFindUniqueArgs>(args: SelectSubset<T, AllocationFindUniqueArgs<ExtArgs>>): Prisma__AllocationClient<$Result.GetResult<Prisma.$AllocationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Allocation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AllocationFindUniqueOrThrowArgs} args - Arguments to find a Allocation
     * @example
     * // Get one Allocation
     * const allocation = await prisma.allocation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AllocationFindUniqueOrThrowArgs>(args: SelectSubset<T, AllocationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AllocationClient<$Result.GetResult<Prisma.$AllocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Allocation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AllocationFindFirstArgs} args - Arguments to find a Allocation
     * @example
     * // Get one Allocation
     * const allocation = await prisma.allocation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AllocationFindFirstArgs>(args?: SelectSubset<T, AllocationFindFirstArgs<ExtArgs>>): Prisma__AllocationClient<$Result.GetResult<Prisma.$AllocationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Allocation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AllocationFindFirstOrThrowArgs} args - Arguments to find a Allocation
     * @example
     * // Get one Allocation
     * const allocation = await prisma.allocation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AllocationFindFirstOrThrowArgs>(args?: SelectSubset<T, AllocationFindFirstOrThrowArgs<ExtArgs>>): Prisma__AllocationClient<$Result.GetResult<Prisma.$AllocationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Allocations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AllocationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Allocations
     * const allocations = await prisma.allocation.findMany()
     * 
     * // Get first 10 Allocations
     * const allocations = await prisma.allocation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const allocationWithIdOnly = await prisma.allocation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AllocationFindManyArgs>(args?: SelectSubset<T, AllocationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AllocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Allocation.
     * @param {AllocationCreateArgs} args - Arguments to create a Allocation.
     * @example
     * // Create one Allocation
     * const Allocation = await prisma.allocation.create({
     *   data: {
     *     // ... data to create a Allocation
     *   }
     * })
     * 
     */
    create<T extends AllocationCreateArgs>(args: SelectSubset<T, AllocationCreateArgs<ExtArgs>>): Prisma__AllocationClient<$Result.GetResult<Prisma.$AllocationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Allocations.
     * @param {AllocationCreateManyArgs} args - Arguments to create many Allocations.
     * @example
     * // Create many Allocations
     * const allocation = await prisma.allocation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AllocationCreateManyArgs>(args?: SelectSubset<T, AllocationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Allocations and returns the data saved in the database.
     * @param {AllocationCreateManyAndReturnArgs} args - Arguments to create many Allocations.
     * @example
     * // Create many Allocations
     * const allocation = await prisma.allocation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Allocations and only return the `id`
     * const allocationWithIdOnly = await prisma.allocation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AllocationCreateManyAndReturnArgs>(args?: SelectSubset<T, AllocationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AllocationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Allocation.
     * @param {AllocationDeleteArgs} args - Arguments to delete one Allocation.
     * @example
     * // Delete one Allocation
     * const Allocation = await prisma.allocation.delete({
     *   where: {
     *     // ... filter to delete one Allocation
     *   }
     * })
     * 
     */
    delete<T extends AllocationDeleteArgs>(args: SelectSubset<T, AllocationDeleteArgs<ExtArgs>>): Prisma__AllocationClient<$Result.GetResult<Prisma.$AllocationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Allocation.
     * @param {AllocationUpdateArgs} args - Arguments to update one Allocation.
     * @example
     * // Update one Allocation
     * const allocation = await prisma.allocation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AllocationUpdateArgs>(args: SelectSubset<T, AllocationUpdateArgs<ExtArgs>>): Prisma__AllocationClient<$Result.GetResult<Prisma.$AllocationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Allocations.
     * @param {AllocationDeleteManyArgs} args - Arguments to filter Allocations to delete.
     * @example
     * // Delete a few Allocations
     * const { count } = await prisma.allocation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AllocationDeleteManyArgs>(args?: SelectSubset<T, AllocationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Allocations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AllocationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Allocations
     * const allocation = await prisma.allocation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AllocationUpdateManyArgs>(args: SelectSubset<T, AllocationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Allocations and returns the data updated in the database.
     * @param {AllocationUpdateManyAndReturnArgs} args - Arguments to update many Allocations.
     * @example
     * // Update many Allocations
     * const allocation = await prisma.allocation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Allocations and only return the `id`
     * const allocationWithIdOnly = await prisma.allocation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AllocationUpdateManyAndReturnArgs>(args: SelectSubset<T, AllocationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AllocationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Allocation.
     * @param {AllocationUpsertArgs} args - Arguments to update or create a Allocation.
     * @example
     * // Update or create a Allocation
     * const allocation = await prisma.allocation.upsert({
     *   create: {
     *     // ... data to create a Allocation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Allocation we want to update
     *   }
     * })
     */
    upsert<T extends AllocationUpsertArgs>(args: SelectSubset<T, AllocationUpsertArgs<ExtArgs>>): Prisma__AllocationClient<$Result.GetResult<Prisma.$AllocationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Allocations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AllocationCountArgs} args - Arguments to filter Allocations to count.
     * @example
     * // Count the number of Allocations
     * const count = await prisma.allocation.count({
     *   where: {
     *     // ... the filter for the Allocations we want to count
     *   }
     * })
    **/
    count<T extends AllocationCountArgs>(
      args?: Subset<T, AllocationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AllocationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Allocation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AllocationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AllocationAggregateArgs>(args: Subset<T, AllocationAggregateArgs>): Prisma.PrismaPromise<GetAllocationAggregateType<T>>

    /**
     * Group by Allocation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AllocationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AllocationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AllocationGroupByArgs['orderBy'] }
        : { orderBy?: AllocationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AllocationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAllocationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Allocation model
   */
  readonly fields: AllocationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Allocation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AllocationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    student<T extends StudentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StudentDefaultArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    course<T extends CourseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CourseDefaultArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    preference<T extends PreferenceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PreferenceDefaultArgs<ExtArgs>>): Prisma__PreferenceClient<$Result.GetResult<Prisma.$PreferencePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Allocation model
   */
  interface AllocationFieldRefs {
    readonly id: FieldRef<"Allocation", 'String'>
    readonly studentId: FieldRef<"Allocation", 'String'>
    readonly courseId: FieldRef<"Allocation", 'String'>
    readonly preferenceId: FieldRef<"Allocation", 'String'>
    readonly allocatedCategory: FieldRef<"Allocation", 'Category'>
    readonly allocationDate: FieldRef<"Allocation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Allocation findUnique
   */
  export type AllocationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Allocation
     */
    select?: AllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Allocation
     */
    omit?: AllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AllocationInclude<ExtArgs> | null
    /**
     * Filter, which Allocation to fetch.
     */
    where: AllocationWhereUniqueInput
  }

  /**
   * Allocation findUniqueOrThrow
   */
  export type AllocationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Allocation
     */
    select?: AllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Allocation
     */
    omit?: AllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AllocationInclude<ExtArgs> | null
    /**
     * Filter, which Allocation to fetch.
     */
    where: AllocationWhereUniqueInput
  }

  /**
   * Allocation findFirst
   */
  export type AllocationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Allocation
     */
    select?: AllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Allocation
     */
    omit?: AllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AllocationInclude<ExtArgs> | null
    /**
     * Filter, which Allocation to fetch.
     */
    where?: AllocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Allocations to fetch.
     */
    orderBy?: AllocationOrderByWithRelationInput | AllocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Allocations.
     */
    cursor?: AllocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Allocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Allocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Allocations.
     */
    distinct?: AllocationScalarFieldEnum | AllocationScalarFieldEnum[]
  }

  /**
   * Allocation findFirstOrThrow
   */
  export type AllocationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Allocation
     */
    select?: AllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Allocation
     */
    omit?: AllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AllocationInclude<ExtArgs> | null
    /**
     * Filter, which Allocation to fetch.
     */
    where?: AllocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Allocations to fetch.
     */
    orderBy?: AllocationOrderByWithRelationInput | AllocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Allocations.
     */
    cursor?: AllocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Allocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Allocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Allocations.
     */
    distinct?: AllocationScalarFieldEnum | AllocationScalarFieldEnum[]
  }

  /**
   * Allocation findMany
   */
  export type AllocationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Allocation
     */
    select?: AllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Allocation
     */
    omit?: AllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AllocationInclude<ExtArgs> | null
    /**
     * Filter, which Allocations to fetch.
     */
    where?: AllocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Allocations to fetch.
     */
    orderBy?: AllocationOrderByWithRelationInput | AllocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Allocations.
     */
    cursor?: AllocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Allocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Allocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Allocations.
     */
    distinct?: AllocationScalarFieldEnum | AllocationScalarFieldEnum[]
  }

  /**
   * Allocation create
   */
  export type AllocationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Allocation
     */
    select?: AllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Allocation
     */
    omit?: AllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AllocationInclude<ExtArgs> | null
    /**
     * The data needed to create a Allocation.
     */
    data: XOR<AllocationCreateInput, AllocationUncheckedCreateInput>
  }

  /**
   * Allocation createMany
   */
  export type AllocationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Allocations.
     */
    data: AllocationCreateManyInput | AllocationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Allocation createManyAndReturn
   */
  export type AllocationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Allocation
     */
    select?: AllocationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Allocation
     */
    omit?: AllocationOmit<ExtArgs> | null
    /**
     * The data used to create many Allocations.
     */
    data: AllocationCreateManyInput | AllocationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AllocationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Allocation update
   */
  export type AllocationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Allocation
     */
    select?: AllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Allocation
     */
    omit?: AllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AllocationInclude<ExtArgs> | null
    /**
     * The data needed to update a Allocation.
     */
    data: XOR<AllocationUpdateInput, AllocationUncheckedUpdateInput>
    /**
     * Choose, which Allocation to update.
     */
    where: AllocationWhereUniqueInput
  }

  /**
   * Allocation updateMany
   */
  export type AllocationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Allocations.
     */
    data: XOR<AllocationUpdateManyMutationInput, AllocationUncheckedUpdateManyInput>
    /**
     * Filter which Allocations to update
     */
    where?: AllocationWhereInput
    /**
     * Limit how many Allocations to update.
     */
    limit?: number
  }

  /**
   * Allocation updateManyAndReturn
   */
  export type AllocationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Allocation
     */
    select?: AllocationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Allocation
     */
    omit?: AllocationOmit<ExtArgs> | null
    /**
     * The data used to update Allocations.
     */
    data: XOR<AllocationUpdateManyMutationInput, AllocationUncheckedUpdateManyInput>
    /**
     * Filter which Allocations to update
     */
    where?: AllocationWhereInput
    /**
     * Limit how many Allocations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AllocationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Allocation upsert
   */
  export type AllocationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Allocation
     */
    select?: AllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Allocation
     */
    omit?: AllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AllocationInclude<ExtArgs> | null
    /**
     * The filter to search for the Allocation to update in case it exists.
     */
    where: AllocationWhereUniqueInput
    /**
     * In case the Allocation found by the `where` argument doesn't exist, create a new Allocation with this data.
     */
    create: XOR<AllocationCreateInput, AllocationUncheckedCreateInput>
    /**
     * In case the Allocation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AllocationUpdateInput, AllocationUncheckedUpdateInput>
  }

  /**
   * Allocation delete
   */
  export type AllocationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Allocation
     */
    select?: AllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Allocation
     */
    omit?: AllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AllocationInclude<ExtArgs> | null
    /**
     * Filter which Allocation to delete.
     */
    where: AllocationWhereUniqueInput
  }

  /**
   * Allocation deleteMany
   */
  export type AllocationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Allocations to delete
     */
    where?: AllocationWhereInput
    /**
     * Limit how many Allocations to delete.
     */
    limit?: number
  }

  /**
   * Allocation without action
   */
  export type AllocationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Allocation
     */
    select?: AllocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Allocation
     */
    omit?: AllocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AllocationInclude<ExtArgs> | null
  }


  /**
   * Model AISession
   */

  export type AggregateAISession = {
    _count: AISessionCountAggregateOutputType | null
    _min: AISessionMinAggregateOutputType | null
    _max: AISessionMaxAggregateOutputType | null
  }

  export type AISessionMinAggregateOutputType = {
    id: string | null
    query: string | null
    response: string | null
    createdAt: Date | null
  }

  export type AISessionMaxAggregateOutputType = {
    id: string | null
    query: string | null
    response: string | null
    createdAt: Date | null
  }

  export type AISessionCountAggregateOutputType = {
    id: number
    query: number
    response: number
    createdAt: number
    _all: number
  }


  export type AISessionMinAggregateInputType = {
    id?: true
    query?: true
    response?: true
    createdAt?: true
  }

  export type AISessionMaxAggregateInputType = {
    id?: true
    query?: true
    response?: true
    createdAt?: true
  }

  export type AISessionCountAggregateInputType = {
    id?: true
    query?: true
    response?: true
    createdAt?: true
    _all?: true
  }

  export type AISessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AISession to aggregate.
     */
    where?: AISessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AISessions to fetch.
     */
    orderBy?: AISessionOrderByWithRelationInput | AISessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AISessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AISessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AISessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AISessions
    **/
    _count?: true | AISessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AISessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AISessionMaxAggregateInputType
  }

  export type GetAISessionAggregateType<T extends AISessionAggregateArgs> = {
        [P in keyof T & keyof AggregateAISession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAISession[P]>
      : GetScalarType<T[P], AggregateAISession[P]>
  }




  export type AISessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AISessionWhereInput
    orderBy?: AISessionOrderByWithAggregationInput | AISessionOrderByWithAggregationInput[]
    by: AISessionScalarFieldEnum[] | AISessionScalarFieldEnum
    having?: AISessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AISessionCountAggregateInputType | true
    _min?: AISessionMinAggregateInputType
    _max?: AISessionMaxAggregateInputType
  }

  export type AISessionGroupByOutputType = {
    id: string
    query: string
    response: string
    createdAt: Date
    _count: AISessionCountAggregateOutputType | null
    _min: AISessionMinAggregateOutputType | null
    _max: AISessionMaxAggregateOutputType | null
  }

  type GetAISessionGroupByPayload<T extends AISessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AISessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AISessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AISessionGroupByOutputType[P]>
            : GetScalarType<T[P], AISessionGroupByOutputType[P]>
        }
      >
    >


  export type AISessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    query?: boolean
    response?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["aISession"]>

  export type AISessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    query?: boolean
    response?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["aISession"]>

  export type AISessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    query?: boolean
    response?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["aISession"]>

  export type AISessionSelectScalar = {
    id?: boolean
    query?: boolean
    response?: boolean
    createdAt?: boolean
  }

  export type AISessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "query" | "response" | "createdAt", ExtArgs["result"]["aISession"]>

  export type $AISessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AISession"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      query: string
      response: string
      createdAt: Date
    }, ExtArgs["result"]["aISession"]>
    composites: {}
  }

  type AISessionGetPayload<S extends boolean | null | undefined | AISessionDefaultArgs> = $Result.GetResult<Prisma.$AISessionPayload, S>

  type AISessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AISessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AISessionCountAggregateInputType | true
    }

  export interface AISessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AISession'], meta: { name: 'AISession' } }
    /**
     * Find zero or one AISession that matches the filter.
     * @param {AISessionFindUniqueArgs} args - Arguments to find a AISession
     * @example
     * // Get one AISession
     * const aISession = await prisma.aISession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AISessionFindUniqueArgs>(args: SelectSubset<T, AISessionFindUniqueArgs<ExtArgs>>): Prisma__AISessionClient<$Result.GetResult<Prisma.$AISessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AISession that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AISessionFindUniqueOrThrowArgs} args - Arguments to find a AISession
     * @example
     * // Get one AISession
     * const aISession = await prisma.aISession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AISessionFindUniqueOrThrowArgs>(args: SelectSubset<T, AISessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AISessionClient<$Result.GetResult<Prisma.$AISessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AISession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AISessionFindFirstArgs} args - Arguments to find a AISession
     * @example
     * // Get one AISession
     * const aISession = await prisma.aISession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AISessionFindFirstArgs>(args?: SelectSubset<T, AISessionFindFirstArgs<ExtArgs>>): Prisma__AISessionClient<$Result.GetResult<Prisma.$AISessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AISession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AISessionFindFirstOrThrowArgs} args - Arguments to find a AISession
     * @example
     * // Get one AISession
     * const aISession = await prisma.aISession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AISessionFindFirstOrThrowArgs>(args?: SelectSubset<T, AISessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__AISessionClient<$Result.GetResult<Prisma.$AISessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AISessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AISessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AISessions
     * const aISessions = await prisma.aISession.findMany()
     * 
     * // Get first 10 AISessions
     * const aISessions = await prisma.aISession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aISessionWithIdOnly = await prisma.aISession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AISessionFindManyArgs>(args?: SelectSubset<T, AISessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AISessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AISession.
     * @param {AISessionCreateArgs} args - Arguments to create a AISession.
     * @example
     * // Create one AISession
     * const AISession = await prisma.aISession.create({
     *   data: {
     *     // ... data to create a AISession
     *   }
     * })
     * 
     */
    create<T extends AISessionCreateArgs>(args: SelectSubset<T, AISessionCreateArgs<ExtArgs>>): Prisma__AISessionClient<$Result.GetResult<Prisma.$AISessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AISessions.
     * @param {AISessionCreateManyArgs} args - Arguments to create many AISessions.
     * @example
     * // Create many AISessions
     * const aISession = await prisma.aISession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AISessionCreateManyArgs>(args?: SelectSubset<T, AISessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AISessions and returns the data saved in the database.
     * @param {AISessionCreateManyAndReturnArgs} args - Arguments to create many AISessions.
     * @example
     * // Create many AISessions
     * const aISession = await prisma.aISession.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AISessions and only return the `id`
     * const aISessionWithIdOnly = await prisma.aISession.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AISessionCreateManyAndReturnArgs>(args?: SelectSubset<T, AISessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AISessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AISession.
     * @param {AISessionDeleteArgs} args - Arguments to delete one AISession.
     * @example
     * // Delete one AISession
     * const AISession = await prisma.aISession.delete({
     *   where: {
     *     // ... filter to delete one AISession
     *   }
     * })
     * 
     */
    delete<T extends AISessionDeleteArgs>(args: SelectSubset<T, AISessionDeleteArgs<ExtArgs>>): Prisma__AISessionClient<$Result.GetResult<Prisma.$AISessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AISession.
     * @param {AISessionUpdateArgs} args - Arguments to update one AISession.
     * @example
     * // Update one AISession
     * const aISession = await prisma.aISession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AISessionUpdateArgs>(args: SelectSubset<T, AISessionUpdateArgs<ExtArgs>>): Prisma__AISessionClient<$Result.GetResult<Prisma.$AISessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AISessions.
     * @param {AISessionDeleteManyArgs} args - Arguments to filter AISessions to delete.
     * @example
     * // Delete a few AISessions
     * const { count } = await prisma.aISession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AISessionDeleteManyArgs>(args?: SelectSubset<T, AISessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AISessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AISessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AISessions
     * const aISession = await prisma.aISession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AISessionUpdateManyArgs>(args: SelectSubset<T, AISessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AISessions and returns the data updated in the database.
     * @param {AISessionUpdateManyAndReturnArgs} args - Arguments to update many AISessions.
     * @example
     * // Update many AISessions
     * const aISession = await prisma.aISession.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AISessions and only return the `id`
     * const aISessionWithIdOnly = await prisma.aISession.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AISessionUpdateManyAndReturnArgs>(args: SelectSubset<T, AISessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AISessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AISession.
     * @param {AISessionUpsertArgs} args - Arguments to update or create a AISession.
     * @example
     * // Update or create a AISession
     * const aISession = await prisma.aISession.upsert({
     *   create: {
     *     // ... data to create a AISession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AISession we want to update
     *   }
     * })
     */
    upsert<T extends AISessionUpsertArgs>(args: SelectSubset<T, AISessionUpsertArgs<ExtArgs>>): Prisma__AISessionClient<$Result.GetResult<Prisma.$AISessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AISessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AISessionCountArgs} args - Arguments to filter AISessions to count.
     * @example
     * // Count the number of AISessions
     * const count = await prisma.aISession.count({
     *   where: {
     *     // ... the filter for the AISessions we want to count
     *   }
     * })
    **/
    count<T extends AISessionCountArgs>(
      args?: Subset<T, AISessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AISessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AISession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AISessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AISessionAggregateArgs>(args: Subset<T, AISessionAggregateArgs>): Prisma.PrismaPromise<GetAISessionAggregateType<T>>

    /**
     * Group by AISession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AISessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AISessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AISessionGroupByArgs['orderBy'] }
        : { orderBy?: AISessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AISessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAISessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AISession model
   */
  readonly fields: AISessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AISession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AISessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AISession model
   */
  interface AISessionFieldRefs {
    readonly id: FieldRef<"AISession", 'String'>
    readonly query: FieldRef<"AISession", 'String'>
    readonly response: FieldRef<"AISession", 'String'>
    readonly createdAt: FieldRef<"AISession", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AISession findUnique
   */
  export type AISessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AISession
     */
    select?: AISessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AISession
     */
    omit?: AISessionOmit<ExtArgs> | null
    /**
     * Filter, which AISession to fetch.
     */
    where: AISessionWhereUniqueInput
  }

  /**
   * AISession findUniqueOrThrow
   */
  export type AISessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AISession
     */
    select?: AISessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AISession
     */
    omit?: AISessionOmit<ExtArgs> | null
    /**
     * Filter, which AISession to fetch.
     */
    where: AISessionWhereUniqueInput
  }

  /**
   * AISession findFirst
   */
  export type AISessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AISession
     */
    select?: AISessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AISession
     */
    omit?: AISessionOmit<ExtArgs> | null
    /**
     * Filter, which AISession to fetch.
     */
    where?: AISessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AISessions to fetch.
     */
    orderBy?: AISessionOrderByWithRelationInput | AISessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AISessions.
     */
    cursor?: AISessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AISessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AISessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AISessions.
     */
    distinct?: AISessionScalarFieldEnum | AISessionScalarFieldEnum[]
  }

  /**
   * AISession findFirstOrThrow
   */
  export type AISessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AISession
     */
    select?: AISessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AISession
     */
    omit?: AISessionOmit<ExtArgs> | null
    /**
     * Filter, which AISession to fetch.
     */
    where?: AISessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AISessions to fetch.
     */
    orderBy?: AISessionOrderByWithRelationInput | AISessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AISessions.
     */
    cursor?: AISessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AISessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AISessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AISessions.
     */
    distinct?: AISessionScalarFieldEnum | AISessionScalarFieldEnum[]
  }

  /**
   * AISession findMany
   */
  export type AISessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AISession
     */
    select?: AISessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AISession
     */
    omit?: AISessionOmit<ExtArgs> | null
    /**
     * Filter, which AISessions to fetch.
     */
    where?: AISessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AISessions to fetch.
     */
    orderBy?: AISessionOrderByWithRelationInput | AISessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AISessions.
     */
    cursor?: AISessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AISessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AISessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AISessions.
     */
    distinct?: AISessionScalarFieldEnum | AISessionScalarFieldEnum[]
  }

  /**
   * AISession create
   */
  export type AISessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AISession
     */
    select?: AISessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AISession
     */
    omit?: AISessionOmit<ExtArgs> | null
    /**
     * The data needed to create a AISession.
     */
    data: XOR<AISessionCreateInput, AISessionUncheckedCreateInput>
  }

  /**
   * AISession createMany
   */
  export type AISessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AISessions.
     */
    data: AISessionCreateManyInput | AISessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AISession createManyAndReturn
   */
  export type AISessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AISession
     */
    select?: AISessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AISession
     */
    omit?: AISessionOmit<ExtArgs> | null
    /**
     * The data used to create many AISessions.
     */
    data: AISessionCreateManyInput | AISessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AISession update
   */
  export type AISessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AISession
     */
    select?: AISessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AISession
     */
    omit?: AISessionOmit<ExtArgs> | null
    /**
     * The data needed to update a AISession.
     */
    data: XOR<AISessionUpdateInput, AISessionUncheckedUpdateInput>
    /**
     * Choose, which AISession to update.
     */
    where: AISessionWhereUniqueInput
  }

  /**
   * AISession updateMany
   */
  export type AISessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AISessions.
     */
    data: XOR<AISessionUpdateManyMutationInput, AISessionUncheckedUpdateManyInput>
    /**
     * Filter which AISessions to update
     */
    where?: AISessionWhereInput
    /**
     * Limit how many AISessions to update.
     */
    limit?: number
  }

  /**
   * AISession updateManyAndReturn
   */
  export type AISessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AISession
     */
    select?: AISessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AISession
     */
    omit?: AISessionOmit<ExtArgs> | null
    /**
     * The data used to update AISessions.
     */
    data: XOR<AISessionUpdateManyMutationInput, AISessionUncheckedUpdateManyInput>
    /**
     * Filter which AISessions to update
     */
    where?: AISessionWhereInput
    /**
     * Limit how many AISessions to update.
     */
    limit?: number
  }

  /**
   * AISession upsert
   */
  export type AISessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AISession
     */
    select?: AISessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AISession
     */
    omit?: AISessionOmit<ExtArgs> | null
    /**
     * The filter to search for the AISession to update in case it exists.
     */
    where: AISessionWhereUniqueInput
    /**
     * In case the AISession found by the `where` argument doesn't exist, create a new AISession with this data.
     */
    create: XOR<AISessionCreateInput, AISessionUncheckedCreateInput>
    /**
     * In case the AISession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AISessionUpdateInput, AISessionUncheckedUpdateInput>
  }

  /**
   * AISession delete
   */
  export type AISessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AISession
     */
    select?: AISessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AISession
     */
    omit?: AISessionOmit<ExtArgs> | null
    /**
     * Filter which AISession to delete.
     */
    where: AISessionWhereUniqueInput
  }

  /**
   * AISession deleteMany
   */
  export type AISessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AISessions to delete
     */
    where?: AISessionWhereInput
    /**
     * Limit how many AISessions to delete.
     */
    limit?: number
  }

  /**
   * AISession without action
   */
  export type AISessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AISession
     */
    select?: AISessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AISession
     */
    omit?: AISessionOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    passwordHash: 'passwordHash',
    role: 'role',
    studentId: 'studentId',
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const StudentScalarFieldEnum: {
    id: 'id',
    name: 'name',
    marks: 'marks',
    category: 'category',
    applicationDate: 'applicationDate',
    status: 'status'
  };

  export type StudentScalarFieldEnum = (typeof StudentScalarFieldEnum)[keyof typeof StudentScalarFieldEnum]


  export const CourseScalarFieldEnum: {
    id: 'id',
    name: 'name',
    totalSeats: 'totalSeats',
    generalSeats: 'generalSeats',
    obcSeats: 'obcSeats',
    scSeats: 'scSeats',
    stSeats: 'stSeats'
  };

  export type CourseScalarFieldEnum = (typeof CourseScalarFieldEnum)[keyof typeof CourseScalarFieldEnum]


  export const PreferenceScalarFieldEnum: {
    id: 'id',
    studentId: 'studentId',
    courseId: 'courseId',
    priority: 'priority',
    status: 'status'
  };

  export type PreferenceScalarFieldEnum = (typeof PreferenceScalarFieldEnum)[keyof typeof PreferenceScalarFieldEnum]


  export const AllocationScalarFieldEnum: {
    id: 'id',
    studentId: 'studentId',
    courseId: 'courseId',
    preferenceId: 'preferenceId',
    allocatedCategory: 'allocatedCategory',
    allocationDate: 'allocationDate'
  };

  export type AllocationScalarFieldEnum = (typeof AllocationScalarFieldEnum)[keyof typeof AllocationScalarFieldEnum]


  export const AISessionScalarFieldEnum: {
    id: 'id',
    query: 'query',
    response: 'response',
    createdAt: 'createdAt'
  };

  export type AISessionScalarFieldEnum = (typeof AISessionScalarFieldEnum)[keyof typeof AISessionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Category'
   */
  export type EnumCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Category'>
    


  /**
   * Reference to a field of type 'Category[]'
   */
  export type ListEnumCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Category[]'>
    


  /**
   * Reference to a field of type 'StudentStatus'
   */
  export type EnumStudentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StudentStatus'>
    


  /**
   * Reference to a field of type 'StudentStatus[]'
   */
  export type ListEnumStudentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StudentStatus[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'PreferenceStatus'
   */
  export type EnumPreferenceStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PreferenceStatus'>
    


  /**
   * Reference to a field of type 'PreferenceStatus[]'
   */
  export type ListEnumPreferenceStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PreferenceStatus[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    studentId?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    student?: XOR<StudentNullableScalarRelationFilter, StudentWhereInput> | null
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    studentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    student?: StudentOrderByWithRelationInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    studentId?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    passwordHash?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    createdAt?: DateTimeFilter<"User"> | Date | string
    student?: XOR<StudentNullableScalarRelationFilter, StudentWhereInput> | null
  }, "id" | "email" | "studentId">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    studentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
    studentId?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type StudentWhereInput = {
    AND?: StudentWhereInput | StudentWhereInput[]
    OR?: StudentWhereInput[]
    NOT?: StudentWhereInput | StudentWhereInput[]
    id?: StringFilter<"Student"> | string
    name?: StringFilter<"Student"> | string
    marks?: FloatFilter<"Student"> | number
    category?: EnumCategoryFilter<"Student"> | $Enums.Category
    applicationDate?: DateTimeFilter<"Student"> | Date | string
    status?: EnumStudentStatusFilter<"Student"> | $Enums.StudentStatus
    preferences?: PreferenceListRelationFilter
    allocation?: XOR<AllocationNullableScalarRelationFilter, AllocationWhereInput> | null
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type StudentOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    marks?: SortOrder
    category?: SortOrder
    applicationDate?: SortOrder
    status?: SortOrder
    preferences?: PreferenceOrderByRelationAggregateInput
    allocation?: AllocationOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type StudentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: StudentWhereInput | StudentWhereInput[]
    OR?: StudentWhereInput[]
    NOT?: StudentWhereInput | StudentWhereInput[]
    name?: StringFilter<"Student"> | string
    marks?: FloatFilter<"Student"> | number
    category?: EnumCategoryFilter<"Student"> | $Enums.Category
    applicationDate?: DateTimeFilter<"Student"> | Date | string
    status?: EnumStudentStatusFilter<"Student"> | $Enums.StudentStatus
    preferences?: PreferenceListRelationFilter
    allocation?: XOR<AllocationNullableScalarRelationFilter, AllocationWhereInput> | null
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type StudentOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    marks?: SortOrder
    category?: SortOrder
    applicationDate?: SortOrder
    status?: SortOrder
    _count?: StudentCountOrderByAggregateInput
    _avg?: StudentAvgOrderByAggregateInput
    _max?: StudentMaxOrderByAggregateInput
    _min?: StudentMinOrderByAggregateInput
    _sum?: StudentSumOrderByAggregateInput
  }

  export type StudentScalarWhereWithAggregatesInput = {
    AND?: StudentScalarWhereWithAggregatesInput | StudentScalarWhereWithAggregatesInput[]
    OR?: StudentScalarWhereWithAggregatesInput[]
    NOT?: StudentScalarWhereWithAggregatesInput | StudentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Student"> | string
    name?: StringWithAggregatesFilter<"Student"> | string
    marks?: FloatWithAggregatesFilter<"Student"> | number
    category?: EnumCategoryWithAggregatesFilter<"Student"> | $Enums.Category
    applicationDate?: DateTimeWithAggregatesFilter<"Student"> | Date | string
    status?: EnumStudentStatusWithAggregatesFilter<"Student"> | $Enums.StudentStatus
  }

  export type CourseWhereInput = {
    AND?: CourseWhereInput | CourseWhereInput[]
    OR?: CourseWhereInput[]
    NOT?: CourseWhereInput | CourseWhereInput[]
    id?: StringFilter<"Course"> | string
    name?: StringFilter<"Course"> | string
    totalSeats?: IntFilter<"Course"> | number
    generalSeats?: IntFilter<"Course"> | number
    obcSeats?: IntFilter<"Course"> | number
    scSeats?: IntFilter<"Course"> | number
    stSeats?: IntFilter<"Course"> | number
    preferences?: PreferenceListRelationFilter
    allocations?: AllocationListRelationFilter
  }

  export type CourseOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    totalSeats?: SortOrder
    generalSeats?: SortOrder
    obcSeats?: SortOrder
    scSeats?: SortOrder
    stSeats?: SortOrder
    preferences?: PreferenceOrderByRelationAggregateInput
    allocations?: AllocationOrderByRelationAggregateInput
  }

  export type CourseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: CourseWhereInput | CourseWhereInput[]
    OR?: CourseWhereInput[]
    NOT?: CourseWhereInput | CourseWhereInput[]
    totalSeats?: IntFilter<"Course"> | number
    generalSeats?: IntFilter<"Course"> | number
    obcSeats?: IntFilter<"Course"> | number
    scSeats?: IntFilter<"Course"> | number
    stSeats?: IntFilter<"Course"> | number
    preferences?: PreferenceListRelationFilter
    allocations?: AllocationListRelationFilter
  }, "id" | "name">

  export type CourseOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    totalSeats?: SortOrder
    generalSeats?: SortOrder
    obcSeats?: SortOrder
    scSeats?: SortOrder
    stSeats?: SortOrder
    _count?: CourseCountOrderByAggregateInput
    _avg?: CourseAvgOrderByAggregateInput
    _max?: CourseMaxOrderByAggregateInput
    _min?: CourseMinOrderByAggregateInput
    _sum?: CourseSumOrderByAggregateInput
  }

  export type CourseScalarWhereWithAggregatesInput = {
    AND?: CourseScalarWhereWithAggregatesInput | CourseScalarWhereWithAggregatesInput[]
    OR?: CourseScalarWhereWithAggregatesInput[]
    NOT?: CourseScalarWhereWithAggregatesInput | CourseScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Course"> | string
    name?: StringWithAggregatesFilter<"Course"> | string
    totalSeats?: IntWithAggregatesFilter<"Course"> | number
    generalSeats?: IntWithAggregatesFilter<"Course"> | number
    obcSeats?: IntWithAggregatesFilter<"Course"> | number
    scSeats?: IntWithAggregatesFilter<"Course"> | number
    stSeats?: IntWithAggregatesFilter<"Course"> | number
  }

  export type PreferenceWhereInput = {
    AND?: PreferenceWhereInput | PreferenceWhereInput[]
    OR?: PreferenceWhereInput[]
    NOT?: PreferenceWhereInput | PreferenceWhereInput[]
    id?: StringFilter<"Preference"> | string
    studentId?: StringFilter<"Preference"> | string
    courseId?: StringFilter<"Preference"> | string
    priority?: IntFilter<"Preference"> | number
    status?: EnumPreferenceStatusFilter<"Preference"> | $Enums.PreferenceStatus
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
    course?: XOR<CourseScalarRelationFilter, CourseWhereInput>
    allocation?: XOR<AllocationNullableScalarRelationFilter, AllocationWhereInput> | null
  }

  export type PreferenceOrderByWithRelationInput = {
    id?: SortOrder
    studentId?: SortOrder
    courseId?: SortOrder
    priority?: SortOrder
    status?: SortOrder
    student?: StudentOrderByWithRelationInput
    course?: CourseOrderByWithRelationInput
    allocation?: AllocationOrderByWithRelationInput
  }

  export type PreferenceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    studentId_priority?: PreferenceStudentIdPriorityCompoundUniqueInput
    studentId_courseId?: PreferenceStudentIdCourseIdCompoundUniqueInput
    AND?: PreferenceWhereInput | PreferenceWhereInput[]
    OR?: PreferenceWhereInput[]
    NOT?: PreferenceWhereInput | PreferenceWhereInput[]
    studentId?: StringFilter<"Preference"> | string
    courseId?: StringFilter<"Preference"> | string
    priority?: IntFilter<"Preference"> | number
    status?: EnumPreferenceStatusFilter<"Preference"> | $Enums.PreferenceStatus
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
    course?: XOR<CourseScalarRelationFilter, CourseWhereInput>
    allocation?: XOR<AllocationNullableScalarRelationFilter, AllocationWhereInput> | null
  }, "id" | "studentId_priority" | "studentId_courseId">

  export type PreferenceOrderByWithAggregationInput = {
    id?: SortOrder
    studentId?: SortOrder
    courseId?: SortOrder
    priority?: SortOrder
    status?: SortOrder
    _count?: PreferenceCountOrderByAggregateInput
    _avg?: PreferenceAvgOrderByAggregateInput
    _max?: PreferenceMaxOrderByAggregateInput
    _min?: PreferenceMinOrderByAggregateInput
    _sum?: PreferenceSumOrderByAggregateInput
  }

  export type PreferenceScalarWhereWithAggregatesInput = {
    AND?: PreferenceScalarWhereWithAggregatesInput | PreferenceScalarWhereWithAggregatesInput[]
    OR?: PreferenceScalarWhereWithAggregatesInput[]
    NOT?: PreferenceScalarWhereWithAggregatesInput | PreferenceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Preference"> | string
    studentId?: StringWithAggregatesFilter<"Preference"> | string
    courseId?: StringWithAggregatesFilter<"Preference"> | string
    priority?: IntWithAggregatesFilter<"Preference"> | number
    status?: EnumPreferenceStatusWithAggregatesFilter<"Preference"> | $Enums.PreferenceStatus
  }

  export type AllocationWhereInput = {
    AND?: AllocationWhereInput | AllocationWhereInput[]
    OR?: AllocationWhereInput[]
    NOT?: AllocationWhereInput | AllocationWhereInput[]
    id?: StringFilter<"Allocation"> | string
    studentId?: StringFilter<"Allocation"> | string
    courseId?: StringFilter<"Allocation"> | string
    preferenceId?: StringFilter<"Allocation"> | string
    allocatedCategory?: EnumCategoryFilter<"Allocation"> | $Enums.Category
    allocationDate?: DateTimeFilter<"Allocation"> | Date | string
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
    course?: XOR<CourseScalarRelationFilter, CourseWhereInput>
    preference?: XOR<PreferenceScalarRelationFilter, PreferenceWhereInput>
  }

  export type AllocationOrderByWithRelationInput = {
    id?: SortOrder
    studentId?: SortOrder
    courseId?: SortOrder
    preferenceId?: SortOrder
    allocatedCategory?: SortOrder
    allocationDate?: SortOrder
    student?: StudentOrderByWithRelationInput
    course?: CourseOrderByWithRelationInput
    preference?: PreferenceOrderByWithRelationInput
  }

  export type AllocationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    studentId?: string
    preferenceId?: string
    AND?: AllocationWhereInput | AllocationWhereInput[]
    OR?: AllocationWhereInput[]
    NOT?: AllocationWhereInput | AllocationWhereInput[]
    courseId?: StringFilter<"Allocation"> | string
    allocatedCategory?: EnumCategoryFilter<"Allocation"> | $Enums.Category
    allocationDate?: DateTimeFilter<"Allocation"> | Date | string
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
    course?: XOR<CourseScalarRelationFilter, CourseWhereInput>
    preference?: XOR<PreferenceScalarRelationFilter, PreferenceWhereInput>
  }, "id" | "studentId" | "preferenceId">

  export type AllocationOrderByWithAggregationInput = {
    id?: SortOrder
    studentId?: SortOrder
    courseId?: SortOrder
    preferenceId?: SortOrder
    allocatedCategory?: SortOrder
    allocationDate?: SortOrder
    _count?: AllocationCountOrderByAggregateInput
    _max?: AllocationMaxOrderByAggregateInput
    _min?: AllocationMinOrderByAggregateInput
  }

  export type AllocationScalarWhereWithAggregatesInput = {
    AND?: AllocationScalarWhereWithAggregatesInput | AllocationScalarWhereWithAggregatesInput[]
    OR?: AllocationScalarWhereWithAggregatesInput[]
    NOT?: AllocationScalarWhereWithAggregatesInput | AllocationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Allocation"> | string
    studentId?: StringWithAggregatesFilter<"Allocation"> | string
    courseId?: StringWithAggregatesFilter<"Allocation"> | string
    preferenceId?: StringWithAggregatesFilter<"Allocation"> | string
    allocatedCategory?: EnumCategoryWithAggregatesFilter<"Allocation"> | $Enums.Category
    allocationDate?: DateTimeWithAggregatesFilter<"Allocation"> | Date | string
  }

  export type AISessionWhereInput = {
    AND?: AISessionWhereInput | AISessionWhereInput[]
    OR?: AISessionWhereInput[]
    NOT?: AISessionWhereInput | AISessionWhereInput[]
    id?: StringFilter<"AISession"> | string
    query?: StringFilter<"AISession"> | string
    response?: StringFilter<"AISession"> | string
    createdAt?: DateTimeFilter<"AISession"> | Date | string
  }

  export type AISessionOrderByWithRelationInput = {
    id?: SortOrder
    query?: SortOrder
    response?: SortOrder
    createdAt?: SortOrder
  }

  export type AISessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AISessionWhereInput | AISessionWhereInput[]
    OR?: AISessionWhereInput[]
    NOT?: AISessionWhereInput | AISessionWhereInput[]
    query?: StringFilter<"AISession"> | string
    response?: StringFilter<"AISession"> | string
    createdAt?: DateTimeFilter<"AISession"> | Date | string
  }, "id">

  export type AISessionOrderByWithAggregationInput = {
    id?: SortOrder
    query?: SortOrder
    response?: SortOrder
    createdAt?: SortOrder
    _count?: AISessionCountOrderByAggregateInput
    _max?: AISessionMaxOrderByAggregateInput
    _min?: AISessionMinOrderByAggregateInput
  }

  export type AISessionScalarWhereWithAggregatesInput = {
    AND?: AISessionScalarWhereWithAggregatesInput | AISessionScalarWhereWithAggregatesInput[]
    OR?: AISessionScalarWhereWithAggregatesInput[]
    NOT?: AISessionScalarWhereWithAggregatesInput | AISessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AISession"> | string
    query?: StringWithAggregatesFilter<"AISession"> | string
    response?: StringWithAggregatesFilter<"AISession"> | string
    createdAt?: DateTimeWithAggregatesFilter<"AISession"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    createdAt?: Date | string
    student?: StudentCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    studentId?: string | null
    createdAt?: Date | string
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    studentId?: string | null
    createdAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentCreateInput = {
    id?: string
    name: string
    marks: number
    category: $Enums.Category
    applicationDate?: Date | string
    status?: $Enums.StudentStatus
    preferences?: PreferenceCreateNestedManyWithoutStudentInput
    allocation?: AllocationCreateNestedOneWithoutStudentInput
    user?: UserCreateNestedOneWithoutStudentInput
  }

  export type StudentUncheckedCreateInput = {
    id?: string
    name: string
    marks: number
    category: $Enums.Category
    applicationDate?: Date | string
    status?: $Enums.StudentStatus
    preferences?: PreferenceUncheckedCreateNestedManyWithoutStudentInput
    allocation?: AllocationUncheckedCreateNestedOneWithoutStudentInput
    user?: UserUncheckedCreateNestedOneWithoutStudentInput
  }

  export type StudentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    marks?: FloatFieldUpdateOperationsInput | number
    category?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    applicationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumStudentStatusFieldUpdateOperationsInput | $Enums.StudentStatus
    preferences?: PreferenceUpdateManyWithoutStudentNestedInput
    allocation?: AllocationUpdateOneWithoutStudentNestedInput
    user?: UserUpdateOneWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    marks?: FloatFieldUpdateOperationsInput | number
    category?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    applicationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumStudentStatusFieldUpdateOperationsInput | $Enums.StudentStatus
    preferences?: PreferenceUncheckedUpdateManyWithoutStudentNestedInput
    allocation?: AllocationUncheckedUpdateOneWithoutStudentNestedInput
    user?: UserUncheckedUpdateOneWithoutStudentNestedInput
  }

  export type StudentCreateManyInput = {
    id?: string
    name: string
    marks: number
    category: $Enums.Category
    applicationDate?: Date | string
    status?: $Enums.StudentStatus
  }

  export type StudentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    marks?: FloatFieldUpdateOperationsInput | number
    category?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    applicationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumStudentStatusFieldUpdateOperationsInput | $Enums.StudentStatus
  }

  export type StudentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    marks?: FloatFieldUpdateOperationsInput | number
    category?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    applicationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumStudentStatusFieldUpdateOperationsInput | $Enums.StudentStatus
  }

  export type CourseCreateInput = {
    id?: string
    name: string
    totalSeats: number
    generalSeats: number
    obcSeats: number
    scSeats: number
    stSeats: number
    preferences?: PreferenceCreateNestedManyWithoutCourseInput
    allocations?: AllocationCreateNestedManyWithoutCourseInput
  }

  export type CourseUncheckedCreateInput = {
    id?: string
    name: string
    totalSeats: number
    generalSeats: number
    obcSeats: number
    scSeats: number
    stSeats: number
    preferences?: PreferenceUncheckedCreateNestedManyWithoutCourseInput
    allocations?: AllocationUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    totalSeats?: IntFieldUpdateOperationsInput | number
    generalSeats?: IntFieldUpdateOperationsInput | number
    obcSeats?: IntFieldUpdateOperationsInput | number
    scSeats?: IntFieldUpdateOperationsInput | number
    stSeats?: IntFieldUpdateOperationsInput | number
    preferences?: PreferenceUpdateManyWithoutCourseNestedInput
    allocations?: AllocationUpdateManyWithoutCourseNestedInput
  }

  export type CourseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    totalSeats?: IntFieldUpdateOperationsInput | number
    generalSeats?: IntFieldUpdateOperationsInput | number
    obcSeats?: IntFieldUpdateOperationsInput | number
    scSeats?: IntFieldUpdateOperationsInput | number
    stSeats?: IntFieldUpdateOperationsInput | number
    preferences?: PreferenceUncheckedUpdateManyWithoutCourseNestedInput
    allocations?: AllocationUncheckedUpdateManyWithoutCourseNestedInput
  }

  export type CourseCreateManyInput = {
    id?: string
    name: string
    totalSeats: number
    generalSeats: number
    obcSeats: number
    scSeats: number
    stSeats: number
  }

  export type CourseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    totalSeats?: IntFieldUpdateOperationsInput | number
    generalSeats?: IntFieldUpdateOperationsInput | number
    obcSeats?: IntFieldUpdateOperationsInput | number
    scSeats?: IntFieldUpdateOperationsInput | number
    stSeats?: IntFieldUpdateOperationsInput | number
  }

  export type CourseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    totalSeats?: IntFieldUpdateOperationsInput | number
    generalSeats?: IntFieldUpdateOperationsInput | number
    obcSeats?: IntFieldUpdateOperationsInput | number
    scSeats?: IntFieldUpdateOperationsInput | number
    stSeats?: IntFieldUpdateOperationsInput | number
  }

  export type PreferenceCreateInput = {
    id?: string
    priority: number
    status?: $Enums.PreferenceStatus
    student: StudentCreateNestedOneWithoutPreferencesInput
    course: CourseCreateNestedOneWithoutPreferencesInput
    allocation?: AllocationCreateNestedOneWithoutPreferenceInput
  }

  export type PreferenceUncheckedCreateInput = {
    id?: string
    studentId: string
    courseId: string
    priority: number
    status?: $Enums.PreferenceStatus
    allocation?: AllocationUncheckedCreateNestedOneWithoutPreferenceInput
  }

  export type PreferenceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    priority?: IntFieldUpdateOperationsInput | number
    status?: EnumPreferenceStatusFieldUpdateOperationsInput | $Enums.PreferenceStatus
    student?: StudentUpdateOneRequiredWithoutPreferencesNestedInput
    course?: CourseUpdateOneRequiredWithoutPreferencesNestedInput
    allocation?: AllocationUpdateOneWithoutPreferenceNestedInput
  }

  export type PreferenceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    courseId?: StringFieldUpdateOperationsInput | string
    priority?: IntFieldUpdateOperationsInput | number
    status?: EnumPreferenceStatusFieldUpdateOperationsInput | $Enums.PreferenceStatus
    allocation?: AllocationUncheckedUpdateOneWithoutPreferenceNestedInput
  }

  export type PreferenceCreateManyInput = {
    id?: string
    studentId: string
    courseId: string
    priority: number
    status?: $Enums.PreferenceStatus
  }

  export type PreferenceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    priority?: IntFieldUpdateOperationsInput | number
    status?: EnumPreferenceStatusFieldUpdateOperationsInput | $Enums.PreferenceStatus
  }

  export type PreferenceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    courseId?: StringFieldUpdateOperationsInput | string
    priority?: IntFieldUpdateOperationsInput | number
    status?: EnumPreferenceStatusFieldUpdateOperationsInput | $Enums.PreferenceStatus
  }

  export type AllocationCreateInput = {
    id?: string
    allocatedCategory: $Enums.Category
    allocationDate?: Date | string
    student: StudentCreateNestedOneWithoutAllocationInput
    course: CourseCreateNestedOneWithoutAllocationsInput
    preference: PreferenceCreateNestedOneWithoutAllocationInput
  }

  export type AllocationUncheckedCreateInput = {
    id?: string
    studentId: string
    courseId: string
    preferenceId: string
    allocatedCategory: $Enums.Category
    allocationDate?: Date | string
  }

  export type AllocationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    allocatedCategory?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    allocationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentUpdateOneRequiredWithoutAllocationNestedInput
    course?: CourseUpdateOneRequiredWithoutAllocationsNestedInput
    preference?: PreferenceUpdateOneRequiredWithoutAllocationNestedInput
  }

  export type AllocationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    courseId?: StringFieldUpdateOperationsInput | string
    preferenceId?: StringFieldUpdateOperationsInput | string
    allocatedCategory?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    allocationDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AllocationCreateManyInput = {
    id?: string
    studentId: string
    courseId: string
    preferenceId: string
    allocatedCategory: $Enums.Category
    allocationDate?: Date | string
  }

  export type AllocationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    allocatedCategory?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    allocationDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AllocationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    courseId?: StringFieldUpdateOperationsInput | string
    preferenceId?: StringFieldUpdateOperationsInput | string
    allocatedCategory?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    allocationDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AISessionCreateInput = {
    id?: string
    query: string
    response: string
    createdAt?: Date | string
  }

  export type AISessionUncheckedCreateInput = {
    id?: string
    query: string
    response: string
    createdAt?: Date | string
  }

  export type AISessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    query?: StringFieldUpdateOperationsInput | string
    response?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AISessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    query?: StringFieldUpdateOperationsInput | string
    response?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AISessionCreateManyInput = {
    id?: string
    query: string
    response: string
    createdAt?: Date | string
  }

  export type AISessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    query?: StringFieldUpdateOperationsInput | string
    response?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AISessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    query?: StringFieldUpdateOperationsInput | string
    response?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StudentNullableScalarRelationFilter = {
    is?: StudentWhereInput | null
    isNot?: StudentWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    studentId?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    studentId?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    studentId?: SortOrder
    createdAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type EnumCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.Category | EnumCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.Category[] | ListEnumCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.Category[] | ListEnumCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumCategoryFilter<$PrismaModel> | $Enums.Category
  }

  export type EnumStudentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.StudentStatus | EnumStudentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.StudentStatus[] | ListEnumStudentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.StudentStatus[] | ListEnumStudentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStudentStatusFilter<$PrismaModel> | $Enums.StudentStatus
  }

  export type PreferenceListRelationFilter = {
    every?: PreferenceWhereInput
    some?: PreferenceWhereInput
    none?: PreferenceWhereInput
  }

  export type AllocationNullableScalarRelationFilter = {
    is?: AllocationWhereInput | null
    isNot?: AllocationWhereInput | null
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type PreferenceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StudentCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    marks?: SortOrder
    category?: SortOrder
    applicationDate?: SortOrder
    status?: SortOrder
  }

  export type StudentAvgOrderByAggregateInput = {
    marks?: SortOrder
  }

  export type StudentMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    marks?: SortOrder
    category?: SortOrder
    applicationDate?: SortOrder
    status?: SortOrder
  }

  export type StudentMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    marks?: SortOrder
    category?: SortOrder
    applicationDate?: SortOrder
    status?: SortOrder
  }

  export type StudentSumOrderByAggregateInput = {
    marks?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type EnumCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Category | EnumCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.Category[] | ListEnumCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.Category[] | ListEnumCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumCategoryWithAggregatesFilter<$PrismaModel> | $Enums.Category
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCategoryFilter<$PrismaModel>
    _max?: NestedEnumCategoryFilter<$PrismaModel>
  }

  export type EnumStudentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StudentStatus | EnumStudentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.StudentStatus[] | ListEnumStudentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.StudentStatus[] | ListEnumStudentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStudentStatusWithAggregatesFilter<$PrismaModel> | $Enums.StudentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStudentStatusFilter<$PrismaModel>
    _max?: NestedEnumStudentStatusFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type AllocationListRelationFilter = {
    every?: AllocationWhereInput
    some?: AllocationWhereInput
    none?: AllocationWhereInput
  }

  export type AllocationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CourseCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    totalSeats?: SortOrder
    generalSeats?: SortOrder
    obcSeats?: SortOrder
    scSeats?: SortOrder
    stSeats?: SortOrder
  }

  export type CourseAvgOrderByAggregateInput = {
    totalSeats?: SortOrder
    generalSeats?: SortOrder
    obcSeats?: SortOrder
    scSeats?: SortOrder
    stSeats?: SortOrder
  }

  export type CourseMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    totalSeats?: SortOrder
    generalSeats?: SortOrder
    obcSeats?: SortOrder
    scSeats?: SortOrder
    stSeats?: SortOrder
  }

  export type CourseMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    totalSeats?: SortOrder
    generalSeats?: SortOrder
    obcSeats?: SortOrder
    scSeats?: SortOrder
    stSeats?: SortOrder
  }

  export type CourseSumOrderByAggregateInput = {
    totalSeats?: SortOrder
    generalSeats?: SortOrder
    obcSeats?: SortOrder
    scSeats?: SortOrder
    stSeats?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumPreferenceStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PreferenceStatus | EnumPreferenceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PreferenceStatus[] | ListEnumPreferenceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PreferenceStatus[] | ListEnumPreferenceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPreferenceStatusFilter<$PrismaModel> | $Enums.PreferenceStatus
  }

  export type StudentScalarRelationFilter = {
    is?: StudentWhereInput
    isNot?: StudentWhereInput
  }

  export type CourseScalarRelationFilter = {
    is?: CourseWhereInput
    isNot?: CourseWhereInput
  }

  export type PreferenceStudentIdPriorityCompoundUniqueInput = {
    studentId: string
    priority: number
  }

  export type PreferenceStudentIdCourseIdCompoundUniqueInput = {
    studentId: string
    courseId: string
  }

  export type PreferenceCountOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    courseId?: SortOrder
    priority?: SortOrder
    status?: SortOrder
  }

  export type PreferenceAvgOrderByAggregateInput = {
    priority?: SortOrder
  }

  export type PreferenceMaxOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    courseId?: SortOrder
    priority?: SortOrder
    status?: SortOrder
  }

  export type PreferenceMinOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    courseId?: SortOrder
    priority?: SortOrder
    status?: SortOrder
  }

  export type PreferenceSumOrderByAggregateInput = {
    priority?: SortOrder
  }

  export type EnumPreferenceStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PreferenceStatus | EnumPreferenceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PreferenceStatus[] | ListEnumPreferenceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PreferenceStatus[] | ListEnumPreferenceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPreferenceStatusWithAggregatesFilter<$PrismaModel> | $Enums.PreferenceStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPreferenceStatusFilter<$PrismaModel>
    _max?: NestedEnumPreferenceStatusFilter<$PrismaModel>
  }

  export type PreferenceScalarRelationFilter = {
    is?: PreferenceWhereInput
    isNot?: PreferenceWhereInput
  }

  export type AllocationCountOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    courseId?: SortOrder
    preferenceId?: SortOrder
    allocatedCategory?: SortOrder
    allocationDate?: SortOrder
  }

  export type AllocationMaxOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    courseId?: SortOrder
    preferenceId?: SortOrder
    allocatedCategory?: SortOrder
    allocationDate?: SortOrder
  }

  export type AllocationMinOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    courseId?: SortOrder
    preferenceId?: SortOrder
    allocatedCategory?: SortOrder
    allocationDate?: SortOrder
  }

  export type AISessionCountOrderByAggregateInput = {
    id?: SortOrder
    query?: SortOrder
    response?: SortOrder
    createdAt?: SortOrder
  }

  export type AISessionMaxOrderByAggregateInput = {
    id?: SortOrder
    query?: SortOrder
    response?: SortOrder
    createdAt?: SortOrder
  }

  export type AISessionMinOrderByAggregateInput = {
    id?: SortOrder
    query?: SortOrder
    response?: SortOrder
    createdAt?: SortOrder
  }

  export type StudentCreateNestedOneWithoutUserInput = {
    create?: XOR<StudentCreateWithoutUserInput, StudentUncheckedCreateWithoutUserInput>
    connectOrCreate?: StudentCreateOrConnectWithoutUserInput
    connect?: StudentWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type StudentUpdateOneWithoutUserNestedInput = {
    create?: XOR<StudentCreateWithoutUserInput, StudentUncheckedCreateWithoutUserInput>
    connectOrCreate?: StudentCreateOrConnectWithoutUserInput
    upsert?: StudentUpsertWithoutUserInput
    disconnect?: StudentWhereInput | boolean
    delete?: StudentWhereInput | boolean
    connect?: StudentWhereUniqueInput
    update?: XOR<XOR<StudentUpdateToOneWithWhereWithoutUserInput, StudentUpdateWithoutUserInput>, StudentUncheckedUpdateWithoutUserInput>
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type PreferenceCreateNestedManyWithoutStudentInput = {
    create?: XOR<PreferenceCreateWithoutStudentInput, PreferenceUncheckedCreateWithoutStudentInput> | PreferenceCreateWithoutStudentInput[] | PreferenceUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: PreferenceCreateOrConnectWithoutStudentInput | PreferenceCreateOrConnectWithoutStudentInput[]
    createMany?: PreferenceCreateManyStudentInputEnvelope
    connect?: PreferenceWhereUniqueInput | PreferenceWhereUniqueInput[]
  }

  export type AllocationCreateNestedOneWithoutStudentInput = {
    create?: XOR<AllocationCreateWithoutStudentInput, AllocationUncheckedCreateWithoutStudentInput>
    connectOrCreate?: AllocationCreateOrConnectWithoutStudentInput
    connect?: AllocationWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutStudentInput = {
    create?: XOR<UserCreateWithoutStudentInput, UserUncheckedCreateWithoutStudentInput>
    connectOrCreate?: UserCreateOrConnectWithoutStudentInput
    connect?: UserWhereUniqueInput
  }

  export type PreferenceUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<PreferenceCreateWithoutStudentInput, PreferenceUncheckedCreateWithoutStudentInput> | PreferenceCreateWithoutStudentInput[] | PreferenceUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: PreferenceCreateOrConnectWithoutStudentInput | PreferenceCreateOrConnectWithoutStudentInput[]
    createMany?: PreferenceCreateManyStudentInputEnvelope
    connect?: PreferenceWhereUniqueInput | PreferenceWhereUniqueInput[]
  }

  export type AllocationUncheckedCreateNestedOneWithoutStudentInput = {
    create?: XOR<AllocationCreateWithoutStudentInput, AllocationUncheckedCreateWithoutStudentInput>
    connectOrCreate?: AllocationCreateOrConnectWithoutStudentInput
    connect?: AllocationWhereUniqueInput
  }

  export type UserUncheckedCreateNestedOneWithoutStudentInput = {
    create?: XOR<UserCreateWithoutStudentInput, UserUncheckedCreateWithoutStudentInput>
    connectOrCreate?: UserCreateOrConnectWithoutStudentInput
    connect?: UserWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumCategoryFieldUpdateOperationsInput = {
    set?: $Enums.Category
  }

  export type EnumStudentStatusFieldUpdateOperationsInput = {
    set?: $Enums.StudentStatus
  }

  export type PreferenceUpdateManyWithoutStudentNestedInput = {
    create?: XOR<PreferenceCreateWithoutStudentInput, PreferenceUncheckedCreateWithoutStudentInput> | PreferenceCreateWithoutStudentInput[] | PreferenceUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: PreferenceCreateOrConnectWithoutStudentInput | PreferenceCreateOrConnectWithoutStudentInput[]
    upsert?: PreferenceUpsertWithWhereUniqueWithoutStudentInput | PreferenceUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: PreferenceCreateManyStudentInputEnvelope
    set?: PreferenceWhereUniqueInput | PreferenceWhereUniqueInput[]
    disconnect?: PreferenceWhereUniqueInput | PreferenceWhereUniqueInput[]
    delete?: PreferenceWhereUniqueInput | PreferenceWhereUniqueInput[]
    connect?: PreferenceWhereUniqueInput | PreferenceWhereUniqueInput[]
    update?: PreferenceUpdateWithWhereUniqueWithoutStudentInput | PreferenceUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: PreferenceUpdateManyWithWhereWithoutStudentInput | PreferenceUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: PreferenceScalarWhereInput | PreferenceScalarWhereInput[]
  }

  export type AllocationUpdateOneWithoutStudentNestedInput = {
    create?: XOR<AllocationCreateWithoutStudentInput, AllocationUncheckedCreateWithoutStudentInput>
    connectOrCreate?: AllocationCreateOrConnectWithoutStudentInput
    upsert?: AllocationUpsertWithoutStudentInput
    disconnect?: AllocationWhereInput | boolean
    delete?: AllocationWhereInput | boolean
    connect?: AllocationWhereUniqueInput
    update?: XOR<XOR<AllocationUpdateToOneWithWhereWithoutStudentInput, AllocationUpdateWithoutStudentInput>, AllocationUncheckedUpdateWithoutStudentInput>
  }

  export type UserUpdateOneWithoutStudentNestedInput = {
    create?: XOR<UserCreateWithoutStudentInput, UserUncheckedCreateWithoutStudentInput>
    connectOrCreate?: UserCreateOrConnectWithoutStudentInput
    upsert?: UserUpsertWithoutStudentInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutStudentInput, UserUpdateWithoutStudentInput>, UserUncheckedUpdateWithoutStudentInput>
  }

  export type PreferenceUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<PreferenceCreateWithoutStudentInput, PreferenceUncheckedCreateWithoutStudentInput> | PreferenceCreateWithoutStudentInput[] | PreferenceUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: PreferenceCreateOrConnectWithoutStudentInput | PreferenceCreateOrConnectWithoutStudentInput[]
    upsert?: PreferenceUpsertWithWhereUniqueWithoutStudentInput | PreferenceUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: PreferenceCreateManyStudentInputEnvelope
    set?: PreferenceWhereUniqueInput | PreferenceWhereUniqueInput[]
    disconnect?: PreferenceWhereUniqueInput | PreferenceWhereUniqueInput[]
    delete?: PreferenceWhereUniqueInput | PreferenceWhereUniqueInput[]
    connect?: PreferenceWhereUniqueInput | PreferenceWhereUniqueInput[]
    update?: PreferenceUpdateWithWhereUniqueWithoutStudentInput | PreferenceUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: PreferenceUpdateManyWithWhereWithoutStudentInput | PreferenceUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: PreferenceScalarWhereInput | PreferenceScalarWhereInput[]
  }

  export type AllocationUncheckedUpdateOneWithoutStudentNestedInput = {
    create?: XOR<AllocationCreateWithoutStudentInput, AllocationUncheckedCreateWithoutStudentInput>
    connectOrCreate?: AllocationCreateOrConnectWithoutStudentInput
    upsert?: AllocationUpsertWithoutStudentInput
    disconnect?: AllocationWhereInput | boolean
    delete?: AllocationWhereInput | boolean
    connect?: AllocationWhereUniqueInput
    update?: XOR<XOR<AllocationUpdateToOneWithWhereWithoutStudentInput, AllocationUpdateWithoutStudentInput>, AllocationUncheckedUpdateWithoutStudentInput>
  }

  export type UserUncheckedUpdateOneWithoutStudentNestedInput = {
    create?: XOR<UserCreateWithoutStudentInput, UserUncheckedCreateWithoutStudentInput>
    connectOrCreate?: UserCreateOrConnectWithoutStudentInput
    upsert?: UserUpsertWithoutStudentInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutStudentInput, UserUpdateWithoutStudentInput>, UserUncheckedUpdateWithoutStudentInput>
  }

  export type PreferenceCreateNestedManyWithoutCourseInput = {
    create?: XOR<PreferenceCreateWithoutCourseInput, PreferenceUncheckedCreateWithoutCourseInput> | PreferenceCreateWithoutCourseInput[] | PreferenceUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: PreferenceCreateOrConnectWithoutCourseInput | PreferenceCreateOrConnectWithoutCourseInput[]
    createMany?: PreferenceCreateManyCourseInputEnvelope
    connect?: PreferenceWhereUniqueInput | PreferenceWhereUniqueInput[]
  }

  export type AllocationCreateNestedManyWithoutCourseInput = {
    create?: XOR<AllocationCreateWithoutCourseInput, AllocationUncheckedCreateWithoutCourseInput> | AllocationCreateWithoutCourseInput[] | AllocationUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: AllocationCreateOrConnectWithoutCourseInput | AllocationCreateOrConnectWithoutCourseInput[]
    createMany?: AllocationCreateManyCourseInputEnvelope
    connect?: AllocationWhereUniqueInput | AllocationWhereUniqueInput[]
  }

  export type PreferenceUncheckedCreateNestedManyWithoutCourseInput = {
    create?: XOR<PreferenceCreateWithoutCourseInput, PreferenceUncheckedCreateWithoutCourseInput> | PreferenceCreateWithoutCourseInput[] | PreferenceUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: PreferenceCreateOrConnectWithoutCourseInput | PreferenceCreateOrConnectWithoutCourseInput[]
    createMany?: PreferenceCreateManyCourseInputEnvelope
    connect?: PreferenceWhereUniqueInput | PreferenceWhereUniqueInput[]
  }

  export type AllocationUncheckedCreateNestedManyWithoutCourseInput = {
    create?: XOR<AllocationCreateWithoutCourseInput, AllocationUncheckedCreateWithoutCourseInput> | AllocationCreateWithoutCourseInput[] | AllocationUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: AllocationCreateOrConnectWithoutCourseInput | AllocationCreateOrConnectWithoutCourseInput[]
    createMany?: AllocationCreateManyCourseInputEnvelope
    connect?: AllocationWhereUniqueInput | AllocationWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PreferenceUpdateManyWithoutCourseNestedInput = {
    create?: XOR<PreferenceCreateWithoutCourseInput, PreferenceUncheckedCreateWithoutCourseInput> | PreferenceCreateWithoutCourseInput[] | PreferenceUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: PreferenceCreateOrConnectWithoutCourseInput | PreferenceCreateOrConnectWithoutCourseInput[]
    upsert?: PreferenceUpsertWithWhereUniqueWithoutCourseInput | PreferenceUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: PreferenceCreateManyCourseInputEnvelope
    set?: PreferenceWhereUniqueInput | PreferenceWhereUniqueInput[]
    disconnect?: PreferenceWhereUniqueInput | PreferenceWhereUniqueInput[]
    delete?: PreferenceWhereUniqueInput | PreferenceWhereUniqueInput[]
    connect?: PreferenceWhereUniqueInput | PreferenceWhereUniqueInput[]
    update?: PreferenceUpdateWithWhereUniqueWithoutCourseInput | PreferenceUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: PreferenceUpdateManyWithWhereWithoutCourseInput | PreferenceUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: PreferenceScalarWhereInput | PreferenceScalarWhereInput[]
  }

  export type AllocationUpdateManyWithoutCourseNestedInput = {
    create?: XOR<AllocationCreateWithoutCourseInput, AllocationUncheckedCreateWithoutCourseInput> | AllocationCreateWithoutCourseInput[] | AllocationUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: AllocationCreateOrConnectWithoutCourseInput | AllocationCreateOrConnectWithoutCourseInput[]
    upsert?: AllocationUpsertWithWhereUniqueWithoutCourseInput | AllocationUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: AllocationCreateManyCourseInputEnvelope
    set?: AllocationWhereUniqueInput | AllocationWhereUniqueInput[]
    disconnect?: AllocationWhereUniqueInput | AllocationWhereUniqueInput[]
    delete?: AllocationWhereUniqueInput | AllocationWhereUniqueInput[]
    connect?: AllocationWhereUniqueInput | AllocationWhereUniqueInput[]
    update?: AllocationUpdateWithWhereUniqueWithoutCourseInput | AllocationUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: AllocationUpdateManyWithWhereWithoutCourseInput | AllocationUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: AllocationScalarWhereInput | AllocationScalarWhereInput[]
  }

  export type PreferenceUncheckedUpdateManyWithoutCourseNestedInput = {
    create?: XOR<PreferenceCreateWithoutCourseInput, PreferenceUncheckedCreateWithoutCourseInput> | PreferenceCreateWithoutCourseInput[] | PreferenceUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: PreferenceCreateOrConnectWithoutCourseInput | PreferenceCreateOrConnectWithoutCourseInput[]
    upsert?: PreferenceUpsertWithWhereUniqueWithoutCourseInput | PreferenceUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: PreferenceCreateManyCourseInputEnvelope
    set?: PreferenceWhereUniqueInput | PreferenceWhereUniqueInput[]
    disconnect?: PreferenceWhereUniqueInput | PreferenceWhereUniqueInput[]
    delete?: PreferenceWhereUniqueInput | PreferenceWhereUniqueInput[]
    connect?: PreferenceWhereUniqueInput | PreferenceWhereUniqueInput[]
    update?: PreferenceUpdateWithWhereUniqueWithoutCourseInput | PreferenceUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: PreferenceUpdateManyWithWhereWithoutCourseInput | PreferenceUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: PreferenceScalarWhereInput | PreferenceScalarWhereInput[]
  }

  export type AllocationUncheckedUpdateManyWithoutCourseNestedInput = {
    create?: XOR<AllocationCreateWithoutCourseInput, AllocationUncheckedCreateWithoutCourseInput> | AllocationCreateWithoutCourseInput[] | AllocationUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: AllocationCreateOrConnectWithoutCourseInput | AllocationCreateOrConnectWithoutCourseInput[]
    upsert?: AllocationUpsertWithWhereUniqueWithoutCourseInput | AllocationUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: AllocationCreateManyCourseInputEnvelope
    set?: AllocationWhereUniqueInput | AllocationWhereUniqueInput[]
    disconnect?: AllocationWhereUniqueInput | AllocationWhereUniqueInput[]
    delete?: AllocationWhereUniqueInput | AllocationWhereUniqueInput[]
    connect?: AllocationWhereUniqueInput | AllocationWhereUniqueInput[]
    update?: AllocationUpdateWithWhereUniqueWithoutCourseInput | AllocationUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: AllocationUpdateManyWithWhereWithoutCourseInput | AllocationUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: AllocationScalarWhereInput | AllocationScalarWhereInput[]
  }

  export type StudentCreateNestedOneWithoutPreferencesInput = {
    create?: XOR<StudentCreateWithoutPreferencesInput, StudentUncheckedCreateWithoutPreferencesInput>
    connectOrCreate?: StudentCreateOrConnectWithoutPreferencesInput
    connect?: StudentWhereUniqueInput
  }

  export type CourseCreateNestedOneWithoutPreferencesInput = {
    create?: XOR<CourseCreateWithoutPreferencesInput, CourseUncheckedCreateWithoutPreferencesInput>
    connectOrCreate?: CourseCreateOrConnectWithoutPreferencesInput
    connect?: CourseWhereUniqueInput
  }

  export type AllocationCreateNestedOneWithoutPreferenceInput = {
    create?: XOR<AllocationCreateWithoutPreferenceInput, AllocationUncheckedCreateWithoutPreferenceInput>
    connectOrCreate?: AllocationCreateOrConnectWithoutPreferenceInput
    connect?: AllocationWhereUniqueInput
  }

  export type AllocationUncheckedCreateNestedOneWithoutPreferenceInput = {
    create?: XOR<AllocationCreateWithoutPreferenceInput, AllocationUncheckedCreateWithoutPreferenceInput>
    connectOrCreate?: AllocationCreateOrConnectWithoutPreferenceInput
    connect?: AllocationWhereUniqueInput
  }

  export type EnumPreferenceStatusFieldUpdateOperationsInput = {
    set?: $Enums.PreferenceStatus
  }

  export type StudentUpdateOneRequiredWithoutPreferencesNestedInput = {
    create?: XOR<StudentCreateWithoutPreferencesInput, StudentUncheckedCreateWithoutPreferencesInput>
    connectOrCreate?: StudentCreateOrConnectWithoutPreferencesInput
    upsert?: StudentUpsertWithoutPreferencesInput
    connect?: StudentWhereUniqueInput
    update?: XOR<XOR<StudentUpdateToOneWithWhereWithoutPreferencesInput, StudentUpdateWithoutPreferencesInput>, StudentUncheckedUpdateWithoutPreferencesInput>
  }

  export type CourseUpdateOneRequiredWithoutPreferencesNestedInput = {
    create?: XOR<CourseCreateWithoutPreferencesInput, CourseUncheckedCreateWithoutPreferencesInput>
    connectOrCreate?: CourseCreateOrConnectWithoutPreferencesInput
    upsert?: CourseUpsertWithoutPreferencesInput
    connect?: CourseWhereUniqueInput
    update?: XOR<XOR<CourseUpdateToOneWithWhereWithoutPreferencesInput, CourseUpdateWithoutPreferencesInput>, CourseUncheckedUpdateWithoutPreferencesInput>
  }

  export type AllocationUpdateOneWithoutPreferenceNestedInput = {
    create?: XOR<AllocationCreateWithoutPreferenceInput, AllocationUncheckedCreateWithoutPreferenceInput>
    connectOrCreate?: AllocationCreateOrConnectWithoutPreferenceInput
    upsert?: AllocationUpsertWithoutPreferenceInput
    disconnect?: AllocationWhereInput | boolean
    delete?: AllocationWhereInput | boolean
    connect?: AllocationWhereUniqueInput
    update?: XOR<XOR<AllocationUpdateToOneWithWhereWithoutPreferenceInput, AllocationUpdateWithoutPreferenceInput>, AllocationUncheckedUpdateWithoutPreferenceInput>
  }

  export type AllocationUncheckedUpdateOneWithoutPreferenceNestedInput = {
    create?: XOR<AllocationCreateWithoutPreferenceInput, AllocationUncheckedCreateWithoutPreferenceInput>
    connectOrCreate?: AllocationCreateOrConnectWithoutPreferenceInput
    upsert?: AllocationUpsertWithoutPreferenceInput
    disconnect?: AllocationWhereInput | boolean
    delete?: AllocationWhereInput | boolean
    connect?: AllocationWhereUniqueInput
    update?: XOR<XOR<AllocationUpdateToOneWithWhereWithoutPreferenceInput, AllocationUpdateWithoutPreferenceInput>, AllocationUncheckedUpdateWithoutPreferenceInput>
  }

  export type StudentCreateNestedOneWithoutAllocationInput = {
    create?: XOR<StudentCreateWithoutAllocationInput, StudentUncheckedCreateWithoutAllocationInput>
    connectOrCreate?: StudentCreateOrConnectWithoutAllocationInput
    connect?: StudentWhereUniqueInput
  }

  export type CourseCreateNestedOneWithoutAllocationsInput = {
    create?: XOR<CourseCreateWithoutAllocationsInput, CourseUncheckedCreateWithoutAllocationsInput>
    connectOrCreate?: CourseCreateOrConnectWithoutAllocationsInput
    connect?: CourseWhereUniqueInput
  }

  export type PreferenceCreateNestedOneWithoutAllocationInput = {
    create?: XOR<PreferenceCreateWithoutAllocationInput, PreferenceUncheckedCreateWithoutAllocationInput>
    connectOrCreate?: PreferenceCreateOrConnectWithoutAllocationInput
    connect?: PreferenceWhereUniqueInput
  }

  export type StudentUpdateOneRequiredWithoutAllocationNestedInput = {
    create?: XOR<StudentCreateWithoutAllocationInput, StudentUncheckedCreateWithoutAllocationInput>
    connectOrCreate?: StudentCreateOrConnectWithoutAllocationInput
    upsert?: StudentUpsertWithoutAllocationInput
    connect?: StudentWhereUniqueInput
    update?: XOR<XOR<StudentUpdateToOneWithWhereWithoutAllocationInput, StudentUpdateWithoutAllocationInput>, StudentUncheckedUpdateWithoutAllocationInput>
  }

  export type CourseUpdateOneRequiredWithoutAllocationsNestedInput = {
    create?: XOR<CourseCreateWithoutAllocationsInput, CourseUncheckedCreateWithoutAllocationsInput>
    connectOrCreate?: CourseCreateOrConnectWithoutAllocationsInput
    upsert?: CourseUpsertWithoutAllocationsInput
    connect?: CourseWhereUniqueInput
    update?: XOR<XOR<CourseUpdateToOneWithWhereWithoutAllocationsInput, CourseUpdateWithoutAllocationsInput>, CourseUncheckedUpdateWithoutAllocationsInput>
  }

  export type PreferenceUpdateOneRequiredWithoutAllocationNestedInput = {
    create?: XOR<PreferenceCreateWithoutAllocationInput, PreferenceUncheckedCreateWithoutAllocationInput>
    connectOrCreate?: PreferenceCreateOrConnectWithoutAllocationInput
    upsert?: PreferenceUpsertWithoutAllocationInput
    connect?: PreferenceWhereUniqueInput
    update?: XOR<XOR<PreferenceUpdateToOneWithWhereWithoutAllocationInput, PreferenceUpdateWithoutAllocationInput>, PreferenceUncheckedUpdateWithoutAllocationInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.Category | EnumCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.Category[] | ListEnumCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.Category[] | ListEnumCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumCategoryFilter<$PrismaModel> | $Enums.Category
  }

  export type NestedEnumStudentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.StudentStatus | EnumStudentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.StudentStatus[] | ListEnumStudentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.StudentStatus[] | ListEnumStudentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStudentStatusFilter<$PrismaModel> | $Enums.StudentStatus
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedEnumCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Category | EnumCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.Category[] | ListEnumCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.Category[] | ListEnumCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumCategoryWithAggregatesFilter<$PrismaModel> | $Enums.Category
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCategoryFilter<$PrismaModel>
    _max?: NestedEnumCategoryFilter<$PrismaModel>
  }

  export type NestedEnumStudentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StudentStatus | EnumStudentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.StudentStatus[] | ListEnumStudentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.StudentStatus[] | ListEnumStudentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStudentStatusWithAggregatesFilter<$PrismaModel> | $Enums.StudentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStudentStatusFilter<$PrismaModel>
    _max?: NestedEnumStudentStatusFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedEnumPreferenceStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PreferenceStatus | EnumPreferenceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PreferenceStatus[] | ListEnumPreferenceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PreferenceStatus[] | ListEnumPreferenceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPreferenceStatusFilter<$PrismaModel> | $Enums.PreferenceStatus
  }

  export type NestedEnumPreferenceStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PreferenceStatus | EnumPreferenceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PreferenceStatus[] | ListEnumPreferenceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PreferenceStatus[] | ListEnumPreferenceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPreferenceStatusWithAggregatesFilter<$PrismaModel> | $Enums.PreferenceStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPreferenceStatusFilter<$PrismaModel>
    _max?: NestedEnumPreferenceStatusFilter<$PrismaModel>
  }

  export type StudentCreateWithoutUserInput = {
    id?: string
    name: string
    marks: number
    category: $Enums.Category
    applicationDate?: Date | string
    status?: $Enums.StudentStatus
    preferences?: PreferenceCreateNestedManyWithoutStudentInput
    allocation?: AllocationCreateNestedOneWithoutStudentInput
  }

  export type StudentUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    marks: number
    category: $Enums.Category
    applicationDate?: Date | string
    status?: $Enums.StudentStatus
    preferences?: PreferenceUncheckedCreateNestedManyWithoutStudentInput
    allocation?: AllocationUncheckedCreateNestedOneWithoutStudentInput
  }

  export type StudentCreateOrConnectWithoutUserInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutUserInput, StudentUncheckedCreateWithoutUserInput>
  }

  export type StudentUpsertWithoutUserInput = {
    update: XOR<StudentUpdateWithoutUserInput, StudentUncheckedUpdateWithoutUserInput>
    create: XOR<StudentCreateWithoutUserInput, StudentUncheckedCreateWithoutUserInput>
    where?: StudentWhereInput
  }

  export type StudentUpdateToOneWithWhereWithoutUserInput = {
    where?: StudentWhereInput
    data: XOR<StudentUpdateWithoutUserInput, StudentUncheckedUpdateWithoutUserInput>
  }

  export type StudentUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    marks?: FloatFieldUpdateOperationsInput | number
    category?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    applicationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumStudentStatusFieldUpdateOperationsInput | $Enums.StudentStatus
    preferences?: PreferenceUpdateManyWithoutStudentNestedInput
    allocation?: AllocationUpdateOneWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    marks?: FloatFieldUpdateOperationsInput | number
    category?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    applicationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumStudentStatusFieldUpdateOperationsInput | $Enums.StudentStatus
    preferences?: PreferenceUncheckedUpdateManyWithoutStudentNestedInput
    allocation?: AllocationUncheckedUpdateOneWithoutStudentNestedInput
  }

  export type PreferenceCreateWithoutStudentInput = {
    id?: string
    priority: number
    status?: $Enums.PreferenceStatus
    course: CourseCreateNestedOneWithoutPreferencesInput
    allocation?: AllocationCreateNestedOneWithoutPreferenceInput
  }

  export type PreferenceUncheckedCreateWithoutStudentInput = {
    id?: string
    courseId: string
    priority: number
    status?: $Enums.PreferenceStatus
    allocation?: AllocationUncheckedCreateNestedOneWithoutPreferenceInput
  }

  export type PreferenceCreateOrConnectWithoutStudentInput = {
    where: PreferenceWhereUniqueInput
    create: XOR<PreferenceCreateWithoutStudentInput, PreferenceUncheckedCreateWithoutStudentInput>
  }

  export type PreferenceCreateManyStudentInputEnvelope = {
    data: PreferenceCreateManyStudentInput | PreferenceCreateManyStudentInput[]
    skipDuplicates?: boolean
  }

  export type AllocationCreateWithoutStudentInput = {
    id?: string
    allocatedCategory: $Enums.Category
    allocationDate?: Date | string
    course: CourseCreateNestedOneWithoutAllocationsInput
    preference: PreferenceCreateNestedOneWithoutAllocationInput
  }

  export type AllocationUncheckedCreateWithoutStudentInput = {
    id?: string
    courseId: string
    preferenceId: string
    allocatedCategory: $Enums.Category
    allocationDate?: Date | string
  }

  export type AllocationCreateOrConnectWithoutStudentInput = {
    where: AllocationWhereUniqueInput
    create: XOR<AllocationCreateWithoutStudentInput, AllocationUncheckedCreateWithoutStudentInput>
  }

  export type UserCreateWithoutStudentInput = {
    id?: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    createdAt?: Date | string
  }

  export type UserUncheckedCreateWithoutStudentInput = {
    id?: string
    email: string
    passwordHash: string
    role: $Enums.UserRole
    createdAt?: Date | string
  }

  export type UserCreateOrConnectWithoutStudentInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutStudentInput, UserUncheckedCreateWithoutStudentInput>
  }

  export type PreferenceUpsertWithWhereUniqueWithoutStudentInput = {
    where: PreferenceWhereUniqueInput
    update: XOR<PreferenceUpdateWithoutStudentInput, PreferenceUncheckedUpdateWithoutStudentInput>
    create: XOR<PreferenceCreateWithoutStudentInput, PreferenceUncheckedCreateWithoutStudentInput>
  }

  export type PreferenceUpdateWithWhereUniqueWithoutStudentInput = {
    where: PreferenceWhereUniqueInput
    data: XOR<PreferenceUpdateWithoutStudentInput, PreferenceUncheckedUpdateWithoutStudentInput>
  }

  export type PreferenceUpdateManyWithWhereWithoutStudentInput = {
    where: PreferenceScalarWhereInput
    data: XOR<PreferenceUpdateManyMutationInput, PreferenceUncheckedUpdateManyWithoutStudentInput>
  }

  export type PreferenceScalarWhereInput = {
    AND?: PreferenceScalarWhereInput | PreferenceScalarWhereInput[]
    OR?: PreferenceScalarWhereInput[]
    NOT?: PreferenceScalarWhereInput | PreferenceScalarWhereInput[]
    id?: StringFilter<"Preference"> | string
    studentId?: StringFilter<"Preference"> | string
    courseId?: StringFilter<"Preference"> | string
    priority?: IntFilter<"Preference"> | number
    status?: EnumPreferenceStatusFilter<"Preference"> | $Enums.PreferenceStatus
  }

  export type AllocationUpsertWithoutStudentInput = {
    update: XOR<AllocationUpdateWithoutStudentInput, AllocationUncheckedUpdateWithoutStudentInput>
    create: XOR<AllocationCreateWithoutStudentInput, AllocationUncheckedCreateWithoutStudentInput>
    where?: AllocationWhereInput
  }

  export type AllocationUpdateToOneWithWhereWithoutStudentInput = {
    where?: AllocationWhereInput
    data: XOR<AllocationUpdateWithoutStudentInput, AllocationUncheckedUpdateWithoutStudentInput>
  }

  export type AllocationUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    allocatedCategory?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    allocationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    course?: CourseUpdateOneRequiredWithoutAllocationsNestedInput
    preference?: PreferenceUpdateOneRequiredWithoutAllocationNestedInput
  }

  export type AllocationUncheckedUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    courseId?: StringFieldUpdateOperationsInput | string
    preferenceId?: StringFieldUpdateOperationsInput | string
    allocatedCategory?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    allocationDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutStudentInput = {
    update: XOR<UserUpdateWithoutStudentInput, UserUncheckedUpdateWithoutStudentInput>
    create: XOR<UserCreateWithoutStudentInput, UserUncheckedCreateWithoutStudentInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutStudentInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutStudentInput, UserUncheckedUpdateWithoutStudentInput>
  }

  export type UserUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PreferenceCreateWithoutCourseInput = {
    id?: string
    priority: number
    status?: $Enums.PreferenceStatus
    student: StudentCreateNestedOneWithoutPreferencesInput
    allocation?: AllocationCreateNestedOneWithoutPreferenceInput
  }

  export type PreferenceUncheckedCreateWithoutCourseInput = {
    id?: string
    studentId: string
    priority: number
    status?: $Enums.PreferenceStatus
    allocation?: AllocationUncheckedCreateNestedOneWithoutPreferenceInput
  }

  export type PreferenceCreateOrConnectWithoutCourseInput = {
    where: PreferenceWhereUniqueInput
    create: XOR<PreferenceCreateWithoutCourseInput, PreferenceUncheckedCreateWithoutCourseInput>
  }

  export type PreferenceCreateManyCourseInputEnvelope = {
    data: PreferenceCreateManyCourseInput | PreferenceCreateManyCourseInput[]
    skipDuplicates?: boolean
  }

  export type AllocationCreateWithoutCourseInput = {
    id?: string
    allocatedCategory: $Enums.Category
    allocationDate?: Date | string
    student: StudentCreateNestedOneWithoutAllocationInput
    preference: PreferenceCreateNestedOneWithoutAllocationInput
  }

  export type AllocationUncheckedCreateWithoutCourseInput = {
    id?: string
    studentId: string
    preferenceId: string
    allocatedCategory: $Enums.Category
    allocationDate?: Date | string
  }

  export type AllocationCreateOrConnectWithoutCourseInput = {
    where: AllocationWhereUniqueInput
    create: XOR<AllocationCreateWithoutCourseInput, AllocationUncheckedCreateWithoutCourseInput>
  }

  export type AllocationCreateManyCourseInputEnvelope = {
    data: AllocationCreateManyCourseInput | AllocationCreateManyCourseInput[]
    skipDuplicates?: boolean
  }

  export type PreferenceUpsertWithWhereUniqueWithoutCourseInput = {
    where: PreferenceWhereUniqueInput
    update: XOR<PreferenceUpdateWithoutCourseInput, PreferenceUncheckedUpdateWithoutCourseInput>
    create: XOR<PreferenceCreateWithoutCourseInput, PreferenceUncheckedCreateWithoutCourseInput>
  }

  export type PreferenceUpdateWithWhereUniqueWithoutCourseInput = {
    where: PreferenceWhereUniqueInput
    data: XOR<PreferenceUpdateWithoutCourseInput, PreferenceUncheckedUpdateWithoutCourseInput>
  }

  export type PreferenceUpdateManyWithWhereWithoutCourseInput = {
    where: PreferenceScalarWhereInput
    data: XOR<PreferenceUpdateManyMutationInput, PreferenceUncheckedUpdateManyWithoutCourseInput>
  }

  export type AllocationUpsertWithWhereUniqueWithoutCourseInput = {
    where: AllocationWhereUniqueInput
    update: XOR<AllocationUpdateWithoutCourseInput, AllocationUncheckedUpdateWithoutCourseInput>
    create: XOR<AllocationCreateWithoutCourseInput, AllocationUncheckedCreateWithoutCourseInput>
  }

  export type AllocationUpdateWithWhereUniqueWithoutCourseInput = {
    where: AllocationWhereUniqueInput
    data: XOR<AllocationUpdateWithoutCourseInput, AllocationUncheckedUpdateWithoutCourseInput>
  }

  export type AllocationUpdateManyWithWhereWithoutCourseInput = {
    where: AllocationScalarWhereInput
    data: XOR<AllocationUpdateManyMutationInput, AllocationUncheckedUpdateManyWithoutCourseInput>
  }

  export type AllocationScalarWhereInput = {
    AND?: AllocationScalarWhereInput | AllocationScalarWhereInput[]
    OR?: AllocationScalarWhereInput[]
    NOT?: AllocationScalarWhereInput | AllocationScalarWhereInput[]
    id?: StringFilter<"Allocation"> | string
    studentId?: StringFilter<"Allocation"> | string
    courseId?: StringFilter<"Allocation"> | string
    preferenceId?: StringFilter<"Allocation"> | string
    allocatedCategory?: EnumCategoryFilter<"Allocation"> | $Enums.Category
    allocationDate?: DateTimeFilter<"Allocation"> | Date | string
  }

  export type StudentCreateWithoutPreferencesInput = {
    id?: string
    name: string
    marks: number
    category: $Enums.Category
    applicationDate?: Date | string
    status?: $Enums.StudentStatus
    allocation?: AllocationCreateNestedOneWithoutStudentInput
    user?: UserCreateNestedOneWithoutStudentInput
  }

  export type StudentUncheckedCreateWithoutPreferencesInput = {
    id?: string
    name: string
    marks: number
    category: $Enums.Category
    applicationDate?: Date | string
    status?: $Enums.StudentStatus
    allocation?: AllocationUncheckedCreateNestedOneWithoutStudentInput
    user?: UserUncheckedCreateNestedOneWithoutStudentInput
  }

  export type StudentCreateOrConnectWithoutPreferencesInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutPreferencesInput, StudentUncheckedCreateWithoutPreferencesInput>
  }

  export type CourseCreateWithoutPreferencesInput = {
    id?: string
    name: string
    totalSeats: number
    generalSeats: number
    obcSeats: number
    scSeats: number
    stSeats: number
    allocations?: AllocationCreateNestedManyWithoutCourseInput
  }

  export type CourseUncheckedCreateWithoutPreferencesInput = {
    id?: string
    name: string
    totalSeats: number
    generalSeats: number
    obcSeats: number
    scSeats: number
    stSeats: number
    allocations?: AllocationUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseCreateOrConnectWithoutPreferencesInput = {
    where: CourseWhereUniqueInput
    create: XOR<CourseCreateWithoutPreferencesInput, CourseUncheckedCreateWithoutPreferencesInput>
  }

  export type AllocationCreateWithoutPreferenceInput = {
    id?: string
    allocatedCategory: $Enums.Category
    allocationDate?: Date | string
    student: StudentCreateNestedOneWithoutAllocationInput
    course: CourseCreateNestedOneWithoutAllocationsInput
  }

  export type AllocationUncheckedCreateWithoutPreferenceInput = {
    id?: string
    studentId: string
    courseId: string
    allocatedCategory: $Enums.Category
    allocationDate?: Date | string
  }

  export type AllocationCreateOrConnectWithoutPreferenceInput = {
    where: AllocationWhereUniqueInput
    create: XOR<AllocationCreateWithoutPreferenceInput, AllocationUncheckedCreateWithoutPreferenceInput>
  }

  export type StudentUpsertWithoutPreferencesInput = {
    update: XOR<StudentUpdateWithoutPreferencesInput, StudentUncheckedUpdateWithoutPreferencesInput>
    create: XOR<StudentCreateWithoutPreferencesInput, StudentUncheckedCreateWithoutPreferencesInput>
    where?: StudentWhereInput
  }

  export type StudentUpdateToOneWithWhereWithoutPreferencesInput = {
    where?: StudentWhereInput
    data: XOR<StudentUpdateWithoutPreferencesInput, StudentUncheckedUpdateWithoutPreferencesInput>
  }

  export type StudentUpdateWithoutPreferencesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    marks?: FloatFieldUpdateOperationsInput | number
    category?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    applicationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumStudentStatusFieldUpdateOperationsInput | $Enums.StudentStatus
    allocation?: AllocationUpdateOneWithoutStudentNestedInput
    user?: UserUpdateOneWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutPreferencesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    marks?: FloatFieldUpdateOperationsInput | number
    category?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    applicationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumStudentStatusFieldUpdateOperationsInput | $Enums.StudentStatus
    allocation?: AllocationUncheckedUpdateOneWithoutStudentNestedInput
    user?: UserUncheckedUpdateOneWithoutStudentNestedInput
  }

  export type CourseUpsertWithoutPreferencesInput = {
    update: XOR<CourseUpdateWithoutPreferencesInput, CourseUncheckedUpdateWithoutPreferencesInput>
    create: XOR<CourseCreateWithoutPreferencesInput, CourseUncheckedCreateWithoutPreferencesInput>
    where?: CourseWhereInput
  }

  export type CourseUpdateToOneWithWhereWithoutPreferencesInput = {
    where?: CourseWhereInput
    data: XOR<CourseUpdateWithoutPreferencesInput, CourseUncheckedUpdateWithoutPreferencesInput>
  }

  export type CourseUpdateWithoutPreferencesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    totalSeats?: IntFieldUpdateOperationsInput | number
    generalSeats?: IntFieldUpdateOperationsInput | number
    obcSeats?: IntFieldUpdateOperationsInput | number
    scSeats?: IntFieldUpdateOperationsInput | number
    stSeats?: IntFieldUpdateOperationsInput | number
    allocations?: AllocationUpdateManyWithoutCourseNestedInput
  }

  export type CourseUncheckedUpdateWithoutPreferencesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    totalSeats?: IntFieldUpdateOperationsInput | number
    generalSeats?: IntFieldUpdateOperationsInput | number
    obcSeats?: IntFieldUpdateOperationsInput | number
    scSeats?: IntFieldUpdateOperationsInput | number
    stSeats?: IntFieldUpdateOperationsInput | number
    allocations?: AllocationUncheckedUpdateManyWithoutCourseNestedInput
  }

  export type AllocationUpsertWithoutPreferenceInput = {
    update: XOR<AllocationUpdateWithoutPreferenceInput, AllocationUncheckedUpdateWithoutPreferenceInput>
    create: XOR<AllocationCreateWithoutPreferenceInput, AllocationUncheckedCreateWithoutPreferenceInput>
    where?: AllocationWhereInput
  }

  export type AllocationUpdateToOneWithWhereWithoutPreferenceInput = {
    where?: AllocationWhereInput
    data: XOR<AllocationUpdateWithoutPreferenceInput, AllocationUncheckedUpdateWithoutPreferenceInput>
  }

  export type AllocationUpdateWithoutPreferenceInput = {
    id?: StringFieldUpdateOperationsInput | string
    allocatedCategory?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    allocationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentUpdateOneRequiredWithoutAllocationNestedInput
    course?: CourseUpdateOneRequiredWithoutAllocationsNestedInput
  }

  export type AllocationUncheckedUpdateWithoutPreferenceInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    courseId?: StringFieldUpdateOperationsInput | string
    allocatedCategory?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    allocationDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentCreateWithoutAllocationInput = {
    id?: string
    name: string
    marks: number
    category: $Enums.Category
    applicationDate?: Date | string
    status?: $Enums.StudentStatus
    preferences?: PreferenceCreateNestedManyWithoutStudentInput
    user?: UserCreateNestedOneWithoutStudentInput
  }

  export type StudentUncheckedCreateWithoutAllocationInput = {
    id?: string
    name: string
    marks: number
    category: $Enums.Category
    applicationDate?: Date | string
    status?: $Enums.StudentStatus
    preferences?: PreferenceUncheckedCreateNestedManyWithoutStudentInput
    user?: UserUncheckedCreateNestedOneWithoutStudentInput
  }

  export type StudentCreateOrConnectWithoutAllocationInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutAllocationInput, StudentUncheckedCreateWithoutAllocationInput>
  }

  export type CourseCreateWithoutAllocationsInput = {
    id?: string
    name: string
    totalSeats: number
    generalSeats: number
    obcSeats: number
    scSeats: number
    stSeats: number
    preferences?: PreferenceCreateNestedManyWithoutCourseInput
  }

  export type CourseUncheckedCreateWithoutAllocationsInput = {
    id?: string
    name: string
    totalSeats: number
    generalSeats: number
    obcSeats: number
    scSeats: number
    stSeats: number
    preferences?: PreferenceUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseCreateOrConnectWithoutAllocationsInput = {
    where: CourseWhereUniqueInput
    create: XOR<CourseCreateWithoutAllocationsInput, CourseUncheckedCreateWithoutAllocationsInput>
  }

  export type PreferenceCreateWithoutAllocationInput = {
    id?: string
    priority: number
    status?: $Enums.PreferenceStatus
    student: StudentCreateNestedOneWithoutPreferencesInput
    course: CourseCreateNestedOneWithoutPreferencesInput
  }

  export type PreferenceUncheckedCreateWithoutAllocationInput = {
    id?: string
    studentId: string
    courseId: string
    priority: number
    status?: $Enums.PreferenceStatus
  }

  export type PreferenceCreateOrConnectWithoutAllocationInput = {
    where: PreferenceWhereUniqueInput
    create: XOR<PreferenceCreateWithoutAllocationInput, PreferenceUncheckedCreateWithoutAllocationInput>
  }

  export type StudentUpsertWithoutAllocationInput = {
    update: XOR<StudentUpdateWithoutAllocationInput, StudentUncheckedUpdateWithoutAllocationInput>
    create: XOR<StudentCreateWithoutAllocationInput, StudentUncheckedCreateWithoutAllocationInput>
    where?: StudentWhereInput
  }

  export type StudentUpdateToOneWithWhereWithoutAllocationInput = {
    where?: StudentWhereInput
    data: XOR<StudentUpdateWithoutAllocationInput, StudentUncheckedUpdateWithoutAllocationInput>
  }

  export type StudentUpdateWithoutAllocationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    marks?: FloatFieldUpdateOperationsInput | number
    category?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    applicationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumStudentStatusFieldUpdateOperationsInput | $Enums.StudentStatus
    preferences?: PreferenceUpdateManyWithoutStudentNestedInput
    user?: UserUpdateOneWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutAllocationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    marks?: FloatFieldUpdateOperationsInput | number
    category?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    applicationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumStudentStatusFieldUpdateOperationsInput | $Enums.StudentStatus
    preferences?: PreferenceUncheckedUpdateManyWithoutStudentNestedInput
    user?: UserUncheckedUpdateOneWithoutStudentNestedInput
  }

  export type CourseUpsertWithoutAllocationsInput = {
    update: XOR<CourseUpdateWithoutAllocationsInput, CourseUncheckedUpdateWithoutAllocationsInput>
    create: XOR<CourseCreateWithoutAllocationsInput, CourseUncheckedCreateWithoutAllocationsInput>
    where?: CourseWhereInput
  }

  export type CourseUpdateToOneWithWhereWithoutAllocationsInput = {
    where?: CourseWhereInput
    data: XOR<CourseUpdateWithoutAllocationsInput, CourseUncheckedUpdateWithoutAllocationsInput>
  }

  export type CourseUpdateWithoutAllocationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    totalSeats?: IntFieldUpdateOperationsInput | number
    generalSeats?: IntFieldUpdateOperationsInput | number
    obcSeats?: IntFieldUpdateOperationsInput | number
    scSeats?: IntFieldUpdateOperationsInput | number
    stSeats?: IntFieldUpdateOperationsInput | number
    preferences?: PreferenceUpdateManyWithoutCourseNestedInput
  }

  export type CourseUncheckedUpdateWithoutAllocationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    totalSeats?: IntFieldUpdateOperationsInput | number
    generalSeats?: IntFieldUpdateOperationsInput | number
    obcSeats?: IntFieldUpdateOperationsInput | number
    scSeats?: IntFieldUpdateOperationsInput | number
    stSeats?: IntFieldUpdateOperationsInput | number
    preferences?: PreferenceUncheckedUpdateManyWithoutCourseNestedInput
  }

  export type PreferenceUpsertWithoutAllocationInput = {
    update: XOR<PreferenceUpdateWithoutAllocationInput, PreferenceUncheckedUpdateWithoutAllocationInput>
    create: XOR<PreferenceCreateWithoutAllocationInput, PreferenceUncheckedCreateWithoutAllocationInput>
    where?: PreferenceWhereInput
  }

  export type PreferenceUpdateToOneWithWhereWithoutAllocationInput = {
    where?: PreferenceWhereInput
    data: XOR<PreferenceUpdateWithoutAllocationInput, PreferenceUncheckedUpdateWithoutAllocationInput>
  }

  export type PreferenceUpdateWithoutAllocationInput = {
    id?: StringFieldUpdateOperationsInput | string
    priority?: IntFieldUpdateOperationsInput | number
    status?: EnumPreferenceStatusFieldUpdateOperationsInput | $Enums.PreferenceStatus
    student?: StudentUpdateOneRequiredWithoutPreferencesNestedInput
    course?: CourseUpdateOneRequiredWithoutPreferencesNestedInput
  }

  export type PreferenceUncheckedUpdateWithoutAllocationInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    courseId?: StringFieldUpdateOperationsInput | string
    priority?: IntFieldUpdateOperationsInput | number
    status?: EnumPreferenceStatusFieldUpdateOperationsInput | $Enums.PreferenceStatus
  }

  export type PreferenceCreateManyStudentInput = {
    id?: string
    courseId: string
    priority: number
    status?: $Enums.PreferenceStatus
  }

  export type PreferenceUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    priority?: IntFieldUpdateOperationsInput | number
    status?: EnumPreferenceStatusFieldUpdateOperationsInput | $Enums.PreferenceStatus
    course?: CourseUpdateOneRequiredWithoutPreferencesNestedInput
    allocation?: AllocationUpdateOneWithoutPreferenceNestedInput
  }

  export type PreferenceUncheckedUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    courseId?: StringFieldUpdateOperationsInput | string
    priority?: IntFieldUpdateOperationsInput | number
    status?: EnumPreferenceStatusFieldUpdateOperationsInput | $Enums.PreferenceStatus
    allocation?: AllocationUncheckedUpdateOneWithoutPreferenceNestedInput
  }

  export type PreferenceUncheckedUpdateManyWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    courseId?: StringFieldUpdateOperationsInput | string
    priority?: IntFieldUpdateOperationsInput | number
    status?: EnumPreferenceStatusFieldUpdateOperationsInput | $Enums.PreferenceStatus
  }

  export type PreferenceCreateManyCourseInput = {
    id?: string
    studentId: string
    priority: number
    status?: $Enums.PreferenceStatus
  }

  export type AllocationCreateManyCourseInput = {
    id?: string
    studentId: string
    preferenceId: string
    allocatedCategory: $Enums.Category
    allocationDate?: Date | string
  }

  export type PreferenceUpdateWithoutCourseInput = {
    id?: StringFieldUpdateOperationsInput | string
    priority?: IntFieldUpdateOperationsInput | number
    status?: EnumPreferenceStatusFieldUpdateOperationsInput | $Enums.PreferenceStatus
    student?: StudentUpdateOneRequiredWithoutPreferencesNestedInput
    allocation?: AllocationUpdateOneWithoutPreferenceNestedInput
  }

  export type PreferenceUncheckedUpdateWithoutCourseInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    priority?: IntFieldUpdateOperationsInput | number
    status?: EnumPreferenceStatusFieldUpdateOperationsInput | $Enums.PreferenceStatus
    allocation?: AllocationUncheckedUpdateOneWithoutPreferenceNestedInput
  }

  export type PreferenceUncheckedUpdateManyWithoutCourseInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    priority?: IntFieldUpdateOperationsInput | number
    status?: EnumPreferenceStatusFieldUpdateOperationsInput | $Enums.PreferenceStatus
  }

  export type AllocationUpdateWithoutCourseInput = {
    id?: StringFieldUpdateOperationsInput | string
    allocatedCategory?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    allocationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentUpdateOneRequiredWithoutAllocationNestedInput
    preference?: PreferenceUpdateOneRequiredWithoutAllocationNestedInput
  }

  export type AllocationUncheckedUpdateWithoutCourseInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    preferenceId?: StringFieldUpdateOperationsInput | string
    allocatedCategory?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    allocationDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AllocationUncheckedUpdateManyWithoutCourseInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    preferenceId?: StringFieldUpdateOperationsInput | string
    allocatedCategory?: EnumCategoryFieldUpdateOperationsInput | $Enums.Category
    allocationDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}