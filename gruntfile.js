/// <reference path="typings/sequelize/sequelize.d.ts" />
/// <reference path="typings/node/node.d.ts" />
/// <reference path="models/Todo.d.ts" />

module.exports = function (grunt) {
	grunt.initConfig({
		ts: {
			default: {
				src: ["**/*.ts", "!node_modules/**/*.ts"]
			},
			options: {
				module: "commonjs",
				comments: false
			}
		}
	});
	grunt.loadNpmTasks("grunt-ts");
	grunt.registerTask("default", ["ts"]);
};
