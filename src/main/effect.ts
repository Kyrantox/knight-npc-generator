export class Effect {
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

const EFFECTS = [
  "Anti-Anathème | recrue - hostile - salopard - colosse - patron - autre | 20",
  "Anti-véhicule | recrue - hostile - salopard - colosse - patron - bande | 20",
  "Choc 1 | recrue - hostile - salopard - colosse - patron | 5",
  "Choc 2 | initié - hostile - salopard - colosse - patron | 10",
  "Choc 4 | héros - hostile - salopard - colosse - patron | 15",
  "Choc 6 | héros - hostile - salopard - colosse - patron | 20",
  "Dispersion 2 | recrue - hostile - salopard - colosse - patron | 5",
  "Dispersion 3 | initié - hostile - salopard - colosse - patron | 10",
  "Dispersion 6 | héros - hostile - salopard - colosse - patron | 20",
  "Dégâts continus 3 | recrue - hostile - salopard - colosse - patron | 5",
  "Dégâts continus 6 | initié - hostile - salopard - colosse - patron | 15",
  "Dégâts continus 9 | héros - hostile - salopard - colosse - patron | 20",
  "Descructeur | recrue - hostile - salopard - colosse - patron - bande | 10",
  "Ignore Armure | initié - hostile - salopard - colosse - patron - bande | 20",
  "Ignore CdF | initié - hostile - salopard - colosse - patron - bande | 20",
  "Lumière 2 | recrue - hostile - salopard - colosse - patron - autre - bande | 5",
  "Lumière 4 | initié - hostile - salopard - colosse - patron - autre - bande | 15",
  "Lumière 6 | héros - hostile - salopard - colosse - patron - autre - bande | 20",
  "Meutrier | recrue - hostile - salopard - colosse - patron - bande | 10",
  "Parasitage 1 | recrue - hostile - salopard - colosse - patron | 5",
  "Parasitage 2 | initié - hostile - salopard - colosse - patron | 10",
  "Parasitage 4 | héros - hostile - salopard - colosse - patron | 15",
  "Parasitage 6 | héros - hostile - salopard - colosse - patron | 20",
  "Pénétrant 5 | initié - hostile - salopard - colosse - patron - bande | 5",
  "Pénétrant 10 | héros - hostile - salopard - colosse - patron - bande | 10",
  "Perce Armure 20 | recrue - hostile - salopard - colosse - patron - bande | 5",
  "Perce Armure 40 | initié - hostile - salopard - colosse - patron - bande | 10",
  "Perce Armure 60 | héros - hostile - salopard - colosse - patron - bande | 15",
  "Silencieux | recrue - hostile - salopard - colosse - patron | 10",
  "Soumission | recrue - hostile - salopard - colosse - patron | 15"
];

export default EFFECTS;