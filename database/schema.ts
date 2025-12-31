import { bigint, bigserial, char, integer, pgTable, serial, text, uuid, varchar } from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
  id: uuid("id").primaryKey(),
  email: varchar("email").notNull().unique(),
});

export const currencyTable = pgTable("currency", {
  id: uuid("id").primaryKey(),
  code: char("code", { length: 3 }).notNull().unique(),
  name: text("name").notNull(),
  flag: varchar("flag", { length: 10 }),
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

// transactions
export const transactionTable = pgTable("transaction", {
  transactionId: uuid("transaction_id").primaryKey(),
  accountId: uuid("account_id").notNull().references(() => accountTable.accountId),
  amountMinor: bigint("amount_minor", { mode: "bigint" }).notNull(),
  description: text("description"),
  date: bigint("date", { mode: "bigint" }).notNull(),
});
