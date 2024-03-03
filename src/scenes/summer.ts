import summerJSON from '../assets/summer.json';
import {LAYERS, SIZES, SPRITES, TILES} from "../utils/constants.ts";
import {Player} from "../entities/player.ts";
import Phaser from "phaser";
import {Enemy} from "../entities/enemy.ts";



export class Summer extends Phaser.Scene {
    protected misha: Enemy;

    get player(): Player {
        return this._player;
    }
    private _player?: Player;
    constructor() {
        super('SummerScene');
    }

    preload() {
        this.load.image(TILES.SUMMER, 'src/assets/Summer_Tiles.png');
        this.load.tilemapTiledJSON("map", 'src/assets/summer.json');

        this.load.spritesheet(SPRITES.PLAYER, 'src/assets/characters/alliance.png', {
            frameWidth: SIZES.PLAYER.WIDTH,
            frameHeight: SIZES.PLAYER.HEIGHT,
        })

        this.load.spritesheet(SPRITES.MISHA.base, 'src/assets/characters/misha.png', {
            frameWidth: SIZES.MISHA.WIDTH,
            frameHeight: SIZES.MISHA.HEIGHT,
        })
    }

    create() {
        const map = this.make.tilemap({key: "map"});
        const tileset = map.addTilesetImage(summerJSON.tilesets[0].name, TILES.SUMMER, SIZES.TILE, SIZES.TILE);
        map.createLayer(LAYERS.GROUND, tileset, 0, 0);
        const wallsLayers = map.createLayer(LAYERS.WALLS, tileset, 0, 0);

        this._player = new Player(this, 400, 250, SPRITES.PLAYER);
        this.misha = new Enemy(this, 500, 400, SPRITES.MISHA.base);
        this.misha.setPlayer(this.player)
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, wallsLayers);
        wallsLayers.setCollisionByExclusion([-1]);
    }

    update(time: number, delta: number) {
        super.update(time, delta);
        this.player.update(delta);
        this.misha.update();
        // console.log(this.health);
    }
}