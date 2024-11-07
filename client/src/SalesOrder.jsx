import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';


function SalesOrder() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const qoToSoRef = queryParams.get('qoToSo'); // Get the reference number from the query params
  const dateQo = queryParams.get('selectedDate'); // Get the reference number from the query params

  console.log('This is from SO',qoToSoRef, 'and date', dateQo);


  return (
    <div>
      
    </div>
  );
}

export default SalesOrder

