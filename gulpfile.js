/* 
    第三方插件
    gulp-scss
    gulp-minify-css
    gulp-rename
*/

const gulp = require("gulp");
const scss = require("gulp-sass");
const minifyCSS = require("gulp-minify-css");
const rename = require("gulp-rename");

//处理scss文件
gulp.task("scss",function(){
    return gulp.src("stylesheet/index.scss")
    .pipe(scss())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCSS())
    .pipe(rename("index.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})

//批量处理
gulp.task("scssAll",function(){
    return gulp.src("stylesheet/*.scss")
    .pipe(scss())
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})

//处理js文件
gulp.task("script",function(){
    return gulp.src(["*.js","!gulefile.js"])
    .pipe(gulp.dest("dist/js"))
    .pipe(connect.reload());
})

//处理html
gulp.task("copy-html",function(){
    return gulp.src("*.html")
    .pipe(gulp.dest("dist"))
    .pipe(connect.reload());
})

//处理数据
gulp.task("data",function(){
    return gulp.src(["*.json","!package.json","!npm-shrinkwrap.json"])
    .pipe(gulp.dest("dist/data"))
    .pipe(connect.reload());
})

//处理图片
gulp.task("images",function(){
    return gulp.src("images/**/*")
    .pipe(gulp.dest("dist/images"))
    .pipe(connect.reload());
})

//一次性执行多个任务
gulp.task("build",["scss","scssAll","script","copy-html","data","images"],function(){
    console.log("项目建立成功");
})

//监听
gulp.task("watch",function(){
    gulp.watch("stylesheet/index.scss",["scss"]);
    gulp.watch("stylesheet/*.scss",["scssAll"]);
    gulp.watch(["*.js","!gulefile.js"],["script"]);
    gulp.watch("*.html",["copy-html"]);
    gulp.watch(["*.json","!package.json","!npm-shrinkwrap.json"],["data"]);
    gulp.watch("images/**/*",["images"]);
})

//启动一个服务器 gulp-connect
const connect = require("gulp-connect");
gulp.task("server",function(){
    connect.server({
        root: "dist",
        port: 9999,
        livereload: true
    })
})

//启动一个默认任务  直接使用 gulp 启动 
gulp.task("default",["watch","server"]);