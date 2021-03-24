import CAPACITIES from './capacity';
import EFFECTS from './effect';
import Generator, { GenerateOptions } from './Generator';
import './index.scss';

window.addEventListener('DOMContentLoaded', () => {
  console.log(new Generator().generate(new GenerateOptions()));
});