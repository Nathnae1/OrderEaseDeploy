import axios from "axios";
import { useState, useEffect } from "react";

function Quotation(){
  const [id, setId] = useState('');
  const [data, setData] = useState({});
  const [total, setTotal] = useState(0);

  const handleFetch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/get_quotation/${id}`);
      setData(response.data);
      // console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    // Calculate total whenever data changes
    const calculateTotal = () => {
      console.log(Object.values(data));
      const totalBeforeVAT = Object.values(data).reduce((acc, current) => acc + current.BeforeVAT, 0);
      setTotal(totalBeforeVAT);
    };

    calculateTotal();
  }, [data]);

  return (
    <div>
      <div>
      {data.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>refNum</th>
              <th>Name</th>
              <th>Date</th>
              <th>Bill To</th>
              <th>Size</th>
              <th>Description</th>
              <th>QTY</th>
              <th>Colour</th>
              <th>Packing</th>
              <th>Unit Price</th>
              <th>Before VAT</th>
            </tr>
          </thead>
          <tbody>
            {data.map((quotation) => (
              <tr key={quotation.id}>
                <td>{quotation.refNum}</td>
                <td>{quotation.Name}</td>
                <td>{quotation.Date}</td>
                <td>{quotation.BillTo}</td>
                <td>{quotation.Size}</td>
                <td>{quotation.Desc}</td>
                <td>{quotation.QTY}</td>
                <td>{quotation.Colour}</td>
                <td>{quotation.Packing}</td>
                <td>{quotation.UnitPrice}</td>
                <td>{quotation.BeforeVAT}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data available</p>
      )}
      </div>
      <div>
        <p>Total Before VAT: {total}</p>
        <p>VAT: {total * 0.15}</p>
        <p>Total including VAT: {total * 1.15}</p>
      </div>
       <label>Input Pro number</label>
      <input type="text" value={id} placeholder="Enter no" onChange={(e) => setId(e.target.value)}/>
      <button onClick={handleFetch}>Fetch</button>
    </div>
  );
}

export default Quotation