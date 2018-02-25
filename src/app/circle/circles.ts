export class Circles {
  circleName: string;
  creatorId: string;
  createdDate: string;

  circle: object[];

  constructor () {
    this.circle = [];
  }

  getCircle() {
    return this.circle;
  }
}

/*export const CIRCLES = [
  {circleId: 'Family', creatorName: 'Sathish', createdDate: '2017-12-25'},
  {circleId: 'School', creatorName: 'Harish', createdDate: '2015-12-07'},
 ];*/
