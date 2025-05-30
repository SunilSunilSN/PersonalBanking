import React, { useEffect, useState } from "react";
import { Widget } from "shared-services";
import AccountsWidget from "../Screens/Widgets/AccountsWidget";
import RecentTransaction from "../Screens/Widgets/RecentTransaction";
import QuicklinksWidget from "./Widgets/QuicklinksWidget";
const WidgetComponent = {
  AccountsWidget,
  RecentTransaction,
  QuicklinksWidget
};
function WidgetsPage() {
  const [widgets, setWidgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchwidgets = async () => {
    setLoading(true);
    const data = await window.getCommonData(["Widgets"]);
    setTimeout(() => {
      const WidgetsList = data.find((item) => item.Key === "Widgets");
      if (WidgetsList && WidgetsList.Value) {
        const widgets = WidgetsList.Value.filter(
          (visib) =>
            visib.Visible === window.getDeviceType() || visib.Visible === "Both"
        );
        widgets.sort((a, b) => a.Sequence - b.Sequence);
        if (widgets) setWidgets(widgets);
      }
      setLoading(false);
    }, 2000);
  };
  useEffect(() => {
    fetchwidgets(); // ✅ call inside useEffect
  }, []);
  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {loading
        ? Array(1)
            .fill(null)
            .map((_, i) => <Widget key={i} loading={true} />)
        : widgets.map((widget, index) => {
            const WidgetComp = WidgetComponent[widget.Name];
            return (
              <Widget
                title="Users"
                value="12,430"
                change="-5.4%"
                iconBg="bg-blue-100"
                iconColor="text-blue-600"
                description="Active this week"
                key={index}
                children={WidgetComp ? <WidgetComp /> : null}
              />
            );
          })}
    </div>
  );
}
export default WidgetsPage;
