<?php
/*
Plugin Name: Block Editor
*/
function blockeditorplugin_enqueue() {
    wp_enqueue_script(
        'block-editor-plugin-script',
        plugins_url( 'js/left-block-plugin.js', __FILE__ ),
        array( 'wp-blocks' )
    );
    wp_enqueue_script(
        'padded-block-plugin-script',
        plugins_url( 'js/padded-block-plugin.js', __FILE__ ),
        array( 'wp-blocks' )
    );
    wp_enqueue_script(
        'right-block-plugin-script',
        plugins_url( 'js/right-block-plugin.js', __FILE__ ),
        array( 'wp-blocks' )
    );
}
add_action( 'enqueue_block_editor_assets', 'blockeditorplugin_enqueue' );function blockeditorplugin_stylesheet() {
    wp_enqueue_style( 'block-editor-plugin-style', plugins_url( 'css/style.css', __FILE__ ) );
}
add_action( 'enqueue_block_assets', 'blockeditorplugin_stylesheet' );
