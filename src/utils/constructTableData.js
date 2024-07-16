export const constructTableData = (customersData, transactionsData) => {
  const data = transactionsData.map((transaction) => {
    const customer = customersData.find((c) => {
      return c.id == transaction.customer_id;
    });

    return {
      id: transaction.id,
      customer_id: customer.id,
      name: customer.name,
      amount: transaction.amount,
      date: transaction.date,
    };
  });

  return data;
};
