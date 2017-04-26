import { _, $, BaseObject } from '../common';

import Name from '../modules/name.js';

export default Object.assign( Object.create( BaseObject ), {


    setup() {

        this.name = this.createChild( Name, $('.js-name') );
    },

    onResize() {

        this.name.resize();
    },

    onMouseMove() {

        this.name.mouseMove();
    },

    onAnimFrame() {

        this.name.animFrame();
    }

});