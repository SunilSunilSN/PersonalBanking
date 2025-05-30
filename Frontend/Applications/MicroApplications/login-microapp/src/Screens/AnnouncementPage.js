import React, { useEffect, useState } from "react";
import { Announcement } from "shared-services";
function AnnouncementPage() {
  const [announcements, setAnnouncements] = useState([]);
  const [paused, setPaused] = useState(false);
  const fetchAnnouncements = async () => {
    const data = await window.getCommonData(["Post-Login-Announcement"]);
    const announcementsList = data.find(
      (item) => item.Key === "Post-Login-Announcement"
    );
    if (announcementsList && announcementsList.Value) {
      const announcements = announcementsList.Value.filter(
        (item) =>
          item.Visible === window.getDeviceType() || item.Visible === "Both"
      );
      announcements.sort((a, b) => a.Sequence - b.Sequence);
      if (announcements) setAnnouncements(announcements);
    }
  };
  useEffect(() => {
    fetchAnnouncements(); // ✅ call inside useEffect
  }, []);
  return (
    <>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }

        .marquee {
          white-space: nowrap;
          display: flex;
          animation: marquee 20s linear infinite;
        }
        .paused {
          animation-play-state: paused !important;
        }
      `}</style>
      <div
        className={`marquee relative w-full bg-white overflow-hidden flex items-center h-48 ${
          paused ? "paused" : ""
        }`}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        {announcements.map((announ, index) => {
          return (
            <Announcement
              title={announ.Title}
              description={announ.Description}
              date={announ.Date}
              onDismiss={() => setAnnouncements([])}
            />
          );
        })}
      </div>
    </>
  );
}

export default AnnouncementPage;
