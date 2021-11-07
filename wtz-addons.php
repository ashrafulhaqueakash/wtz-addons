<?php

/**
 * Plugin Name: WTZ Addons
 * Description: A collection of beautifully designed Elementor addons.
 * Plugin URI:  https://webthemezila.com
 * Version:     1.0.1
 * Author:      Ashraful Haque Akash
 * Author URI:  https://ashrafulhaque.info
 * Text Domain: wtz-addons
 */

if ( !defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}
define( 'WTZ_ADDONS__FILE__', __FILE__ );
define( 'WTZ_ADDONS_DIR_PATH', plugin_dir_path( WTZ_ADDONS__FILE__ ) );
define( 'WTZ_ADDONS_ASSETS', plugins_url( 'assets/', __FILE__ ) );
/**
 * Main wtz-addons Class
 *
 * The main class that initiates and runs the plugin.
 *
 * @since 1.0.0
 */
final class WTZ_Addons_elementor {

    /**
     * Plugin Version
     *
     * @since 1.0.0
     *
     * @var string The plugin version.
     */
    const VERSION = '1.0.0';

    /**
     * Minimum Elementor Version
     *
     * @since 1.0.0
     *
     * @var string Minimum Elementor version required to run the plugin.
     */
    const MINIMUM_ELEMENTOR_VERSION = '2.0.0';

    /**
     * Minimum PHP Version
     *
     * @since 1.0.0
     *
     * @var string Minimum PHP version required to run the plugin.
     */
    const MINIMUM_PHP_VERSION = '5.6';

    /**
     * Instance
     *
     * @since 1.0.0
     *
     * @access private
     * @static
     *
     * @var wtz_addons_elementor The single instance of the class.
     */
    private static $_instance = null;

