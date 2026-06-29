import { testIt_General } from '../../__tests__/roots/mobius/test-it-general.js';
import { testIt_Mignotte } from '../../__tests__/roots/mobius/test-it-mignotte.js';


(() => {

    // testIt(false);  // warmup

    testIt_General(true);

    // testIt_Mignotte(true);

    document.querySelector('#results')!.textContent = 
    `${Math.random()}`;
})();
