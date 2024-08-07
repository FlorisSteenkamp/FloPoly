// export default function(wallaby) {
//     return {
//         files: [
//             'package.json',
//             'src/**/*.ts',
            
//         ],
//         tests: [
//             '__tests__/**/*.spec.ts',
//             '__tests__/**/*.ts'
//         ],

//         autoDetect: true,

//         // workers: { restart: true }
//     };
// };


export default function(wallaby) {
    return {
        files: [
            'package.json',
            'src/**/*.ts',
            'test/helpers/*.ts'
        ],

        tests: [
            'test/**/*.spec.ts'
        ],

        testFramework: 'mocha',

        compilers: {
            "**/*.+(t)s?": wallaby.compilers.typeScript()
        },

        env: {
            type: 'node'
        },

        setup: function () {
            // globalThis.expect = chai.expect;
            // var should = chai.should();
        },

        workers: { restart: true },

        maxConsoleMessagesPerTest: 250
    };
};
