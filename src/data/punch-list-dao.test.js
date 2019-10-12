import dao from './punch-list-dao.js';

it('receives data', () => {
	expect(dao.getPunchList().length).toBeGreaterThan(0);
	expect(dao.getPunchList("plumbing", "?state=open").length).toBe(1);
})