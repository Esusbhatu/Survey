
export class Choices {
	
	public id: number;
	public index: number;
	public choice: string;



	constructor(data: any) {
		this.id = data.id;
		this.index = data.index;
		this.choice = data.choice;
		
	}

	
}
