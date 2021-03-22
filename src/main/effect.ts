class Effect {
  name: string;
  tags: string[];

  constructor(data: string) {
    const [name, tags] = data.split(' | ');

    this.name = name;
    this.tags = tags.split(' - ');
  }
}

const EFFECTS = [
  'Anti-Anathème | recrue - hostile - salopard - colosse - patron - autre',
  'Anti-véhicule | recrue - hostile - salopard - colosse - patron',
  'Choc 1 | recrue - hostile - salopard - colosse - patron',
  'Choc 2 | initié - hostile - salopard - colosse - patron',
  'Choc 4 | héros - hostile - salopard - colosse - patron',
  'Dispersion 2 | recrue - hostile - salopard - colosse - patron',
  'Dispersion 3 | initié - hostile - salopard - colosse - patron',
  'Dispersion 6 | héros - hostile - salopard - colosse - patron',
  'Dégâts continus 3 | recrue - hostile - salopard - colosse - patron',
  'Dégâts continus 6 | initié - hostile - salopard - colosse - patron',
  'Dégâts continus 9 | héros - hostile - salopard - colosse - patron',
  'Descructeur | recrue - hostile - salopard - colosse - patron',
  'Ignore Armure | initié - hostile - salopard - colosse - patron',
  'Ignore CdF | initié - hostile - salopard - colosse - patron',
  'Lumière 1 | recrue - hostile - salopard - colosse - patron - autre',
  'Lumière 3 | initié - hostile - salopard - colosse - patron - autre',
  'Lumière 6 | héros - hostile - salopard - colosse - patron - autre',
  'Meutrier | recrue - hostile - salopard - colosse - patron',
  'Parasitage 1 | recrue - hostile - salopard - colosse - patron',
  'Parasitage 2 | initié - hostile - salopard - colosse - patron',
  'Parasitage 4 | héros - hostile - salopard - colosse - patron',
  'Pénétrant 2 | recrue - hostile - salopard - colosse - patron',
  'Pénétrant 6 | initié - hostile - salopard - colosse - patron',
  'Pénétrant 10 | héros - hostile - salopard - colosse - patron',
  'Perce Armure 20 | recrue - hostile - salopard - colosse - patron',
  'Perce Armure 40 | initié - hostile - salopard - colosse - patron',
  'Perce Armure 60 | héros - hostile - salopard - colosse - patron',
  'Silencieux | recrue - hostile - salopard - colosse - patron',
  'Soumission | recrue - hostile - salopard - colosse - patron'
];

export default EFFECTS;