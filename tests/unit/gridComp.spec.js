import { shallowMount } from '@vue/test-utils';

import {
	isHeaderLeaf,
	isHidden,
	sorted
} from '@/components/GridComp/features/features'
import GridComp from '@/components/GridComp/GridComp.vue';

import stachRowOrganizedPackage from './fixtures/stach-row-organized-package.json'

describe('gridComp.vue', () => {
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

	// it('renders correct background-color for the nth-child(odd) of tr element', async () => {
	// 	await wrapper.setProps({ table })

	// 	const oddRows = wrapper.findAll('tr:nth-child(odd)')
	// 	console.log(oddRows.wrappers)
	// 	oddRows.wrappers.forEach(row => {
	// 		expect(row.element.style.backgroundColor).toBe('#ccc')
	// 	})
	// })



	describe('isHidden function', () => {
		it('returns if a column is hidden or not', () => {
			expect(isHidden(table, table.data.rows[0], 2)).toBeTruthy()
			expect(isHidden(table, table.data.rows[0], 3)).toBeFalsy()
		})
	})

	describe('isHeaderLeaf function', () => {
		it('returns if a header is a leaf or not', () => {
			expect(isHeaderLeaf(table.data.rows[0], 0)).toBeFalsy()
			expect(isHeaderLeaf(table.data.rows[0], 1)).toBeFalsy()
			expect(isHeaderLeaf(table.data.rows[2], 0)).toBeTruthy()
		})
	})

	describe('sorted function', () => {
		it('returns a deep clone of given rows', () => {
			const sortedRows = sorted(table.data.rows, 0, true)
			// Assert that the first row is not sorted because it is a header
			expect(sortedRows[0].cells).not.toBe(table.data.rows[0].cells)
		})

		it('sorts ascending order', () => {
			const sortedRows = sorted(table.data.rows, 0, true)
			expect(sortedRows[3].cells[1]).toEqual(0.15)
		})

		it('sorts descending order', () => {
			const sortedRows = sorted(table.data.rows, 0, false)
			expect(sortedRows[3].cells[1]).toEqual(100)
		})

		it('orders null values at the end when sorted ascending order', () => {
			const sortedRows = sorted(table.data.rows, 0, true)
			expect(sortedRows[sortedRows.length - 1].cells[1]).toBeNull()
		})

		it('orders null values at the end when sorted ascending order', () => {
			const sortedRows = sorted(table.data.rows, 0, false)
			expect(sortedRows[sortedRows.length - 1].cells[1]).toBeNull()
		})
	})

});
