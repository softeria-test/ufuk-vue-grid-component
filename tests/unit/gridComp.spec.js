import { shallowMount } from '@vue/test-utils';

import HelloWorld from '@/components/HelloWorld.vue';
import GridComp from '@/components/GridComp/GridComp.vue';

import stachRowOrganizedPackage from './fixtures/stach-row-organized-package.json'

describe('HelloWorld.vue', () => {
	// it('renders props.msg when passed', () => {
	// 	const msg = 'new message';
	// 	const wrapper = shallowMount(HelloWorld, {
	// 		propsData: { msg },
	// 	});
	// 	expect(wrapper.text()).toMatch(msg);
	// });

	let table = null
	let wrapper = null

	beforeEach(() => {
		table = stachRowOrganizedPackage.tables.main
		wrapper = shallowMount(GridComp)
	})

	it('caption is rendered', async () => {
		// setProps is async so we need to await it to make sure it's done before we make our assertions 
		await wrapper.setProps({ table })
		const myElement = wrapper.findAll('.mainTitle'); // find the element with the class name 'mainTitle' 
		expect(myElement.length).toBe(1); // make sure there is only one element with the class name 'mainTitle' 
	});

	it('renders correct count of tr elements', async () => {
		await wrapper.setProps({ table })
		expect(wrapper.findAll('tr').length).toEqual(18) // make sure there are 18 tr elements 
	})

	it('renders correct padding-left for the div of 22nd td element', async () => {
		await wrapper.setProps({ table })
		// make sure the 22nd td element has a div with a style attribute that has a padding-left of 1em
		expect(wrapper.findAll('td').at(21).find('div').attributes('style')).toMatch(/padding-left:\s?1em/) 
	})

});
