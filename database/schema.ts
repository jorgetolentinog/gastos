import { bigint, pgTable, smallint, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
  id: uuid("id").primaryKey(),
  email: varchar("email").notNull().unique(),
});

export const currencyTable = pgTable("currency", {
  id: uuid("id").primaryKey(),
  code: varchar("code", { length: 3 }).notNull().unique(),
  name: text("name").notNull(),
  minorUnits: smallint("minor_units").notNull(),
  flag: text("flag").notNull(),
});

export const accountTable = pgTable("account", {
  accountId: uuid("account_id").primaryKey(),
  userId: uuid("user_id").notNull().references(() => userTable.id),
  // provider: text("provider"),
  name: text("name").notNull(),
  currency: uuid("currency").notNull().references(() => currencyTable.id),
  initialBalanceMinor: bigint("initial_balance_minor", { mode: "bigint" }).notNull(),
  // balanceMinor: bigint("balance_minor", { mode: "bigint" }).notNull(),
  // aprBps: integer("apr_bps").notNull(),
});

export const categoryTable = pgTable("category", {
  id: uuid("id").primaryKey(),
  name: text("name").notNull(),
});

export const transactionTable = pgTable("transaction", {
  transactionId: uuid("transaction_id").primaryKey(),
  accountId: uuid("account_id").notNull().references(() => accountTable.accountId),
  categoryId: uuid("category_id").notNull().references(() => categoryTable.id),
  amountMinor: bigint("amount_minor", { mode: "bigint" }).notNull(),
  description: text("description"),
  date: timestamp("date", {withTimezone: true}).notNull(),
});
