import dao from './punch-list-dao.js';

it('tests', () => {
	expect(true).toBeTruthy();
});

it('receives data', () => {
	expect(dao.getPunchList().length).toBeGreaterThan(0);
	expect(dao.getPunchList("plumbing", "?state=open").length).toBe(1);
})