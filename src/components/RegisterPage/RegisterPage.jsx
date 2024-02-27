import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';

function RegisterPage() {
  const history = useHistory();

  return (
    <div>
      <RegisterForm />

      {/* <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/home');
          }}
        >
          home
        </button>
      </center> */}
    </div>
  );
}

export default RegisterPage;
