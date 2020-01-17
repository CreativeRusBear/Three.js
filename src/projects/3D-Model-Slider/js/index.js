/**
 * @author Artem Gusev <gusev2014russia@mail.ru> (CreativeRusBear)
 * @version 1.0.0
 * @copyright Artem Gusev 2020
 */
import Slider from './Slider.js';

const slider = new Slider();
slider.settings();
slider.loadMesh(slider.currentObj);
slider.render();