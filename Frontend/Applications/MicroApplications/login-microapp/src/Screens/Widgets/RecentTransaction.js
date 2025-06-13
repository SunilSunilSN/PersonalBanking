import React, { useEffect, useState } from "react";
import { Table } from "shared-services";
function RecentTransaction() {
  const [loading, setLoading] = useState(false);
  const [recentData, setrecentData] = useState([]);
  const columns = [
    { key: "TransactionDate", label: "Date" },
    { key: "TransactionAmount", label: "Amount",
            render: (row) => {
        const stat = row.TransactionType;
        if (stat === "WITHDRAWAL" || stat === "DEPOSIT")
          return <div className="text-red-500 "> {row.TransactionAmount}</div>;
        if (stat === "TRANSFER")
          return <div className="text-green-500"> {row.TransactionAmount}</div>;
      }, },
    {
      key: "TransactionDesc",
      label: "Description",

    },
    // {
    //   key: "actions",
    //   label: "Actions",
    //   render: (row) => (
    //     <button className="text-sm text-blue-500 hover:underline">Edit</button>
    //   ),
    // },
  ];

  const getRecentTran = async (req) => {
    setLoading(true);
    const data = await window.ServerCall("recentTransAPI", req);
    if (data.success) {
      const RecentTran = data.data.RecentTransaction;
      RecentTran.forEach(
        (acc) =>
          (acc.TransactionDate = new Date(acc.TransactionDate).toLocaleString(
            "en-IN",
            {
              day: "2-digit",
              month: "short",
              year: "2-digit",
            }
          ))
      );
      setrecentData(data.data.RecentTransaction);
    } else {
      setrecentData([]);
    }
    setLoading(false);
  };
  useEffect(() => {
    getRecentTran({
      CIF: "1000000001",
      AccountNumber: "123456789",
      NoOfTran: 15,
    });
  }, []);
  const data = [
    { Date: "25-May", Amount: "123.00", Remarks: "Payment Received" },
    { Date: "24-Jun", Amount: "123567.00", Remarks: "Payment Sent" },
    { Date: "24-Jun", Amount: "123567.00", Remarks: "Payment Sent" },
    { Date: "24-Jun", Amount: "123567.00", Remarks: "Payment Sent" },
    { Date: "24-Jun", Amount: "123567.00", Remarks: "Payment Sent" },
    { Date: "24-Jun", Amount: "123567.00", Remarks: "Payment Sent" },
  ];
  return (
    <Table
      columns={columns}
      data={recentData}
      loading={loading}
      rowsPerPage={15}
    />
  );
}

export default RecentTransaction;
