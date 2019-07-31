<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitca5ac5a0f1d34aaac84f03961878728a
{
    public static $files = array (
        '841f98c5d948ce534a6f87abe5b50614' => __DIR__ . '/..' . '/roots/wp-password-bcrypt/wp-password-bcrypt.php',
    );

    public static $prefixLengthsPsr4 = array (
        'C' => 
        array (
            'Composer\\Installers\\' => 20,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Composer\\Installers\\' => 
        array (
            0 => __DIR__ . '/..' . '/composer/installers/src/Composer/Installers',
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitca5ac5a0f1d34aaac84f03961878728a::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitca5ac5a0f1d34aaac84f03961878728a::$prefixDirsPsr4;

        }, null, ClassLoader::class);
    }
}
