import { cyan, magenta, blue, yellow, red } from 'cli-color';

export const logger = (name, level = 6) => {
    let origConsole = {};

    let simpleWrapper = (typeDescriptor, ...args) => {
        args[0] = new Date().toISOString() + ' - ' + typeDescriptor.color(typeDescriptor.type) + ' - ' + name + ': ' + (args[0] ? args[0] : '');
        if (typeDescriptor.level <= level || typeDescriptor.type == 'log') origConsole.log(...args);
    };

    let methods = [
        { type: 'dir', level: 7, color: cyan, wrapper: simpleWrapper },
        { type: 'debug', level: 7, color: magenta, wrapper: simpleWrapper },
        { type: 'time', level: 7, color: magenta, wrapper: simpleWrapper },
        { type: 'timeEnd', level: 7, color: magenta, wrapper: simpleWrapper },
        { type: 'trace', level: 7, color: cyan, wrapper: simpleWrapper },
        { type: 'log', level: 6, color: blue, wrapper: simpleWrapper },
        { type: 'info', level: 6, color: blue, wrapper: simpleWrapper },
        { type: 'warn', level: 4, color: yellow, wrapper: simpleWrapper },
        { type: 'error', level: 3, color: red, wrapper: simpleWrapper },
        { type: 'assert', level: 3, color: cyan, wrapper: simpleWrapper },
    ];

    methods.forEach(function (typeDescriptor) {
        origConsole[typeDescriptor.type] = console[typeDescriptor.type];
        console[typeDescriptor.type] = (...args) => {
            typeDescriptor.wrapper(typeDescriptor, ...args);
        };
    });
};