const generateLineColors = () => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);

  return `rgba(${r}, ${g}, ${b}, 1)`;
};

export const constructGraphData = (data) => {
  const customers = {};
  const datesSet = new Set();
  const dataSets = [];

  data.forEach((transaction) => {
    datesSet.add(transaction.date);
  });

  const dates = Array.from(datesSet).sort();

  data.forEach((transaction) => {
    if (customers[transaction.name]) {
      customers[transaction.name].push([transaction.amount, transaction.date]);
    } else {
      customers[transaction.name] = [[transaction.amount, transaction.date]];
    }
  });

  console.log(customers);

  for (const key in customers) {
    customers[key].sort((a, b) => new Date(a[1]) - new Date(b[1]));
  }

  for (const key in customers) {
    const lineData = [];
    const color = generateLineColors();

    dates.forEach((date, dateIdx) => {
      customers[key].forEach((item) => {
        if (item[1] == date) {
          lineData[dateIdx] == 0 || !lineData[dateIdx]
            ? (lineData[dateIdx] = item[0])
            : (lineData[dateIdx] += item[0]);
        } else {
          if (!lineData[dateIdx]) {
            lineData[dateIdx] = 0;
          }
        }
      });
    });

    const line = {
      label: key,
      data: lineData,
      fill: false,
      backgroundColor: color,
      borderColor: color,
    };

    dataSets.push(line);
  }

  return { dates, dataSets };
};
