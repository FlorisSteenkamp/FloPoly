
import { DebugElemType } from '../debug';
import { drawFs } from 'flo-draw';


export type TDrawElemFunctions = {
	[T in DebugElemType]: (g: SVGGElement, elem: any) => SVGElement[];
}

export interface IDrawElemFunctions extends TDrawElemFunctions {
	testPoint: (g: SVGGElement, p: number[]) => SVGElement[];
}

function testPoint(
		g: SVGGElement,
		p: number[]) {

    let $elems = drawFs.crossHair( 
        	g, p, 'red thin5 nofill', 0.1
	);  
	
    return $elems;
}


let drawElemFunctions: IDrawElemFunctions = {
	testPoint
}


export { drawElemFunctions }
