import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function SpinSessions(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
//   const store = useSelector((store) => store);
//   const [heading, setHeading] = useState('Functional Component');
const history = useHistory();
  return (
    <div>
      <h2>In spin session</h2>
      <button onClick={()=>history.push("/spins/add")}>Add Spins</button>
      <button onClick={()=>history.push("/spins/details")}>Single Spins Details</button>
    </div>
  );
}

export default SpinSessions;