// Initialize Phaser, and creates a 400x490px game
var game = new Phaser.Game(400, 490, Phaser.AUTO, 'game_div');
var game_state = {};

// Creates a new 'main' state that wil contain the game
game_state.main = function () {};
game_state.main.prototype = {

    preload: function () {
        // Function called first to load all the assets
        game.load.image('ship', 'resources/images/ship.png');
    },

    create: function () {
        // Fuction called after 'preload' to setup the game
        ship = game.add.sprite(250, 300, 'ship');
        ship.anchor.setTo(0.5,0.5);

        keyboard = game.input.keyboard;

        velocity_translation = 0;
        velocity_rotation = 0;
        acceleration_translation = .1;
        acceleration_rotation = Math.PI / 48;
        drag_translation_base = 1;
        drag_translation_percentage = 0.1;
        drag_translation_base = Math.PI / 32;
        drag_translation_percentage = 0.1;

        max_velocity_translation = 20;
        max_velocity_rotation = Math.PI * 2;
        max_acceleration_translation = 20;
        max_acceleration_rotation = Math.PI / 2;
    },

    update: function () {
        

        /// Input
        //game.input.update();
        // Acceleration
        if (keyboard.isDown(Phaser.Keyboard.UP))
            velocity_translation += acceleration_translation;
        else if (keyboard.isDown(Phaser.Keyboard.DOWN))
            velocity_translation -= acceleration_translation;

        // Rotation
        if (keyboard.isDown(Phaser.Keyboard.LEFT))
            velocity_rotation -= acceleration_rotation;
        else if (keyboard.isDown(Phaser.Keyboard.RIGHT))
            velocity_rotation += acceleration_rotation;

        // Drag
        /*sign = get_sign(velocity_translation);
        if (velocity_translation != 0)
        {
            velocity_translation -= velocity_translation * drag_translation_percentage - drag_translation_base;
        }
        if (get_sign(velocity_translation) != sign)
            velocity_translation = 0;

        /// Limits
        sign = get_sign(acceleration_translation);
        if (sign * acceleration_translation < max_acceleration_translation)
            acceleration_translation = sign * max_acceleration_translation;

        sign = get_sign(acceleration_rotation);
        if (sign * acceleration_rotation < max_acceleration_rotation)
            acceleration_rotation = sign * max_acceleration_rotation;*/

        /// Update
        // Rotation
        ship.rotation += velocity_rotation;

        // Translation
        ship.position.y += Math.sin(ship.rotation) * velocity_translation;
        ship.position.x += Math.cos(ship.rotation) * velocity_translation;

        console.log("v_tra:", velocity_translation, "a_tra", acceleration_translation, "v_rot", velocity_rotation, "a_rot", acceleration_rotation);
    },

    render: function () {
        game.debug.spriteInfo(ship, 32, 100);
    }

};

function get_sign(n)
{
    return n >= 0 ? 1 : -1;
}

// Add and start the 'main' state to start the game
game.state.add('main', game_state.main);
game.state.start('main');