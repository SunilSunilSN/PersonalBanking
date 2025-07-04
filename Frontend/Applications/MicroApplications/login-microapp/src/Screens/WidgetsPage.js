import React, { useEffect, useState, useCallback } from "react";
import { Widget } from "shared-services";
import AccountsWidget from "../Screens/Widgets/AccountsWidget";
import RecentTransaction from "../Screens/Widgets/RecentTransaction";
import QuicklinksWidget from "./Widgets/QuicklinksWidget";
import CardsWidget from "./Widgets/CardsWidget";
const WidgetComponent = {
  AccountsWidget,
  RecentTransaction,
  QuicklinksWidget,
  CardsWidget
};
function WidgetsPage({start, end}) {
  const [widgets, setWidgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchwidgets = useCallback(async () => {
    setLoading(true);
    const data = await window.getCommonData(["Widgets"]);
      const WidgetsList = data.find((item) => item.Key === "Widgets");
      if (WidgetsList && WidgetsList.Value) {
        const widgets = WidgetsList.Value.filter(
          (visib) =>
            visib.Visible === window.getDeviceType() || visib.Visible === "Both"
        );
        widgets.sort((a, b) => a.Sequence - b.Sequence);
        const VisibleWidgets = widgets.slice(start, end);
        if (VisibleWidgets) setWidgets(VisibleWidgets);
      }
      setLoading(false);
  }, [start, end]);
  useEffect(() => {
    fetchwidgets(); // ✅ call inside useEffect
  }, [fetchwidgets]);
  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {loading
        ? Array(4)
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
                children={WidgetComp ? <WidgetComp id = {WidgetComponent[widget.Name]} /> : null}
              />
            );
          })}
    </div>
  );
}
export default WidgetsPage;
