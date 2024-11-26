import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function DeliveryInstructionCreate() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const soToDi = queryParams.get('soToDI'); // Get the reference number from the query params

  // Clear the flag after the user enters the /create_so page:
  useEffect(() => {
    localStorage.removeItem('fromSO'); // Clear the programmatic access flag
  }, []);

  return (
    <div>
      <h1>This is Create Delivery Instruction for so {soToDi}</h1>
    </div>
  );
}


export default DeliveryInstructionCreate;