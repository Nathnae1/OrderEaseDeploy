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
      console.log(data);
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

      <div className="get-top-section">
        <p>Ref No: {data.length > 0 ? data[0].refNum : ''}</p>
        <p>Date: {data.length > 0 ? data[0].Date.split('T')[0] : ''}</p>
        <p>Name: {data.length > 0 ? data[0].Name : ''}</p>
      </div>
      <div className="get-bill-to">
        <p>Bill To: {data.length > 0 ? data[0].BillTo : ''}</p>
      </div>

      <div>
      {data.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>No</th>
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
            {data.map((quotation, index) => (
              <tr key={quotation.id}>
                <td>{++index}</td>
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