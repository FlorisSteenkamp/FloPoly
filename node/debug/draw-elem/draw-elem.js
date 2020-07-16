"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawElemFunctions = void 0;
const flo_draw_1 = require("flo-draw");
function testPoint(g, p) {
    let $elems = flo_draw_1.drawFs.crossHair(g, p, 'red thin5 nofill', 0.1);
    return $elems;
}
let drawElemFunctions = {
    testPoint
};
exports.drawElemFunctions = drawElemFunctions;
//# sourceMappingURL=draw-elem.js.map