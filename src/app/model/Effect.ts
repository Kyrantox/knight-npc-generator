export default class Effect {
  name: string;
  tags: string[];
  cost: number;

  constructor(data: string) {
    const [name, tags, cost] = data.split(' | ');

    this.name = name;
    this.tags = tags.split(' - ');
    this.cost = Number(cost);
  }
}