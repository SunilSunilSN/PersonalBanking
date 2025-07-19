import React, { useEffect, useState, useRef } from "react";
import { Announcement } from "shared-services";
function AnnouncementPage() {
  const [announcements, setAnnouncements] = useState([]);
  const [paused, setPaused] = useState(false);
  const marqueeRef = useRef(null);
  const [scrollWidth, setScrollWidth] = useState(0);
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

  useEffect(() => {
    if (marqueeRef.current) {
      setScrollWidth(marqueeRef.current.scrollWidth);
    }
  }, [announcements]);
  return (
    <>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(calc(-1 * var(--scroll-width, 100%))); }
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
        className={` overflow-hidden w-full `}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        <div
          ref={marqueeRef}
          className={`marquee ${paused ? "paused" : ""}`}
          style={{ "--scroll-width": `${scrollWidth}px` }}
        >
          {announcements.map((announ, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-2 min-w-[300px] max-w-full"
            >
              <Announcement
                title={announ.Title}
                description={announ.Description}
                date={announ.Date}
                onDismiss={() => setAnnouncements([])}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default AnnouncementPage;
