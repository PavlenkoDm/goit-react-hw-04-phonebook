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
        color: '#3b3a3a'
      }}
    >
      <Phonebook/>
    </div>
  );
};
