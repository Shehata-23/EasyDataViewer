/* eslint-disable react/prop-types */
export default function CustomersTable({ data }) {
  return (
    <table className="w-full rounded-xl text-white mt-2">
      <thead className="bg-blue-950 border-b-4 border-white">
        <tr className="mb-2">
          <th className="p-4 rounded-l-md text-center">Id</th>
          <th className="p-4 text-center">Customer Id</th>
          <th className="p-4 text-center">Customer Name</th>
          <th className="p-4 text-center">Transaction Amount</th>
          <th className="p-4 rounded-r-md text-center">Transaction Date</th>
        </tr>
      </thead>
      <tbody>
        {data.length == 0 ? (
          <tr>
            <td className="p-3 text-blue-950 bg-white">
              {"No Transactions to show ... "}
            </td>
          </tr>
        ) : (
          data.map((item) => {
            return (
              <tr
                key={item.id}
                className="fade-in text-blue-950 bg-slate-200 border-b-white border-b-8"
              >
                <td className="p-3 text-center">{item.id}</td>
                <td className="p-3 text-center">{item.customer_id}</td>
                <td className="p-3 text-center">{item.name}</td>
                <td className="p-3 text-center">{item.amount}</td>
                <td className="p-3 text-center">{item.date}</td>
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
}
