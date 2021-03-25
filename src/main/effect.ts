export class Effect {
  name: string;
  tags: string[];

  constructor(data: string) {
    const [name, tags] = data.split(' | ');

    this.name = name;
    this.tags = tags.split(' - ');
  }
}

const EFFECTS = [
  "Anti-Anathème | recrue - hostile - salopard - colosse - patron - autre",
  "Anti-véhicule | recrue - hostile - salopard - colosse - patron - bande",
  "Assistance à l'attaqe | recrue - hostile - salopard - colosse - patron - autre",
  "Choc 1 | recrue - hostile - salopard - colosse - patron",
  "Choc 2 | initié - hostile - salopard - colosse - patron",
  "Choc 4 | héros - hostile - salopard - colosse - patron",
  "Dispersion 2 | recrue - hostile - salopard - colosse - patron",
  "Dispersion 3 | initié - hostile - salopard - colosse - patron",
  "Dispersion 6 | héros - hostile - salopard - colosse - patron",
  "Dégâts continus 3 | recrue - hostile - salopard - colosse - patron",
  "Dégâts continus 6 | initié - hostile - salopard - colosse - patron",
  "Dégâts continus 9 | héros - hostile - salopard - colosse - patron",
  "Descructeur | recrue - hostile - salopard - colosse - patron - bande",
  "Ignore Armure | initié - hostile - salopard - colosse - patron - bande",
  "Ignore CdF | initié - hostile - salopard - colosse - patron - bande",
  "Lumière 1 | recrue - hostile - salopard - colosse - patron - autre - bande",
  "Lumière 3 | initié - hostile - salopard - colosse - patron - autre - bande",
  "Lumière 6 | héros - hostile - salopard - colosse - patron - autre - bande",
  "Meutrier | recrue - hostile - salopard - colosse - patron - bande",
  "Parasitage 1 | recrue - hostile - salopard - colosse - patron",
  "Parasitage 2 | initié - hostile - salopard - colosse - patron",
  "Parasitage 4 | héros - hostile - salopard - colosse - patron",
  "Pénétrant 2 | recrue - hostile - salopard - colosse - patron - bande",
  "Pénétrant 6 | initié - hostile - salopard - colosse - patron - bande",
  "Pénétrant 10 | héros - hostile - salopard - colosse - patron - bande",
  "Perce Armure 20 | recrue - hostile - salopard - colosse - patron - bande",
  "Perce Armure 40 | initié - hostile - salopard - colosse - patron - bande",
  "Perce Armure 60 | héros - hostile - salopard - colosse - patron - bande",
  "Silencieux | recrue - hostile - salopard - colosse - patron",
  "Soumission | recrue - hostile - salopard - colosse - patron"
];

export default EFFECTS;