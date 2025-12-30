import { bigint, bigserial, char, integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
  id: serial("id").primaryKey(),
  email: varchar("email").notNull().unique(),
});

export const currencyTable = pgTable("currency", {
  id: serial("id").primaryKey(),
  code: char("code", { length: 3 }).notNull().unique(),
  name: text("name").notNull(),
  symbol: varchar("symbol", { length: 10 }),
});

export const accountTable = pgTable("account", {
  accountId: serial("account_id").primaryKey(),
  userId: serial("user_id").notNull().references(() => userTable.id),
  // provider: text("provider"),
  name: text("name").notNull(),
  currency: serial("currency").notNull().references(() => currencyTable.id),
  initialBalanceMinor: bigint("initial_balance_minor", { mode: "bigint" }).notNull(),
  // balanceMinor: bigint("balance_minor", { mode: "bigint" }).notNull(),
  // aprBps: integer("apr_bps").notNull(),
});
