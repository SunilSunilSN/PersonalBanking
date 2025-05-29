import React from "react";
import { Table } from "shared-services";
function RecentTransaction() {
  const columns = [
    { key: "Date", label: "Date" },
    { key: "Amount", label: "Amount" },
      { key: "Remarks", label: "Remarks" },
      // {
      //   key: "actions",
      //   label: "Actions",
      //   render: (row) => (
      //     <button className="text-sm text-blue-500 hover:underline">Edit</button>
      //   ),
      // },
  ];

  const data = [
    { Date: "25-May", Amount: "123.00", Remarks: "Payment Received" },
    { Date: "24-Jun", Amount: "123567.00", Remarks: "Payment Sent" },
    { Date: "24-Jun", Amount: "123567.00", Remarks: "Payment Sent" },
    { Date: "24-Jun", Amount: "123567.00", Remarks: "Payment Sent" },
    { Date: "24-Jun", Amount: "123567.00", Remarks: "Payment Sent" },
    { Date: "24-Jun", Amount: "123567.00", Remarks: "Payment Sent" },
  ];
  return (
    <div>
      <Table columns={columns} data={data} loading={false} />
    </div>
  );
}

export default RecentTransaction;
