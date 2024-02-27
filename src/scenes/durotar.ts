import durotarJSON from '../assets/durotar.json';
import {LAYERS, SIZES, TILES} from "../utils/constants.ts";

export class Durotar extends Phaser.Scene {
    constructor() {
        super('DurotarScene');
    }

    preload() {
        this.load.image(TILES.DUROTAR, 'src/assets/durotar.png');
        this.load.tilemapTiledJSON("map", 'src/assets/durotar.json');
    }

    create() {
        const map = this.make.tilemap({ key: "map" });
        const tileset = map.addTilesetImage(durotarJSON.tilesets[0].name, TILES.DUROTAR, SIZES.TILE, SIZES.TILE);
        map.createLayer(LAYERS.GROUND, tileset, 0, 0);
        map.createLayer(LAYERS.WALLS, tileset, 0, 0);
    }
}