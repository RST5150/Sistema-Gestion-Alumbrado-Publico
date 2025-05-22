export function formatDateShow(datein: string) {
	const date = new Date(datein);
	const dd = (date.getDate() + 1).toString().padStart(2, '0');
	const mm = (date.getMonth() + 1).toString().padStart(2, '0');
	const yyyy = date.getFullYear();
	return `${dd}/${mm}/${yyyy}`;
}

export function formatDateSave(datein: string) {
	const date = new Date(datein);
	const yyyy = date.getFullYear();
	const mm = (date.getMonth() + 1).toString().padStart(2, '0');
	const dd = (date.getDate() + 1).toString().padStart(2, '0');
	return `${yyyy}-${mm}-${dd}`;
}
