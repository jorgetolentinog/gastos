import {
  bigint,
  pgTable,
  smallint,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
  id: uuid("id").primaryKey(),
  email: varchar("email").notNull().unique(),
});

export const currencyTable = pgTable("currency", {
  id: uuid("id").primaryKey(),
  code: varchar("code", { length: 3 }).notNull().unique(),
  name: text("name").notNull(),
  minorUnits: smallint("minor_units").notNull(),
  emojiFlag: text("emoji_flag").notNull(),
});

export const accountTable = pgTable("account", {
  id: uuid("id").primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => userTable.id),
  // provider: text("provider"),
  name: text("name").notNull(),
  currencyId: uuid("currency_id")
    .notNull()
    .references(() => currencyTable.id),
  initialBalanceMinor: bigint("initial_balance_minor", {
    mode: "bigint",
  }).notNull(),
  // balanceMinor: bigint("balance_minor", { mode: "bigint" }).notNull(),
  // aprBps: integer("apr_bps").notNull(),
});

export const categoryTable = pgTable("category", {
  id: uuid("id").primaryKey(),
  name: text("name").notNull(),
  emojiIcon: text("emoji_icon").notNull(),
});

export const transactionTable = pgTable("transaction", {
  id: uuid("id").primaryKey(),
  accountId: uuid("account_id")
    .notNull()
    .references(() => accountTable.id),
  categoryId: uuid("category_id")
    .notNull()
    .references(() => categoryTable.id),
  amountMinor: bigint("amount_minor", { mode: "bigint" }).notNull(),
  description: text("description"),
  date: timestamp("date", { withTimezone: true }).notNull(),
});
