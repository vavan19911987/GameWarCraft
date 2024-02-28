import durotarJSON from '../assets/durotar.json';
import {LAYERS, SIZES, SPRITES, TILES} from "../utils/constants.ts";
import {Player} from "../entities/player.ts";
import Phaser from "phaser";


export class Durotar extends Phaser.Scene {
    get player(): Player {
        return this._player;
    }
    private _player?: Player;
    constructor() {
        super('DurotarScene');
    }

    preload() {
        this.load.image(TILES.DUROTAR, 'src/assets/durotar.png');
        this.load.tilemapTiledJSON("map", 'src/assets/durotar.json');
        this.load.spritesheet(SPRITES.PLAYER, 'src/assets/characters/alliance.png', {
            frameWidth: SIZES.PLAYER.WIDTH,
            frameHeight: SIZES.PLAYER.HEIGHT,
        })
    }

    create() {
        const map = this.make.tilemap({key: "map"});
        const tileset = map.addTilesetImage(durotarJSON.tilesets[0].name, TILES.DUROTAR, SIZES.TILE, SIZES.TILE);
        map.createLayer(LAYERS.GROUND, tileset, 0, 0);
        map.createLayer(LAYERS.WALLS, tileset, 0, 0);

        this._player = new Player(this, 400, 250, SPRITES.PLAYER);


    }

    update(time: number, delta: number) {
        super.update(time, delta);
        this.player.update(delta)
    }
}