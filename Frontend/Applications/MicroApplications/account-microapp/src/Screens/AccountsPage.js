import React from "react";
import { Navbar, Table, NavbarLabel, NavbarItem, Tabs } from "shared-services";
import {
  PencilIcon,
  TrashIcon,
  ArrowLongLeftIcon,
} from "@heroicons/react/24/outline";
const AccountsPage = () => {
  const columns = [
    { key: "Acc", label: "Account Number" },
    { key: "Type", label: "Type" },
    { key: "Bal", label: "Balance/Amount" },
    { key: "Branch", label: "Branch" },
    {
      key: "actions",
      label: "Actions",
      isAction: true,
      render: (row) => (
        <div className="flex gap-2">
          <PencilIcon
            onClick={() => handleEdit(row)}
            className="w-5 h-5 text-blue-500 cursor-pointer hover:scale-110 transition"
          />
          <TrashIcon
            onClick={() => handleDelete(row)}
            className="w-5 h-5 text-red-500 cursor-pointer hover:scale-110 transition"
          />
        </div>
      ),
    },
  ];
  function handleEdit(row) {
    console.log("Edit clicked", row);
  }

  function handleDelete(row) {
    console.log("Delete clicked", row);
  }
  const AllAccounts = [
    { Acc: "12313123", Type: "Savings", Bal: "123.78", Branch: "Bangalore" },
    { Acc: "12313123", Type: "Current", Bal: "123.78", Branch: "Bangalore" },
    { Acc: "12313123", Type: "Deposits", Bal: "123.78", Branch: "Bangalore" },
    { Acc: "12313123", Type: "Loans", Bal: "123.78", Branch: "Bangalore" },
    { Acc: "12313123", Type: "PPF", Bal: "123.78", Branch: "Bangalore" },
    { Acc: "12313123", Type: "OD", Bal: "123.78", Branch: "Bangalore" },
    { Acc: "12313123", Type: "Savings", Bal: "123.78", Branch: "Bangalore" },
    { Acc: "12313123", Type: "Deposits", Bal: "123.78", Branch: "Bangalore" },
    { Acc: "12313123", Type: "Savings", Bal: "123.78", Branch: "Bangalore" },
    { Acc: "12313123", Type: "Savings", Bal: "123.78", Branch: "Bangalore" },
    { Acc: "12313123", Type: "Current", Bal: "123.78", Branch: "Bangalore" },
    { Acc: "12313123", Type: "OD", Bal: "123.78", Branch: "Bangalore" },
    { Acc: "12313123", Type: "Current", Bal: "123.78", Branch: "Bangalore" },
    { Acc: "12313123", Type: "Loans", Bal: "123.78", Branch: "Bangalore" },
    { Acc: "12313123", Type: "Deposits", Bal: "123.78", Branch: "Bangalore" },
    { Acc: "12313123", Type: "Savings", Bal: "123.78", Branch: "Bangalore" },
    { Acc: "12313123", Type: "OD", Bal: "123.78", Branch: "Bangalore" },
    { Acc: "12313123", Type: "Savings", Bal: "123.78", Branch: "Bangalore" },
    { Acc: "12313123", Type: "Savings", Bal: "123.78", Branch: "Bangalore" },
    { Acc: "12313123", Type: "Loans", Bal: "123.78", Branch: "Bangalore" },
    { Acc: "12313123", Type: "Savings", Bal: "123.78", Branch: "Bangalore" },
    { Acc: "12313123", Type: "Current", Bal: "123.78", Branch: "Bangalore" },
  ];

  const tabs = [
    {
      label: "All Accounts",
      content: (
        <div>
          <AccountDetails
            Balance={AllAccounts.reduce(
              (acc, curr) => acc + parseFloat(curr.Bal),
              0
            ).toFixed(2)}
          ></AccountDetails>
          <Table columns={columns} data={AllAccounts} loading={false} />
        </div>
      ),
    },
    {
      label: "Saving Account",
      content: (
        <div>
          <AccountDetails
            Balance={AllAccounts.filter((el) => el.Type === "Savings")
              .reduce((acc, curr) => acc + parseFloat(curr.Bal), 0)
              .toFixed(2)}
          ></AccountDetails>
          <Table
            columns={columns}
            data={AllAccounts.filter((el) => el.Type === "Savings")}
            loading={false}
          />
        </div>
      ),
    },
    {
      label: "Current Account",
      content: (
        <div>
          <AccountDetails
            Balance={AllAccounts.filter((el) => el.Type === "Current")
              .reduce((acc, curr) => acc + parseFloat(curr.Bal), 0)
              .toFixed(2)}
          ></AccountDetails>
          <Table
            columns={columns}
            data={AllAccounts.filter((el) => el.Type === "Current")}
            loading={false}
          />
        </div>
      ),
    },
    {
      label: "Deposits",
      content: (
        <div>
          <AccountDetails
            Balance={AllAccounts.filter((el) => el.Type === "Deposits")
              .reduce((acc, curr) => acc + parseFloat(curr.Bal), 0)
              .toFixed(2)}
          ></AccountDetails>
          <Table
            columns={columns}
            data={AllAccounts.filter((el) => el.Type === "Deposits")}
            loading={false}
          />
        </div>
      ),
    },
    {
      label: "Loans",
      content: (
        <div>
          <AccountDetails
            Balance={AllAccounts.filter((el) => el.Type === "Loans")
              .reduce((acc, curr) => acc + parseFloat(curr.Bal), 0)
              .toFixed(2)}
          ></AccountDetails>
          <Table
            columns={columns}
            data={AllAccounts.filter((el) => el.Type === "Loans")}
            loading={false}
          />
        </div>
      ),
    },
    {
      label: "PPF",
      content: (
        <div>
          <AccountDetails
            Balance={AllAccounts.filter((el) => el.Type === "PPF")
              .reduce((acc, curr) => acc + parseFloat(curr.Bal), 0)
              .toFixed(2)}
          ></AccountDetails>
          <Table
            columns={columns}
            data={AllAccounts.filter((el) => el.Type === "PPF")}
            loading={false}
          />
        </div>
      ),
    },
    {
      label: "Over Draft",
      content: (
        <div>
          <AccountDetails
            Balance={AllAccounts.filter((el) => el.Type === "OD")
              .reduce((acc, curr) => acc + parseFloat(curr.Bal), 0)
              .toFixed(2)}
          ></AccountDetails>
          <Table
            columns={columns}
            data={AllAccounts.filter((el) => el.Type === "OD")}
            loading={false}
          />
        </div>
      ),
    },
  ];
  function AccountDetails({ Balance }) {
    return (
      <div className="bg-white overflow-y-hidden h-full">
        <div className="flex gap-[30px] pb-4 h-44">
          <div className="min-w-[100%] bg-gray-200  p-4 rounded-2xl  shadow hover:shadow-lg transition duration-300 ">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-gray-500">
                {"Accounts"}
              </div>
            </div>
            <div className="text-2xl font-semibold text-gray-900">
              {`Total Balance: ${Balance}`}
            </div>
            <div className="text-sm text-gray-400 mt-1">
              {`Total Balance: ${Balance}`}
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Tabs tabs={tabs}></Tabs>
    </div>
  );
};
export default AccountsPage;
