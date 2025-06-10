import React, { useEffect, useState } from "react";
import { Table, Graph, Label, Input, Tabs } from "shared-services";
import { motion, AnimatePresence } from "framer-motion";
function AccountDetails(AccountDtls) {
  const [loading, setLoading] = useState(false);
  const graphTitle = "Recent Transaction Statistics";
  const sampleData = [
    { name: "Mon", value: 30, valueName: "Testing" },
    { name: "Tue", value: 45, valueName: "Testing" },
    { name: "Wed", value: 28, valueName: "Testing" },
    { name: "Thu", value: 60, valueName: "Testing" },
    { name: "Fri", value: 50, valueName: "Testing" },
    { name: "Sat", value: 70, valueName: "Testing" },
    { name: "Sun", value: 55, valueName: "Testing" },
  ];
  const tabs = [
    {
      label: "Last Month",
    },
    {
      label: "Last 1 Month",
    },
    {
      label: "Last 2 Month",
    },
  ];
  const [RecentTran, setRecentTran] = useState({
    RecTranList: [],
    RecentTranGraph: [],
    RecentTranGraphTile: "Recent Transaction Statistics",
    RecentTranTabs: tabs,
    RecentTranTile: "",
  });
  const [activeTab, setActiveTab] = useState(0);
  function AccountClick(row) {
    window.setModalData({
      isOpen: true,
      ModalTitle: "Account Details",
      ModalChildren: <AccountDetails rowdetails={row} />,
      closeBtn: true,
      Btns: [
        {
          Name: "Ok",
          function: () => "",
        },
        {
          Name: "Close",
          function: () => "",
        },
      ],
    });
  }
  const AccountDetails = (rowdetails) => {
    return (        <Table
          data={[rowdetails]}
          loading={loading}
          rowsPerPage={15}
          onClick={AccountClick}
        />)
  };
  const getRecentTran = async (req) => {
    setLoading(true);
    const data = await window.ServerCall("recentTransAPI", req);
    if (data.success) {
      const RecentData = data.data.RecentTransaction;
      let RecentGraphData = [];
      // RecentData.forEach((elm) =>
      //   RecentGraphData.push({
      //     name: new Date(elm.TransactionDate).toLocaleDateString("en-US", {
      //       month: "short",
      //       day: "2-digit",
      //     }),
      //     value: elm.TransactionAmount,
      //     value2: elm.TransactionType === "TRANSFERelm.TransactionAmount
      //   })
      // );
      RecentGraphData = Object.values(
        RecentData.reduce((acc, txn) => {
          const date = new Date(txn.TransactionDate).toLocaleDateString(
            "en-US",
            {
              month: "short",
              day: "2-digit",
            }
          );
          if (!acc[date]) {
            acc[date] = {
              name: date,
              value: 0,
              value2: 0,
              valueName: "Debit",
              value2Name: "Credit",
            };
          }
          if (txn.TransactionType === "TRANSFER") {
            acc[date].value += txn.TransactionAmount;
          } else if (txn.TransactionType === "WITHDRAWAL") {
            acc[date].value2 += txn.TransactionAmount;
          }
          return acc;
        }, {})
      );
      console.log(RecentGraphData);
      setRecentTran((prev) => ({
        ...prev,
        RecTranList: RecentData,
        RecentTranGraph: RecentGraphData,
      }));
    }
    // } else {
    //   window.showAlert({
    //     AlertType: "E",
    //     AlertDesc: data.message,
    //     Btns: [
    //       {
    //         Name: "Ok",
    //         function: () => {
    //           ""; //window.launchMicroApp("account", "AccountsPage", "BaseScreenID");
    //         },
    //       },
    //     ],
    //   });
    // }
    setLoading(false);
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
    {
      key: "TransactionAmount",
      label: "Amount",
      onClick: AccountClick,
      render: (row) => {
        const stat = row.TransactionType;
        if (stat === "TRANSFER")
          return <div className="text-green-500"> {row.TransactionAmount}</div>;
        if (stat === "WITHDRAWAL")
          return <div className="text-red-500"> {row.TransactionAmount}</div>;
      },
    },
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
  const OnClickFetchTrans = (params) => {
    const trandate = params.currentTarget.textContent;
    if (trandate === "Last 2 Month") {
      getRecentTran({
        CIF: AccountDtls.CIF,
        AccountNumber: AccountDtls.AccountNumber,
      });
    } else if (trandate === "Last month") {
      getRecentTran({
        CIF: AccountDtls.CIF,
        AccountNumber: AccountDtls.AccountNumber,
      });
    }
  };
  return (
    <div className="flex space-x-4 h-full bg-white p-4 rounded-xl shadow">
      <div className="bg-white h-full flex-1">
        <div className="text-sm font-medium text-gray-500 mt-4 mb-2">
          {"Account Details"}
        </div>
        <div className="gap-[30px] h-44 ">
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
        <div className="w-full">
          <Graph
            data={RecentTran.RecentTranGraph}
            title={RecentTran.RecentTranGraphTile}
            type={"Line"}
            loading={loading}
          ></Graph>
        </div>
      </div>
      <div className="flex-1">
        <div className="text-sm font-medium text-gray-500 mt-4 mb-2">
          {"Recent Transactions"}
        </div>
        <div className="pb-4">
          <Tabs
            tabs={[
              {
                label: "Last month",
                labelClick: OnClickFetchTrans,
              },
              {
                label: "Last 2 Month",
                labelClick: OnClickFetchTrans,
              },
              {
                label: "Custom",
                content: (
                  <div className="flex p-4">
                    <div className="flex gap-2 pr-4">
                      <Label>From Transaction</Label>
                      <Input
                        // ref={Refs.userNameRefId.ref}
                        id="LoginPage_userName"
                        data-type="userName"
                        placeholder="Please type here&hellip;"
                        // onChange={(e) => window.errorDisplay(setErrors, e, "userName")}
                        // onClick={(e) => window.errorOnClick(setErrors, e, "userName")}
                        name="userName"
                      />
                    </div>
                    <div className="flex gap-2 pr-4">
                      <Label>To Transaction</Label>
                      <Input
                        // ref={Refs.userNameRefId.ref}
                        id="LoginPage_userName"
                        data-type="userName"
                        placeholder="Please type here&hellip;"
                        // onChange={(e) => window.errorDisplay(setErrors, e, "userName")}
                        // onClick={(e) => window.errorOnClick(setErrors, e, "userName")}
                        name="userName"
                      />
                    </div>
                  </div>
                ),
              },
            ]}
          ></Tabs>
        </div>
        {RecentTran.RecentTranTile && (
          <div className="text-sm font-medium text-gray-500 mt-4 mb-2">
            {RecentTran.RecentTranTile}
          </div>
        )}
        <Table
          columns={columns}
          data={RecentTran.RecTranList}
          loading={loading}
          rowsPerPage={15}
          onClick={AccountClick}
        />
      </div>
    </div>
  );
}
export default AccountDetails;
