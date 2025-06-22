import React from "react";
import { useState, useRef } from "react";
import { Input, Slider } from "shared-services";
const Calculator = (Type) => {
  const Refs = {
    userNameRefId: { ref: useRef(null), field: "userName" },
    passwordRef: { ref: useRef(null), field: "password" },
  };
  const [errors, setErrors] = useState({});
  const btnRef = useRef(null);
  const slideData = [
  { image: 'https://via.placeholder.com/600x300?text=Slide+1' },
  { image: 'https://via.placeholder.com/600x300?text=Slide+2' },
  { image: 'https://via.placeholder.com/600x300?text=Slide+3' },
];
  return (
    <div class="calculator" id="Calclator">
      <h2>Loan Calculator</h2>
      <input
        type="number"
        id="principal"
        placeholder="Loan Amount (e.g. 100000)"
      />
      <Input
        ref={Refs.userNameRefId.ref}
        id="principal"
        data-type="userName"
        placeholder="Please type here&hellip;"
        onChange={(e) => window.errorDisplay(setErrors, e, "userName")}
        onClick={(e) => window.errorOnClick(setErrors, e, "userName")}
        name="userName"
      />
      <input
        type="number"
        id="interest"
        placeholder="Annual Interest Rate (%)"
      />
      <input type="number" id="months" placeholder="Loan Term (in Months)" />
      <input
        type="number"
        id="partial"
        placeholder="Partial Payment Amount (optional)"
      />
      <select id="frequency">
        <option value="0">Partial Payment Frequency (optional)</option>
        <option value="3">Every 3 Months</option>
        <option value="6">Every 6 Months</option>
        <option value="12">Every 12 Months</option>
      </select>
      <button onclick={() => LoanCalculate()}>Calculate</button>
      <div class="result" id="result"></div>
          <div className="p-4">
      <Slider slides={slideData} />
    </div>
      {/* <canvas id="loanChart" style="max-width: 100%; margin-top: 2rem"></canvas> */}
    </div>
  );
};
const formatINR = (num) => {
  return "₹" + new Intl.NumberFormat("en-IN").format(Math.round(num));
};
const LoanCalculator = () => {
  return;
};

