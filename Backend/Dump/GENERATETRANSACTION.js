const { faker } = require('@faker-js/faker');
const fs = require('fs');

function generateTransactions(count = 50) {
  const transactions = [];

  for (let i = 0; i < count; i++) {
    const transactionDate = faker.date.between({
      from: new Date("2025-03-11"),
      to: new Date("2025-04-11"),
    });

    const status = faker.helpers.arrayElement(["SUCCESS", "PENDING", "FAILURE"]);
    const type = faker.helpers.arrayElement(["WITHDRAWAL", "DEPOSIT", "TRANSFER"]);

    transactions.push({
      CIF: "1000000001",
      AccountNumber: "123456789",
      AccountCode: "SAV",
      FullName: faker.person.fullName(),
      ToAccountNumber: faker.finance.accountNumber(10),
      ToBankAccount: faker.finance.accountNumber(10),
      ToBankIFSC: `HDFC${faker.number.int({ min: 1000, max: 9999 })}`,
      TransactionAmount: faker.finance.amount(100, 100000, 2),
      TransactionType: type,
      TransactionDate:  { $date: transactionDate.toISOString() },
      TransactionID: `TXN${faker.string.alphanumeric(5).toUpperCase()}`,
      TransactionRefNo: `REF${faker.string.alphanumeric(5).toUpperCase()}`,
      TransactionDesc: faker.lorem.words(3),
      TransactionCharges: faker.number.int({ min: 0, max: 50 }),
      TransactionStatus: status,
    });
  }

  return transactions;
}

// Generate 50 transactions and write to a file
const data = generateTransactions(200);

// Save to JSON file (optional)
// Write to JSON with MongoDB Extended JSON format for date
fs.writeFileSync(
  'TransactionDump3.json',
  JSON.stringify(data, (key, value) => {
    if (value instanceof Date) {
      return { $date: value.toISOString() };
    }
    return value;
  }, 2)
);

console.log("✅ 50 fake transactions generated in TransactionDump.json");
