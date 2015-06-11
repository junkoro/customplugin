#!/usr/bin/env node
'use strict';


var gulp = require('gulp');
var del = require('del');


console.log('\n---- copy_custom_plugins START\n');


var platforms = (process.env.CORDOVA_PLATFORMS ? process.env.CORDOVA_PLATFORMS.split(',') : []);
//console.log('platforms.length=' + platforms.length);
var customPluginName = 'ex.customplugin';
var customPluginSrc = 'plugins-custom/' + customPluginName;
var customPluginDst = 'plugins/' + customPluginName;

for (var x = 0; x < platforms.length; x++) {
  try {

    var platform = platforms[x].trim().toLowerCase();
    var platformRoot = 'platforms/' + platform;
    var pluginSrcRoot = '../customplugin-' + platform;

    //Android
    if (platform == 'android') {

      console.log('Android用処理開始');

      //customPluginSrcのJavaをクリーンしつつ、プラグインプロジェクトからJavaをコピー
      var customPluginPackage = 'ex/customplugin';
      var javaSrcRoot = pluginSrcRoot + '/app/src/main/java/' + customPluginPackage;
      var javaSrc = [javaSrcRoot + '/*.java', '!' + javaSrcRoot + '/MainActivity.java'];
      var customPluginSrcAndroid = customPluginSrc + '/src/android';
      del.sync(customPluginSrcAndroid + '/*.java');
      gulp.src(javaSrc).pipe(gulp.dest(customPluginSrcAndroid));

      //platforms/android配下のJavaソースをクリーン
      var javaDstRoot = platformRoot + '/src/' + customPluginPackage;
      del.sync([javaDstRoot + '/*.java', '!' + javaDstRoot + '/MainActivity.java']);

      //プラグインプロジェクトからplatforms/android配下に直接Javaをコピー
      gulp.src(javaSrc).pipe(gulp.dest(javaDstRoot));

      //プラグインプロジェクトからplatforms/android配下に直接リソースをコピー
      var resSrcRoot = pluginSrcRoot + '/app/src/main/res';
      var resDstRoot = platformRoot + '/res';
      gulp.src(resSrcRoot + '/**/ic_stat_notif_icon.png').pipe(gulp.dest(resDstRoot));

      //JSはcustomPluginSrcがマスターなのでコピー
      gulp.src(customPluginSrc + '/*.js').pipe(gulp.dest(customPluginDst));

      //その他のファイルは
      //「ionic plugin rm customPluginName」と
      //「ionic plugin add plugins-custom/ustomPluginName」の
      //併用で自動的にコピーさせないとシステムが壊れるのでコピーしない
      //その他のファイルの変更時はreinstall-custom-plugins.shで行うこと

    }

  } catch(e) {
    process.stdout.write(e);
  }
} //END for


console.log('\n---- copy_custom_plugins END\n');
