import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { loadSubscription } from '../actions';
import { patchData } from '../api';
import Card from '../styled/Card';
import { H2, P } from '../styled/GlobalElements';
import { Button } from '../styled/Button';

type Props = {
  loading: boolean;
  startUpdatePayment: () => void;
  finishUpdatePayment: () => void;
  finishUpdatePaymentFail: () => void;
  stripe?: any;
};

const UpdatePaymentCheckoutForm = ({
  loading,
  startUpdatePayment,
  finishUpdatePayment,
  finishUpdatePaymentFail,
  stripe,
}: Props) => {
  const [error, setError] = useState<any>(null);
  const dispatch = useDispatch();

  const submit = async () => {
    setError(null);
    startUpdatePayment();
    let { token } = await stripe.createToken({ name: 'Name' });
    patchData('/api/v1/subscriptions', { token: token })
      .then(() => {
        dispatch(loadSubscription());
        finishUpdatePayment();
      })
      .catch((error) => {
        setError(error.detail);
        dispatch(loadSubscription());
        finishUpdatePaymentFail();
      });
  };

  let errorMessage = null;
  if (error) {
    switch (error.code) {
      case '1015':
        errorMessage = (
          <div>
            <H2>Card update could not be processed</H2>
            <P>
              Check that you have entered your payment information correctly or{' '}
              <Link to="/app/help">contact support</Link> if that doesn't help.
            </P>
          </div>
        );
        break;
      case '0000':
        errorMessage = (
          <div>
            <H2>Card update could not be processed</H2>
            <P>
              Oops, you've encountered a bug! Please try again later or{' '}
              <Link to="/app/help">contact support</Link> if this persists.
            </P>
          </div>
        );
        break;
      default:
        errorMessage = (
          <div>
            <H2>Card update could not be processed</H2>
            <P>
              Oops, you've encountered a bug! Please try again later or{' '}
              <Link to="/app/help">contact support</Link> if this persists.
            </P>
          </div>
        );
        break;
    }
  }

  return (
    <div>
      <Card />
      {!loading && error && <div>{errorMessage}</div>}
      {loading ? (
        <div>
          <P>
            Updating your card... <FontAwesomeIcon icon={faSpinner} spin />
          </P>
        </div>
      ) : (
        <Button onClick={submit}>Submit</Button>
      )}
    </div>
  );
};

export default UpdatePaymentCheckoutForm;
