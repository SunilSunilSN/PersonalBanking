import React from "react";
import { Table, Tabs } from "shared-services";
function AccountDetails(AccountDtls) {
  function AccountClick(row) {
    console.log(row);
  }
  const columns = [
    { key: "Acc", label: "Account Number", onClick: AccountClick },
    { key: "Type", label: "Type", onClick: AccountClick },
    { key: "Bal", label: "Balance/Amount", onClick: AccountClick },
    { key: "Branch", label: "Branch", onClick: AccountClick },
    { key: "actions",label: "Actions",
    },
  ];
  return (
    <div className="relative overflow-hidden h-full bg-white p-4 rounded-xl shadow">
      <div className="bg-white overflow-y-hidden h-full">
        <div className="flex gap-[30px] pb-4 h-44">
          <div className="min-w-[50%] bg-gray-200  p-4 rounded-2xl  shadow hover:shadow-lg transition duration-300 ">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-gray-500">
                {AccountDtls.Type}
              </div>
            </div>
            <div className="text-2xl font-semibold text-gray-900">
              {`Total Balance: ${AccountDtls.Bal}`}
            </div>
            <div className="text-2xl font-semibold text-gray-900">
              {`Account Number: ${AccountDtls.Acc}`}
            </div>
            <div className="text-sm text-gray-400 mt-1"></div>
          </div>
        </div>
        <div className="text-sm font-medium text-gray-500 mt-4 mb-2">
          {"Recent Transactions"}
        </div>
        <div className="w-[50%]">
          <Table
            columns={columns}
            data={[AccountDtls]}
            loading={false}
            rowsPerPage={5}
            onClick={AccountClick}
          />
        </div>
      </div>
    </div>
  );
}
export default AccountDetails;
