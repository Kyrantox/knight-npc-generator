export default class Capacity {
  name: string;
  description: string;
  tags: string[];

  constructor(data: string) {
    const [name, tags, description] = data.split(' | ');

    this.name = name;
    this.description = description;
    this.tags = tags.split(' - ');
  }
}
