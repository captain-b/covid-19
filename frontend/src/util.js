export const sortData = (data) => {
	return data.sort((a, b) => (a.cases.today > b.cases.today ? -1 : 1));
}