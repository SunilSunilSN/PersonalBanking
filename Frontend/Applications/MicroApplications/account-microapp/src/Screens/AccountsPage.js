import React, { useEffect, useState, useRef, useCallback } from "react";
import { Table, Tabs, Graph } from "shared-services";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const AccountsPage = () => {
  const hasFetched = useRef(false);
  const [AccountsData, setAccountsData] = useState([]);
  const [AllAccounts, setAllAcconuts] = useState([]);

  const AccountClick = useCallback((row) => {
    window.launchMicroApp("account", "AccountDetails", "BaseScreenID", row);
  }, []);

  const columns = [
    { key: "AccountNumber", label: "Account Number", onClick: AccountClick },
    { key: "Type", label: "Type", onClick: AccountClick },
    { key: "AvailableBalance", label: "Balance/Amount", onClick: AccountClick },
    { key: "HomeBranch", label: "Branch", onClick: AccountClick },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <div className="flex gap-2 justify-center">
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

  const AccountMapper = useCallback(
    async (grouped) => {
      const AccountMapperData = await window.getCommonData([
        "AccountsData-Mapper",
      ]);
      const mapperValue = AccountMapperData[0]?.Value || [];

      const groupedData = Object.entries(grouped).map(([type, accounts]) => {
        const AccCode = accounts[0].AccountCode;
        const mapping = mapperValue.find((el) => el.AccountCode === AccCode);

        const mappedColumns =
          mapping?.Mappers.map((mapper) => ({
            key: mapper.Key,
            label: mapper.Label,
            onClick: AccountClick,
          })) || [];

        const totalBalance =
          accounts
            .reduce(
              (acc, curr) => acc + parseFloat(curr.AvailableBalance || 0),
              0
            )
            .toFixed(2) + " INR";

        return {
          type,
          columns: mappedColumns,
          data: accounts,
          TotalBalance: totalBalance,
        };
      });

      setAccountsData(groupedData);
    },
    [AccountClick]
  );

  const fetchAllAccounts = useCallback(async () => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails")).data;
    const data = await window.ServerCall("AllAccountsAPI", {
      CIF: userDetails.CIF,
    });

    if (!data.success) {
      return window.showAlert({
        AlertType: "E",
        AlertDesc: data.message,
        Btns: [{ Name: "Ok", function: () => "" }],
      });
    }

    const allAcc = data.data || [];
    const grouped = {};

    allAcc.forEach((account) => {
      if (!grouped[account.Type]) grouped[account.Type] = [];
      account.isPrimary = ["456789", "34534345"].includes(account.Acc);
      grouped[account.Type].push(account);
    });

    setAllAcconuts(allAcc);
    AccountMapper(grouped);
  }, [AccountMapper]);

  useEffect(() => {
    if (!hasFetched.current) {
      fetchAllAccounts();
      hasFetched.current = true;
    }
  }, [fetchAllAccounts]);

  function handleEdit(row) {
    console.log("Edit clicked", row);
  }

  function handleDelete(row) {
    console.log("Delete clicked", row);
  }

  function AccountDetails({ Type, Balance, BarData }) {
    return (
      <div className="bg-white overflow-y-hidden h-full">
        <div className="flex gap-[30px] pb-4 h-44">
          <div className="min-w-[100%] bg-gray-200 p-4 rounded-2xl shadow hover:shadow-lg transition duration-300">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-gray-500">{Type}</div>
            </div>
            <div className="text-2xl font-semibold text-gray-900">
              {`Total Balance: ${Balance}`}
            </div>
            <div className="text-sm text-gray-400 mt-1">
              {BarData && (
                <Graph data={BarData} title="graphTitle" type="Bar" />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Tabs
        tabs={
          AccountsData.length > 0
            ? [
                {
                  label: "All Accounts",
                  content: (
                    <div>
                      {/* <AccountDetails
                        Type={"All Accounts"}
                        Balance={
                          AllAccounts.reduce(
                            (acc, curr) =>
                              acc + parseFloat(curr.AvailableBalance || 0),
                            0
                          ).toFixed(2) +
                          " " +
                          "INR"
                        }
                        BarData={Bardatas}
                      /> */}
                      <Table
                        columns={columns}
                        data={AllAccounts}
                        loading={false}
                        rowsPerPage={5}
                        onClick={AccountClick}
                      />
                    </div>
                  ),
                },
                ...AccountsData.map((entry) => ({
                  label: entry.type,
                  content: (
                    <div>
                      <AccountDetails
                        Type={entry.type}
                        Balance={entry.TotalBalance}
                      />
                      <Table
                        columns={entry.columns}
                        data={entry.data}
                        loading={false}
                        rowsPerPage={5}
                        onClick={AccountClick}
                      />
                    </div>
                  ),
                })),
              ]
            : [
                {
                  label: "Loading...",
                  content: (
                    <div>
                      <Table
                        columns={[]}
                        data={[]}
                        loading={true}
                        rowsPerPage={5}
                      />
                    </div>
                  ),
                },
              ]
        }
      />
    </div>
  );
};

export default AccountsPage;
