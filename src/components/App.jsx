import {Phonebook} from 'components/index'


export const App = () => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#2c2b2b'
      }}
    >
      <Phonebook/>
    </div>
  );
};
