import { testIt_General } from '../../__tests__/roots/mobius/test-it-general.js';
import { testIt_HighDeg } from '../../__tests__/roots/mobius/test-it-high-degree.js';
import { testIt_Mignotte } from '../../__tests__/roots/mobius/test-it-mignotte.js';


(() => {
    // testIt(false);  // warmup

    // testIt_General(true);
    // console.log('--------------------------------');
    // testIt_General(true);

    testIt_HighDeg();
    // console.log('--------------------------------');
    testIt_HighDeg();

    // testIt_Mignotte(true);

    document.querySelector('#results')!.textContent = 
    `${Math.random()}`;
})();
