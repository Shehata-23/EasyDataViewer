import Header from "./components/Header";
import CustomersTable from "./components/CustomersTable";
import CustomersGraph from "./components/CustomersGraph";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { constructTableData } from "./utils/constructTableData";
import { constructGraphData } from "./utils/constructGraphData";

function App() {
  const [initData, setInitdata] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [amountFilter, setAmountFilter] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [graphData, setGraphData] = useState({});

  useEffect(() => {
    const getData = async () => {
      const customersData = await axios.get(
        "https://my-json-server.typicode.com/Shehata-23/EasyDataViewer/customers"
      );
      const transactionsData = await axios.get(
        "https://my-json-server.typicode.com/Shehata-23/EasyDataViewer/transactions"
      );
      const tableData = constructTableData(
        customersData.data,
        transactionsData.data
      );
      setInitdata([...tableData]);
      setFilteredData([...tableData]);
    };

    getData();
  }, []);

  useEffect(() => {
    if (nameFilter.length != 0 && amountFilter != 0) {
      const filtered = initData.filter((item) => {
        return (
          item.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
          item.amount == amountFilter
        );
      });

      setFilteredData([...filtered]);
    } else if (nameFilter.length != 0) {
      const filtered = initData.filter((item) => {
        return item.name.toLowerCase().includes(nameFilter.toLowerCase());
      });

      setFilteredData([...filtered]);
    } else if (amountFilter.length != 0) {
      const filtered = initData.filter((item) => {
        return item.amount == amountFilter;
      });

      setFilteredData([...filtered]);
    } else {
      setFilteredData([...initData]);
    }
  }, [initData, nameFilter, amountFilter]);

  useEffect(() => {
    const { dates, dataSets } = constructGraphData(filteredData);
    setGraphData({
      dates,
      dataSets,
    });
  }, [filteredData]);

  return (
    <>
      <header className="bg-blue-950 shadow-md sticky top-0 z-50">
        <Header />
      </header>
      <main className="flex flex-col gap-4 items-center justify-center mx-auto w-full md:max-w-5xl">
        <section className="bg-slate-200 shadow-md w-full flex flex-col gap-2 md:flex-row md:gap-4 items-center p-3 rounded-md mt-4">
          <input
            type="text"
            name="nameFilter"
            id="nameFilter"
            placeholder="Search by Customer name .."
            className="block w-full rounded-md border-0 py-2.5 pl-7 pr-20 text-blue-950 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-950 sm:text-sm sm:leading-6"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
          />
          <input
            type="number"
            name="amountFilter"
            id="amountFilter"
            placeholder="Search by transaction amount .."
            className="block w-full rounded-md border-0 py-2.5 pl-7 pr-20 text-blue-950 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-950 sm:text-sm sm:leading-6"
            value={amountFilter}
            onChange={(e) => setAmountFilter(e.target.value)}
          />
        </section>
        <section className="flex shadow-md w-full overflow-x-auto">
          <CustomersTable data={filteredData} />
        </section>
        <section className="shadow-md w-full">
          <CustomersGraph data={graphData} />
        </section>
      </main>
    </>
  );
}

export default App;
