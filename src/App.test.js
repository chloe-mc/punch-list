import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import App from './App';

describe('<App />', () => {
	it('renders', () => {
		const wrapper = shallow(<App />);
		expect(wrapper).toBeTruthy();
	});
});
