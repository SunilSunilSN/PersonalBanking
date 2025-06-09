import React, { useEffect, useState } from "react";
import { Table, Graph } from "shared-services";
function AccountDetails(AccountDtls) {
  const sampleData = [
    { name: "Mon", value: 30 },
    { name: "Tue", value: 45 },
    { name: "Wed", value: 28 },
    { name: "Thu", value: 60 },
    { name: "Fri", value: 50 },
    { name: "Sat", value: 70 },
    { name: "Sun", value: 55 },
  ];
  const graphTitle = "Recent Transaction Statistics";
  const [RecentTran, setRecentTran] = useState([]);
  function AccountClick(row) {
    console.log(row);
  }
  const getRecentTran = async (req) => {
    const data = await window.ServerCall("recentTransAPI", req);
    if (data.success) {
      const RecentData = data.data;
      setRecentTran(RecentData);
    } else {
      window.showAlert({
        AlertType: "E",
        AlertDesc: data.message,
        Btns: [
          {
            Name: "Ok",
            function: () => {
              ""; //window.launchMicroApp("account", "AccountsPage", "BaseScreenID");
            },
          },
        ],
      });
    }
  };
  useEffect(() => {
    if (AccountDtls?.AccountNumber && AccountDtls?.CIF) {
      getRecentTran({
        CIF: AccountDtls.CIF,
        AccountNumber: AccountDtls.AccountNumber,
      });
    }
    console.log(AccountDtls);
  }, [AccountDtls.AccountNumber]);
  const columns = [
    { key: "FullName", label: "Full Number", onClick: AccountClick },
    {
      key: "TransactionDate",
      label: "Date",
      render: (row) =>
        new Date(row.TransactionDate).toLocaleString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      onClick: AccountClick,
    },
    { key: "TransactionID", label: "Trnasction ID", onClick: AccountClick },
    { key: "TransactionAmount", label: "Amount", onClick: AccountClick },
    {
      key: "TransactionStatus",
      label: "Status",
      render: (row) => {
        const stat = row.TransactionStatus;
        if (stat === "SUCCESS")
          return <div className="text-green-500"> {row.TransactionStatus}</div>;
        if (stat === "PENDING")
          return (
            <div className="text-orange-500"> {row.TransactionStatus}</div>
          );
        if (stat === "FAILURE")
          return <div className="text-red-500"> {row.TransactionStatus}</div>;
      },
      onClick: AccountClick,
    },
  ];
  return (
    <div className="relative flex space-x-4 h-full bg-white p-4 rounded-xl shadow">
      <div className="bg-white h-full">
        <div className="flex-1 gap-[30px] pb-4 h-44">
          <div className="bg-gray-200  p-4 rounded-2xl  shadow hover:shadow-lg transition duration-300 ">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-gray-500">
                {AccountDtls.Type}
              </div>
            </div>
            <div className="text-2xl font-semibold text-gray-900">
              {`Hi, ${AccountDtls.FullName}`}
            </div>
            <div className="text-2xl font-semibold text-gray-900">
              {`Total Balance: ${AccountDtls.AvailableBalance}`}
            </div>
            <div className="text-2xl font-semibold text-gray-900">
              {`Account Number: ${AccountDtls.AccountNumber}`}
            </div>
            <div className="text-sm text-gray-400 mt-1"></div>
          </div>
        </div>
        <div className="text-sm font-medium text-gray-500 mt-4 mb-2">
          {"Recent Transactions"}
        </div>
        <Graph data={sampleData} title={graphTitle} type={"Line"}></Graph>
      </div>
      <div className="flex-1">
        <Table
          columns={columns}
          data={RecentTran}
          loading={false}
          rowsPerPage={5}
          onClick={AccountClick}
        />
      </div>
    </div>
  );
}
export default AccountDetails;