const LoanCalculate = () => {
  {
    const principal = parseFloat(document.getElementById("principal").value);
    const annualRate = parseFloat(document.getElementById("interest").value);
    const totalMonths = parseInt(document.getElementById("months").value);
    const partialPayment =
      parseFloat(document.getElementById("partial").value) || 0;
    const frequency = parseInt(document.getElementById("frequency").value) || 0;

    const resultBox = document.getElementById("result");
    resultBox.innerHTML = "";

    if (
      isNaN(principal) ||
      isNaN(annualRate) ||
      isNaN(totalMonths) ||
      principal <= 0 ||
      annualRate < 0 ||
      totalMonths <= 0
    ) {
      resultBox.textContent = "Please enter valid loan details.";
      return;
    }

    const r = annualRate / 1200;
    const emi =
      (principal * r * Math.pow(1 + r, totalMonths)) /
      (Math.pow(1 + r, totalMonths) - 1);
    const roundedEMI = Math.round(emi);
    const monthlySaving =
      partialPayment && frequency ? partialPayment / frequency : 0;
    const totalOutflow = roundedEMI + monthlySaving;

    // Original plan
    let origBalance = principal;
    let origInterest = 0;
    let origData = [];
    for (let i = 0; i < totalMonths; i++) {
      const interest = origBalance * r;
      origInterest += interest;
      const principalPart = roundedEMI - interest;
      origBalance -= principalPart;
      origData.push(Math.max(0, Math.round(origBalance)));
    }

    // New plan
    let balance = principal;
    let interestPaid = 0;
    let month = 0;
    let savingsAccum = 0;
    let newData = [];
    let interestData = [];
    let table = `
        <table>
          <thead>
            <tr>
              <th>Month</th>
              <th>EMI (₹)</th>
              <th>Saving for Partial (₹)</th>
              <th>Total Outflow (₹)</th>
              <th>Interest (₹)</th>
              <th>Principal (₹)</th>
              <th>Partial Payment (₹)</th>
              <th>Savings Progress</th>
              <th>Remaining Balance (₹)</th>
            </tr>
          </thead>
          <tbody>`;

    while (balance > 0 && month < 600) {
      month++;
      const interest = balance * r;
      let principalPayment = roundedEMI - interest;
      if (balance - principalPayment < 0) {
        principalPayment = balance;
      }

      balance -= principalPayment;
      interestPaid += interest;
      savingsAccum += monthlySaving;
      let partialThisMonth = 0;
      let rowClass = "";
      let trackerBar = "";

      if (frequency && partialPayment > 0 && month % frequency === 0) {
        balance -= partialPayment;
        if (balance < 0) balance = 0;
        partialThisMonth = partialPayment;
        savingsAccum = 0;
        rowClass = "partial";
      }

      if (monthlySaving > 0) {
        const percent = Math.min(
          100,
          Math.round((savingsAccum / partialPayment) * 100)
        );
        trackerBar = `
              <div style="background:#eee; width:100%; height:10px; border-radius:5px;">
                <div style="width:${percent}%; height:100%; background:#17a2b8; border-radius:5px;"></div>
              </div>
              <small>${Math.round(savingsAccum)} / ${partialPayment}</small>`;
      }

      table += `
            <tr class="${rowClass}">
              <td>${month}</td>
              <td>${formatINR(roundedEMI)}</td>
              <td>${formatINR(monthlySaving)}</td>
              <td><strong>${formatINR(totalOutflow)}</strong></td>
              <td>${formatINR(interest)}</td>
              <td>${formatINR(principalPayment)}</td>
              <td>${partialThisMonth ? formatINR(partialThisMonth) : "-"}</td>
              <td>${trackerBar}</td>
              <td>${formatINR(balance)}</td>
            </tr>`;

      newData.push(Math.max(0, Math.round(balance)));
      interestData.push(Math.round(interestPaid));

      if (balance <= 0) {
        table += `<tr class="completed"><td colspan="9">✅ Loan fully paid off in Month ${month}</td></tr>`;
        break;
      }
    }

    table += "</tbody></table>";

    const interestSaved = Math.round(origInterest - interestPaid);
    const monthsSaved = totalMonths - month;
    const yearsSaved = Math.round(monthsSaved / 12);
    const YearsNow = Math.round(month / 12);

    const summary = `
        <div style="margin-top:1rem; background:#f0f9ff; padding:1rem; border-radius:8px; border-left: 5px solid #007bff;">
          <h3>📊 Monthly Budget Overview</h3>
          <p><strong>EMI:</strong> ${formatINR(roundedEMI)}</p>
          <p><strong>Monthly Savings for Partial:</strong> ${formatINR(
            monthlySaving
          )}</p>
          <p><strong>Total Monthly Outflow:</strong> ${formatINR(
            totalOutflow
          )}</p>
        </div>

        <div style="margin-top:1rem; background:#e6ffe6; padding:1rem; border-radius:8px; border-left: 5px solid #28a745;">
          <h3>🎉 Savings Summary</h3>
          <p><strong>Original Interest:</strong> ${formatINR(origInterest)}</p>
          <p><strong>New Interest:</strong> ${formatINR(interestPaid)}</p>
          <p><strong>💰 Interest Saved:</strong> ${formatINR(interestSaved)}</p>
          <p><strong>⏳ Tenure Reduced By:</strong> ${monthsSaved} month(s) ~ In Years ${yearsSaved}</p>
          <p><strong>Total Months Now:</strong> ${month} ~ In Years ${YearsNow}</p>
        </div>`;

    resultBox.innerHTML = `<div style="overflow-y:auto; height: 500px">${table}</div>${summary}`;

    // // Chart
    // const ctx = document.getElementById("loanChart").getContext("2d");
    // if (window.loanChart instanceof Chart) {
    //   window.loanChart.destroy();
    // }

    // window.loanChart = new Chart(ctx, {
    //   type: "line",
    //   data: {
    //     labels: [
    //       ...Array(Math.max(origData.length, newData.length)).keys(),
    //     ].map((i) => `Month ${i + 1}`),
    //     datasets: [
    //       {
    //         label: "Original Balance",
    //         data: origData,
    //         borderColor: "#dc3545",
    //         fill: false,
    //         tension: 0.3,
    //       },
    //       {
    //         label: "New Balance (with Partial)",
    //         data: newData,
    //         borderColor: "#28a745",
    //         fill: false,
    //         tension: 0.3,
    //       },
    //       {
    //         label: "Interest Accumulated",
    //         data: interestData,
    //         borderColor: "#007bff",
    //         borderDash: [5, 5],
    //         fill: false,
    //         tension: 0.3,
    //       },
    //     ],
    //   },
    //   options: {
    //     responsive: true,
    //     plugins: {
    //       title: {
    //         display: true,
    //         text: "Loan Balance & Interest Over Time",
    //         font: { size: 18 },
    //       },
    //     },
    //     interaction: { mode: "index", intersect: false },
    //     scales: {
    //       y: {
    //         beginAtZero: true,
    //         ticks: {
    //           callback: (value) =>
    //             "₹" + new Intl.NumberFormat("en-IN").format(value),
    //         },
    //       },
    //     },
    //   },
    // });
  }
};

export default Calculator;
