import Mappage from '../components/Mappage';
import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('<Mappage />', () => {
	it('renders', () => {
		const wrapper = shallow(<Mappage discipline="plumbing" query="?state=open" />);
		expect(wrapper.exists(".Mappage-map")).toBe(true);
	});

	it('returns correct index', () => {
		const wrapper = shallow(<Mappage />);
		const instance = wrapper.instance();
		expect(instance.nextIndex(2, [0, 0, 0,])).toBe(0);
		expect(instance.prevIndex(2, [0, 0, 0,])).toBe(1);
	});

	it('returns days', () => {
		const wrapper = shallow(<Mappage />);
		const instance = wrapper.instance();
		expect(instance.getDaysUntilDue(new Date().toString())).toBe("Due today");
	});

	it('returns correct color', () => {
		const wrapper = shallow(<Mappage />);
		const instance = wrapper.instance();
		expect(instance.getColor("completed")).toBe("red");
	});

	//TODO: could not run tests. Error: TypeError: Cannot read property '_layerAdd' of null

	// it('shows <Message /> when invalid query is received', () => {
	// 	const wrapper = shallow(<Mappage query="?asdf" />);
	// 	expect(wrapper.exists(".Message-box")).toBe(true);
	// });

	// it('shows popup', () => {
	// 	const wrapper = mount(<Mappage discipline="plumbing" query="?state=open" />);
	// 	const instance = wrapper.instance();
	// 	instance.showPopup(0, instance.markerRef.current);
	// 	expect(wrapper.exists(".leaflet-popup")).toBe(true);
	// });
});

