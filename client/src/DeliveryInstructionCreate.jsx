import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function DeliveryInstructionCreate() {


  // Clear the flag after the user enters the /create_so page:
  useEffect(() => {
    localStorage.removeItem('fromSO'); // Clear the programmatic access flag
  }, []);

  return (
    <div>
      <h1>This is Create Delivery Instruction</h1>
    </div>
  );
}


export default DeliveryInstructionCreate;