    /**
     * Instance
     *
     * Ensures only one instance of the class is loaded or can be loaded.
     *
     * @since 1.0.0
     *
     * @access public
     * @static
     *
     * @return wtz_addons_elementor An instance of the class.
     */
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }

        return self::$_instance;
    }

    /**
     * Constructor
     *
     * @since 1.0.0
     *
     * @access public
     */
    public function __construct() {
        add_action( 'init', [$this, 'i18n'] );
        add_action( 'plugins_loaded', [$this, 'init'] );

         //Defined Constants
         if (!defined('WTZ_ADDONS_BADGE')) {
            define('WTZ_ADDONS_BADGE', '<span class="wtz-addons-badge"></span>');
        }

        




    }

    /**
     * Load Textdomain
     *
     * Load plugin localization files.
     *
     * Fired by `init` action hook.
     *
     * @since 1.0.0
     *
     * @access public
     */
    public function i18n() {
        load_plugin_textdomain( 'wtz-addons' );
    }

    /**
     * Initialize the plugin
     *
     * Load the plugin only after Elementor (and other plugins) are loaded.
     * Checks for basic plugin requirements, if one check fail don't continue,
     * if all check have passed load the files required to run the plugin.
     *
     * Fired by `plugins_loaded` action hook.
     *
     * @since 1.0.0
     *
     * @access public
     */
    public function init() {

        // $this->update_checker();

        // Require the main plugin file
        require __DIR__ . '/inc/helper-functions.php';
        require __DIR__ . '/inc/elmentor-extender.php';
        require __DIR__ . '/inc/Classes/breadcrumb-class.php';

        // Check if Elementor installed and activated
        if ( !did_action( 'elementor/loaded' ) ) {
            add_action( 'admin_notices', [$this, 'admin_notice_missing_main_plugin'] );

            return;
        }

        // Check for required Elementor version
        if ( !version_compare( ELEMENTOR_VERSION, self::MINIMUM_ELEMENTOR_VERSION, '>=' ) ) {
            add_action( 'admin_notices', [$this, 'admin_notice_minimum_elementor_version'] );

            return;
        }

        // Check for required PHP version
        if ( version_compare( PHP_VERSION, self::MINIMUM_PHP_VERSION, '<' ) ) {
            add_action( 'admin_notices', [$this, 'admin_notice_minimum_php_version'] );

            return;
        }

        // Add Plugin actions
        add_action( 'elementor/widgets/widgets_registered', [$this, 'init_widgets'] );
        add_action( 'elementor/frontend/after_enqueue_styles', [$this, 'widget_styles'] );
        add_action( 'elementor/frontend/after_register_scripts', [$this, 'widget_scripts'] );
        add_action( 'elementor/editor/after_enqueue_scripts', [$this, 'editor_scripts'], 100 );
    }

    /* Plugin update checker */
    public function update_checker() {
        if ( !class_exists( 'Puc_v4_Factory' ) ) {
            require_once __DIR__ . '/lib/plugin-update-checker/plugin-update-checker.php';
        }
        $MyUpdateChecker = Puc_v4_Factory::buildUpdateChecker(
            'https://update.grayic.com?action=get_metadata&slug=wtz-addons-helper', //Metadata URL.
            __FILE__, //Full path to the main plugin file.
            'wtz-addons-helper'
        );
    }

    /**
     * Admin notice
     *
     * Warning when the site doesn't have Elementor installed or activated.
     *
     * @since 1.0.0
     *
     * @access public
     */
    public function admin_notice_missing_main_plugin() {
        if ( isset( $_GET['activate'] ) ) {
            unset( $_GET['activate'] );
        }

        $message = sprintf(
            /* translators: 1: Plugin name 2: Elementor */
            esc_html__( '"%1$s" requires "%2$s" to be installed and activated.', 'wtz-addons' ),
            '<strong>' . esc_html__( 'Webthemezila Addons', 'wtz-addons' ) . '</strong>',
            '<strong>' . esc_html__( 'Elementor', 'wtz-addons' ) . '</strong>'
        );

        printf( '<div class="notice notice-warning is-dismissible"><p>%1$s</p></div>', $message );
    }

    /**
     * Admin notice
     *
     * Warning when the site doesn't have a minimum required Elementor version.
     *
     * @since 1.0.0
     *
     * @access public
     */
    public function admin_notice_minimum_elementor_version() {
        if ( isset( $_GET['activate'] ) ) {
            unset( $_GET['activate'] );
        }

        $message = sprintf(
            /* translators: 1: Plugin name 2: Elementor 3: Required Elementor version */
            esc_html__( '"%1$s" requires "%2$s" version %3$s or greater.', 'wtz-addons' ),
            '<strong>' . esc_html__( 'Webthemezila Helper', 'wtz-addons' ) . '</strong>',
            '<strong>' . esc_html__( 'Elementor', 'wtz-addons' ) . '</strong>',
            self::MINIMUM_ELEMENTOR_VERSION
        );

        printf( '<div class="notice notice-warning is-dismissible"><p>%1$s</p></div>', $message );
    }

    /**
     * Admin notice
     *
     * Warning when the site doesn't have a minimum required PHP version.
     *
     * @since 1.0.0
     *
     * @access public
     */
    public function admin_notice_minimum_php_version() {
        if ( isset( $_GET['activate'] ) ) {
            unset( $_GET['activate'] );
        }

        $message = sprintf(
            /* translators: 1: Plugin name 2: PHP 3: Required PHP version */
            esc_html__( '"%1$s" requires "%2$s" version %3$s or greater.', 'wtz-addons' ),
            '<strong>' . esc_html__( 'wtz-addons', 'wtz-addons' ) . '</strong>',
            '<strong>' . esc_html__( 'PHP', 'wtz-addons' ) . '</strong>',
            self::MINIMUM_PHP_VERSION
        );

        printf( '<div class="notice notice-warning is-dismissible"><p>%1$s</p></div>', $message );
    }

    /**
     * Init Widgets
     *
     * Include widgets files and register them
     *
     * @since 1.0.0
     *
     * @access public
     */
    public function init_widgets() {

        $widgets_manager = \Elementor\Plugin::instance()->widgets_manager;
        
        /* card */
        require_once __DIR__ . '/widgets/brand-logo.php';

        require_once __DIR__ . '/inc/modules/custom-css/custom-css.php';
        require_once __DIR__ . '/inc/modules/extras/extras.php';
        require_once __DIR__ . '/inc/modules/custom-position/custom-position.php';
        require_once __DIR__ . '/inc/modules/css-transform/css-transform.php';
        require_once __DIR__ . '/inc/modules/floting-effect/floting-effect.php';
        

    }

    public function widget_styles() {
        wp_dequeue_style( 'elementor-animations' );

        wp_enqueue_style( 'wtz-addons-elementor-animations', plugins_url( '/assets/css/animate.css', __FILE__ ), [], microtime() );
        wp_enqueue_style('slick', plugins_url('/assets/css/slick.css', __FILE__), [], microtime());
        wp_enqueue_style( 'owl-carousel', plugins_url( '/assets/css/owl.carousel.min.css', __FILE__ ), [], microtime() );
        wp_enqueue_style( 'magnific-popup', plugins_url( '/assets/css/magnific-popup.css', __FILE__ ), [], microtime() );
        wp_enqueue_style( 'wtz-addons', plugins_url( '/assets/css/addons.css', __FILE__ ), [], microtime() );
        wp_style_add_data( 'wtz-addons', 'rtl', 'replace' );
    }

    public function widget_scripts() {
        // $wtz_addons = get_option( 'wtz-addons' );
        // if ( '1' !== $wtz_addons['gmap_api'] ) {
        //     $api = sprintf( 'https://maps.googleapis.com/maps/api/js?key=%1$s&language=%2$s', $wtz_addons['gmap_api'], 'en' );
        //     wp_register_script( 'wtz-addons-maps-api-js', $api, array(), '', false );
        // }
        wp_register_script( 'wtz-addons-maps-js', plugins_url( '/assets/js/wtz-addons-maps.js', __FILE__ ), ['jquery'] );
        wp_register_script( 'waypoints', plugins_url( '/assets/js//jquery.waypoints.min.js', __FILE__ ), ['jquery'], microtime(), true );
        wp_register_script( 'exad-progress-bar', plugins_url( '/assets/js/exad-progress-bar-vendor.min.js', __FILE__ ), ['jquery'], microtime(), true );

        wp_enqueue_script( 'jquery-ui-datepicker' );
        wp_enqueue_script('slick', plugins_url('/assets/js/slick.js', __FILE__), ['jquery']);
        wp_enqueue_script( 'owl-carousel', plugins_url( '/assets/js/owl.carousel.min.js', __FILE__ ), ['jquery'] );
        wp_enqueue_script( 'isotope', plugins_url( '/assets/js/isotope.pkgd.min.js', __FILE__ ), ['jquery'] );
        wp_enqueue_script( 'packery', plugins_url( '/assets/js/packery-mode.pkgd.min.js', __FILE__ ), ['jquery', 'isotope'] );
        wp_enqueue_script( 'imagesloaded', plugins_url( '/assets/js/imagesloaded.pkgd.min.js', __FILE__ ), ['jquery', 'isotope'] );
        wp_enqueue_script( 'magnific-popup', plugins_url( '/assets/js/jquery.magnific-popup.min.js', __FILE__ ), ['jquery'], microtime(), true );
        wp_enqueue_script( 'wtz-addons', plugins_url( '/assets/js/addon.js', __FILE__ ), ['jquery'] );
    }

    public function editor_scripts() {

        wp_enqueue_script( 'wtz-addons-editor', plugins_url( '/assets/js/editor.js', __FILE__ ), ['jquery'], self::VERSION, true );
        wp_enqueue_style( 'wtz-addons-styles-editor', plugins_url( 'assets/css/editor.css', __FILE__ ), [ 'elementor-editor' ], self::VERSION . '050420217' );
    }
}

WTZ_Addons_elementor::instance();

/**
 * adding new category
 */
function wtz_addons_add_elementor_widget_categories( $elements_manager ) {
    $elements_manager->add_category(
        'wtz-addons',
        [
            'title' => __( 'Webthemezila addons', 'wtz-addons' ),
            'icon'  => 'fa fa-plug',
        ]
    );
}
add_action( 'elementor/elements/categories_registered', 'wtz_addons_add_elementor_widget_categories' );
