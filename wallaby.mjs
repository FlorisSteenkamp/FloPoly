
export default function(wallaby) {
    return {
        autoDetect: ['jest'],
        // Only run tests that are explicitly selected (for example with
        // `it.only` / `describe.only` or `// file.only`).
        // runSelectedTestsOnly: true,

        // Do not auto-add tests to an exclusive run when files are opened/edited.
        // smartStart: [{ startMode: 'never' }],

        // env: {
        //     type: 'node',
        //     params: {
        //         runner: '--experimental-vm-modules'
        //     }
        // },

        maxConsoleMessagesPerTest: 250
    }
}
