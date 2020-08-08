module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-screeps');

  grunt.initConfig({
    screeps: {
      options: {
        email: 'gerethd@gmail.com',
        password: '',
        branch: 'default',
        ptr: false
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: 'dist/',
            src: ['**/*.{js,wasm}'],
            flatten: true
          }
        ]
      }
    }
  });
}
