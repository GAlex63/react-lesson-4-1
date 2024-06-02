import logo from './logo.svg';
import './App.css';
// import Form from './components/Form';
import Form from './components/Form';
import FormYup from './components/FormYup';
import FormRHF from './components/FormRHF';

export const App = () => {
	return (
		<div className="App">
			{/* <header className="App-header">Регистрационная форма</header> */}
			<Form />
			{/* <FormYup /> */}
			{/* <FormRHF /> */}
		</div>
	);
};
