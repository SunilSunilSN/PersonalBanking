import React, { useEffect, useState } from "react";
const Header = () => {
  const [headerItems, setHeaderItems] = useState([]);
  const fetchHeaderData = async () => {
    const data = await window.getCommonData([
      "Sunil",
      "Sunil1",
      "Pre-Login-Header",
    ]);
    const PreLoginHeader = data.find((item) => item.Key === "Pre-Login-Header");
    if (PreLoginHeader && PreLoginHeader.Value) {
      const headers = PreLoginHeader.Value.filter(visib => visib.Visible === window.getDeviceType() || visib.Visible === "Both");
      if(headers)
      setHeaderItems(headers);
    }
  };
  useEffect(() => {
    fetchHeaderData(); // ✅ call inside useEffect
  }, []);
  // HeaderData.array.forEach(element => {
  //   console.log("Header Data:", element);
  // });
  return (
    <header style={styles.header}>
      <h1 style={styles.title}>My Personal Banking Application</h1>
      <nav>
        <ul style={styles.navList}>
          {headerItems.map((item, index) => (
            <li key={index}>
              <a href="/" style={styles.navItem}>
                {item.Name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: "#333",
    padding: "1rem",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    margin: 0,
  },
  navList: {
    listStyle: "none",
    display: "flex",
    gap: "1rem",
    margin: 0,
    padding: 0,
  },
  navItem: {
    color: "white",
    textDecoration: "none",
  },
};

export default Header;
