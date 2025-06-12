import React, { useEffect, useState, useRef } from "react";
import {
  Table,
  Graph,
  Label,
  Input,
  Tabs,
  Button,
  ErrorMessage,
} from "shared-services";
function AccountDetails(AccountDtls) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const Refs = {
    recentTransFrom: { ref: useRef(null), field: "recentFrom" },
    recentTransTo: { ref: useRef(null), field: "recentTo" },
  };
  const [RecentTran, setRecentTran] = useState({
    RecTranList: [],
    RecentTranGraph: [],
    RecentTranGraphTile: "Recent Transaction Statistics",
    RecentTranTabs: [],
    RecentTranTile: "",
  });
  function AccountClick(row) {
    window.setModalData({
      isOpen: true,
      ModalTitle: "Account Details",
      ModalChildren: <EachAccountDetails rowdetails={row} />,
      closeBtn: true,
      Btns: [
        // {
        //   Name: "Ok",
        //   function: () => "",
        // },
        // {
        //   Name: "Close",
        //   function: () => "",
        // },
      ],
    });
  }
  const EachAccountDetails = (rowdetails) => {
    const AccDtls = rowdetails.rowdetails;
    return (
      <Table
        data={Object.entries(AccDtls).map(([key, value]) => ({
          Title: key,
          Desc: value,
        }))}
        columns={[
          { key: "Title", label: "Account Title" },
          { key: "Desc", label: "Account Desc" },
        ]}
        loading={loading}
        rowsPerPage={20}
        onClick={AccountClick}
      />
    );
  };
  const getRecentTran = async (req) => {
    setLoading(true);
    const data = await window.ServerCall("recentTransAPI", req);
    let RecentGraphData = [];
    let DateDiff = "";
    if (data.success) {
      const RecentData = data.data.RecentTransaction.sort(
        (a, b) => new Date(a.TransactionDate) - new Date(b.TransactionDate)
      );
      if (RecentData.length > 1) {
        DateDiff =
          (new Date(RecentData[RecentData.length - 1].TransactionDate) -
            new Date(RecentData[0].TransactionDate)) /
          (1000 * 60 * 60 * 24);
        if (DateDiff > 7) {
          RecentGraphData = Object.values(
            RecentData.reduce((acc, txn) => {
              const date = new Date(txn.TransactionDate);
              const startOfWeek = new Date(date);
              startOfWeek.setDate(date.getDate() - date.getDay());
              startOfWeek.setHours(0, 0, 0, 0);
              const endOfWeek = new Date(startOfWeek);
              endOfWeek.setDate(startOfWeek.getDate() + 6);
              const weekKey = startOfWeek.toISOString();
              const formatDate = (d) =>
                d.toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                });
              if (!acc[weekKey]) {
                acc[weekKey] = {
                  date: startOfWeek,
                  name: `${formatDate(startOfWeek)}-${formatDate(endOfWeek)}`,
                  value: 0,
                  value2: 0,
                  valueName: "Debit",
                  value2Name: "Credit",
                  lineColour: "#C62828",
                  line2Colour: "#82ca9d",
                };
              }
              if (txn.TransactionType === "TRANSFER") {
                acc[weekKey].value += parseInt(txn.TransactionAmount);
              } else if (txn.TransactionType === "WITHDRAWAL") {
                acc[weekKey].value2 += parseInt(txn.TransactionAmount);
              }
              return acc;
            }, {})
          ).sort((a, b) => a.date - b.date);
        } else if (DateDiff < 10) {
          RecentGraphData = Object.values(
            RecentData.reduce((acc, txn) => {
              const formDate = new Date(txn.TransactionDate).toLocaleString(
                "en-IN",
                {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }
              );
              if (!acc[formDate]) {
                acc[formDate] = {
                  date: formDate,
                  name: formDate,
                  value: 0,
                  value2: 0,
                  valueName: "Debit",
                  value2Name: "Credit",
                  lineColour: "#C62828",
                  line2Colour: "#82ca9d",
                };
              }
              if (txn.TransactionType === "TRANSFER") {
                acc[formDate].value += parseInt(txn.TransactionAmount);
              } else if (txn.TransactionType === "WITHDRAWAL") {
                acc[formDate].value2 += parseInt(txn.TransactionAmount);
              }
              return acc;
            }, {})
          );
        }
      }
      setRecentTran((prev) => ({
        // ...prev,
        RecTranList: RecentData,
        RecentTranGraph: RecentGraphData,
      }));
      setLoading(false);
    } else {
      setRecentTran((prev) => ({
        // ...prev,
        RecTranList: [],
        RecentTranGraph: [],
      }));
      setLoading(false);
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
  };
  useEffect(() => {
    if (AccountDtls?.AccountNumber && AccountDtls?.CIF) {
      getRecentTran({
        CIF: AccountDtls.CIF,
        AccountNumber: AccountDtls.AccountNumber,
        FromDate: new Date(new Date().setMonth(new Date().getMonth() - 1)),
        ToDate: new Date(),
      });
    }
    console.log(AccountDtls);
  }, [AccountDtls.AccountNumber]);
  const columns = [
    { key: "FullName", label: "Full Name", onClick: AccountClick },
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
        if (stat === "TRANSFER" || stat === "DEPOSIT")
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
        FromDate: new Date(new Date().setMonth(new Date().getMonth() - 2)),
        ToDate: new Date(),
      });
    } else if (trandate === "Last Month") {
      getRecentTran({
        CIF: AccountDtls.CIF,
        AccountNumber: AccountDtls.AccountNumber,
        FromDate: new Date(new Date().setMonth(new Date().getMonth() - 1)),
        ToDate: new Date(),
      });
    } else if (trandate === "Last 3 Month") {
      getRecentTran({
        CIF: AccountDtls.CIF,
        AccountNumber: AccountDtls.AccountNumber,
        FromDate: new Date(new Date().setMonth(new Date().getMonth() - 3)),
        ToDate: new Date(),
      });
    } else if (trandate === "Submit") {
      if (!window.errorDisplayAll(Refs, setErrors)) {
        const RecentReq = {
          CIF: AccountDtls.CIF,
          AccountNumber: AccountDtls.AccountNumber,
          FromDate: new Date(Refs["recentTransFrom"].ref.current.value),
          ToDate: new Date(Refs["recentTransTo"].ref.current.value),
        };
        getRecentTran(RecentReq);
      }
    }
  };
  return (
    <div className="flex space-x-4 h-full bg-white p-4 rounded-xl shadow">
      <div className="bg-white h-full flex-1">
        <div className="text-sm font-medium text-gray-500 mb-2">
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
        <div className="text-sm font-medium text-gray-500 mb-2">
          {"Recent Transactions"}
        </div>
        <div className="pb-4">
          <Tabs
            tabs={[
              {
                label: "Last Month",
                labelClick: OnClickFetchTrans,
              },
              {
                label: "Last 2 Month",
                labelClick: OnClickFetchTrans,
              },
              {
                label: "Last 3 Month",
                labelClick: OnClickFetchTrans,
              },
              {
                label: "Custom",
                labelClick: OnClickFetchTrans,
                content: (
                  <div className="flex">
                    <div className="gap-2 pr-4">
                      <Label>From Transaction</Label>
                      <Input
                        ref={Refs.recentTransFrom.ref}
                        id="RecentTrans_FromDate"
                        data-type="recentFrom"
                        type="Date"
                        placeholder="Please Select From Date&hellip;"
                        onChange={(e) =>
                          window.errorDisplay(setErrors, e, "recentFrom")
                        }
                        onClick={(e) =>
                          window.errorOnClick(setErrors, e, "recentFrom")
                        }
                        name="userName"
                      />
                      {errors.recentFrom && (
                        <ErrorMessage>{errors.recentFrom}</ErrorMessage>
                      )}
                    </div>
                    <div className="gap-2 pr-4">
                      <Label>To Transaction</Label>
                      <Input
                        ref={Refs.recentTransTo.ref}
                        id="RecentTrans_ToDate"
                        data-type="recentTO"
                        type="Date"
                        placeholder="Please Select To Date&hellip;"
                        onChange={(e) =>
                          window.errorDisplay(setErrors, e, "recentTo")
                        }
                        onClick={(e) =>
                          window.errorOnClick(setErrors, e, "recentTo")
                        }
                        name="userName"
                      />
                      {errors.recentTo && (
                        <ErrorMessage>{errors.recentTo}</ErrorMessage>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="lg"
                      className="gap-2 w-full"
                      onClick={(e) => OnClickFetchTrans(e)}
                    >
                      Submit
                    </Button>
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
          rowsPerPage={10}
          onClick={AccountClick}
        />
      </div>
    </div>
  );
}
export default AccountDetails;
